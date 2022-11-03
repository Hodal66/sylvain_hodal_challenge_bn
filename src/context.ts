// import { decodeAuthHeader } from "./graphql/Auth";
import { Request } from "express";
import { decodeAuthHeader } from "./resolvers/userResolver";

export interface Context {
  userId?: String;
  email?: String;
  firstName?: String;
  secondName?: String;
}
export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;
  return {
    userId: token?.userId,
    email: token?.email,
    firstName: token?.firstName,
    secondName: token?.secondName,
  };
};

// 1: First you have defined the Context interface, which specifies what objects will be attached to the context object. Right now it’s just an instance of PrismaClient, but this can change as the project grows.
// 2: You’re exporting the context object, so that it can be imported and used by the GraphQL server.
