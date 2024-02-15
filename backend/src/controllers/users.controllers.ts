import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
//My files imports
import User, { UserInterface } from "../models/user.model";
import UserTokenI from "../models/userToken.model";
import generateJWTToken from "../utils/generateJWTToken";
import Address from "../models/address.model";

async function getUserSignupHandler(req: Request, res: Response) {
  const { firstname, lastname, email, password } = req.body as UserInterface;
  try {
    // CHECK IF THE USER EXIST
    //first create a query object existingUserQuery using User.findOne({ email })
    //execute the query by calling exec() on the query object, which returns a promise.
    //result will be the user object if found or null if not found
    const existingUserQuery = User.findOne({ email });
    const existingUser = await existingUserQuery.exec();

    if (existingUser !== null) {
      // User already exists
      return res.status(409).json({
        statusCode: 409,
        message: "User already exists.Please login.",
      });
    }

    const saltRounds = 3;
    const hashedPassword = bcryptjs.hashSync(password, saltRounds);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    res.status(201).json({
      statusCode: 201,
      message: "User is succesfully created.",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "An error occurred while saving the user.",
    });
  }
}

//LOGIN HANDLER
async function getUserLoginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (accessToken || refreshToken) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "You are already logged in." });
  }

  try {
    const existingUserQuery = User.findOne({ email });
    const existingUser: UserInterface | null = await existingUserQuery.exec();

    if (existingUser === null) {
      return res.status(404).json({
        statusCode: 404,
        message:
          "User is not found! Please enter a correct email or create an account.",
      });
    }

    const passwordMatched = bcryptjs.compareSync(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Passwords do not match." });
    }
    const userData: UserTokenI = {
      userId: existingUser._id,
      name: existingUser.firstname,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      createdAt: existingUser.createdAt,
    };

    const { accessToken, refreshToken } = generateJWTToken(userData);

    res.cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + 3600000),
      path: "/",
      sameSite: "lax",
      secure: false,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 1 * 24 * 3600000),
      path: "/",
      sameSite: "lax",
      secure: false,
      httpOnly: true,
    });
    //Associating the user logging in with the session given upon visiting the site
    req.session.uid = existingUser._id;

    res.status(200).json({
      statusCode: 200,
      message: "User is logged in.",
      userData,
      token: accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "An error has occured on the server while logging in the user.",
    });
  }
}

const checkUserCookieStatus = (req: Request, res: Response) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.json({ accessToken: false, message: "Does not have a cookie." });
  }

  try {
    if (accessToken)
      jwt.verify(
        accessToken,
        process.env.JWT_AUTHENTICATION_KEY!
      ) as JwtPayload;
    if (refreshToken)
      jwt.verify(
        refreshToken,
        process.env.JWT_AUTHENTICATION_KEY!
      ) as JwtPayload;
  } catch (error) {
    return res.json({ hasCookie: false, message: "Invalid token." });
  }

  return res.json({ hasCookie: true, message: "Valid token." });
};

const getUserProfileHandler = (req: Request, res: Response) => {};

const updateUserInfo = async (req: Request, res: Response) => {
  const { username, email, existingPassword, password, userId } = req.body;
  console.log("User info: ", req.body);

  try {
    const existingUserQuery = User.findById({ _id: userId });
    const existingUser = await existingUserQuery.exec();

    if (existingUser === null) {
      return res.status(404).json({ message: "User does not exist!" });
    } else {
      const passwordMatched = await bcryptjs.compare(
        existingPassword,
        existingUser.password
      );

      if (!passwordMatched) {
        return res
          .status(400)
          .json({ statusCode: 400, message: "Passwords do not match." });
      } else {
        await User.updateOne(
          { _id: userId },
          { $set: { firstname: username, email, password } }
        );
        res.status(201).json({ message: "User is successfully updated!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};

const logoutHandler = (req: Request, res: Response) => {
  try {
    // Delete the cookie by setting an expired date
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during logout." });
  }
};

async function setUserAddressHandler(req: Request, res: Response) {
  try {
    const { address, userId } = req.body;

    if (
      !address.street.trim() ||
      !address.city.trim() ||
      !address.postalCode.trim()
    ) {
      return res.status(400).json({
        error: "Please provide all the necessary values.",
      });
    }

    if (!userId) {
      return res.status(400).json({
        error: "Please login first.",
      });
    }
    // Find the existing user
    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    //Check if user have existing address
    const existingAddressQuery = Address.findOne({ _id: userId });
    const existingAddress = await existingAddressQuery.exec();

    if (existingAddress !== null) {
      //Updating address
      await Address.updateOne(
        { _id: userId },
        {
          $set: {
            street: address.street,
            city: address.city,
            postalCode: address.postalCode,
          },
        }
      );

      res.status(201).json({ message: "Address saved successfully" });
    } else {
      // Create a new address document
      const newAddress = new Address({
        _id: existingUser._id,
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
      });

      // Save the address to the database
      await newAddress.save();

      res.status(201).json({ message: "Address saved successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

const updateUserAddressHandler = async (req: Request, res: Response) => {
  const { street, city, postalCode, userId } = req.body;
  console.log("User address: ", req.body);

  try {
    if (!street.trim() || !city.trim() || !postalCode.trim()) {
      return res.status(400).json({
        error: "Please provide all the necessary values.",
      });
    }

    if (!userId) {
      return res.status(400).json({
        error: "Please login first.",
      });
    }
    // Find the existing user
    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    //Check if user have existing address
    const existingAddressQuery = Address.findOne({ _id: userId });
    const existingAddress = await existingAddressQuery.exec();

    if (existingAddress !== null) {
      //Updating address
      await Address.updateOne(
        { _id: userId },
        {
          $set: {
            street: street,
            city: city,
            postalCode: postalCode,
          },
        }
      );

      res.status(201).json({ message: "Address saved successfully" });
    } else {
      // Create a new address document
      const newAddress = new Address({
        _id: existingUser._id,
        street: street,
        city: city,
        postalCode: postalCode,
      });

      // Save the address to the database
      await newAddress.save();

      res.status(201).json({ message: "Address created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export {
  getUserSignupHandler,
  getUserLoginHandler,
  getUserProfileHandler,
  checkUserCookieStatus,
  logoutHandler,
  setUserAddressHandler,
  updateUserInfo,
  updateUserAddressHandler,
};
