import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "BetWinner",
  description: "Next.js + React Query Example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
