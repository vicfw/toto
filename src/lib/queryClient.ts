import { QueryClient } from "@tanstack/react-query";


export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
                staleTime: 1000 * 60 * 2, 
            },
            mutations: {
                retry: 0,
            },
        },
    });