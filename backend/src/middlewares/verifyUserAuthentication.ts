import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userData?: JwtPayload;
}

export default function verifyUserAuthentication(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ statusCode: 401, message: "Unauthorized user! Please login." });
  }

  try {
    let decodedToken;

    if (accessToken)
      jwt.verify(
        accessToken,
        process.env.JWT_AUTHENTICATION_KEY!
      ) as JwtPayload;

    if (refreshToken)
      decodedToken = jwt.verify(
        refreshToken,
        process.env.JWT_AUTHENTICATION_KEY!
      ) as JwtPayload;

    req.userData = decodedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ statusCode: 401, message: "Invalid access token." });
  }
}
