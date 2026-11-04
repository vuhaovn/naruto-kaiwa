# 🍥 Naruto Kaiwa

Web app luyện hội thoại tiếng Nhật theo công thức 3 bước: **Phản ứng → Trả lời + thêm 1 ý → Hỏi lại**.

- Next.js (chạy trên Vercel, có HTTPS nên micro hoạt động)
- Supabase: đăng nhập bằng link qua email, đồng bộ tiến độ và câu yêu thích giữa các thiết bị
- Chưa cấu hình Supabase thì app vẫn chạy, dữ liệu chỉ lưu trên trình duyệt

## Cấu trúc

TypeScript (strict). Kiểm tra lỗi kiểu: `npm run typecheck` (`npm run build` cũng tự kiểm tra).

```
app/                    layout + trang chính
components/             KaiwaApp (khung + đồng bộ), Practice, Keigo, Fillers, Favorites, Stats
components/drill.tsx    phần dùng chung: đọc câu → đếm ngược → micro
lib/types.ts            kiểu dữ liệu dùng chung
lib/data/questions.ts   8 chủ đề đời thường × 15 câu (+ gộp chủ đề BrSE)
lib/data/brse.ts        5 chủ đề tiếng Nhật IT / BrSE × 15 câu
lib/data/keigo.ts       3 nhóm luyện kính ngữ × 15 câu + bảng động từ
lib/data/fillers.ts     câu câu giờ, aizuchi, hỏi lại
lib/store.ts            dữ liệu người dùng + gộp dữ liệu giữa các thiết bị
lib/supabase.ts         kết nối Supabase
lib/speech.ts           phát âm + nhận giọng nói tiếng Nhật
supabase/schema.sql     tạo bảng trên Supabase
```

## Bước 1: Tạo Supabase (miễn phí)

1. Vào https://supabase.com → **New project** (Region gợi ý: Tokyo hoặc Singapore).
2. Mở **SQL Editor** → **New query** → dán toàn bộ nội dung `supabase/schema.sql` → **Run**.
3. Mở **Authentication → URL Configuration**:
   - **Site URL**: link Vercel của bạn (ví dụ `https://naruto-kaiwa.vercel.app`). Chưa có thì tạm để `http://localhost:3000`.
   - **Redirect URLs**: thêm `http://localhost:3000/**` và `https://naruto-kaiwa.vercel.app/**`.
4. Mở **Project Settings → API** (hoặc **Data API**) và copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key (hoặc `publishable` key) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> Email đăng nhập mặc định của Supabase có giới hạn vài email mỗi giờ. Dùng cá nhân thì đủ.

## Bước 2: Chạy trên máy

```bash
npm install
cp .env.local.example .env.local   # rồi điền 2 giá trị ở bước 1
npm run dev
```

Mở http://localhost:3000 bằng Chrome. Micro chạy được trên `localhost`.

## Bước 3: Đưa lên Vercel

1. Đẩy code lên GitHub.
2. Vào https://vercel.com → **Add New → Project** → chọn repo.
3. Ở mục **Environment Variables**, thêm 2 biến như trong `.env.local`.
4. **Deploy**. Khi có link, nhớ cập nhật Site URL / Redirect URLs trên Supabase (bước 1.3).

## Lưu ý về micro

- Nhận giọng nói dùng Web Speech API, chạy tốt nhất trên **Chrome máy tính và Chrome Android**.
- Cần có internet vì Chrome gửi âm thanh lên Google để chuyển thành chữ.
- Lần đầu bấm 🎤, Chrome sẽ hỏi quyền micro: chọn **Cho phép**.
- iPhone/iPad: nhận giọng nói kém ổn định hơn. Phát âm câu hỏi vẫn chạy bình thường.

## Đồng bộ hoạt động thế nào

- Mỗi thiết bị đếm số câu riêng theo ngày; khi gộp sẽ cộng các thiết bị lại, nên luyện offline trên 2 máy cũng không mất số.
- Danh sách yêu thích: bản sửa sau cùng sẽ được giữ.
- Đồng bộ tự chạy khi đăng nhập, khi có thay đổi (sau 1,5 giây), khi quay lại app và khi có mạng lại.
