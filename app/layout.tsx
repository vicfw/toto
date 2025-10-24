import Providers from "./providers";
import "./globals.css";

<<<<<<< HEAD
=======
import { Roboto } from "next/font/google";
import SubMenu from "@/components/Layout/SubMenu";
>>>>>>> 036193e3ebbd54d24432837a3097e5a31adcfca6
export const metadata = {
  title: "BetWinner",
  description: "Next.js + React Query Example",
};
<<<<<<< HEAD

=======
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
>>>>>>> 036193e3ebbd54d24432837a3097e5a31adcfca6
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
<<<<<<< HEAD
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lateef:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
=======
      <body className={roboto.className}>
        <Providers>
          <div className=" pb-[80px]">
            {children}
          </div>
          <SubMenu />
        </Providers>
>>>>>>> 036193e3ebbd54d24432837a3097e5a31adcfca6
      </body>
    </html>
  );
}
