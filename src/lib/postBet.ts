import { api } from "./axios";

interface Prediction {
  match_id: number;
  selections: string[];
}

interface BetPayload {
  tournament_id: number;
  predictions: Prediction[];
}

export async function postUserBet(payload: BetPayload) {
  const { data } = await api.post("/bets", payload);
  return data;
}
