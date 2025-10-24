"use client";

import { useUsers } from "@/hooks/useUsers";

export default function UsersClient() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <ul>
      {data?.map((u) => (
        <li key={u.id}>{u.name} — {u.email}</li>
      ))}
    </ul>
  );
}
