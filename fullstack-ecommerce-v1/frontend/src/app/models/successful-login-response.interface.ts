export interface SuccessfulLoginResponse {
  success: boolean;
  data: AuthTokens;
}

interface AuthTokens {
  accessToken: string;
  refreshAccessToken: string;
}
