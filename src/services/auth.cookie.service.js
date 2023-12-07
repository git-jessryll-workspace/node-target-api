const REFRESH_TOKEN_URL = "/api/v1/auth/refreshtoken";
const REFRESH_TOKEN_KEY = "refreshtoken";

export const setRefreshToken = (res, refresh_token) =>
  res.cookie(REFRESH_TOKEN_KEY, refresh_token, {
    httpOnly: true,
    path: REFRESH_TOKEN_URL,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

export const clearRefreshToken = (res) => {
  res.clearCookie(REFRESH_TOKEN_KEY, {
    path: REFRESH_TOKEN_URL,
  });
};
