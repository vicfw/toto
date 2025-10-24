"use client";

import { useState, useEffect } from "react";
import { getActiveTournaments } from "@/src/lib/getActiveTournaments";
import {
  getTournamentById,
  Match,
  Tournament,
} from "@/src/lib/getTournamentById";
import Loader from "../../components/App/Loader";
import Cart from "./utils/Cart";
import HandaleSelected from "./utils/HandaleSelected";
import DrawCountdown from "../DrawCountdown";

export default function TournamentsClient() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [matchesMap, setMatchesMap] = useState<{ [key: number]: Match[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBets, setSelectedBets] = useState<{
    [matchId: number]: "1" | "X" | "2" | undefined;
  }>({});

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
  // Save bets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("selectedBets", JSON.stringify(selectedBets));
  }, [selectedBets]);

  const handleBetSelect = (matchId: number, bet: "1" | "X" | "2") => {
    setSelectedBets((prev) => ({
      ...prev,
      [matchId]: prev[matchId] === bet ? undefined : bet,
    }));
  };

  const handleReset = () => setSelectedBets({});

  const handleRandom = () => {
    const newBets: typeof selectedBets = {};
    Object.values(matchesMap)
      .flat()
      .forEach((match) => {
        const options: ("1" | "X" | "2")[] = ["1", "X", "2"];
        newBets[match.id] = options[Math.floor(Math.random() * options.length)];
      });
    setSelectedBets(newBets);
  };

  const allSelected = Object.values(matchesMap)
    .flat()
    .every((match) => selectedBets[match.id]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <DrawCountdown />
      <ul className="bg-cool-gray p-2.5 space-y-1.5">
        {tournaments.map((tournament) => (
          <Cart
            key={tournament.id}
            tournament={tournament}
            matches={matchesMap[tournament.id]}
            selectedBets={selectedBets}
            onSelectBet={handleBetSelect}
          />
        ))}
      </ul>
      <HandaleSelected
        handleReset={handleReset}
        handleRandom={handleRandom}
        Object={Object}
        matchesMap={matchesMap}
        allSelected={allSelected}
        selectedBets={selectedBets}
      />
    </div>
  );
}
