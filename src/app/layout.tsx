import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "꾸미룸",
  description: "꾸미룸",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
