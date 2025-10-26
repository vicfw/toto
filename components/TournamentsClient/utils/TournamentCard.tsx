"use client";

import { useState, useEffect } from "react";
import { Tournament } from "@/src/lib/getTournamentById";
import Link from "next/link";

interface TournamentCardProps {
  tournament: Tournament;
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const targetDate = new Date(tournament.end_date);
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsExpired(false);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [tournament.end_date]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <li className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        {/* Countdown */}
        <div className="px-3 md:px-4 lg:px-5 pt-3 md:pt-4 pb-2">
          {isExpired ? (
            <div className="bg-red-500 text-white p-2 md:p-3 rounded text-center text-sm md:text-base">
              <span className="font-semibold">تورنمنت به پایان رسیده است</span>
            </div>
          ) : (
            <div className="bg-deep-blue text-white p-2 md:p-3 rounded-lg text-center">
              <div className="text-xs md:text-sm mb-1">زمان باقی‌مانده:</div>
              <div className="flex justify-center items-center gap-1 md:gap-1.5 text-xs md:text-sm">
                {timeLeft.days > 0 && (
                  <>
                    <div className="bg-deep-blue-light px-1 md:px-1.5 py-0.5 rounded text-xs md:text-sm font-semibold">
                      {formatNumber(timeLeft.days)}
                    </div>
                    <span className="text-xs">روز</span>
                    <span className="text-xs">:</span>
                  </>
                )}
                <div className="bg-deep-blue-light px-1 md:px-1.5 py-0.5 rounded text-xs md:text-sm font-semibold">
                  {formatNumber(timeLeft.hours)}
                </div>
                <span className="text-xs">ساعت</span>
                <span className="text-xs">:</span>
                <div className="bg-deep-blue-light px-1 md:px-1.5 py-0.5 rounded text-xs md:text-sm font-semibold">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <span className="text-xs">دقیقه</span>
                <span className="text-xs">:</span>
                <div className="bg-deep-blue-light px-1 md:px-1.5 py-0.5 rounded text-xs md:text-sm font-semibold">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <span className="text-xs">ثانیه</span>
              </div>
            </div>
          )}
        </div>

        {/* Title and Icon */}
        <div className="px-3 md:px-4 lg:px-5 py-3">
          <div className="flex items-center">
            <svg
              viewBox="0 0 32 32"
              focusable="false"
              role="img"
              className="size-5 md:size-6 lg:size-7 text-deep-blue"
            >
              <path d="M16 0a16 16 0 100 32 16 16 0 000-32zm1 5l5-3 2 1 2 2 1 1 1 1v1l-1 4-5 2-5-4zM4 7l1-1 1-1 2-2 2-1 5 3v5l-5 4-5-2-1-4V7zm0 17l-1-1-1-2v-1l-1-1v-2l3-4 6 2 1 7-2 3zm16 7h-2-1a14 14 0 01-2 0h-1-1l-3-5 2-4h8l2 4zm11-12l-1 1v1l-1 2-1 1-5 1-2-3 1-7 6-2 3 4v2z"></path>
            </svg>
            <span className="pr-2 md:pr-3 text-base md:text-lg lg:text-xl font-medium text-gray-900">
              {tournament.title}
            </span>
          </div>
        </div>

        {/* Prizes Section */}
        {tournament.prizes && (
          <div className="px-3 md:px-4 lg:px-5 pb-4 flex-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 md:w-5 md:h-5 text-deep-blue"
                >
                  <path
                    fill="currentColor"
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                <span className="text-sm md:text-base font-semibold text-deep-blue">
                  جوایز تورنمنت
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="bg-white rounded-lg p-2 md:p-3 text-center border border-gray-200 shadow-sm">
                  <div className="text-deep-blue font-bold text-xs md:text-sm mb-1 md:mb-2">
                    اول
                  </div>
                  <div className="font-semibold text-gray-900 text-xs md:text-sm">
                    {parseFloat(tournament.prizes.first.amount).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    ریال
                  </div>
                  <div className="text-gray-500 text-xs md:text-sm mt-1 hidden md:block">
                    {tournament.prizes.first.label}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 md:p-3 text-center border border-gray-200 shadow-sm">
                  <div className="text-deep-blue font-bold text-xs md:text-sm mb-1 md:mb-2">
                    دوم
                  </div>
                  <div className="font-semibold text-gray-900 text-xs md:text-sm">
                    {parseFloat(tournament.prizes.second.amount).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    ریال
                  </div>
                  <div className="text-gray-500 text-xs md:text-sm mt-1 hidden md:block">
                    {tournament.prizes.second.label}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 md:p-3 text-center border border-gray-200 shadow-sm">
                  <div className="text-deep-blue font-bold text-xs md:text-sm mb-1 md:mb-2">
                    سوم
                  </div>
                  <div className="font-semibold text-gray-900 text-xs md:text-sm">
                    {parseFloat(tournament.prizes.third.amount).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    ریال
                  </div>
                  <div className="text-gray-500 text-xs md:text-sm mt-1 hidden md:block">
                    {tournament.prizes.third.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Button */}
        <div className="px-3 md:px-4 lg:px-5 pb-4 md:pb-5 pt-3">
          <Link href={`/tournament/${tournament.id}`} className="block w-full">
            <button className="w-full bg-deep-blue text-white py-2.5 md:py-3 text-sm md:text-base rounded-lg font-semibold hover:bg-deep-blue-dark transition-colors touch-manipulation">
              مشاهده مسابقات
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
}
