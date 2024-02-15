import mongodb from "mongodb";

export default interface UserTokenI {
  userId: mongodb.ObjectId;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}
