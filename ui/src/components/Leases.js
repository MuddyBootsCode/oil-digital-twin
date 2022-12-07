import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";

const GET_LEASES = gql`
  query Leases {
    leases {
      id
      name
      oilWells {
        id
        name
        location {
          latitude
          longitude
        }
      }
      batteries {
        id
        name
        location {
          latitude
          longitude
        }
        leaseOperator {
          id
          name
        }
        serviceProviders {
          id
          companyName
        }
        SWD {
          id
          name
          location {
            latitude
            longitude
          }
        }
      }
    }
  }
`;

const Leases = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_LEASES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    return (
      <Grid container>
        <PageHeader location={location} />
        <Grid></Grid>
      </Grid>
    );
  }
};

export default Leases;
