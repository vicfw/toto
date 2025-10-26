import Providers from "./providers";
import "./globals.css";

import SubMenu from "@/components/Layout/SubMenu";

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
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lateef:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* className="pb-[80px]" */}
        <div>
          <Providers>{children}</Providers>
          {/* <SubMenu /> */}
        </div>
      </body>
    </html>
  );
}
