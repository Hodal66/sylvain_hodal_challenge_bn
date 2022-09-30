import { gql } from "apollo-server";
export const countryDefs = gql`
  type Query {
    # getAllCountries: Boolean
    getAllCountries(
      page: Int!,
      itemsPerPage: Int!,
      All: Boolean
    ): [CountryReturned]!
    # getOneCountry(id: ID!): Boolean
    getOneCountry(id: ID!): CountryReturned!
  }
  type Mutation {
    createCountry(input: [CountryInput]): [Country]!
    # createCountry(input: CountryInput): Boolean
  }
  input pagination {
    page: Int!
    itemsPerPage: Int
    All: Boolean
  }
  type Country {
    code: String!
    name: String!
    native: String!
    phone: String!
    currency: String
    emoji: String!
    emojiU: String!
    continent: Continent!
    languages: [Language]!
    states: [State]!
    images: [ID]!
    comments: [ID]!
    _id: ID!
  }

  type CountryReturned {
    code: String!
    name: String!
    native: String!
    phone: String!
    currency: String
    emoji: String!
    emojiU: String!
    continent: Continent!
    languages: [Language]!
    states: [State]!
    images: [ImageCreatedPopulated]!
    comments: [CommentCreatedPopulated]!
    _id: ID!
  }

  input CountryInput {
    code: String!
    name: String!
    native: String!
    phone: String!
    currency: String
    emoji: String!
    emojiU: String!
    continent: ContinentInput!
    languages: [LanguageInput]!
    states: [StateInput]!
    images: [ID]!
    comments: [ID]!
  }

  input ContinentInput {
    name: String
    code: String
  }

  type State {
    code: String
    name: String
  }
  input StateInput {
    code: String
    name: String
  }
  input LanguageInput {
    code: String
    native: String
    name: String
    rtl: Boolean
  }

  type Language {
    code: String
    native: String
    name: String
    rtl: Boolean
  }
  type Continent {
    name: String
    code: String
  }
`;
