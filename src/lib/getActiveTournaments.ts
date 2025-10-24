import { api } from "./axios";

export interface TournamentFile {
  id: number;
  file_name: string;
  url: string;
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
}

export interface ActiveTournamentsResponse {
  success: boolean;
  data: Tournament[];
}

export async function getActiveTournaments(): Promise<Tournament[]> {
  const { data } = await api.get<ActiveTournamentsResponse>("/games/active-tournaments");
  return data.data; // فقط آرایه‌ی مسابقات را برمی‌گردونیم
}
