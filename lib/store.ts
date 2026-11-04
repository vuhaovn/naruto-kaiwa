// Trạng thái người dùng + gộp dữ liệu giữa các thiết bị.
//
// - favorites: bản sửa sau cùng (updatedAt lớn hơn) thắng
// - days: mỗi thiết bị đếm riêng theo ngày → khi gộp lấy max từng thiết bị rồi cộng lại, không mất số
// - settings: chỉ lưu trên máy, không đồng bộ

import type { AppState, Days, Favorites, RemoteData, Settings } from "./types";

const KEY = "naruto-kaiwa:v1";
const DEVICE_KEY = "naruto-kaiwa:device";

const DEFAULT_SETTINGS: Settings = { seconds: 10, showVi: false, autoSpeak: true, shuffle: false };

export function defaultState(): AppState {
  return { favorites: { ids: [], updatedAt: 0 }, days: {}, settings: { ...DEFAULT_SETTINGS } };
}

export function getDeviceId(): string {
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

export function loadLocal(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return normalize(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

export function saveLocal(state: AppState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Trình duyệt chặn localStorage (chế độ ẩn danh…) → bỏ qua
  }
}

// ---------- Kiểm tra dữ liệu không rõ nguồn (localStorage, server) ----------

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function normalizeFavorites(v: unknown): Favorites {
  if (!isRecord(v)) return { ids: [], updatedAt: 0 };
  const ids = Array.isArray(v.ids) ? v.ids.filter((x): x is string => typeof x === "string") : [];
  const updatedAt = typeof v.updatedAt === "number" && Number.isFinite(v.updatedAt) ? v.updatedAt : 0;
  return { ids, updatedAt };
}

function normalizeDays(v: unknown): Days {
  const days: Days = {};
  if (!isRecord(v)) return days;
  for (const [date, devices] of Object.entries(v)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !isRecord(devices)) continue;
    const day: Record<string, number> = {};
    for (const [dev, n] of Object.entries(devices)) {
      if (typeof n === "number" && Number.isFinite(n) && n > 0) day[dev] = Math.floor(n);
    }
    days[date] = day;
  }
  return days;
}

function normalizeSettings(v: unknown): Settings {
  const s = { ...DEFAULT_SETTINGS };
  if (!isRecord(v)) return s;
  if (v.seconds === 5 || v.seconds === 10 || v.seconds === 15) s.seconds = v.seconds;
  if (typeof v.showVi === "boolean") s.showVi = v.showVi;
  if (typeof v.autoSpeak === "boolean") s.autoSpeak = v.autoSpeak;
  if (typeof v.shuffle === "boolean") s.shuffle = v.shuffle;
  return s;
}

export function normalize(v: unknown): AppState {
  if (!isRecord(v)) return defaultState();
  return {
    favorites: normalizeFavorites(v.favorites),
    days: normalizeDays(v.days),
    settings: normalizeSettings(v.settings),
  };
}

/** Gộp dữ liệu máy (local) với dữ liệu server (remote). Settings luôn lấy của máy. */
export function merge(local: AppState, remote: unknown): AppState {
  const r = isRecord(remote) ? remote : {};
  const remoteFav = normalizeFavorites(r.favorites);
  const remoteDays = normalizeDays(r.days);

  const days: Days = {};
  for (const date of new Set([...Object.keys(local.days), ...Object.keys(remoteDays)])) {
    const da = local.days[date] ?? {};
    const db = remoteDays[date] ?? {};
    const merged: Record<string, number> = {};
    for (const dev of new Set([...Object.keys(da), ...Object.keys(db)])) {
      merged[dev] = Math.max(da[dev] ?? 0, db[dev] ?? 0);
    }
    days[date] = merged;
  }

  return {
    favorites: remoteFav.updatedAt > local.favorites.updatedAt ? remoteFav : local.favorites,
    days,
    settings: local.settings,
  };
}

export function toRemote(state: AppState): RemoteData {
  return { favorites: state.favorites, days: state.days };
}

// ---------- Thống kê ----------

export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function countOn(state: AppState, key: string): number {
  return Object.values(state.days[key] ?? {}).reduce((s, n) => s + n, 0);
}

export function addPractice(state: AppState, deviceId: string): AppState {
  const key = dateKey();
  const day = { ...(state.days[key] ?? {}) };
  day[deviceId] = (day[deviceId] ?? 0) + 1;
  return { ...state, days: { ...state.days, [key]: day } };
}

export function toggleFavorite(state: AppState, id: string): AppState {
  const has = state.favorites.ids.includes(id);
  const ids = has ? state.favorites.ids.filter((x) => x !== id) : [...state.favorites.ids, id];
  return { ...state, favorites: { ids, updatedAt: Date.now() } };
}

/** Chuỗi ngày luyện liên tục (tính đến hôm nay; nếu hôm nay chưa luyện thì tính đến hôm qua). */
export function streak(state: AppState): number {
  const d = new Date();
  if (countOn(state, dateKey(d)) === 0) d.setDate(d.getDate() - 1);
  let n = 0;
  while (countOn(state, dateKey(d)) > 0) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function bestStreak(state: AppState): number {
  const keys = Object.keys(state.days)
    .filter((k) => countOn(state, k) > 0)
    .sort((a, b) => a.localeCompare(b));
  let best = 0;
  let cur = 0;
  let prev: Date | null = null;
  for (const k of keys) {
    const t = new Date(k + "T00:00:00");
    if (prev && Math.round((t.getTime() - prev.getTime()) / 86400000) === 1) cur++;
    else cur = 1;
    best = Math.max(best, cur);
    prev = t;
  }
  return best;
}

export function totalCount(state: AppState): number {
  return Object.keys(state.days).reduce((s, k) => s + countOn(state, k), 0);
}
