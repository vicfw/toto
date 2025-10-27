"use client";

import { useState, useEffect } from "react";
import { Tournament } from "@/src/lib/getTournamentById";
import Link from "next/link";
import RemainingTime from "@/components/RemainingTime";

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
    <li>
      <div className="flex flex-col bg-white rounded-xl p-3 xl:p-5 shadow-sm">
        {/* Countdown */}
        <RemainingTime isExpired={isExpired} timeLeft={timeLeft} />

        {/* Title and Icon */}
        <div className=" py-3">
          <div className="flex items-center">
            <svg
              viewBox="0 0 32 32"
              focusable="false"
              role="img"
              className="size-5 xl:size-6 xl:size-7 text-deep-blue"
            >
              <path d="M16 0a16 16 0 100 32 16 16 0 000-32zm1 5l5-3 2 1 2 2 1 1 1 1v1l-1 4-5 2-5-4zM4 7l1-1 1-1 2-2 2-1 5 3v5l-5 4-5-2-1-4V7zm0 17l-1-1-1-2v-1l-1-1v-2l3-4 6 2 1 7-2 3zm16 7h-2-1a14 14 0 01-2 0h-1-1l-3-5 2-4h8l2 4zm11-12l-1 1v1l-1 2-1 1-5 1-2-3 1-7 6-2 3 4v2z"></path>
            </svg>
            <span className="pr-2 xl:pr-3 text-base xl:text-xl xl:text-xl font-medium text-gray-900">
              {tournament.title}
            </span>
          </div>
          
        </div>

        {/* Prizes Section */}
        {tournament.prizes && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 ">
              <div className="flex items-center gap-2 xl:gap-3 mb-3 xl:mb-4">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 xl:w-5 xl:h-5 text-warm-gold-light"
                >
                  <path
                    fill="currentColor"
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                <span className="text-sm xl:text-base font-semibold text-deep-blue">
                  جوایز تورنمنت
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2  text-[10px]">
                <div className="bg-white rounded-xl p-2 xl:p-3 text-center border border-gray-200 shadow-sm">
                  <div className="text-deep-blue font-bold  xl:text-sm mb-1 xl:mb-2">
                    اول
                  </div>
                  <div className="font-semibold text-gray-900 flex flex-col sm:flex-row justify-center">
                    {parseFloat(tournament.prizes.first.amount).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    دلار
                  </div>
                  <div className="text-gray-500  xl:text-sm mt-1 hidden xl:block">
                    {tournament.prizes.first.label}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-2 xl:p-3 text-center border border-gray-200 shadow-sm">
                  <div className="text-deep-blue font-bold  xl:text-sm mb-1 xl:mb-2">
                    دوم
                  </div>
                  <div className="font-semibold text-gray-900 flex flex-col sm:flex-row justify-center">
                    {parseFloat(tournament.prizes.second.amount).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    دلار
                  </div>
                  <div className="text-gray-500  xl:text-sm mt-1 hidden xl:block">
                    {tournament.prizes.second.label}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-2 xl:p-3 text-center border border-gray-200 shadow-sm">
                  <div className="text-deep-blue font-bold  xl:text-sm mb-1 xl:mb-2">
                    سوم
                  </div>
                  <div className="font-semibold text-gray-900 flex flex-col sm:flex-row justify-center">
                    {parseFloat(tournament.prizes.third.amount).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    دلار
                  </div>
                  <div className="text-gray-500 text-xs xl:text-sm mt-1 hidden xl:block">
                    {tournament.prizes.third.label}
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* Button */}
          <Link href={`/tournament/${tournament.id}`} className="block w-full mt-3">
            <button className="w-full bg-deep-blue text-white py-2.5 xl:py-3 text-sm xl:text-base rounded-xl font-semibold hover:bg-deep-blue-dark transition-colors touch-manipulation">
              مشاهده مسابقات
            </button>
          </Link>
      </div>
    </li>
  );
}
