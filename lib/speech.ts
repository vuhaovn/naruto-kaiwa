// Phát âm (speechSynthesis) và nhận giọng nói (Web Speech API), tiếng Nhật.

// ---------- Kiểu cho Web Speech API (TypeScript chưa có sẵn SpeechRecognition) ----------
export interface RecognitionAlternative {
  transcript: string;
}
export interface RecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: RecognitionAlternative;
}
export interface RecognitionEvent {
  readonly resultIndex: number;
  readonly results: { readonly length: number; [index: number]: RecognitionResult };
}
export interface RecognitionErrorEvent {
  readonly error: string;
}
export interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
export type RecognitionConstructor = new () => Recognition;

// ---------- Phát âm ----------
let jaVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const ja = voices.filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("ja"));
  // Ưu tiên giọng Google (tự nhiên hơn trên Chrome)
  jaVoice = ja.find((v) => /google/i.test(v.name)) ?? ja[0] ?? null;
  return jaVoice;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Đọc câu tiếng Nhật. Promise xong khi đọc hết (true) hoặc bị ngắt/lỗi (false).
 * Có hẹn giờ dự phòng vì Chrome đôi khi không gọi onend.
 */
export function speakJa(text: string, rate = 0.95): Promise<boolean> {
  if (!canSpeak()) return Promise.resolve(false);
  const clean = text.replace(/\(笑\)|（笑）/g, "").replace(/[A-Z]:\s*/g, "");
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = "ja-JP";
  u.rate = rate;
  const v = jaVoice ?? pickVoice();
  if (v) u.voice = v;
  return new Promise<boolean>((resolve) => {
    let finished = false;
    const finish = (ok: boolean) => {
      if (finished) return;
      finished = true;
      clearTimeout(fallback);
      resolve(ok);
    };
    const fallback = setTimeout(() => finish(true), 3000 + clean.length * 300);
    u.onend = () => finish(true);
    u.onerror = () => finish(false);
    window.speechSynthesis.speak(u);
  });
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}

// ---------- Nhận giọng nói ----------
export function getRecognitionClass(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const isAndroid = (): boolean => typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

const BLOCKED_BY_BROWSER =
  'Chrome đang chặn micro cho trang này. Bấm biểu tượng ⓘ / ổ khóa bên trái thanh địa chỉ → bật "Micro" (Cho phép) → tải lại trang (F5).';

const blockedByOs = (): string =>
  isAndroid()
    ? "Android đang chặn micro của Chrome. Vào Cài đặt → Ứng dụng → Chrome → Quyền → Micro → Cho phép."
    : 'Windows đang chặn micro. Vào Settings → Privacy & security → Microphone → bật "Microphone access" và "Let desktop apps access your microphone", rồi khởi động lại Chrome.';

let micGranted = false;

/**
 * Xin quyền micro rõ ràng trước khi nhận giọng nói → Chrome luôn hiện hộp hỏi (nếu chưa bị chặn).
 * Trả về null nếu OK, hoặc thông báo lỗi tiếng Việt.
 */
export async function ensureMicPermission(): Promise<string | null> {
  if (micGranted) return null;
  if (!navigator.mediaDevices?.getUserMedia) return null; // không kiểm tra được → để SpeechRecognition tự xử lý

  // Đã bị chặn sẵn thì báo ngay, không cần thử
  try {
    const st = await navigator.permissions?.query({ name: "microphone" as PermissionName });
    if (st?.state === "denied") return BLOCKED_BY_BROWSER;
  } catch {
    // Trình duyệt không hỗ trợ query "microphone" → bỏ qua
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    micGranted = true;
    return null;
  } catch (e) {
    const name = e instanceof Error ? e.name : "";
    const msg = e instanceof Error ? e.message : String(e);
    if (name === "NotAllowedError" || name === "SecurityError") {
      return /system/i.test(msg) ? blockedByOs() : BLOCKED_BY_BROWSER;
    }
    if (name === "NotFoundError" || name === "OverconstrainedError") {
      return "Không tìm thấy micro. Kiểm tra micro/tai nghe đã cắm chưa, hoặc chọn đúng micro trong cài đặt âm thanh của Windows.";
    }
    if (name === "NotReadableError" || name === "AbortError") {
      return "Micro đang bị ứng dụng khác dùng (Zoom, Teams, Discord…) hoặc bị Windows chặn. Tắt ứng dụng đó rồi thử lại. " + blockedByOs();
    }
    return "Không bật được micro: " + (msg || name);
  }
}

/** Lỗi của SpeechRecognition → thông báo. null = không cần báo (người dùng tự dừng). */
export function micErrorMessage(code: string): string | null {
  switch (code) {
    case "not-allowed":
      return BLOCKED_BY_BROWSER;
    case "service-not-allowed":
      return "Chrome không cho dùng dịch vụ nhận giọng nói. Hãy dùng Google Chrome bản thường (không phải trình duyệt trong app khác), và kiểm tra quyền Micro ở biểu tượng ⓘ cạnh thanh địa chỉ.";
    case "no-speech":
      return "Không nghe thấy gì. Bấm micro và nói to, rõ hơn nhé.";
    case "audio-capture":
      return "Không tìm thấy micro trên thiết bị.";
    case "network":
      return "Nhận giọng nói cần có internet. Kiểm tra kết nối rồi thử lại.";
    case "aborted":
      return null;
    default:
      return `Lỗi micro: ${code}`;
  }
}
