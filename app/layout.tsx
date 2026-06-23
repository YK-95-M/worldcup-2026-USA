import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FIFA ワールドカップ 2026",
  description: "FIFA ワールドカップ 2026 北中米大会 特設サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="bg-gradient-to-r from-[#0d3d22] to-[#1a6b3c] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <Link href="/" className="text-xl font-bold text-[#c9a84c] hover:opacity-90 transition-opacity">
                🏆 FIFA ワールドカップ 2026
              </Link>
              <nav className="flex gap-1 flex-wrap">
                <Link href="/" className="px-3 py-1.5 rounded hover:bg-white/10 text-sm font-medium transition-colors">
                  ホーム
                </Link>
                <Link href="/groups" className="px-3 py-1.5 rounded hover:bg-white/10 text-sm font-medium transition-colors">
                  グループ
                </Link>
                <Link href="/bracket" className="px-3 py-1.5 rounded hover:bg-white/10 text-sm font-medium transition-colors">
                  トーナメント
                </Link>
                <Link href="/stats" className="px-3 py-1.5 rounded hover:bg-white/10 text-sm font-medium transition-colors">
                  得点/アシスト
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-[#0d3d22] text-white/60 text-center py-4 text-sm mt-8">
          <p>FIFA ワールドカップ 2026 北中米大会 © 2026</p>
        </footer>
      </body>
    </html>
  );
}
