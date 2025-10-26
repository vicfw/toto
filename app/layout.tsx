import { Vazirmatn } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["latin", "arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-vazir",
});

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
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className={vazir.className}>
        <div>
          <Providers>{children}</Providers>
          {/* <SubMenu /> */}
        </div>
      </body>
    </html>
  );
}
