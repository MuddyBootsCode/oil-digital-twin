import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Divider, List, ListItem, useTheme } from "@mui/material";
import AlertBanner from "./AlertBanner";

const GET_LEASE = gql`
  query lease($id: ID!) {
    leases(where: { id: $id }) {
      name
      oilWells {
        id
        name
      }
      batteries {
        id
        name
        alerts {
          id
          status
          type
          vessel {
            id
            type
          }
          battery {
            name
            id
          }
        }
      }
      leaseOperators {
        id
        name
      }
      SWDs {
        id
        name
      }
    }
  }
`;

const Lease = () => {
  const theme = useTheme();
  const { leaseId } = useParams();
  const [batteryAlerts, setBatteryAlerts] = React.useState([]);
  const { loading, error, data } = useQuery(GET_LEASE, {
    variables: { id: leaseId },
  });

  useEffect(() => {
    if (data) {
      const { leases } = data;
      const lease = leases[0];
      const batteries = lease.batteries.map((battery) => battery);
      const alerts = batteries.map((battery) => battery.alerts).flat();
      setBatteryAlerts(alerts);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { leases } = data;
  const lease = leases[0];

  const removeAlert = (id) => {
    setBatteryAlerts([...batteryAlerts].filter((alert) => alert.id !== id));
  };

  return (
    <div style={theme.batteryPage}>
      <div>
        <h1>Lease - {lease.name}</h1>
        <hr />
      </div>
      <div>
        {batteryAlerts.length ? (
          <div>
            <h2>Alerts</h2>
            {batteryAlerts.map((alert) => (
              <div key={alert.id}>
                <AlertBanner alert={alert} removeAlert={removeAlert} />
                <Divider variant="inset" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Lease;
