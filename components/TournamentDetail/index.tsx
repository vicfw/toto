"use client";

import { useState, useEffect } from "react";
import { Tournament, Match } from "@/src/lib/getTournamentById";
import TournamentDetailMobile from "./TournamentDetailMobile";
import TournamentDetailDesktop from "./TournamentDetailDesktop";

interface TournamentDetailProps {
  tournament: Tournament;
  matches: Match[];
}

export default function TournamentDetail({
  tournament,
  matches,
}: TournamentDetailProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  if (isDesktop) {
    return (
      <TournamentDetailDesktop tournament={tournament} matches={matches} />
    );
  }

  return <TournamentDetailMobile tournament={tournament} matches={matches} />;
}
