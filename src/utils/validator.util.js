import isEmail from "validator/lib/isEmail.js";
import isLength from "validator/lib/isLength.js";

export const validateRequiredKeys = (...keys) => {
  return !keys.some((item) => !item);
};

export const validateLength = (key, min = null, max = null) => {
  let option = {};
  if (min !== null) {
    option.min = min;
  }

  if (max !== null) {
    option.max = max;
  }
  return isLength(key, option);
};

export const validateEmail = (email) => isEmail(email);
