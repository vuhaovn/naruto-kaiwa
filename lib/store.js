// Trạng thái người dùng + gộp dữ liệu giữa các thiết bị.
//
// state = {
//   favorites: { ids: string[], updatedAt: number },   // bản mới hơn thắng
//   days: { "YYYY-MM-DD": { [deviceId]: count } },     // mỗi thiết bị đếm riêng → không mất số khi gộp
//   settings: { seconds, showVi }                       // chỉ lưu trên máy
// }

const KEY = "naruto-kaiwa:v1";
const DEVICE_KEY = "naruto-kaiwa:device";

export function defaultState() {
  return { favorites: { ids: [], updatedAt: 0 }, days: {}, settings: { seconds: 10, showVi: false } };
}

export function getDeviceId() {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = Math.random().toString(36).slice(2, 10);
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "local";
  }
}

export function loadLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return normalize(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

export function saveLocal(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function normalize(s) {
  const d = defaultState();
  if (!s || typeof s !== "object") return d;
  return {
    favorites: {
      ids: Array.isArray(s.favorites?.ids) ? s.favorites.ids : [],
      updatedAt: Number(s.favorites?.updatedAt) || 0,
    },
    days: s.days && typeof s.days === "object" ? s.days : {},
    settings: { ...d.settings, ...(s.settings || {}) },
  };
}

/** Gộp dữ liệu máy (local) với dữ liệu server (remote). */
export function merge(local, remote) {
  const a = normalize(local);
  const b = normalize(remote);
  const days = {};
  for (const date of new Set([...Object.keys(a.days), ...Object.keys(b.days)])) {
    const da = a.days[date] || {};
    const db = b.days[date] || {};
    days[date] = {};
    for (const dev of new Set([...Object.keys(da), ...Object.keys(db)])) {
      days[date][dev] = Math.max(da[dev] || 0, db[dev] || 0);
    }
  }
  return {
    favorites: b.favorites.updatedAt > a.favorites.updatedAt ? b.favorites : a.favorites,
    days,
    settings: a.settings,
  };
}

/** Dữ liệu gửi lên server (không gửi settings). */
export function toRemote(state) {
  return { favorites: state.favorites, days: state.days };
}

export function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function countOn(state, key) {
  return Object.values(state.days[key] || {}).reduce((s, n) => s + n, 0);
}

export function addPractice(state, deviceId) {
  const key = dateKey();
  const day = { ...(state.days[key] || {}) };
  day[deviceId] = (day[deviceId] || 0) + 1;
  return { ...state, days: { ...state.days, [key]: day } };
}

export function toggleFavorite(state, qid) {
  const has = state.favorites.ids.includes(qid);
  const ids = has ? state.favorites.ids.filter((x) => x !== qid) : [...state.favorites.ids, qid];
  return { ...state, favorites: { ids, updatedAt: Date.now() } };
}

/** Chuỗi ngày luyện liên tục (tính đến hôm nay; nếu hôm nay chưa luyện thì tính đến hôm qua). */
export function streak(state) {
  const d = new Date();
  if (countOn(state, dateKey(d)) === 0) d.setDate(d.getDate() - 1);
  let n = 0;
  while (countOn(state, dateKey(d)) > 0) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function bestStreak(state) {
  const keys = Object.keys(state.days).filter((k) => countOn(state, k) > 0).sort();
  let best = 0, cur = 0, prev = null;
  for (const k of keys) {
    const t = new Date(k + "T00:00:00");
    if (prev && Math.round((t - prev) / 86400000) === 1) cur++;
    else cur = 1;
    best = Math.max(best, cur);
    prev = t;
  }
  return best;
}

export function totalCount(state) {
  return Object.keys(state.days).reduce((s, k) => s + countOn(state, k), 0);
}
