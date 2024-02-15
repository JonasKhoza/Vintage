import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import { CartInterface, CartSessionInterface } from "../models/cart.model";
interface CustomSessionData {
  uid: string; // or whatever type is appropriate for your user ID
  cart: CartSessionInterface | null;
}

declare module "express-session" {
  interface SessionData extends CustomSessionData {}
}

const MongoDBStore = connectMongoDBSession(session);

export const sessionStore = new MongoDBStore({
  uri: `mongodb+srv://jonaskhoza18:MJSJ2Q6ldLDGImm7@cluster3.0ai6z9x.mongodb.net/onestore`,
  databaseName: "onestore",
  collection: "sessions",
});

sessionStore.on("error", (error: any) => {
  console.log("MongoDB session store error:", error);
});

export const sessionConfigHandler = (store: any) => {
  return {
    secret: process.env.SESSION_SECRET_KEY! || "my-secret-key", // Replace 'your-secret-key' with your actual secret key
    resave: false, //prevents resaving of unchanged sessions
    saveUninitialized: false, //ensures saving only when there's some data change in it
    store: store, //where the session data is actually stored

    cookie: {
      sameSite: true, //This helps prevent CSRF attacks but best used in production mode not necessary for development mode
      SameSite: "Lax",
      Path: "/", //paths that this cookie will be available at
      httpOnly: true, //cookie cannot be accessed from the browser console
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      secure: false,
    },
  };
};
