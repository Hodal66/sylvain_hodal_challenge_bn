import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "../../../config";
import { User } from "../models/Users";

export interface AuthTokenPayload {
  // 1
  userId: String;
  email: String;
  firstName: String;
  secondName: String;
}


export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", ""); // 3
  if (!token) {
    throw new Error("No token found");
  }
  const decodedData = jwt.verify(token, config.jwt.JWT_SECRET);
  return decodedData as AuthTokenPayload; // 4
}

export const userResolver: any = {
  Query: {
    async get_all_users() {
        const allUsers = await User.find({});
        return allUsers;
    }
  },
  Mutation: {
    async sign_up(parent: any, args: any, context: any) {
      const { input } = args;
      const { email, password, firstName, secondName } = input;

      const existingUser = await User.findOne({ email }).exec();

      if (existingUser) {
        throw new Error("User already exists.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await User.create({
        firstName,
        secondName,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        {
          userId: createdUser._id,
          email: createdUser.email,
          firstName: createdUser.firstName,
          secondName: createdUser.secondName,
        },
        config.jwt.JWT_SECRET
      );
      return {
        user: createdUser,
        token,
      };
    },

    async login_user(parent: any, args: any, context: any) {
      const { email, password } = args;
      const existingUser = await User.findOne({ email }).exec();
      console.log(existingUser);
      if (!existingUser) {
        throw new Error("User DOES NOT exists");
      }
      const Valid = await bcrypt.compare(password, existingUser.password);
      if (!Valid) {
        throw new Error("Invalid email or password!");
      }
      const token = jwt.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          secondName: existingUser.secondName,
        },
        config.jwt.JWT_SECRET
      );
      return {
        user: existingUser,
        token,
      };
    },
  },
};
