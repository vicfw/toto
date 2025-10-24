import Providers from "./providers";
import "./globals.css";

import { Roboto } from "next/font/google";
export const metadata = {
  title: "BetWinner",
  description: "Next.js + React Query Example",
};
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={roboto.className}>
        <Providers>
 

          {children}
        </Providers>
      </body>
    </html>
  );
}
