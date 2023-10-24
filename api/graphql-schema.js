const fs = require("fs");
const path = require("path");

const currentDir = process.cwd();

const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join(currentDir, "schema.graphql")
  )
  .toString("utf-8");

module.exports = { typeDefs };
