"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, pullRemote, pushRemote } from "../lib/supabase";
import {
  addPractice, countOn, dateKey, getDeviceId, loadLocal, merge, saveLocal, streak, toggleFavorite, toRemote,
} from "../lib/store";
import Practice from "./Practice";
import Fillers from "./Fillers";
import Keigo from "./Keigo";
import Favorites from "./Favorites";
import Stats from "./Stats";

const TABS = [
  { id: "practice", icon: "🗣️", label: "Luyện nói" },
  { id: "keigo", icon: "🙇", label: "Kính ngữ" },
  { id: "fillers", icon: "💬", label: "Câu giờ" },
  { id: "favorites", icon: "⭐", label: "Yêu thích" },
  { id: "stats", icon: "📊", label: "Thống kê" },
];

export default function KaiwaApp() {
  const [state, setState] = useState(null);
  const [tab, setTab] = useState("practice");
  const [session, setSession] = useState(null);
  const [sync, setSync] = useState({ status: "idle", at: null, error: null });
  const [practiceRequest, setPracticeRequest] = useState(null);
  const [keigoRequest, setKeigoRequest] = useState(null);

  const deviceId = useRef("local");
  const stateRef = useRef(state);
  stateRef.current = state;
  const lastPushed = useRef("");
  const syncing = useRef(false);

  // Tải dữ liệu trên máy
  useEffect(() => {
    deviceId.current = getDeviceId();
    setState(loadLocal());
  }, []);

  useEffect(() => {
    if (state) saveLocal(state);
  }, [state]);

  // Đăng nhập
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id;

  // Kéo dữ liệu server → gộp → đẩy lại server
  const syncNow = useCallback(async () => {
    if (!supabase || !userId || !stateRef.current || syncing.current) return;
    syncing.current = true;
    setSync((s) => ({ ...s, status: "syncing" }));
    try {
      const remote = await pullRemote(userId);
      const merged = merge(stateRef.current, remote);
      const payload = toRemote(merged);
      await pushRemote(userId, payload);
      lastPushed.current = JSON.stringify(payload);
      setState((prev) => merge(prev, merged));
      setSync({ status: "ok", at: new Date(), error: null });
    } catch (e) {
      setSync({ status: "error", at: new Date(), error: e?.message || String(e) });
    } finally {
      syncing.current = false;
    }
  }, [userId]);

  // Đồng bộ khi đăng nhập xong / khi tải xong dữ liệu
  const loaded = state !== null;
  useEffect(() => {
    if (userId && loaded) syncNow();
  }, [userId, loaded, syncNow]);

  // Có thay đổi → đẩy lên sau 1.5 giây
  useEffect(() => {
    if (!userId || !state) return;
    if (JSON.stringify(toRemote(state)) === lastPushed.current) return;
    const t = setTimeout(syncNow, 1500);
    return () => clearTimeout(t);
  }, [state, userId, syncNow]);

  // Quay lại app / có mạng lại → kéo dữ liệu mới từ thiết bị khác
  useEffect(() => {
    if (!userId) return;
    const onVisible = () => document.visibilityState === "visible" && syncNow();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", syncNow);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", syncNow);
    };
  }, [userId, syncNow]);

  const onPracticed = useCallback(() => setState((s) => addPractice(s, deviceId.current)), []);
  const onToggleFav = useCallback((qid) => setState((s) => toggleFavorite(s, qid)), []);
  const onSettings = useCallback((patch) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } })), []);

  const practiceFavorites = () => {
    setPracticeRequest({ topicId: "fav", n: Date.now() });
    setTab("practice");
  };

  const practiceKeigoFavorites = () => {
    setKeigoRequest({ groupId: "fav", n: Date.now() });
    setTab("keigo");
  };

  if (!state) return <div className="loading">Đang tải…</div>;

  const today = countOn(state, dateKey());
  const st = streak(state);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand" onClick={() => setTab("practice")}>
          <span className="logo">🍥</span>
          <span>Naruto Kaiwa</span>
        </div>
        <div className="topstats">
          <span title="Số câu hôm nay">📝 {today}</span>
          <span title="Chuỗi ngày liên tục">🔥 {st}</span>
          <button className={`cloud ${cloudClass(supabase, session, sync)}`} onClick={() => setTab("stats")} title={cloudTitle(supabase, session, sync)}>
            {session ? "☁️" : "💾"}
          </button>
        </div>
      </header>

      <div className="formula" aria-label="Công thức 3 bước">
        <span className="step s1"><b>①</b> Phản ứng</span>
        <span className="arrow">→</span>
        <span className="step s2"><b>②</b> Trả lời + thêm 1 ý</span>
        <span className="arrow">→</span>
        <span className="step s3"><b>③</b> Hỏi lại</span>
      </div>

      <main className="content">
        {tab === "practice" && (
          <Practice
            state={state}
            onPracticed={onPracticed}
            onToggleFav={onToggleFav}
            onSettings={onSettings}
            request={practiceRequest}
            onRequestHandled={() => setPracticeRequest(null)}
          />
        )}
        {tab === "keigo" && (
          <Keigo
            state={state}
            onPracticed={onPracticed}
            onToggleFav={onToggleFav}
            onSettings={onSettings}
            request={keigoRequest}
            onRequestHandled={() => setKeigoRequest(null)}
          />
        )}
        {tab === "fillers" && <Fillers />}
        {tab === "favorites" && (
          <Favorites state={state} onToggleFav={onToggleFav} onPractice={practiceFavorites} onPracticeKeigo={practiceKeigoFavorites} />
        )}
        {tab === "stats" && <Stats state={state} session={session} sync={sync} onSyncNow={syncNow} />}
      </main>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
            <span className="ti">{t.icon}</span>
            <span className="tl">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function cloudClass(sb, session, sync) {
  if (!sb || !session) return "off";
  return sync.status;
}

function cloudTitle(sb, session, sync) {
  if (!sb) return "Chưa bật đồng bộ: dữ liệu lưu trên máy này";
  if (!session) return "Chưa đăng nhập: bấm để đăng nhập và đồng bộ";
  if (sync.status === "error") return "Lỗi đồng bộ: " + sync.error;
  if (sync.status === "syncing") return "Đang đồng bộ…";
  return "Đã đồng bộ";
}
