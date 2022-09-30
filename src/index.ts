import {
  ApolloServer,
} from "apollo-server";

import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

import { connect } from "./database/db.config"
import { commentDefs } from "./schema/commentDefs";
import { countryDefs } from "./schema/countryDefs";
import { imageDefs } from "./schema/imageDefs";
import { countryResolver } from "./resolvers/countryResolver";
import { commentResolver } from "./resolvers/commentResolver";
import { imageResolver } from "./resolvers/imageResolver";
import { context } from "./context";
import { userResolver } from "./resolvers/userResolver";
import { userDefs } from "./schema/userDefs";

;
const resolvers = mergeResolvers([
  countryResolver,
  commentResolver,
  imageResolver,
  userResolver,
]);
;
const typeDefs = mergeTypeDefs([
  countryDefs,
  imageDefs,
  commentDefs,
  userDefs,
]);

// userModal => resovers4 
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: false,
  cache: "bounded",
});

connect().then(() => {
  console.log("Database connected!");
  server.listen(PORT).then(({ url }) => console.info(`App on ${url}`));
});
