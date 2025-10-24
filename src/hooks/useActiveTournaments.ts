import { useQuery } from "@tanstack/react-query";
import { getActiveTournaments, Tournament } from "@/src/lib/getActiveTournaments";

export function useActiveTournaments() {
  return useQuery<Tournament[]>({
    queryKey: ["active-tournaments"],
    queryFn: getActiveTournaments,
    staleTime: 1000 * 60 * 2, 
    retry: 1, 
  });
}
