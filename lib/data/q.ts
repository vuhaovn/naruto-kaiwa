import type { QuestionInput } from "../types";

/** [① Phản ứng, ② Trả lời + 1 ý, ③ Hỏi lại / xác nhận, nghĩa tiếng Việt] */
export type SampleTuple = [r: string, a: string, q: string, vi: string];

/** Tạo 1 câu hỏi kèm câu mẫu theo công thức 3 bước. */
export const Q = (ja: string, vi: string, samples: SampleTuple[]): QuestionInput => ({
  ja,
  vi,
  samples: samples.map(([r, a, q, svi]) => ({ r, a, q, vi: svi })),
});
