import {
  validateEmail,
  validateLength,
  validateRequiredKeys,
} from "../utils/validator.util.js";
import { httpBadRequest } from "../utils/http-error.util.js";

const validateRegisterRequest = ({ name, email, password }) => {
  if (!validateRequiredKeys(name, email, password)) {
    httpBadRequest("Please fill all fields");
  }

  if (!validateLength(name, 2)) {
    httpBadRequest(
      "Please make sure your name is between 2 and 16 characters."
    );
  }

  if (!validateEmail(email)) {
    httpBadRequest("Please make sure to provide a valid email address.");
  }

  if (!validateLength(password, 6, 128)) {
    httpBadRequest(
      "Please make sure your password is between 6 and 128 characters."
    );
  }
};

export { validateRegisterRequest };
