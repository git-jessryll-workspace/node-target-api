import { sign, verify } from "../utils/token.util.js";

export const generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret);
  return token;
};

export const verifyToken = async (token, secret) => {
  let check = await verify(token, secret);
  return check;
};

export const getToken = async (userId) => {
  const access_token = await generateToken(
    { userId },
    "30d",
    process.env.ACCESS_TOKEN_SECRET
  );
  const refresh_token = await generateToken(
    { userId },
    "30d",
    process.env.REFRESH_TOKEN_SECRET
  );
  return {
    access_token,
    refresh_token,
  };
};
