import React from "react";
import { useQuery, gql } from "@apollo/client";
import BatteryCard from "./BatteryCard";
import { Grid, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";

const GET_BATTERIES = gql`
  query Battery {
    batteries {
      name
      id
      location {
        latitude
        longitude
      }
      oilWells {
        name
        id
      }
      lease {
        name
        id
      }
      alerts {
        id
        type
        status
      }
      vessels {
        id
        type
      }
      leaseOperator {
        id
        name
      }
    }
  }
`;

const Batteries = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_BATTERIES);
  const theme = useTheme();
  const { cardDisplay } = theme;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const { batteries } = data;
    // sort batteries by number and name together
    const sortedBatteries = [...batteries].sort((a, b) => {
      const aNum = a.name.match(/\d+/)[0];
      const bNum = b.name.match(/\d+/)[0];
      if (aNum === bNum) {
        return a.name > b.name ? 1 : -1;
      }
      return aNum > bNum ? 1 : -1;
    });

    return (
      <Grid container>
        <PageHeader location={location} />
        <Grid item xs={12} style={cardDisplay}>
          {sortedBatteries.map(
            ({ name, lease, oilWells, id, alerts, vessels, leaseOperator }) => (
              <BatteryCard
                info={{
                  name,
                  lease,
                  oilWells,
                  id,
                  vessels,
                  leaseOperator,
                  alerts,
                  cardType: "battery",
                }}
                key={id}
              />
            )
          )}
        </Grid>
      </Grid>
    );
  }
};

export default Batteries;
