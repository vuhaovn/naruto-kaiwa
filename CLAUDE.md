Hãy tạo cho tôi một web app luyện hội thoại tiếng Nhật (kaiwa) tên "Naruto Kaiwa".
Tôi là người Việt, đã có N2, hiểu được tiếng Nhật nhưng không biết nói tiếp gì khi hội thoại.

Yêu cầu kỹ thuật:
- Technical bạn hãy tự chọn Nextjs hay Reactjs hoặc chỉ là HTML, mở bằng Chrome là chạy được, không cần cài đặt.
- Giao diện tiếng Việt, đơn giản, dễ dùng trên cả điện thoại và máy tính.
- Lưu dữ liệu (tiến độ, câu yêu thích) phần này tùy bạn gợi ý, supabase hoặc neon gì đó hoặc có thể là localStorage hoặc file JSON.

Chức năng:
1. Chọn chủ đề: tự giới thiệu, công việc, sở thích, Việt Nam, đồ ăn, du lịch, cuối tuần, học tiếng Nhật.
   Mỗi chủ đề có ít nhất 15 câu hỏi mà người Nhật hay hỏi, kèm nghĩa tiếng Việt (có thể ẩn/hiện).
2. Hiện từng câu hỏi dạng thẻ, có đồng hồ đếm ngược (chọn được 5 / 10 / 15 giây).
3. Luôn hiển thị nhắc công thức 3 bước: Phản ứng → Trả lời + thêm 1 ý → Hỏi lại.
4. Nút micro: dùng Web Speech API (lang = ja-JP) để tôi nói, rồi hiện chữ tôi vừa nói.
5. Sau khi trả lời, nút "Xem câu mẫu": hiện 1–2 câu trả lời mẫu tự nhiên theo công thức 3 bước.
6. Nút phát âm câu hỏi bằng giọng tiếng Nhật (speechSynthesis, ja-JP).
7. Một trang riêng ôn "câu câu giờ" và aizuchi (えっと、そうですね、へえ、なるほど、確かに…),
   có giải thích khi nào dùng.
8. Thống kê đơn giản: hôm nay luyện bao nhiêu câu, chuỗi ngày luyện liên tục.

Hãy làm phiên bản đầu tiên chạy được trước, sau đó tôi sẽ yêu cầu chỉnh sửa thêm.