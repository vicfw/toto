import Link from "next/link";

export default function DrawCountdown() {
  return (
    <>
      <div className="bg-deep-blue p-2.5 text-white ">
        <div className="bg-deep-blue-light rounded-lg p-3 pt-0  flex flex-col justify-center items-center">
          <div className="bg-deep-blue-light  p-2.5  rounded-full w-max translate-y-1/2 ">
            <svg
              viewBox="0 0 16 16"
              focusable="false"
              role="img"
              className="size-8 fill-cool-gray-dark"
            >
              <path d="M7.19 7.65c0 .29-.22.47-.6.47h-.28v-.9c.05 0 .15-.02.33-.02.34 0 .55.16.55.46v-.01ZM16 8c0 .62-.24 1.2-.68 1.64l-.98.98v1.4a2.32 2.32 0 0 1-2.32 2.32h-1.4l-.98.98a2.31 2.31 0 0 1-3.28 0l-.98-.98h-1.4A2.31 2.31 0 0 1 1.68 12v-1.39l-.98-.98a2.3 2.3 0 0 1 0-3.28l.98-.98v-1.4a2.32 2.32 0 0 1 2.32-2.31h1.4l.97-.98a2.3 2.3 0 0 1 3.28 0l.98.98h1.4a2.31 2.31 0 0 1 2.32 2.32v1.39l.98.98A2.31 2.31 0 0 1 16 8ZM5.02 6.68h-2v3.26h.75V8.63h1.17v-.6H3.77v-.75h1.26v-.6h-.01Zm3.02 3.26c-.06-.13-.16-.56-.26-.92-.09-.3-.21-.52-.44-.61v-.02c.28-.1.57-.38.57-.8 0-.3-.1-.53-.3-.68-.23-.19-.56-.26-1.05-.26-.4 0-.75.03-.98.07v3.22h.72V8.66h.23c.3 0 .44.11.53.52.1.4.17.67.22.76h.76Zm2.5-.6H9.18v-.78h1.2v-.61h-1.2v-.67h1.28v-.6H8.45v3.26h2.09v-.6Zm2.57 0h-1.34v-.78h1.2v-.61h-1.2v-.67h1.27v-.6h-2v3.26h2.07v-.6Z"></path>
            </svg>
          </div>
          <div className="bg-sky-blue-dark rounded-lg flex flex-col gap-y-3 justify-center items-center w-full pt-8 pb-5">
            <p className="font-bold text-sm">شماره قرعه کشی 2829</p>
            <div className="flex text-2xl gap-0.5">
              <div className="flex flex-col items-center gap-0.5">
                <div className="font-semibold  flex gap-0.5">
                  <div className="bg-deep-blue-light px-[0.35rem] rounded-md">
                    <span>2</span>
                  </div>
                  <div className="bg-deep-blue-light px-[0.35rem] rounded-md">
                    <span>8</span>
                  </div>
                </div>
                <span className="text-sm"> ثانیه</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center gap-0.5">
                <div className="font-semibold  flex gap-0.5 ">
                  <div className="bg-deep-blue-light px-[0.35rem] rounded-sm">
                    <span>7</span>
                  </div>
                  <div className="bg-deep-blue-light px-[0.35rem] rounded-sm">
                    <span>8</span>
                  </div>
                </div>
                <span className="text-sm">دقیفه</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center gap-0.5">
                <div className="font-semibold  flex gap-0.5">
                  <div className="bg-deep-blue-light px-[0.35rem] rounded-sm">
                    <span>1</span>
                  </div>
                  <div className="bg-deep-blue-light px-[0.35rem] rounded-sm">
                    <span>6</span>
                  </div>
                </div>
                <span className="text-sm">ساعت</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full text-sm py-2">
            <span> شرط پذیرفته شد</span>
            <span> تا 21:30 25/10/2025</span>
          </div>
          <div className="bg-sky-blue-dark rounded-lg w-full py-2 text-center text-lg">
            <button>فهرست فرم ها</button>
          </div>
          <Link href="/" className="pt-3 underline underline-offset-1">اطلاعات توتو</Link>
        </div>
      </div>
    </>
  );
}
