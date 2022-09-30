import { gql } from "apollo-server";
export const imageDefs = gql`
  type Query {
    getAllImages(country_id: ID): [Image]!
  }
  type Mutation {
    addImage(input: ImageInput, country_id: ID!): ImageCreated!
    updateImage(imageId: ID!, input: ImageInput): ImageCreated!
    deleteImage(imageId: ID!): Boolean!
  }

  input ImageInput {
    author: ID!
    date_posted: String!
    image_url: String!
  }
  type ImageCreated {
    author: ID!
    date_posted: String!
    image_url: String!
    _id: ID!
  }

  type ImageCreatedPopulated {
    author: UserCreated!
    date_posted: String!
    image_url: String!
    _id: ID!
  }

  type Image {
    author: ID!
    date_posted: String!
    image_url: String!
    _id: String
  }
`;
