import { gql } from "apollo-server";
export const userDefs = gql`
  type Query {
    get_all_users: [UserCreated]!
  }
  type Mutation {
    sign_up(input: UserSignUpInput): UserDataPayload!
    login_user(email: String!, password: String!): UserDataPayload!
  }

  input UserSignUpInput {
    email: String!
    password: String!
    firstName: String!
    secondName: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type UserDataPayload {
    token: String!
    user: UserCreated!
  }

  type UserCreated {
    email: String!
    password: String!
    firstName: String!
    secondName: String!
    _id: ID!
  }
`;
