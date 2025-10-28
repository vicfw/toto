"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tournament, Match } from "@/src/lib/getTournamentById";
import { postUserBet } from "@/src/lib/postBet";
import { showToast } from "@/src/providers/ToastProvider";
import RemainingTime from "../RemainingTime";
import { getUserBalance } from "@/src/lib/getBalance";
import PrizeCard from "./utils/PrizeCard";

interface TournamentDetailDesktopProps {
  tournament: Tournament;
  matches: Match[];
}

export default function TournamentDetailDesktop({
  tournament,
  matches,
}: TournamentDetailDesktopProps) {
  const router = useRouter();
  const [selectedBets, setSelectedBets] = useState<{
    [matchId: number]: ("1" | "X" | "2")[];
  }>({});
  const [totalLines, setTotalLines] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (!tournament?.line_coefficient) return;

    const lines = Object.values(selectedBets).reduce((acc, bets) => {
      if (bets.length > 0) {
        return acc * bets.length;
      }
      return acc;
    }, 1);

    const price = lines * parseFloat(tournament.line_coefficient);

    setTotalLines(lines);
    setTotalPrice(price);
  }, [selectedBets, tournament?.line_coefficient]);

  // Load bets from localStorage on mount
  useEffect(() => {
    const savedBets = localStorage.getItem("selectedBets");
    if (savedBets) {
      try {
        setSelectedBets(JSON.parse(savedBets));
      } catch (e) {
        console.error("Failed to parse saved bets", e);
      }
    }
  }, []);

  // Save bets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("selectedBets", JSON.stringify(selectedBets));
  }, [selectedBets]);

  const handleBetSelect = (matchId: number, bet: "1" | "X" | "2") => {
    setSelectedBets((prev) => {
      const currentBets = prev[matchId] || [];
      const isSelected = currentBets.includes(bet);

      if (isSelected) {
        return {
          ...prev,
          [matchId]: currentBets.filter((b) => b !== bet),
        };
      } else {
        return {
          ...prev,
          [matchId]: [...currentBets, bet],
        };
      }
    });
  };

  const handleReset = () => setSelectedBets({});

  const handleRandom = () => {
    const newBets: typeof selectedBets = {};
    matches.forEach((match) => {
      const options: ("1" | "X" | "2")[] = ["1", "X", "2"];
      const numSelections = Math.floor(Math.random() * 3) + 1;
      const shuffled = options.sort(() => Math.random() - 0.5);
      newBets[match.id] = shuffled.slice(0, numSelections);
    });
    setSelectedBets(newBets);
  };

  const allSelected = matches.every(
    (match) => selectedBets[match.id] && selectedBets[match.id].length > 0
  );

  // Calculate selection stats
  const matchesWithSelections = matches.filter(
    (match) => selectedBets[match.id] && selectedBets[match.id].length > 0
  ).length;
  const totalMatches = matches.length;
  const totalSelections = Object.values(selectedBets).reduce(
    (total, bets) => total + (bets?.length || 0),
    0
  );

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

  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} (${hours}:${minutes})`;
  }

  const flagImages = [
    "https://flagcdn.com/w20/ir.png",
    "https://flagcdn.com/w20/br.png",
    "https://flagcdn.com/w20/ar.png",
    "https://flagcdn.com/w20/de.png",
    "https://flagcdn.com/w20/fr.png",
    "https://flagcdn.com/w20/es.png",
    "https://flagcdn.com/w20/it.png",
  ];

  const getTeamFlag = (teamName: string): string => {
    let hash = 0;
    for (let i = 0; i < teamName.length; i++) {
      const char = teamName.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return flagImages[Math.abs(hash) % flagImages.length];
  };
  /////////////////////////////////////  handleSubmitBets
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitBets = async () => {
    if (Object.keys(selectedBets).length === 0) {
      showToast("لطفا یک شرط را انتخاب کنید ", "warning");
      return;
    }
    setIsSubmitting(true);

    const payload = {
      tournament_id: tournament.id,
      predictions: Object.entries(selectedBets).map(([matchId, bets]) => ({
        match_id: Number(matchId),
        selections: bets.map((b) =>
          b === "1" ? "home" : b === "X" ? "draw" : "away"
        ),
      })),
    };

    try {
      const res = await postUserBet(payload);
      console.log("Bet submitted successfully:", res);
      showToast("پیش‌بینی شما با موفقیت ثبت شد 🎉", "success");
      localStorage.removeItem("selectedBets");
      setSelectedBets({});
      await fetchBalance();
    } catch (error: any) {
      showToast(error?.response?.data?.message, "error");

      console.error("Error submitting bet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // 0
  ///////////////////////////////////
  const [balance, setBalance] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      const res = await getUserBalance();
      setBalance(res.balance);
    } catch (error) {
      console.error("خطا در دریافت موجودی:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) fetchBalance();

    const interval = setInterval(fetchBalance, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-deep-blue-light from-20% to-cool-gray">
      <div className="w-full px-6 pt-8 bg-deep-blue-light">
        {/* Back Button and Tournament Info */}
        <div className="mt-2 sm:mt-4  flex items-center justify-between gap-2">
          {/* Tournament Quick Info */}
          <div className="flex items-center justify-between bg-white w-full rounded-lg px-3 md:px-4 py-2 md:py-2.5 shadow-sm">
            <div className="flex items-center gap-3 md:gap-3 text-[11px] text-center">
              <div className="flex flex-col">
                <span className=" text-gray-500">موجودی فعلی شما</span>
                <span className="text-xs md:text-sm font-semibold text-gray-900">
                  {balance
                    ? `${parseFloat(balance).toLocaleString("fa-IR")} دلار`
                    : "در حال دریافت..."}
                </span>
              </div>

              <div className="w-px h-6 md:h-8 bg-gray-300"></div>
              <div className="flex flex-col">
                <span className=" text-gray-500">تعداد شرکت کنندگان</span>
                <span className="text-xs md:text-base font-semibold text-gray-900">
                  15000
                </span>
              </div>
            </div>

            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 md:gap-2 text-white hover:text-gray-900 transition-colors bg-ocean-blue rounded-lg px-2 md:px-4 py-2 md:py-2.5 shadow-sm hover:shadow-md touch-manipulation"
            >
              {/* <span className="text-sm md:text-base font-medium">بازگشت</span> */}
              <svg
                className="w-6 h-6 md:w-6 md:h-6 "
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full px-6 pt-1">
        <div className="flex items-center justify-evenly bg-white w-full rounded-lg px-3 md:px-4 py-2 md:py-2.5 shadow-sm mb-5">
          <PrizeCard
            position={1}
            amount={tournament.prizes.first.amount}
            label={tournament.prizes.first.label}
          />
          <PrizeCard
            position={2}
            amount={tournament.prizes.second.amount}
            label={tournament.prizes.second.label}
          />
          <PrizeCard
            position={3}
            amount={tournament.prizes.third.amount}
            label={tournament.prizes.third.label}
          />
        </div>
      </div>

      <div className="w-full px-6 pb-8">
        <div className="flex flex-row gap-6">
          {/* Left Side - Timer and Submit Section */}
          <div className="w-[360px] shrink-0 space-y-6 order-2">
            {/* Timer Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <svg viewBox="0 0 32 32" className="size-8 text-deep-blue">
                  <path d="M16 0a16 16 0 100 32 16 16 0 000-32zm1 5l5-3 2 1 2 2 1 1 1 1v1l-1 4-5 2-5-4zM4 7l1-1 1-1 2-2 2-1 5 3v5l-5 4-5-2-1-4V7zm0 17l-1-1-1-2v-1l-1-1v-2l3-4 6 2 1 7-2 3zm16 7h-2-1a14 14 0 01-2 0h-1-1l-3-5 2-4h8l2 4zm11-12l-1 1v1l-1 2-1 1-5 1-2-3 1-7 6-2 3 4v2z"></path>
                </svg>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1">
                  {tournament.title}
                  <img
                    src={getTeamFlag(
                      matches[1]?.home_team || matches[0]?.home_team
                    )}
                    alt={`${matches[0]?.home_team} flag`}
                    className="w-7 h-6 object-cover rounded-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </h1>
              </div>
              <RemainingTime isExpired={isExpired} timeLeft={timeLeft} />
            </div>

            {/* Submit Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sticky top-6">
              <div className="flex items-center justify-between w-full text-sm text-center text-nowrap pb-4 border-b border-gray-200">
                <div className="text-left flex flex-col items-center gap-1">
                  <span className="text-gray-600">تعداد انتخاب شده</span>
                  <span className="font-semibold text-gray-900">
                    {matchesWithSelections} از {totalMatches} مسابقه
                  </span>
                </div>

                <div className="text-left flex flex-col items-center gap-1">
                  <span className="text-gray-600">ضریب خط</span>
                  <span className="font-bold text-deep-blue">
                    {tournament.line_coefficient}
                  </span>
                </div>

                <div className="text-left flex flex-col items-center gap-1">
                  <span className="text-gray-600">تعداد خطوط</span>
                  <span className="font-bold text-deep-blue">{totalLines}</span>
                </div>

                <div className="text-left flex flex-col items-center gap-1">
                  <span className="text-gray-600">قیمت کل</span>
                  <span className="font-bold text-deep-blue">
                    {totalPrice.toLocaleString("fa-IR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <span className="text-xs text-gray-600"> دلار</span>
                  </span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 text-gray-800 py-2.5 text-sm rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  پاک کردن همه
                </button>
                <button
                  onClick={handleRandom}
                  className="flex-1 bg-deep-blue text-white py-2.5 text-sm rounded-lg font-semibold hover:bg-deep-blue-dark transition-colors"
                >
                  انتخاب تصادفی
                </button>
              </div>

              <div className="mt-3">
                <button
                  onClick={handleSubmitBets}
                  disabled={isSubmitting}
                  className="w-full bg-ocean-blue text-white py-3 text-base rounded-lg font-semibold hover:bg-ocean-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "در حال ثبت..." : "ثبت برگزاری"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Matches in Flex Row */}
          <div className="flex-1 min-w-0 order-1">
            <div className="flex flex-wrap gap-2">
              {matches.map((match, index) => (
                <div
                  key={match.id}
                  className="bg-white p-2 rounded-lg shadow-sm shrink-0 w-full"
                >
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-2 w-full justify-between">
                      <div className="flex items-center gap-2">
                        <div className="aspect-square h-6 md:h-8 w-6 md:w-8 rounded-full bg-[#061e31] text-white shrink-0 flex items-center justify-center ml-2 md:ml-3 font-semibold">
                          <span className="text-sm md:text-base pt-[3px]">
                            {index + 1}
                          </span>
                        </div>
                        <ul className="font-semibold flex items-center gap-2 md:gap-3 text-sm md:text-base">
                          <li className="flex items-center gap-2 md:gap-3">
                            <img
                              src={getTeamFlag(match.home_team)}
                              alt={`${match.home_team} flag`}
                              className="w-6 h-5 md:w-7 md:h-6 object-cover rounded-sm"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            {match.home_team} {"  -  "}
                          </li>
                          <li className=" flex items-center gap-2 md:gap-3">
                            {match.away_team}
                            <img
                              src={getTeamFlag(match.away_team)}
                              alt={`${match.away_team} flag`}
                              className="w-6 h-5 md:w-7 md:h-6 object-cover rounded-sm"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </li>
                        </ul>
                        <div className="flex items-center gap-2">
                          <span className="text-sm md:text-sm text-[#808080]">
                            {formatDateTime(match.start_time)}
                          </span>
                          <div className="flex gap-1 ">
                            <span className="text-[8px]">
                              {match.league.country}
                            </span>
                            <span className="text-[8px]">
                              ({match.league.name})
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* statics and buttons section */}
                      <div className="flex items-center gap-3 justify-between">
                        <ul className="grid grid-cols-3 text-sm md:text-base gap-2 md:gap-3">
                          {(["1", "X", "2"] as const).map((betOption) => (
                            <li key={betOption}>
                              <button
                                onClick={() =>
                                  handleBetSelect(match.id, betOption)
                                }
                                className={` w-full  md:px-2 lg:px-4 py-[2px] rounded-lg cursor-pointer transition-all duration-200 text-center    ${
                                  selectedBets[match.id]?.includes(betOption)
                                    ? "bg-deep-blue text-white shadow-md border border-transparent"
                                    : "bg-gray-50 text-deep-blue border border-gray-300 hover:border-deep-blue hover:bg-gray-50"
                                }`}
                              >
                                <span className="block font-semibold text-xs md:text-base opacity-80">
                                  {betOption}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>

                        <button className="mr-auto">
                          <span className="fill-deep-blue">
                            <svg
                              viewBox="0 0 16 16"
                              focusable="false"
                              role="img"
                              className="size-5 "
                            >
                              <path d="M10.4 10.03h1.2c.2 0 .4-.21.4-.42V5.13c0-.22-.2-.43-.4-.43h-1.2c-.2 0-.4.21-.4.43V9.6c0 .21.2.42.4.42Zm3 0h1.2c.2 0 .4-.21.4-.42V1.93c0-.22-.2-.43-.4-.43h-1.2c-.2 0-.4.21-.4.43V9.6c0 .21.2.42.4.42Zm-9 0h1.2c.2 0 .4-.21.4-.42V7.26c0-.21-.2-.43-.4-.43H4.4c-.2 0-.4.22-.4.43v2.35c0 .21.2.42.4.42Zm3 0h1.2c.2 0 .4-.21.4-.42V2.99c0-.21-.2-.42-.4-.42H7.4c-.2 0-.4.21-.4.42v6.62c0 .21.2.42.4.42Zm8.1 2.14H2V2.03c0-.3-.22-.53-.5-.53h-1c-.28 0-.5.24-.5.53v11.2c0 .6.45 1.07 1 1.07h14.5c.28 0 .5-.24.5-.53V12.7c0-.3-.22-.53-.5-.53Z"></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
