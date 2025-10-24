// src/lib/getTournamentById.ts
import { api } from "./axios";

export interface TournamentFile {
  id: number;
  file_name: string;
  url: string;
}

export interface Prize {
  amount: string;
  wins_required: number;
  label: string;
}

export interface Prizes {
  first: Prize;
  second: Prize;
  third: Prize;
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
  prizes: Prizes;
  files: TournamentFile[];
}

export interface League {
  id: number;
  name: string;
  country: string;
}

export interface Match {
  id: number;
  home_team: string;
  away_team: string;
  start_time: string;
  end_time: string;
  sport_type: string;
  sport_type_label: string;
  status: string;
  status_label: string;
  home_score: number | null;
  away_score: number | null;
  is_active: boolean;
  league: League;
  tournament: {
    id: number;
    title: string;
    status: string;
  };
  formatted_start_time: string;
  formatted_end_time: string;
  time_remaining: string;
}

export interface TournamentResponse {
  success: boolean;
  tournament: Tournament;
  matches: Match[];
}

export async function getTournamentById(id: number): Promise<{ tournament: Tournament; matches: Match[] }> {
  const { data } = await api.get<TournamentResponse>(`/games/tournament/${id}`);
  return {
    tournament: data.tournament,
    matches: data.matches,
  };
}
