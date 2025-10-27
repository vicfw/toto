"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getTournamentById,
  type Tournament,
  type Match,
} from "@/src/lib/getTournamentById";
import Loader from "@/components/App/Loader";
import TournamentDetail from "@/components/TournamentDetail";

export default function TournamentPage() {
  const params = useParams();
  const tournamentId = parseInt(params.id as string);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTournamentData() {
      try {
        const data = await getTournamentById(tournamentId);
        setTournament(data.tournament);
        setMatches(data.matches);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات تورنمنت!");
      } finally {
        setLoading(false);
      }
    }

    if (tournamentId) {
      fetchTournamentData();
    }
  }, [tournamentId]);

  if (loading) {
    return <Loader />;
  }

  if (error || !tournament) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">خطا</h2>
          <p className="text-gray-600">{error || "تورنمنت یافت نشد"}</p>
        </div>
      </div>
    );
  }

  return <TournamentDetail tournament={tournament} matches={matches} />;
}
