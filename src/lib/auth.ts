import { api } from "./axios";

export interface AutoLoginPayload {
  token: string;
  hall: string;
  login: string;
}

export interface AutoLoginResponse {
  status: string;
  error: string;
  sessionId: string;
  sanctumToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    hall_login: string;
  };
      
}

export interface UserResponse {
  id: number;
  hall_id: number;
  hall_login: string;
  user_type: string;
  hall_metadata: any;
  name: string;
  email: string;
  email_verified_at: string;
  status: number;
  fixed_salary: any;
  created_at: string;
  updated_at: string;
  provider: any;
  provider_id: any;
  register_status: string;
  store_id: number;
}

export async function autoLogin(
  payload: AutoLoginPayload
): Promise<AutoLoginResponse> {
  const { data } = await api.post<AutoLoginResponse>(
    "/hall/auto-login",
    payload
  );
  return data;
}

export async function getUserInfo(token: string): Promise<UserResponse> {
  const { data } = await api.get<UserResponse>("/user");
  return data;
}
