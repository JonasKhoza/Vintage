import UserInterface from "../models/userSignIn.model";

export default function userSignInHelper(user: UserInterface) {
  const errors: Partial<UserInterface> = {};

  if (user.firstname?.trim() === "") {
    errors.firstname = "User first name must not be empty!";
  }

  if (user.lastname?.trim() === "") {
    errors.lastname = "User last name must not be empty!";
  }

  if (user.username?.trim() === "") {
    errors.username = "Username must not be empty!";
  }

  if (user.email.trim() === "" || !user.email.includes("@")) {
    errors.email = "Email must not be empty and must include '@'";
  }

  if (user.password === "" || user.password.trim().length < 8) {
    errors.password =
      "Password must not be empty and must contain at least 8 characters!";
  }

  if (
    user.existingPassword === "" ||
    user.existingPassword!?.trim().length < 8
  ) {
    errors.existingPassword =
      "Existing password must not be empty and must contain at least 8 characters!";
  }

  return {
    hasError: Object.keys(errors).length > 0,
    ...errors,
  };
}
