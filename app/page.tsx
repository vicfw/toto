import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { getActiveTournaments } from "@/src/lib/getActiveTournaments";
import TournamentsClient from "@/components/TournamentsClient";

export default async function Page() {
  const queryClient = new QueryClient();

  // prefetch سمت سرور
  await queryClient.prefetchQuery({
    queryKey: ["active-tournaments"],
    queryFn: getActiveTournaments,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TournamentsClient />
    </HydrationBoundary>
  );
}
