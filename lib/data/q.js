// Tạo 1 câu hỏi: { ja, vi, samples: [{ r, a, q, vi }] }
//   r = ① Phản ứng, a = ② Trả lời + thêm 1 ý, q = ③ Hỏi lại / xác nhận, vi = nghĩa câu mẫu
export const Q = (ja, vi, samples) => ({ ja, vi, samples: samples.map(([r, a, q, svi]) => ({ r, a, q, vi: svi })) });
