import createHttpError from "http-errors";

export const httpBadRequest = (message = "") => {
  throw createHttpError.BadRequest(message);
};

export const httpNotFound = (message = "") => {
  throw createHttpError.NotFound(message);
};

export const httpUnauthorized = (message = "") => {
  throw createHttpError.Unauthorized(message);
};
