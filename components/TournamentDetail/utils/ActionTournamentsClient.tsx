// ActionTournamentsClient

"use client";

import Button from "@/components/App/Button";

interface ActionTournamentsClientProps {
  matchesWithSelections: number ;
  totalMatches: number;
  totalSelections: number;
  totalLines: number;
  totalPrice: number;
  balance: string;
  isSubmitting: boolean;
  handleReset: () => void;
  handleRandom: () => void;
  handleSubmitBets: () => void;
  line_coefficient: string;
}
export default function ActionTournamentsClient({
  matchesWithSelections,
  totalMatches,
  totalSelections,
  balance,
  totalLines,
  totalPrice,
  isSubmitting,
  line_coefficient,
  handleReset,
  handleRandom,
  handleSubmitBets,
}: ActionTournamentsClientProps) {


  return (
    <div className=" fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:sticky md:bottom-0 md:left-auto md:right-auto md:border md:border-gray-200 md:rounded-lg md:shadow-sm md:px-4 md:pt-4 md:pb-4 md:z-10 md:mt-6 shadow-custom">
      <div className="px-4 pt-4 pb-2 md:px-0 md:pt-0">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-3">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 md:w-5 md:h-5 text-deep-blue"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm text-gray-600">
                تعداد انتخاب شده
              </span>
              <span className="text-sm md:text-base font-semibold text-gray-900">
                {matchesWithSelections} از {totalMatches} مسابقه
              </span>
            </div>
          </div>
          {/* <div className="text-left">
            <div className="text-xs md:text-sm text-gray-600">
              تعداد گزینه‌های انتخابی
            </div>
            <div className="text-lg md:text-xl font-bold text-deep-blue">
              {totalSelections}
            </div>
          </div> */}

          {/* line_coefficient */}
            <div className="text-left">
              <div className="text-xs md:text-sm text-gray-600">
                ضریب خط
              </div>
              <div className="text-lg md:text-xl font-bold text-deep-blue">
                {line_coefficient}
              </div>
            </div>
            {/* totalLines */}
            <div className="text-left">
              <div className="text-xs md:text-sm text-gray-600">
                تعداد خطوط
              </div>
              <div className="text-lg md:text-xl font-bold text-deep-blue">
                {totalLines}
              </div>
            </div>
            {/* totalPrice */}
            <div className="text-left">
              <div className="text-xs md:text-sm text-gray-600">
                قیمت کل
              </div>
              <div className="text-lg md:text-xl font-bold text-deep-blue">
                {totalPrice.toFixed(2).toLocaleString("fa-IR")} 
                <span className="text-xs text-gray-600">دلار</span>
              </div>
            </div>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3  border border-gray-200 mt-2">
          <span className="text-xs text-gray-600">موجودی فعلی شما:</span>
          <span className=" font-bold text-deep-blue text-xs">
            {balance
              ? `${parseFloat(balance).toLocaleString("fa-IR")} دلار`
              : <span className=""> در حال دریافت...</span>}
          </span>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 md:px-0 md:pb-0 flex gap-2 md:gap-3">
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 text-gray-800 py-2.5 md:py-2.5 text-sm rounded-lg font-semibold hover:bg-gray-300 transition-colors touch-manipulation"
        >
          پاک کردن همه
        </button>
        <button
          onClick={handleRandom}
          className="flex-1 bg-deep-blue text-white py-2.5 md:py-2.5 text-sm rounded-lg font-semibold hover:bg-deep-blue-dark transition-colors touch-manipulation"
        >
          انتخاب تصادفی
        </button>
        <Button
          onClick={handleSubmitBets}
          // disabled={!allSelected}
          loading={isSubmitting}
          text="ثبت برگزاری"
        />
      </div>
    </div>
  );
}