import type { Metadata } from "next";
import "./globals.css"; import MainWrapper from "@/components/Layout";


export const metadata: Metadata = {
  title: "DeAI",
  description: "Decentrilsed AI Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  );
}
