"use client";

// Phần dùng chung cho mọi thẻ luyện nói: đọc câu → đếm ngược → micro → hiện chữ đã nói.
import { useEffect, useRef, useState } from "react";
import { speakJa, stopSpeaking, getRecognitionClass, ensureMicPermission, MIC_ERRORS } from "../lib/speech";

export const SECONDS = [5, 10, 15];

export function useDrill({ text, seconds, autoSpeak, onEngaged }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [askingMic, setAskingMic] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [micError, setMicError] = useState("");
  const recRef = useRef(null);
  const engagedRef = useRef(onEngaged);
  engagedRef.current = onEngaged;

  // readToken: mỗi lần đọc / bấm mic / rời thẻ tăng lên → lượt đọc cũ không khởi động đồng hồ nữa.
  const readToken = useRef(0);

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

  // Đọc xong mới bắt đầu đếm ngược
  async function read() {
    const token = ++readToken.current;
    setRunning(false);
    setTimeLeft(seconds);
    setSpeaking(true);
    await speakJa(text);
    if (token !== readToken.current) return;
    setSpeaking(false);
    setTimeLeft(seconds);
    setRunning(true);
  }

  function cancelReading() {
    readToken.current++;
    setSpeaking(false);
    stopSpeaking();
  }

  // Dừng đọc và dừng đồng hồ (khi xem đáp án)
  function pause() {
    readToken.current++;
    setSpeaking(false);
    setRunning(false);
  }

  // Đổi số giây → đếm lại (nếu đang đọc thì chờ đọc xong)
  const firstSeconds = useRef(true);
  useEffect(() => {
    if (firstSeconds.current) { firstSeconds.current = false; return; }
    setTimeLeft(seconds);
    if (!speaking) setRunning(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    if (autoSpeak) read();
    else setRunning(true);
    return () => {
      readToken.current++;
      recRef.current?.abort();
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restartTimer() {
    cancelReading();
    setTimeLeft(seconds);
    setRunning(true);
  }

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
    cancelReading();
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
      if (finalText) engagedRef.current?.();
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
      setTranscript("");
    } catch (err) {
      setMicError("Không bật được micro: " + err.message);
    }
  }

  return {
    seconds, timeLeft, speaking, listening, askingMic, transcript, interim, micError,
    read, pause, restartTimer, toggleMic,
  };
}

export function Seg({ value, options, onChange, suffix = "" }) {
  return (
    <div className="seg">
      {options.map((o) => (
        <button key={o} className={o === value ? "on" : ""} onClick={() => onChange(o)}>{o}{suffix}</button>
      ))}
    </div>
  );
}

export function TimerBox({ drill, onSeconds, readingLabel = "🔊 Đang đọc câu hỏi… nghe kỹ nhé" }) {
  const { timeLeft, seconds, speaking } = drill;
  const pct = Math.max(0, (timeLeft / seconds) * 100);
  return (
    <div className={`timer ${timeLeft === 0 ? "over" : ""}`}>
      <div className="timer-bar"><div style={{ width: `${pct}%` }} /></div>
      <div className="timer-row">
        <span className="timer-num">
          {speaking ? readingLabel : timeLeft === 0 ? "⏰ Hết giờ! Nói ngay nào!" : `⏱️ ${timeLeft}s suy nghĩ`}
        </span>
        <span className="timer-ctrl">
          <Seg value={seconds} options={SECONDS} onChange={onSeconds} suffix="s" />
          <button className="btn ghost small" onClick={drill.restartTimer} title="Đếm lại">↻</button>
        </span>
      </div>
    </div>
  );
}

export function MicBox({ drill }) {
  const { listening, askingMic, micError, transcript, interim } = drill;
  return (
    <>
      <div className="mic-area">
        <button className={`mic ${listening ? "on" : ""}`} onClick={drill.toggleMic} aria-label="Micro">
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
    </>
  );
}
