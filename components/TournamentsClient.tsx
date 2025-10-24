"use client";

import { useActiveTournaments } from "@/src/hooks/useActiveTournaments";

export default function TournamentsClient() {
  const { data, isLoading, isError } = useActiveTournaments();

  if (isLoading) return <p>در حال بارگذاری مسابقات...</p>;
  if (isError) return <p>خطا در دریافت مسابقات!</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((tournament) => (
        <div key={tournament.id} className="border rounded-xl p-3 shadow-md bg-white">
          <img
            src={tournament.files[0]?.url}
            alt={tournament.title}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="font-bold text-lg mt-2">{tournament.title}</h2>
          <p className="text-gray-600 text-sm mt-1">{tournament.description}</p>
          <div className="mt-2 text-sm text-gray-700">
            <p>🕒 تاریخ شروع: {new Date(tournament.start_date).toLocaleDateString("fa-IR")}</p>
            <p>🎯 بازی‌ها: {tournament.matches_count}</p>
            <p>🏆 جایزه اول: {Number(tournament.first_prize_amount).toLocaleString("fa-IR")} تومان</p>
          </div>
        </div>
      ))}
    </div>
  );
}
