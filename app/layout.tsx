import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "BetWinner",
  description: "Next.js + React Query Example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
