import createHttpError from "http-errors";
import { verifyMiddleware } from "../utils/token.util.js";

export default async function (req, res, next) {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized());
  }

  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];
  verifyMiddleware(token, req, next);
}
