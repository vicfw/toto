"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type User = {
  id: number;
  name: string;
  email: string;
};

const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
