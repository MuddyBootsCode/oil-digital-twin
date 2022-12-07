import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Divider, Grid, Stack } from "@mui/material";
import AlertBanner from "./AlertBanner";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PageHeader from "./PageHeader";

const GET_ALERTS = gql`
  query Alerts {
    alerts(options: { sort: [{ status: ASC }] }) {
      id
      status
      type
      vessel {
        id
        type
      }
      battery {
        id
        name
      }
    }
  }
`;

const Alerts = () => {
  const location = useLocation();
  const [alerts, setAlerts] = useState([]);
  const { loading, error, data } = useQuery(GET_ALERTS);
  useEffect(() => {
    if (data) {
      setAlerts(data.alerts);
    }
  }, [data, alerts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const removeAlert = (id) => {
      setAlerts([...alerts].filter((alert) => alert.id !== id));
    };
    return (
      <Grid container>
        <PageHeader location={location} />
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          divider={<Divider flexItem />}
        >
          {alerts.map((alert) => (
            <AlertBanner alert={alert} removeAlert={removeAlert} />
          ))}
        </Stack>
      </Grid>
    );
  }
};

export default Alerts;
