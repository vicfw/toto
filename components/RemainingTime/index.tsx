// export default function RemainingTime({isExpired timeLeft}){
//     const formatNumber = (num: number) => String(num).padStart(2, "0");
//     return(
//         <div className="mb-4 md:mb-6 ">
//         {isExpired ? (
//           <div className="bg-red-500 text-white p-3 md:p-4 rounded text-center text-sm md:text-base">
//             <span className="font-semibold">
//               تورنمنت به پایان رسیده است
//             </span>
//           </div>
//         ) : (
//           <div className="bg-cool-gray-dark text-white p-3 md:p-4 rounded-lg text-center shadow-custom">
//             <div className="text-xs md:text-sm mb-2 md:mb-3 ">
//               زمان باقی‌مانده:
//             </div>
//             <div className="flex justify-center items-center gap-1.5 md:gap-3 text-[10px] md:text-sm">
//               {timeLeft.days > 0 && (
//                 <>
//                   <div className="bg-deep-blue-light px-1.5 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-base font-semibold">
//                     {formatNumber(timeLeft.days)}
//                   </div>
//                   <span>روز</span>
//                   <span>:</span>
//                 </>
//               )}
//               <div className="bg-deep-blue-light px-1.5 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-base font-semibold">
//                 {formatNumber(timeLeft.hours)}
//               </div>
//               <span>ساعت</span>
//               <span>:</span>
//               <div className="bg-deep-blue-light px-1.5 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-base font-semibold">
//                 {formatNumber(timeLeft.minutes)}
//               </div>
//               <span>دقیقه</span>
//               <span>:</span>
//               <div className="bg-deep-blue-light px-1.5 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-base font-semibold">
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
    <div className="mb-4 md:mb-6">
      {isExpired ? (
        <div className="bg-cool-gray-dark text-white p-3 py-4 md:p-4 rounded-lg text-center shadow-custom ">
          <span className="font-semibold text-xs ">
            تورنمنت به پایان رسیده است
          </span>
        </div>
      ) : (
        <>
          <div className="bg-cool-gray-dark text-white p-3 py-2 md:p-4 rounded-lg text-center shadow-custom ">
            <div>
              <div className="text-xs md:text-sm mb-2 md:mb-3">
                زمان باقی‌مانده:
              </div>
              <div className="flex justify-center items-center gap-1.5 md:gap-3 text-[10px] md:text-sm">
                {timeLeft.days > 0 && (
                  <>
                    <div className="bg-deep-blue-light px-1.5 md:px-3 pt-1 pb-0.5 md:py-1.5 rounded text-xs md:text-base font-semibold">
                      {formatNumber(timeLeft.days)}
                    </div>
                    <span>روز</span>
                    <span>:</span>
                  </>
                )}
                <div className="bg-deep-blue-light px-1.5 md:px-3 pt-1 pb-0.5 md:py-1.5 rounded text-xs md:text-base font-semibold">
                  {formatNumber(timeLeft.hours)}
                </div>
                <span>ساعت</span>
                <span>:</span>
                <div className="bg-deep-blue-light px-1.5 md:px-3 pt-1 pb-0.5 md:py-1.5 rounded text-xs md:text-base font-semibold">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <span>دقیقه</span>
                <span>:</span>
                <div className="bg-deep-blue-light px-1.5 md:px-3 pt-1 pb-0.5 md:py-1.5 rounded text-xs md:text-base font-semibold">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <span>ثانیه</span>
              </div>
            </div>
            <div className="text-[10px] text-[#8d3b38] flex justify-between mt-2 pt-2 border-t-[0.5px] border-white font-semibold">
              <p>شرط پذیرفته میشود تا</p>
              <span>18:05 26/10/2025</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
