import { gql } from "apollo-server";
export const imageDefs = gql`
  type Query {
    getAllImages(country_id: ID): [Image]!
  }
  type Mutation {
    addImage(
      author: ID!
      # date_posted: String!
      image_url: String!
      image_cloudinary_id: String!
      country_id: ID!
    ): Image!
    
    deleteImage(imageId: ID!): Boolean!
  }

  input ImageInput {
    author: ID!
    # date_posted: String!
    image_url: String!
    image_cloudinary_id: String!
  }

  type ImageCreated {
    author: ID!
    date_posted: String!
    image_url: String!
    _id: ID!
    image_cloudinary_id: String!
    createdAt:String!
    updatedAt:String!
  }

  type ImageCreatedPopulated {
    author: UserCreated!
    date_posted: String!
    image_url: String!
    _id: ID!
    image_cloudinary_id: String!
    createdAt:String!
    updatedAt:String!
  }

  type Image {
    author: ID!
    date_posted: String!
    image_url: String!
    _id: String!
    image_cloudinary_id: String!
  }
`;
