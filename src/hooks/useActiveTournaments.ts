import { useQuery } from "@tanstack/react-query";
import { getActiveTournaments, Tournament } from "@/src/lib/getActiveTournaments";

export function useActiveTournaments() {
  return useQuery<Tournament[]>({
    queryKey: ["active-tournaments"],
    queryFn: getActiveTournaments,
    staleTime: 1000 * 60 * 2, // 2 دقیقه — برای کش محلی
    retry: 1, // در صورت خطا یک بار تلاش مجدد
  });
}
