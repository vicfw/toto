// export default function RemainingTime({isExpired timeLeft}){
//     const formatNumber = (num: number) => String(num).padStart(2, "0");
//     return(
//         <div className="mb-4 xl:mb-6 ">
//         {isExpired ? (
//           <div className="bg-red-500 text-white p-3 xl:p-4 rounded text-center text-sm xl:text-base">
//             <span className="font-semibold">
//               تورنمنت به پایان رسیده است
//             </span>
//           </div>
//         ) : (
//           <div className="bg-cool-gray-dark text-white p-3 xl:p-4 rounded-xl text-center shadow-custom">
//             <div className="text-xs xl:text-sm mb-2 xl:mb-3 ">
//               زمان باقی‌مانده:
//             </div>
//             <div className="flex justify-center items-center gap-1.5 xl:gap-3 text-[10px] xl:text-sm">
//               {timeLeft.days > 0 && (
//                 <>
//                   <div className="bg-deep-blue-light px-1.5 xl:px-3 py-1 xl:py-1.5 rounded text-xs xl:text-base font-semibold">
//                     {formatNumber(timeLeft.days)}
//                   </div>
//                   <span>روز</span>
//                   <span>:</span>
//                 </>
//               )}
//               <div className="bg-deep-blue-light px-1.5 xl:px-3 py-1 xl:py-1.5 rounded text-xs xl:text-base font-semibold">
//                 {formatNumber(timeLeft.hours)}
//               </div>
//               <span>ساعت</span>
//               <span>:</span>
//               <div className="bg-deep-blue-light px-1.5 xl:px-3 py-1 xl:py-1.5 rounded text-xs xl:text-base font-semibold">
//                 {formatNumber(timeLeft.minutes)}
//               </div>
//               <span>دقیقه</span>
//               <span>:</span>
//               <div className="bg-deep-blue-light px-1.5 xl:px-3 py-1 xl:py-1.5 rounded text-xs xl:text-base font-semibold">
//                 {formatNumber(timeLeft.seconds)}
//               </div>
//               <span>ثانیه</span>
//             </div>
//           </div>
//         )}
//       </div>
//     )
// }

import React from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface RemainingTimeProps {
  isExpired: boolean;
  timeLeft: TimeLeft;
}

export default function RemainingTime({
  isExpired,
  timeLeft,
}: RemainingTimeProps) {
  const formatNumber = (num: number): string => String(num).padStart(2, "0");

  return (
    <div className="mb-4 xl:mb-6 text-xs xl:text-sm">
      {isExpired ? (
        <div className="bg-cool-gray-dark text-white p-3 py-4 xl:p-4 rounded-xl text-center shadow-custom  ">
          <span className="font-semibold  ">
            تورنمنت به پایان رسیده است
          </span>
        </div>
      ) : (
        <>
          <div className="bg-cool-gray-dark text-white p-3 py-2 xl:p-4 rounded-xl text-center shadow-custom ">
            <div>
              <div className=" mb-2 xl:mb-3">
                زمان باقی‌مانده:
              </div>
              <div className="flex justify-center items-center gap-1.5  text-[10px] xl:text-sm">
                {timeLeft.days > 0 && (
                  <>
                    <div className="bg-deep-blue-light px-1.5  xl:px-2 pt-1 pb-0.5 xl:py-1.5 rounded text-xs xl:text-base font-semibold">
                      {formatNumber(timeLeft.days)}
                    </div>
                    <span>روز</span>
                    <span>:</span>
                  </>
                )}
                <div className="bg-deep-blue-light px-1.5 xl:px-2 pt-1 pb-0.5 xl:py-1.5 rounded text-xs xl:text-base font-semibold">
                  {formatNumber(timeLeft.hours)}
                </div>
                <span>ساعت</span>
                <span>:</span>
                <div className="bg-deep-blue-light px-1.5 xl:px-2 pt-1 pb-0.5 xl:py-1.5 rounded text-xs xl:text-base font-semibold">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <span>دقیقه</span>
                <span>:</span>
                <div className="bg-deep-blue-light px-1.5 xl:px-2 pt-1 pb-0.5 xl:py-1.5 rounded text-xs xl:text-base font-semibold">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <span>ثانیه</span>
              </div>
            </div>
            <div className=" text-[#8d3b38] flex justify-between mt-2 pt-2 xl:pt-4 border-t-[0.5px] border-white font-semibold">
              <p>شرط پذیرفته میشود تا</p>
              <span>18:05 26/10/2025</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
