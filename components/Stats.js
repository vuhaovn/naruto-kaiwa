"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { bestStreak, countOn, dateKey, streak, totalCount } from "../lib/store";

const WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function Stats({ state, session, sync, onSyncNow }) {
  const today = countOn(state, dateKey());
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ d, n: countOn(state, dateKey(d)) });
  }
  const max = Math.max(5, ...days.map((x) => x.n));
  const st = streak(state);

  return (
    <div>
      <h2 className="section-title">Thống kê</h2>
      <div className="stat-grid">
        <Stat big={today} label="câu hôm nay" icon="📝" />
        <Stat big={st} label="ngày liên tục" icon="🔥" />
        <Stat big={bestStreak(state)} label="chuỗi dài nhất" icon="🏆" />
        <Stat big={totalCount(state)} label="tổng số câu" icon="📚" />
      </div>

      {today === 0 && (
        <div className="card tip">
          {st > 0 ? `Hôm nay chưa luyện câu nào. Luyện ít nhất 1 câu để giữ chuỗi ${st} ngày nhé! 💪` : "Hôm nay chưa luyện câu nào. Bắt đầu chuỗi ngày mới thôi! 💪"}
        </div>
      )}

      <div className="card">
        <div className="card-title">14 ngày gần đây</div>
        <div className="chart">
          {days.map(({ d, n }, i) => (
            <div className="bar-col" key={i} title={`${dateKey(d)}: ${n} câu`}>
              <div className="bar-val">{n || ""}</div>
              <div className="bar-track"><div className={`bar ${i === 13 ? "today" : ""}`} style={{ height: `${(n / max) * 100}%` }} /></div>
              <div className="bar-lbl">{i === 13 ? "Nay" : WD[d.getDay()]}</div>
            </div>
          ))}
        </div>
        <p className="muted small">Một câu được tính khi bạn nói vào micro hoặc xem câu mẫu.</p>
      </div>

      <Account session={session} sync={sync} onSyncNow={onSyncNow} />
    </div>
  );
}

function Stat({ big, label, icon }) {
  return (
    <div className="card stat">
      <div className="stat-icon">{icon}</div>
      <div className="stat-big">{big}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function Account({ session, sync, onSyncNow }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!supabase) {
    return (
      <div className="card">
        <div className="card-title">☁️ Đồng bộ</div>
        <p>Đồng bộ chưa được bật, dữ liệu đang lưu trên trình duyệt của máy này.</p>
        <p className="muted small">Để bật: điền NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY (xem README.md).</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="card">
        <div className="card-title">☁️ Đồng bộ</div>
        <p>Đã đăng nhập: <b>{session.user.email}</b></p>
        <p className="small">
          {sync.status === "syncing" && "⏳ Đang đồng bộ…"}
          {sync.status === "ok" && `✅ Đã đồng bộ lúc ${sync.at?.toLocaleTimeString("vi-VN")}`}
          {sync.status === "error" && <span className="err">⚠️ Lỗi đồng bộ: {sync.error}</span>}
          {sync.status === "idle" && "Đang chờ đồng bộ…"}
        </p>
        <div className="row">
          <button className="btn small" onClick={onSyncNow}>🔄 Đồng bộ ngay</button>
          <button className="btn ghost small" onClick={() => supabase.auth.signOut()}>Đăng xuất</button>
        </div>
      </div>
    );
  }

  async function sendLink(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setSent(true);
  }

  return (
    <div className="card">
      <div className="card-title">☁️ Đăng nhập để đồng bộ</div>
      <p className="small">Đăng nhập cùng một email trên điện thoại và máy tính, tiến độ và câu yêu thích sẽ tự đồng bộ. Không cần mật khẩu.</p>
      {sent ? (
        <div className="alert ok">
          📧 Đã gửi link đăng nhập tới <b>{email}</b>. Mở email <b>trên thiết bị này</b> và bấm vào link.
          <div><button className="btn ghost small" onClick={() => setSent(false)}>Gửi lại / đổi email</button></div>
        </div>
      ) : (
        <form className="login" onSubmit={sendLink}>
          <input type="email" required placeholder="email@cua-ban.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn primary" disabled={busy}>{busy ? "Đang gửi…" : "Gửi link đăng nhập"}</button>
        </form>
      )}
      {err && <div className="alert">{err}</div>}
    </div>
  );
}
