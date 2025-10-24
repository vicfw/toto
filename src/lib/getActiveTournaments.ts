import { api } from "./axios";

export interface TournamentFile {
  id: number;
  file_name: string;
  url: string;
}

export interface Prizes {
  first: { amount: string; wins_required: number; label: string };
  second: { amount: string; wins_required: number; label: string };
  third: { amount: string; wins_required: number; label: string };
}

export interface Tournament {
  id: number;
  title: string;
  description: string;
  rules: string;
  start_date: string;
  end_date: string;
  line_coefficient: string;
  matches_count: number;
  sport_type: string;
  first_prize_amount: string;
  second_prize_amount: string;
  third_prize_amount: string;
  files: TournamentFile[];

  prizes: Prizes;
}

export interface ActiveTournamentsResponse {
  success: boolean;
  data: Tournament[];
}

export async function getActiveTournaments(): Promise<Tournament[]> {
  const { data } = await api.get<ActiveTournamentsResponse>("/games/active-tournaments");

  const tournamentsWithPrizes: Tournament[] = data.data.map((tournament) => ({
    ...tournament,
    prizes: tournament.prizes || {
      first: { amount: tournament.first_prize_amount, wins_required: 0, label: "" },
      second: { amount: tournament.second_prize_amount, wins_required: 0, label: "" },
      third: { amount: tournament.third_prize_amount, wins_required: 0, label: "" },
    },
  }));

  return tournamentsWithPrizes;
}
