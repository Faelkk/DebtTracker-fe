import { httpClient } from "../httpClient";

export interface SignInParams {
    email: string;
    password: string;
}

interface SigninResponse {
    token: string;
}

export async function signin(params: SignInParams) {
    const { data } = await httpClient.post<SigninResponse>(
        "/user/login",
        params
    );

    return data;
}