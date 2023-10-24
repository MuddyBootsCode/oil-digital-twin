const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");
const { typeDefs } = require("./graphql-schema.js");

const driver = neo4j.driver(
  "bolt://0.0.0.0:7687",
  neo4j.auth.basic("neo4j", "newpassword")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
    schema,
    context: { driverConfig: { database: "neo4j" } },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
