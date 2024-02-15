import UserInterface from "../models/userSignIn.model";
export default function userLoginInHelper(user: UserInterface) {
  if (
    user.email.trim() === "" ||
    !user.email.includes("@") ||
    user.password === "" ||
    user.password.trim().length < 8
  ) {
    return {
      hasError: true,
      email: "Email must not be empty and must include '@'",
      password:
        "Password must not be empty and must contain at least 8 characters!",
    };
  } else {
    return {
      hasError: false,
      email: "",
      password: "",
    };
  }
}
