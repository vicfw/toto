"use client";

import { useState, useEffect } from "react";
import { getActiveTournaments } from "@/src/lib/getActiveTournaments";
import { getTournamentById, Match, Tournament } from "@/src/lib/getTournamentById";
import Loader from "./App/Loader";

export default function TournamentsClient() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [matchesMap, setMatchesMap] = useState<{ [key: number]: Match[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBets, setSelectedBets] = useState<{ [matchId: number]: "1" | "X" | "2" | undefined }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeTournaments = await getActiveTournaments();
        setTournaments(activeTournaments);

        const matchesObj: { [key: number]: Match[] } = {};
        for (const t of activeTournaments) {
          const { matches } = await getTournamentById(t.id);
          matchesObj[t.id] = matches;
        }
        setMatchesMap(matchesObj);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات تورنمنت‌ها یا مسابقات!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBetSelect = (matchId: number, bet: "1" | "X" | "2") => {
    setSelectedBets((prev) => ({
      ...prev,
      [matchId]: prev[matchId] === bet ? undefined : bet,
    }));
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tournaments.map((tournament) => (
        <div key={tournament.id} className="border rounded-xl p-4 shadow-lg bg-white hover:shadow-xl transition">
          <img
            src={tournament.files[0]?.url}
            alt={tournament.title}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <h2 className="font-bold text-lg">{tournament.title}</h2>
          <p className="text-gray-600 text-sm mt-1">{tournament.description}</p>
          <div className="mt-2 text-sm text-gray-700">
            <p>🕒 تاریخ شروع: {new Date(tournament.start_date).toLocaleDateString("fa-IR")}</p>
            <p>🎯 بازی‌ها: {tournament.matches_count}</p>
            <p>🏆 جایزه اول: {Number(tournament.first_prize_amount).toLocaleString("fa-IR")} تومان</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">مسابقات:</h3>
            {matchesMap[tournament.id]?.map((match) => (
              <div key={match.id} className="border-t pt-3 mt-3">
                <p className="font-medium">{match.home_team} 🆚 {match.away_team}</p>
                <p className="text-xs text-gray-500">لیگ: {match.league.name} | شروع: {new Date(match.start_time).toLocaleString("fa-IR")}</p>

                <div className="flex mt-2 gap-2">
                  {(["1", "X", "2"] as const).map((bet) => {
                    const percent = bet === "1" ? match.percent_1 : bet === "X" ? match.percent_X : match.percent_2;
                    const isSelected = selectedBets[match.id] === bet;
                    return (
                      <button
                        key={bet}
                        onClick={() => handleBetSelect(match.id, bet)}
                        className={`flex-1 py-1 rounded-lg font-semibold text-sm transition ${
                          bet === "1" ? "bg-green-100" : bet === "X" ? "bg-yellow-100" : "bg-red-100"
                        } ${isSelected ? "ring-2 ring-blue-500" : "hover:ring-1 hover:ring-gray-400"}`}
                      >
                        {bet} ({percent}%)
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
