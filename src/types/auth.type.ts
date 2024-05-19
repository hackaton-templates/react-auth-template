export interface AuthResult {
  user_id: number;
  access_token: {
    token: string;
    expires: number;
  };
  refresh_token: {
    token: string;
    expires: number;
  };
}
