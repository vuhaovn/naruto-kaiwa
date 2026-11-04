// Phát âm (speechSynthesis) và nhận giọng nói (Web Speech API), tiếng Nhật.

let jaVoice = null;

function pickVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const ja = voices.filter((v) => v.lang?.replace("_", "-").toLowerCase().startsWith("ja"));
  // Ưu tiên giọng Google (tự nhiên hơn trên Chrome)
  jaVoice = ja.find((v) => /google/i.test(v.name)) || ja[0] || null;
  return jaVoice;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speakJa(text, rate = 0.95) {
  if (!canSpeak()) return false;
  const clean = text.replace(/\(笑\)|（笑）/g, "").replace(/[A-Z]:\s*/g, "");
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = "ja-JP";
  u.rate = rate;
  const v = jaVoice || pickVoice();
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
  return true;
}

export function getRecognitionClass() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export const MIC_ERRORS = {
  "not-allowed": "Chrome chưa được cấp quyền micro. Bấm biểu tượng ổ khóa/cài đặt cạnh thanh địa chỉ → Micro → Cho phép, rồi thử lại.",
  "service-not-allowed": "Chrome chưa được cấp quyền micro. Bấm biểu tượng ổ khóa/cài đặt cạnh thanh địa chỉ → Micro → Cho phép, rồi thử lại.",
  "no-speech": "Không nghe thấy gì. Bấm micro và nói to, rõ hơn nhé.",
  "audio-capture": "Không tìm thấy micro trên thiết bị.",
  network: "Nhận giọng nói cần có internet. Kiểm tra kết nối rồi thử lại.",
  aborted: null,
};
