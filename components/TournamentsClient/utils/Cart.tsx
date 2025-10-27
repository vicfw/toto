import { useState, useEffect } from "react";
import { Tournament, Match } from "@/src/lib/getTournamentById";

// Flag images mapping
const flagImages = [
  "https://flagcdn.com/w20/ir.png", // Iran
  "https://flagcdn.com/w20/br.png", // Brazil
  "https://flagcdn.com/w20/ar.png", // Argentina
  "https://flagcdn.com/w20/de.png", // Germany
  "https://flagcdn.com/w20/fr.png", // France
  "https://flagcdn.com/w20/es.png", // Spain
  "https://flagcdn.com/w20/it.png", // Italy
  "https://flagcdn.com/w20/nl.png", // Netherlands
  "https://flagcdn.com/w20/pt.png", // Portugal
  "https://flagcdn.com/w20/be.png", // Belgium
  "https://flagcdn.com/w20/gb.png", // United Kingdom
  "https://flagcdn.com/w20/us.png", // United States
  "https://flagcdn.com/w20/ca.png", // Canada
  "https://flagcdn.com/w20/mx.png", // Mexico
  "https://flagcdn.com/w20/jp.png", // Japan
  "https://flagcdn.com/w20/kr.png", // South Korea
  "https://flagcdn.com/w20/cn.png", // China
  "https://flagcdn.com/w20/au.png", // Australia
  "https://flagcdn.com/w20/nz.png", // New Zealand
  "https://flagcdn.com/w20/za.png", // South Africa
  "https://flagcdn.com/w20/ng.png", // Nigeria
  "https://flagcdn.com/w20/eg.png", // Egypt
  "https://flagcdn.com/w20/ma.png", // Morocco
  "https://flagcdn.com/w20/tn.png", // Tunisia
  "https://flagcdn.com/w20/dz.png", // Algeria
  "https://flagcdn.com/w20/sa.png", // Saudi Arabia
  "https://flagcdn.com/w20/ae.png", // UAE
  "https://flagcdn.com/w20/qa.png", // Qatar
  "https://flagcdn.com/w20/kw.png", // Kuwait
  "https://flagcdn.com/w20/bh.png", // Bahrain
  "https://flagcdn.com/w20/om.png", // Oman
  "https://flagcdn.com/w20/ye.png", // Yemen
  "https://flagcdn.com/w20/iq.png", // Iraq
  "https://flagcdn.com/w20/sy.png", // Syria
  "https://flagcdn.com/w20/lb.png", // Lebanon
  "https://flagcdn.com/w20/jo.png", // Jordan
  "https://flagcdn.com/w20/ps.png", // Palestine
  "https://flagcdn.com/w20/il.png", // Israel
  "https://flagcdn.com/w20/tr.png", // Turkey
  "https://flagcdn.com/w20/gr.png", // Greece
  "https://flagcdn.com/w20/ru.png", // Russia
  "https://flagcdn.com/w20/ua.png", // Ukraine
  "https://flagcdn.com/w20/pl.png", // Poland
  "https://flagcdn.com/w20/cz.png", // Czech Republic
  "https://flagcdn.com/w20/sk.png", // Slovakia
  "https://flagcdn.com/w20/hu.png", // Hungary
  "https://flagcdn.com/w20/ro.png", // Romania
  "https://flagcdn.com/w20/bg.png", // Bulgaria
  "https://flagcdn.com/w20/hr.png", // Croatia
  "https://flagcdn.com/w20/rs.png", // Serbia
  "https://flagcdn.com/w20/ba.png", // Bosnia
  "https://flagcdn.com/w20/mk.png", // North Macedonia
  "https://flagcdn.com/w20/al.png", // Albania
  "https://flagcdn.com/w20/me.png", // Montenegro
  "https://flagcdn.com/w20/si.png", // Slovenia
  "https://flagcdn.com/w20/at.png", // Austria
  "https://flagcdn.com/w20/ch.png", // Switzerland
  "https://flagcdn.com/w20/li.png", // Liechtenstein
  "https://flagcdn.com/w20/lu.png", // Luxembourg
  "https://flagcdn.com/w20/ie.png", // Ireland
  "https://flagcdn.com/w20/is.png", // Iceland
  "https://flagcdn.com/w20/no.png", // Norway
  "https://flagcdn.com/w20/se.png", // Sweden
  "https://flagcdn.com/w20/fi.png", // Finland
  "https://flagcdn.com/w20/dk.png", // Denmark
  "https://flagcdn.com/w20/ee.png", // Estonia
  "https://flagcdn.com/w20/lv.png", // Latvia
  "https://flagcdn.com/w20/lt.png", // Lithuania
  "https://flagcdn.com/w20/mt.png", // Malta
  "https://flagcdn.com/w20/cy.png", // Cyprus
];

