import { gql } from 'apollo-server'
export const commentDefs = gql`
  type Query {
    getAllComment(country_id: ID): [Comment]!
  }
  type Mutation {
    addComment(
      author: ID!
      date_posted: String!
      content: String!
      country_id: ID!
    ): CommentCreated!
  }

  input CommentInput {
    author: ID!
    date_posted: String!
    content: String!
  }

  type CommentCreated {
    author: ID!
    date_posted: String!
    content: String!
    _id: ID!
  }

  type CommentCreatedPopulated {
    author: UserCreated!
    date_posted: String!
    content: String!
    _id: ID!
  }

  type Comment {
    author: ID!
    date_posted: String!
    content: String!
    _id: String
  }
`;