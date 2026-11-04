import "./globals.css";

export const metadata = {
  title: "Naruto Kaiwa",
  description: "Luyện hội thoại tiếng Nhật theo công thức 3 bước: Phản ứng → Trả lời + 1 ý → Hỏi lại",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
