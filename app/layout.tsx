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
          <ul className="bg-cool-gray p-2.5">
            <li className="bg-white rounded-lg">
              <div className="flex flex-col  ">
                <button className="flex items-center justify-between w-full pr-3">
                  <div className="flex items-center">
                    <svg
                      viewBox="0 0 32 32"
                      focusable="false"
                      role="img"
                      data-v-ico="sports|1"
                      className="size-5"
                    >
                      <path d="M16 0a16 16 0 100 32 16 16 0 000-32zm1 5l5-3 2 1 2 2 1 1 1 1v1l-1 4-5 2-5-4zM4 7l1-1 1-1 2-2 2-1 5 3v5l-5 4-5-2-1-4V7zm0 17l-1-1-1-2v-1l-1-1v-2l3-4 6 2 1 7-2 3zm16 7h-2-1a14 14 0 01-2 0h-1-1l-3-5 2-4h8l2 4zm11-12l-1 1v1l-1 2-1 1-5 1-2-3 1-7 6-2 3 4v2z"></path>
                    </svg>
                    <span className="pr-3">انگلیس لیگ برتر</span>
                  </div>
                  <span className="px-2 min-w-10 min-h-10 flex justify-center items-center">
                    <svg
                      viewBox="0 0 32 19"
                      focusable="false"
                      role="img"
                      data-v-ico="common|angle"
                      className="size-2.5"
                    >
                      <path d="M15.2 18.6.4 4c-.5-.5-.5-1.1 0-1.6l1.9-2c.5-.5 1.3-.5 1.7 0l12 11.8L28 .4c.4-.5 1.2-.5 1.7 0l2 2c.4.5.4 1 0 1.6L17 18.6c-.5.5-1.3.5-1.7 0Z"></path>
                    </svg>
                  </span>
                </button>
                <div>
                  <ul className="p-2 space-y-1.5">
                    <li className="p-2 rounded-lg shadow-[0_0px_0.3125rem_rgba(0,0,0,0.1)]">
                      <div className="space-y-2.5">
                        <div className="flex items-center w-full ">
                          <div className="aspect-square h-4 rounded-full bg-sky-blue-light shrink-0 flex items-center-safe justify-center ml-1">
                            <span className="text-xs">1</span>
                          </div>
                          <span className="text-sm text-[#808080]">
                            25/10/2025 (22:00)
                          </span>
                          <button className="mr-auto">
                            <span
                              data-v-960f624a=""
                              data-v-3862610e=""
                              aria-hidden="true"
                              className="ico ico--square ico--stats"
                            >
                              <svg
                                viewBox="0 0 16 16"
                                focusable="false"
                                role="img"
                                data-v-ico="common|stats"
                                className="size-5"
                              >
                                <path d="M10.4 10.03h1.2c.2 0 .4-.21.4-.42V5.13c0-.22-.2-.43-.4-.43h-1.2c-.2 0-.4.21-.4.43V9.6c0 .21.2.42.4.42Zm3 0h1.2c.2 0 .4-.21.4-.42V1.93c0-.22-.2-.43-.4-.43h-1.2c-.2 0-.4.21-.4.43V9.6c0 .21.2.42.4.42Zm-9 0h1.2c.2 0 .4-.21.4-.42V7.26c0-.21-.2-.43-.4-.43H4.4c-.2 0-.4.22-.4.43v2.35c0 .21.2.42.4.42Zm3 0h1.2c.2 0 .4-.21.4-.42V2.99c0-.21-.2-.42-.4-.42H7.4c-.2 0-.4.21-.4.42v6.62c0 .21.2.42.4.42Zm8.1 2.14H2V2.03c0-.3-.22-.53-.5-.53h-1c-.28 0-.5.24-.5.53v11.2c0 .6.45 1.07 1 1.07h14.5c.28 0 .5-.24.5-.53V12.7c0-.3-.22-.53-.5-.53Z"></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                        <ul className="font-bold text-xs space-y-0.5">
                          <li className="ml-2">بورسیا دورتموند</li>
                          <li className="ml-2">بورسیا دورتموند</li>
                        </ul>
                        <ul className="grid grid-cols-3 text-[13px] gap-1.5">
                          <li className="bg-ice-blue px-2 py-1 rounded-lg">
                            <button className="text-center w-full">
                              <span className="block">1</span>
                              <span className="block">65%</span>
                            </button>
                          </li>
                          <li className="bg-sky-blue-light px-2 py-0.5 rounded-lg">
                            <button className="flex flex-col justify-between items-center space-y-0.5 w-full">
                              <span>1</span>
                              <span>65%</span>
                            </button>
                          </li>
                          <li className="bg-sky-blue-light px-2 py-0.5 rounded-lg">
                            <button className="flex flex-col justify-between items-center space-y-0.5 w-full">
                              <span>1</span>
                              <span>65%</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="p-2 rounded-lg shadow-[0_0px_0.3125rem_rgba(0,0,0,0.1)]">
                      <div className="space-y-2.5">
                        <div className="flex items-center w-full ">
                          <div className="aspect-square h-4 rounded-full bg-sky-blue-light shrink-0 flex items-center-safe justify-center ml-1">
                            <span className="text-xs">1</span>
                          </div>
                          <span className="text-sm text-[#808080]">
                            25/10/2025 (22:00)
                          </span>
                          <button className="mr-auto">
                            <span
                              data-v-960f624a=""
                              data-v-3862610e=""
                              aria-hidden="true"
                              className="ico ico--square ico--stats"
                            >
                              <svg
                                viewBox="0 0 16 16"
                                focusable="false"
                                role="img"
                                data-v-ico="common|stats"
                                className="size-5"
                              >
                                <path d="M10.4 10.03h1.2c.2 0 .4-.21.4-.42V5.13c0-.22-.2-.43-.4-.43h-1.2c-.2 0-.4.21-.4.43V9.6c0 .21.2.42.4.42Zm3 0h1.2c.2 0 .4-.21.4-.42V1.93c0-.22-.2-.43-.4-.43h-1.2c-.2 0-.4.21-.4.43V9.6c0 .21.2.42.4.42Zm-9 0h1.2c.2 0 .4-.21.4-.42V7.26c0-.21-.2-.43-.4-.43H4.4c-.2 0-.4.22-.4.43v2.35c0 .21.2.42.4.42Zm3 0h1.2c.2 0 .4-.21.4-.42V2.99c0-.21-.2-.42-.4-.42H7.4c-.2 0-.4.21-.4.42v6.62c0 .21.2.42.4.42Zm8.1 2.14H2V2.03c0-.3-.22-.53-.5-.53h-1c-.28 0-.5.24-.5.53v11.2c0 .6.45 1.07 1 1.07h14.5c.28 0 .5-.24.5-.53V12.7c0-.3-.22-.53-.5-.53Z"></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                        <ul className="font-bold text-xs space-y-0.5">
                          <li className="ml-2">بورسیا دورتموند</li>
                          <li className="ml-2">بورسیا دورتموند</li>
                        </ul>
                        <ul className="grid grid-cols-3 text-[13px] gap-1.5">
                          <li className="bg-sky-blue-light px-2 py-1 rounded-lg">
                            <button className="text-center w-full">
                              <span className="block">1</span>
                              <span className="block">65%</span>
                            </button>
                          </li>
                          <li className="bg-sky-blue-light px-2 py-0.5 rounded-lg">
                            <button className="flex flex-col justify-between items-center space-y-0.5 w-full">
                              <span>1</span>
                              <span>65%</span>
                            </button>
                          </li>
                          <li className="bg-sky-blue-light px-2 py-0.5 rounded-lg">
                            <button className="flex flex-col justify-between items-center space-y-0.5 w-full">
                              <span>1</span>
                              <span>65%</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>

          <div className="shadow-[0_0px_0.3125rem_rgba(0,0,0,0.1)] bg-white p-2.5  flex gap-2">
            <button className="shrink-0">
              <div className="py-1 px-2 rounded-sm bg-sky-blue min-w-11 min-h-11 flex justify-center items-center">
                <svg viewBox="0 0 448 512" focusable="false" className="size-5">
                  <path d="M32 464a48 48 0 0048 48h288a48 48 0 0048-48V128H32zm272-256a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zM432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16z"></path>
                </svg>
              </div>
            </button>

            <button className="shrink-0">
              <div className="py-1 px-2 rounded-sm bg-sky-blue min-w-11 min-h-11 flex justify-center items-center">
                <svg
                  data-v-960f624a=""
                  viewBox="0 0 15 13"
                  focusable="false"
                  role="img"
                  data-v-ico="common|random"
                  className="size-5"
                >
                  <path d="m14.78 9.5-2.35-2.32a.68.68 0 0 0-1.17.5V8.8h-.94L8.77 7.18 7.18 8.84l2.09 2.2c.06.07.17.1.26.1h1.73v1.16c0 .64.73.93 1.17.5l2.35-2.33c.3-.26.3-.7 0-.96ZM.35 4.17h2.47l1.52 1.66 1.58-1.66-2.08-2.2a.44.44 0 0 0-.26-.12H.35c-.2 0-.35.17-.35.34v1.63c0 .2.15.35.35.35Zm10.91 0v1.16c0 .64.73.93 1.17.5l2.35-2.33c.3-.26.3-.7 0-.96L12.43.21a.68.68 0 0 0-1.17.5v1.13H9.53c-.09 0-.2.05-.26.11L2.82 8.81H.35c-.2 0-.35.17-.35.35v1.63c0 .2.15.35.35.35h3.23c.12 0 .2-.03.26-.1l6.48-6.88h.94Z"></path>
                </svg>
              </div>
            </button>

            <div className="w-full flex items-center justify-between rounded-md bg-gradient-to-l from-sky-blue-light text-xs pr-3 p-1">
              <div className="flex flex-col text-[11px]">
                <span>انتخاب شده</span>
                <span className="font-medium text-[15px]">12/12</span>
              </div>
              <button className="bg-warm-gold h-full rounded-md px-10">
                <span>به برگه شرط بروید</span>
              </button>
            </div>
          </div>

          {/* {children} */}
        </Providers>
      </body>
    </html>
  );
}
