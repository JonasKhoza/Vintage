import jwt from "jsonwebtoken";
import UserTokenI from "../models/userToken.model";

export default function generateJWTToken(user: UserTokenI) {
  const accessToken = jwt.sign(user, `${process.env.JWT_AUTHENTICATION_KEY!}`, {
    expiresIn: `${process.env.EXPIRES_IN_1!}`,
  });
  const refreshToken = jwt.sign(
    { user },
    `${process.env.JWT_AUTHENTICATION_KEY!}`,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
}
