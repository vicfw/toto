"use client";

import { useState, useEffect } from "react";
import { getActiveTournaments } from "@/src/lib/getActiveTournaments";
import { Tournament } from "@/src/lib/getTournamentById";
import Loader from "../../components/App/Loader";
import TournamentCard from "./utils/TournamentCard";

export default function TournamentsClient() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeTournaments = await getActiveTournaments();
        setTournaments(activeTournaments);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات تورنمنت‌ها!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-linear-to-b from-deep-blue-light from-20% to-cool-gray min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 ">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </ul>
      </div>
    </div>
  );
}
