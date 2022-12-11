import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FormControl, Grid, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import LeaseOperatorInfo from "./LeaseOperatorInfo";
import ServiceProviderInfo from "./ServiceProviderInfo";
import PageHeader from "./PageHeader";
import { useLocation } from "react-router-dom";

const GET_SERVICE_PROVIDERS = gql`
  query ServiceProviders {
    serviceProviders {
      id
      type
      name
      companyName
    }
  }
`;

// take an array of objects and create an object where the id value of the object is the key
// and the object is the value
const createObjectFromId = (array) => {
  const object = {};
  array.forEach((item) => {
    object[item.id] = item;
  });
  return object;
};

const Maintenance = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_SERVICE_PROVIDERS);
  const [leaseOperator, setLeaseOperator] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const { serviceProviders } = data;
    const handleChange = (event) => {
      const provider = createObjectFromId(serviceProviders)[event.target.value];
      if (provider.type === "LEASE_OPERATOR") {
        setLeaseOperator(provider.id);
        setServiceProvider("");
      } else {
        setServiceProvider(provider.id);
        setLeaseOperator("");
      }
    };

    return (
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
        }}
      >
        <PageHeader location={location} />
        <div
          style={{
            display: "flex",
            gap: 20,
          }}
        >
          <Box sx={{ minWidth: 250, marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Lease Operators</InputLabel>
              <Select
                value={leaseOperator}
                label="Lease Operators"
                onChange={handleChange}
              >
                {serviceProviders
                  .filter((provider) => provider.type === "LEASE_OPERATOR")
                  .map((provider) => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 250, marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Service Providers</InputLabel>
              <Select
                value={serviceProvider}
                label="Age"
                onChange={handleChange}
              >
                {serviceProviders
                  .filter((provider) => provider.type !== "LEASE_OPERATOR")
                  .map((provider) => (
                    <MenuItem value={provider.id} key={provider.id}>
                      {provider.companyName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <Box
          sx={{
            marginTop: 5,
            border: "1px solid grey",
            borderRadius: 1,
            minHeight: "50vh",
            width: "100%",
          }}
        >
          {
            // if leaseOperator is not empty, render the LeaseOperatorInfo component
            leaseOperator !== "" ? (
              <LeaseOperatorInfo id={leaseOperator} />
            ) : null
          }
          {
            // if serviceProvider is not empty, render the ServiceProviderInfo component
            serviceProvider !== "" ? (
              <ServiceProviderInfo id={serviceProvider} />
            ) : null
          }
        </Box>
      </Grid>
    );
  }
};

export default Maintenance;
