"use client";

import { useEffect, useRef, useState } from "react";
import { TOPICS, TOPIC_BY_ID, QUESTION_BY_ID } from "../lib/data/questions";
import { speakJa, getRecognitionClass, ensureMicPermission, MIC_ERRORS } from "../lib/speech";

const SECONDS = [5, 10, 15];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Practice({ state, onPracticed, onToggleFav, onSettings, request, onRequestHandled }) {
  const [topicId, setTopicId] = useState(null);
  const [order, setOrder] = useState([]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0);
  const counted = useRef(new Set());
  const { settings } = state;

  function start(tid) {
    let ids;
    if (tid === "fav") ids = state.favorites.ids.filter((id) => QUESTION_BY_ID[id]);
    else if (tid === "all") ids = TOPICS.flatMap((t) => t.questions.map((q) => q.id));
    else ids = TOPIC_BY_ID[tid].questions.map((q) => q.id);
    if (!ids.length) return;
    const shouldShuffle = tid === "all" || settings.shuffle;
    setOrder(shouldShuffle ? shuffle(ids) : ids);
    setTopicId(tid);
    setIdx(0);
    setDone(false);
    setRound((r) => r + 1);
    counted.current = new Set();
  }

  useEffect(() => {
    if (request) {
      start(request.topicId);
      onRequestHandled();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  const onEngaged = (qid) => {
    if (counted.current.has(qid)) return;
    counted.current.add(qid);
    onPracticed();
  };

  if (!topicId) {
    return <TopicPicker state={state} onStart={start} settings={settings} onSettings={onSettings} />;
  }

  const title =
    topicId === "fav" ? "⭐ Câu yêu thích" : topicId === "all" ? "🎲 Trộn tất cả chủ đề" : `${TOPIC_BY_ID[topicId].icon} ${TOPIC_BY_ID[topicId].name}`;

  if (done) {
    return (
      <div className="card done">
        <div className="big-emoji">🎉</div>
        <h2>Xong {order.length} câu!</h2>
        <p>Bạn đã luyện {counted.current.size} câu trong lượt này. お疲れ様でした！</p>
        <div className="row center">
          <button className="btn primary" onClick={() => start(topicId)}>Luyện lại</button>
          <button className="btn" onClick={() => setTopicId(null)}>Chọn chủ đề khác</button>
        </div>
      </div>
    );
  }

  const q = QUESTION_BY_ID[order[idx]];

  return (
    <div>
      <div className="practice-head">
        <button className="btn ghost small" onClick={() => setTopicId(null)}>← Chủ đề</button>
        <div className="ph-title">{title}</div>
        <div className="ph-count">{idx + 1}/{order.length}</div>
      </div>
      <div className="progress"><div style={{ width: `${((idx + 1) / order.length) * 100}%` }} /></div>

      <QuestionCard
        key={`${round}-${q.id}-${idx}`}
        q={q}
        settings={settings}
        onSettings={onSettings}
        isFav={state.favorites.ids.includes(q.id)}
        onToggleFav={() => onToggleFav(q.id)}
        onEngaged={() => onEngaged(q.id)}
        topicLabel={topicId === "fav" || topicId === "all" ? TOPIC_BY_ID[q.topicId].name : null}
      />

      <div className="row nav-row">
        <button className="btn" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>← Câu trước</button>
        {idx < order.length - 1 ? (
          <button className="btn primary" onClick={() => setIdx(idx + 1)}>Câu tiếp →</button>
        ) : (
          <button className="btn primary" onClick={() => setDone(true)}>Hoàn thành ✓</button>
        )}
      </div>
    </div>
  );
}

function TopicPicker({ state, onStart, settings, onSettings }) {
  const favCount = state.favorites.ids.filter((id) => QUESTION_BY_ID[id]).length;
  return (
    <div>
      <h2 className="section-title">Chọn chủ đề</h2>
      <div className="topic-grid">
        {TOPICS.map((t) => (
          <button key={t.id} className="topic" onClick={() => onStart(t.id)}>
            <span className="t-icon">{t.icon}</span>
            <span className="t-name">{t.name}</span>
            <span className="t-jp">{t.jp} · {t.questions.length} câu</span>
          </button>
        ))}
        <button className="topic alt" onClick={() => onStart("all")}>
          <span className="t-icon">🎲</span>
          <span className="t-name">Trộn tất cả</span>
          <span className="t-jp">ランダム</span>
        </button>
        <button className="topic alt" disabled={!favCount} onClick={() => onStart("fav")}>
          <span className="t-icon">⭐</span>
          <span className="t-name">Câu yêu thích</span>
          <span className="t-jp">{favCount ? `${favCount} câu` : "Chưa có"}</span>
        </button>
      </div>

      <div className="card settings">
        <div className="setting">
          <span>⏱️ Thời gian suy nghĩ</span>
          <Seg value={settings.seconds} options={SECONDS} onChange={(v) => onSettings({ seconds: v })} suffix="s" />
        </div>
        <label className="setting">
          <span>🔀 Đảo thứ tự câu hỏi</span>
          <input type="checkbox" checked={!!settings.shuffle} onChange={(e) => onSettings({ shuffle: e.target.checked })} />
        </label>
        <label className="setting">
          <span>🔊 Tự đọc câu hỏi khi sang thẻ mới</span>
          <input type="checkbox" checked={!!settings.autoSpeak} onChange={(e) => onSettings({ autoSpeak: e.target.checked })} />
        </label>
        <label className="setting">
          <span>🇻🇳 Luôn hiện nghĩa tiếng Việt</span>
          <input type="checkbox" checked={!!settings.showVi} onChange={(e) => onSettings({ showVi: e.target.checked })} />
        </label>
      </div>

      <div className="card tip">
        <b>Cách luyện:</b> Đọc/nghe câu hỏi → trong thời gian đếm ngược, nghĩ câu trả lời theo 3 bước → bấm 🎤 và nói thành tiếng →
        bấm <i>Xem câu mẫu</i> để so sánh. Đừng cố hoàn hảo: <b>nói ra được</b> mới là quan trọng nhất!
      </div>
    </div>
  );
}

function Seg({ value, options, onChange, suffix = "" }) {
  return (
    <div className="seg">
      {options.map((o) => (
        <button key={o} className={o === value ? "on" : ""} onClick={() => onChange(o)}>{o}{suffix}</button>
      ))}
    </div>
  );
}

function QuestionCard({ q, settings, onSettings, isFav, onToggleFav, onEngaged, topicLabel }) {
  const seconds = settings.seconds || 10;
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [running, setRunning] = useState(true);
  const [showVi, setShowVi] = useState(!!settings.showVi);
  const [showSample, setShowSample] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [micError, setMicError] = useState("");
  const recRef = useRef(null);

  // Đếm ngược
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft]);

  // Đổi số giây → đếm lại
  const firstSeconds = useRef(true);
  useEffect(() => {
    if (firstSeconds.current) { firstSeconds.current = false; return; }
    setTimeLeft(seconds);
    setRunning(true);
  }, [seconds]);

  useEffect(() => {
    if (settings.autoSpeak) speakJa(q.ja);
    return () => {
      recRef.current?.abort();
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restartTimer() {
    setTimeLeft(seconds);
    setRunning(true);
  }

  const [askingMic, setAskingMic] = useState(false);

  async function toggleMic() {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    if (askingMic) return;
    const SR = getRecognitionClass();
    if (!SR) {
      setMicError("Trình duyệt này chưa hỗ trợ nhận giọng nói. Hãy mở app bằng Google Chrome (máy tính hoặc Android).");
      return;
    }
    if (!window.isSecureContext) {
      setMicError("Micro chỉ hoạt động khi mở app qua đường link https:// (hoặc localhost).");
      return;
    }
    window.speechSynthesis?.cancel();
    setMicError("");
    setRunning(false);
    setAskingMic(true);
    const permErr = await ensureMicPermission();
    setAskingMic(false);
    if (permErr) {
      setMicError(permErr);
      return;
    }
    const rec = new SR();
    rec.lang = "ja-JP";
    rec.interimResults = true;
    // Android Chrome bị lặp chữ khi dùng continuous → chỉ bật trên máy tính
    rec.continuous = !/Android/i.test(navigator.userAgent);
    let finalText = "";
    rec.onresult = (e) => {
      let itm = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else itm += r[0].transcript;
      }
      setTranscript(finalText);
      setInterim(itm);
      if (finalText) onEngaged();
    };
    rec.onerror = (e) => {
      const m = MIC_ERRORS[e.error];
      if (m !== null) setMicError(m ?? `Lỗi micro: ${e.error}`);
    };
    rec.onend = () => {
      setListening(false);
      setInterim("");
      recRef.current = null;
    };
    try {
      rec.start();
      recRef.current = rec;
      setListening(true);
      setRunning(false);
      setMicError("");
      setTranscript("");
    } catch (err) {
      setMicError("Không bật được micro: " + err.message);
    }
  }

  function revealSample() {
    setShowSample((v) => !v);
    setRunning(false);
    onEngaged();
  }

  const pct = Math.max(0, (timeLeft / seconds) * 100);

  return (
    <div className="card qcard">
      <div className="qtop">
        {topicLabel ? <span className="chip">{topicLabel}</span> : <span />}
        <button className={`star ${isFav ? "on" : ""}`} onClick={onToggleFav} title={isFav ? "Bỏ yêu thích" : "Lưu vào yêu thích"}>
          {isFav ? "★" : "☆"}
        </button>
      </div>

      <div className="question" lang="ja">{q.ja}</div>
      {showVi && <div className="question-vi">{q.vi}</div>}

      <div className="row qtools">
        <button className="btn small" onClick={() => speakJa(q.ja)}>🔊 Nghe câu hỏi</button>
        <button className="btn small" onClick={() => { setShowVi(!showVi); }}>{showVi ? "🙈 Ẩn nghĩa" : "🇻🇳 Hiện nghĩa"}</button>
      </div>

      <div className={`timer ${timeLeft === 0 ? "over" : ""}`}>
        <div className="timer-bar"><div style={{ width: `${pct}%` }} /></div>
        <div className="timer-row">
          <span className="timer-num">{timeLeft === 0 ? "⏰ Hết giờ! Nói ngay nào!" : `⏱️ ${timeLeft}s suy nghĩ`}</span>
          <span className="timer-ctrl">
            <Seg value={seconds} options={SECONDS} onChange={(v) => onSettings({ seconds: v })} suffix="s" />
            <button className="btn ghost small" onClick={restartTimer} title="Đếm lại">↻</button>
          </span>
        </div>
      </div>

      <div className="mic-area">
        <button className={`mic ${listening ? "on" : ""}`} onClick={toggleMic} aria-label="Micro">
          {listening ? "⏹" : "🎤"}
        </button>
        <div className="mic-hint">
          {askingMic ? "Chrome đang hỏi quyền micro → bấm \"Cho phép\" (Allow)" : listening ? "Đang nghe… nói xong bấm ⏹" : "Bấm để nói (tiếng Nhật)"}
        </div>
      </div>

      {micError && <div className="alert">{micError}</div>}

      {(transcript || interim) && (
        <div className="transcript" lang="ja">
          <div className="label">Bạn vừa nói:</div>
          <div>{transcript}<span className="interim">{interim}</span></div>
        </div>
      )}

      <button className="btn sample-btn" onClick={revealSample}>
        {showSample ? "Ẩn câu mẫu" : "💡 Xem câu mẫu"}
      </button>

      {showSample && (
        <div className="samples">
          {q.samples.map((s, i) => (
            <div className="sample" key={i}>
              <div className="sample-head">
                <span>Mẫu {q.samples.length > 1 ? i + 1 : ""}</span>
                <button className="btn ghost small" onClick={() => speakJa(`${s.r}${s.a}${s.q}`)}>🔊 Nghe</button>
              </div>
              <div className="sline s1" lang="ja"><b>①</b> {s.r}</div>
              <div className="sline s2" lang="ja"><b>②</b> {s.a}</div>
              <div className="sline s3" lang="ja"><b>③</b> {s.q}</div>
              <div className="sample-vi">{s.vi}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
