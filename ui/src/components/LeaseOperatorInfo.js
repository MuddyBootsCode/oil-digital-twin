import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOilWell } from "@fortawesome/free-solid-svg-icons";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { runTimeData } from "../utils/mockData";

const GET_LEASE_OPERATOR = gql`
  query LeaseOperator($id: ID!) {
    leaseOperators(where: { id: $id }) {
      id
      name
      wells {
        id
        name
      }
      batteries {
        id
        name
        equipment {
          id
          type
          maintenanceRecords {
            id
            date
            description
            type
          }
        }
        alerts {
          id
          status
          type
          vessel {
            id
            type
          }
        }
      }
      leases {
        id
        name
      }
    }
  }
`;

const LeaseOperatorInfo = ({ id }) => {
  const theme = useTheme();
  const { loading, error, data } = useQuery(GET_LEASE_OPERATOR, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const { leaseOperators } = data;
    const { wells, batteries, leases } = leaseOperators[0];
    const { equipment } = batteries[0];
    // sort wells by number and name together with wells ending in A first, then B, etc. e.g. 1A, 2A, 1B, 2B, etc.
    const sortedWells = [...wells].sort((a, b) => {
      const aNum = a.name.match(/\d+/)[0];
      const bNum = b.name.match(/\d+/)[0];
      if (aNum === bNum) {
        return a.name > b.name ? 1 : -1;
      }
      return aNum > bNum ? 1 : -1;
    });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {/*<h2>Lease Operator Info</h2>*/}
        {/*<hr style={{ width: "80%" }} />*/}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={theme.leaseOperatorInfoDiv}>
              <h4>Leases</h4>
              {leases.map((lease) => (
                <div key={lease.id}>{lease.name}</div>
              ))}
            </div>
            <div style={theme.leaseOperatorInfoDiv}>
              <h4>Batteries</h4>
              {batteries.map((battery) => (
                <Link
                  to={`/battery/${battery.id}`}
                  key={battery.id}
                  style={theme.wellLink}
                >
                  <div style={{ display: "flex" }}>
                    {battery.name} &nbsp;
                    {battery.alerts.length > 0 ? (
                      <Tooltip
                        placement="right"
                        title={
                          battery.alerts.length === 1
                            ? `${battery.alerts.length} alarm`
                            : `${battery.alerts.length} alarms`
                        }
                      >
                        <WarningAmberIcon style={{ color: "#FFBF00" }} />
                      </Tooltip>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
            <div style={theme.leaseOperatorInfoDiv}>
              <h4>Wells</h4>
              {sortedWells.map((well, i) => (
                <Link
                  to={`/well/${well.id}`}
                  style={theme.wellLink}
                  key={well.id}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {well.name} &nbsp;
                    <div
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      <Tooltip
                        title={i % 3 === 0 ? "Running" : "Idle"}
                        placement="right"
                      >
                        <FontAwesomeIcon
                          icon={faOilWell}
                          style={{
                            color: i % 3 === 0 ? "green" : "red",
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/*<h4>Avg. Run Times</h4>*/}
            {/*<Line {...config} />*/}
            <h4>Equipment</h4>
            {equipment.map((item) => (
              <Link
                to={`/equipment/${item.id}`}
                style={theme.wellLink}
                key={item.id}
              >
                <div key={item.id}>{item.type.replace(/_/g, " ")}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default LeaseOperatorInfo;
