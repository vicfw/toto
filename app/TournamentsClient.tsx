"use client";

import { useActiveTournaments } from "@/src/hooks/useActiveTournaments";

export default function TournamentsClient() {
  const { data, isLoading, isError } = useActiveTournaments();

  if (isLoading) return <p>در حال بارگذاری مسابقات...</p>;
  if (isError) return <p>خطا در دریافت مسابقات!</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data?.map((tournament) => (
        <div key={tournament.id} className="border rounded-xl p-3 shadow-md bg-white">
          <img
            src={tournament.files[0]?.url}
            alt={tournament.title}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="font-bold text-lg mt-2">{tournament.title}</h2>
          <p className="text-gray-600 text-sm mt-1">{tournament.description}</p>
        </div>
      ))}
    </div>
  );
}
