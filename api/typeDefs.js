const { gql } = require("apollo-server");

const typeDefs = gql`
type Lease {
    id: ID!
    name: String!
    locatedIn: [Region] @relationship(type: "LOCATED_IN", direction: OUT)
}

type Region {
    id: ID!
    name: String!
    leases: [Lease] @relationship(type: "LOCATED_IN", direction: IN)
}`
