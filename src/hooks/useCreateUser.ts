import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { CreateUserDTO, User } from "@/src/types/user";


const createUser = async (payload: CreateUserDTO): Promise<User> => {
    const res = await api.post("/users", payload);
    return res.data;
};


export const useCreateUser = () => {
    const queryClient = useQueryClient();


    return useMutation(createUser, {
        // optimistic update
        onMutate: async (newUser) => {
            await queryClient.cancelQueries(["users"]);
            const previous = queryClient.getQueryData<User[]>(["users"]);
            // حدس بزنیم id به صورت منفی ایجاد میشه
            const optimistic: User = {
                id: Math.floor(Math.random() * -1000000),
                name: newUser.name,
                email: newUser.email,
            };
            queryClient.setQueryData(["users"], (old?: User[]) => (old ? [optimistic, ...old] : [optimistic]));
            return { previous };
        },
        onError: (_err, _newUser, context: any) => {
            if (context?.previous) {
                queryClient.setQueryData(["users"], context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });
};