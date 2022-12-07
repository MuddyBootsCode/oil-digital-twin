import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_SERVICE_PROVIDER = gql`
  query ServiceProvider($id: ID!) {
    serviceProviders(where: { id: $id }) {
      id
      companyName
      equipment {
        id
        type
      }
    }
  }
`;

const ServiceProviderInfo = ({ id }) => {
  const { loading, error, data } = useQuery(GET_SERVICE_PROVIDER, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    return <div>{id}</div>;
  }
};

export default ServiceProviderInfo;
