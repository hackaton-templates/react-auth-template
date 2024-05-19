import { SignInDto } from "@/lib/dto/auth.dto";
import { API_URL } from "@/lib/env";
import { AuthResult } from "@/types/auth.type";
import { User } from "@/types/user.type";

class AuthService {
  async signIn(data: SignInDto): Promise<AuthResult> {
    const result = await fetch(`${API_URL}/auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!result.ok) {
      return Promise.reject(result);
    }

    const authResult = (await result.json()) as AuthResult;
    return Promise.resolve(authResult);
  }

  async refresh(data: AuthResult): Promise<AuthResult> {
    const result = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.refresh_token.token}`,
      },
    });

    if (!result.ok) {
      return Promise.reject(result);
    }

    const authResult = (await result.json()) as AuthResult;
    return Promise.resolve(authResult);
  }

  async getMe(data: AuthResult): Promise<User> {
    const result = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.access_token.token}`,
      },
    });

    if (!result.ok) {
      return Promise.reject(result);
    }

    const user = (await result.json()) as User;
    return Promise.resolve(user);
  }
}

const authService = new AuthService();
export default authService;
