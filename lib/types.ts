// Kiểu dữ liệu dùng chung cho toàn app.

// ---------- Câu hỏi hội thoại ----------
/** Câu mẫu theo công thức 3 bước */
export interface Sample {
  /** ① Phản ứng */
  r: string;
  /** ② Trả lời + thêm 1 ý */
  a: string;
  /** ③ Hỏi lại / xác nhận */
  q: string;
  /** Nghĩa tiếng Việt cả câu mẫu */
  vi: string;
}

export interface QuestionInput {
  ja: string;
  vi: string;
  samples: Sample[];
}

export interface Question extends QuestionInput {
  /** "<topicId>-<số thứ tự>", cố định → dùng để lưu yêu thích */
  id: string;
  topicId: string;
}

export type TopicGroupId = "daily" | "brse";

export interface TopicGroup {
  id: TopicGroupId;
  title: string;
  desc?: string;
}

export interface TopicInput {
  id: string;
  icon: string;
  name: string;
  jp: string;
  questions: QuestionInput[];
}

export interface Topic extends Omit<TopicInput, "questions"> {
  group: TopicGroupId;
  questions: Question[];
}

// ---------- Câu câu giờ & aizuchi ----------
export interface FillerItem {
  ja: string;
  romaji: string;
  vi: string;
  when: string;
  ex: string;
  exVi: string;
}

export interface FillerGroup {
  id: string;
  icon: string;
  title: string;
  desc: string;
  items: FillerItem[];
}

// ---------- Kính ngữ ----------
export interface KeigoItemInput {
  /** Tình huống (tiếng Việt) */
  sit: string;
  /** Câu thường */
  plain: string;
  /** Đáp án: phần tử đầu là đáp án chính */
  ans: [string, ...string[]];
  /** Giải thích */
  note: string;
}

export interface KeigoItem extends KeigoItemInput {
  id: string;
  groupId: string;
}

export interface KeigoGroupInput {
  id: string;
  icon: string;
  name: string;
  desc: string;
  items: KeigoItemInput[];
}

export interface KeigoGroup extends Omit<KeigoGroupInput, "items"> {
  items: KeigoItem[];
}

export interface KeigoType {
  name: string;
  vi: string;
  desc: string;
}

/** [thường, 尊敬語, 謙譲語] */
export type VerbRow = [string, string, string];

// ---------- Dữ liệu người dùng ----------
export interface Settings {
  seconds: number;
  showVi: boolean;
  autoSpeak: boolean;
  shuffle: boolean;
}

export interface Favorites {
  ids: string[];
  updatedAt: number;
}

/** { "YYYY-MM-DD": { [deviceId]: số câu } } */
export type Days = Record<string, Record<string, number>>;

export interface AppState {
  favorites: Favorites;
  days: Days;
  settings: Settings;
}

/** Phần dữ liệu được đồng bộ lên server (không gồm settings) */
export type RemoteData = Pick<AppState, "favorites" | "days">;

export type SyncStatus = "idle" | "syncing" | "ok" | "error";

export interface SyncState {
  status: SyncStatus;
  at: Date | null;
  error: string | null;
}
