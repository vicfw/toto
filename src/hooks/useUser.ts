import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { User } from "@/src/types/user";


const fetchUser = async (id: number): Promise<User> => {
const res = await api.get(`/users/${id}`);
return res.data;
};


export const useUser = (id?: number) => {
return useQuery<User, Error>(["user", id], () => fetchUser(id!), {
enabled: !!id, // فقط زمانی اجرا بشه که id موجود باشه
});
};