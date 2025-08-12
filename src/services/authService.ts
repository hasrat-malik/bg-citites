import axios from "axios";
import { Configuration } from "../config/config";

let accessToken: string | null = null;
let refreshToken: string | null = null;

async function login(): Promise<void> {
    const response = await axios.post(`${Configuration.mock_base_api}/auth/login`,
        {
            username: Configuration.username,
            password: Configuration.password
        }
    );
    accessToken = response.data.token;
    refreshToken = response.data.refreshToken;
}

export async function refreshAccessToken(): Promise<void> {
    if (!refreshToken) {
        await login();
        return;
    }

    try {
        const response = await axios.post(`${Configuration.mock_base_api}/auth/refresh`, { refreshToken });
        accessToken = response.data.token;
    } catch {
        await login();
    }
}

export async function getAccessToken(): Promise<string | null> {
    if (!accessToken) {
        await refreshAccessToken();
    }
    return accessToken;
}