// Function to get a flag image for a team name
const getTeamFlag = (teamName: string): string => {
  // Create a simple hash from team name to get consistent flag assignment
  let hash = 0;
  for (let i = 0; i < teamName.length; i++) {
    const char = teamName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return flagImages[Math.abs(hash) % flagImages.length];
};

interface CartProps {
  tournament: Tournament;
  matches: Match[];
  selectedBets: { [matchId: number]: ("1" | "X" | "2")[] };
  onSelectBet: (matchId: number, bet: "1" | "X" | "2") => void;
}

export default function Cart({
  tournament,
  matches,
  selectedBets,
  onSelectBet,
}: CartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

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
  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} (${hours}:${minutes})`;
  }
  return (
    <div>
      <li className="bg-white rounded-lg">
        <div className="flex flex-col">
          {/* Countdown above title */}
          <div className="px-3 pt-2 pb-1">
            {isExpired ? (
              <div className="bg-red-500 text-white p-2 rounded text-center text-sm">
                <span className="font-semibold">
                  تورنمنت به پایان رسیده است
                </span>
              </div>
            ) : (
              <div className="bg-deep-blue text-white p-2 rounded text-center">
                <div className="text-xs mb-1">زمان باقی‌مانده:</div>
                <div className="flex justify-center items-center gap-1 text-sm">
                  {timeLeft.days > 0 && (
                    <>
                      <div className="bg-deep-blue-light px-1 py-0.5 rounded text-xs font-semibold">
                        {formatNumber(timeLeft.days)}
                      </div>
                      <span className="text-xs">روز</span>
                      <span className="text-xs">:</span>
                    </>
                  )}
                  <div className="bg-deep-blue-light px-1 py-0.5 rounded text-xs font-semibold">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <span className="text-xs">ساعت</span>
                  <span className="text-xs">:</span>
                  <div className="bg-deep-blue-light px-1 py-0.5 rounded text-xs font-semibold">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <span className="text-xs">دقیقه</span>
                  <span className="text-xs">:</span>
                  <div className="bg-deep-blue-light px-1 py-0.5 rounded text-xs font-semibold">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <span className="text-xs">ثانیه</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleOpen}
            className="flex items-center justify-between w-full pr-3 transition-transform duration-300"
          >
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
              <span className="pr-3 text-base font-medium">
                {tournament?.title}
              </span>
            </div>
            <span
              className={`px-2 min-w-12 min-h-12 flex justify-center items-center transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                viewBox="0 0 32 19"
                focusable="false"
                role="img"
                data-v-ico="common|angle"
                className="size-3"
              >
                <path d="M15.2 18.6.4 4c-.5-.5-.5-1.1 0-1.6l1.9-2c.5-.5 1.3-.5 1.7 0l12 11.8L28 .4c.4-.5 1.2-.5 1.7 0l2 2c.4.5.4 1 0 1.6L17 18.6c-.5.5-1.3.5-1.7 0Z"></path>
              </svg>
            </span>
          </button>

          {/* Prizes Section */}
          {tournament?.prizes && (
            <div className="px-3 pb-2">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-3">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-deep-blue">
                    <path
                      fill="currentColor"
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-deep-blue">
                    جوایز تورنمنت
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-white rounded-lg p-2 text-center border border-gray-200 shadow-sm">
                    <div className="text-deep-blue font-bold text-xs mb-1">
                      اول
                    </div>
                    <div className="font-semibold text-gray-900 text-xs">
                      {parseFloat(
                        tournament.prizes.first.amount
                      ).toLocaleString("fa-IR")}{" "}
                      دلار
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {tournament.prizes.first.label}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center border border-gray-200 shadow-sm">
                    <div className="text-deep-blue font-bold text-xs mb-1">
                      دوم
                    </div>
                    <div className="font-semibold text-gray-900 text-xs">
                      {parseFloat(
                        tournament.prizes.second.amount
                      ).toLocaleString("fa-IR")}{" "}
                      دلار
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {tournament.prizes.second.label}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center border border-gray-200 shadow-sm">
                    <div className="text-deep-blue font-bold text-xs mb-1">
                      سوم
                    </div>
                    <div className="font-semibold text-gray-900 text-xs">
                      {parseFloat(
                        tournament.prizes.third.amount
                      ).toLocaleString("fa-IR")}{" "}
                      دلار
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {tournament.prizes.third.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`overflow-hidden transition-all duration-500 ${
              isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="p-2 space-y-1.5">
              {matches?.map((match, index) => (
                <li key={match.id} className="p-2 rounded-lg shadow-custom">
                  <div className="space-y-2.5">
                    <div className="flex items-center w-full">
                      <div className="aspect-square h-4 rounded-full bg-sky-blue-light shrink-0 flex items-center justify-center ml-1 font-semibold">
                        <span className="text-xs"> {index + 1} </span>
                      </div>
                      <span className="text-sm text-[#808080]">
                        {formatDateTime(match.start_time)}
                      </span>
                      {/* <button className="mr-auto">
                        <span
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
                      </button> */}
                    </div>
                    <ul className="font-bold text-sm space-y-0.5">
                      <li className="ml-2 flex items-center gap-2">
                        <img
                          src={getTeamFlag(match.home_team)}
                          alt={`${match.home_team} flag`}
                          className="w-5 h-4 object-cover rounded-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        {match.home_team}
                      </li>
                      <li className="ml-2 flex items-center gap-2">
                        <img
                          src={getTeamFlag(match.away_team)}
                          alt={`${match.away_team} flag`}
                          className="w-5 h-4 object-cover rounded-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        {match.away_team}
                      </li>
                    </ul>

                    <ul className="grid grid-cols-3 text-[13px] gap-1.5">
                      {(["1", "X", "2"] as const).map((betOption) => (
                        <li key={betOption}>
                          <button
                            onClick={() => onSelectBet(match.id, betOption)}
                            className={`w-full px-2 py-0.5 rounded-lg cursor-pointer transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-deep-blue focus:ring-opacity-50 ${
                              selectedBets[match.id]?.includes(betOption)
                                ? "bg-deep-blue text-white shadow-md border border-transparent"
                                : "bg-white text-deep-blue border border-gray-300 hover:border-deep-blue hover:bg-gray-50"
                            }`}
                          >
                            <span className="block font-semibold">
                              {betOption}
                            </span>
                            <span className="block text-xs opacity-75">
                              65%
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    </div>
  );
}
