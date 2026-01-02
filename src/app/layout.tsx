import type { Metadata } from "next";
import "./globals.css";
import "./additional-animations.css";
import { ToastProvider } from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "글로벌 작가 온보딩 | idus",
  description: "idus 글로벌 작가가 되어 전 세계 45개국에 작품을 판매해보세요!",
  keywords: ["idus", "아이디어스", "글로벌", "작가", "온보딩", "해외판매"],
  openGraph: {
    title: "글로벌 작가 온보딩 | idus",
    description: "idus 글로벌 작가가 되어 전 세계 45개국에 작품을 판매해보세요!",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

