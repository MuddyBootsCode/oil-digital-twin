import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Divider, List, ListItem, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOilWell } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import BatteryAreaMap from "./BatteryAreaMap";
import Box from "@mui/material/Box";
import { Column } from "@ant-design/plots";
import { randomData, sortProductionDataByMonth } from "../utils/mockData";
import Sensor from "./Sensor";
import AlertBanner from "./AlertBanner";

const GET_BATTERY = gql`
  query battery($id: ID!) {
    batteries(where: { id: $id }) {
      name
      location {
        latitude
        longitude
      }
      vessels {
        type
        id
        sensors(options: { sort: [{ type: ASC }] }) {
          id
          type
        }
      }
      oilWells {
        id
        name
        location {
          latitude
          longitude
        }
      }
      equipment {
        id
        type
        sensors(options: { sort: [{ type: ASC }] }) {
          id
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
  }
`;

const Battery = () => {
  const theme = useTheme();
  const { batteryId } = useParams();
  const { loading, error, data } = useQuery(GET_BATTERY, {
    variables: { id: batteryId },
  });
  const [batteryAlerts, setBatteryAlerts] = useState([]);

  const randomOilData = randomData();
  const monthlyProduction = sortProductionDataByMonth(randomOilData);
  const months = Object.keys(monthlyProduction);

  const config = {
    data: randomOilData,
    xField: "date",
    yField: "amount",
    seriesField: "type",
    slider: {
      start: 0.1,
      end: 0.2,
    },
    color: ["#2c4da0", "#f5a623", "#59d627"],
    columnBackground: {
      style: {
        fill: "rgba(0,0,0,0.1)",
      },
    },
    layout: [
      {
        type: "interval-adjust-position",
      },
      {
        type: "interval-hide-overlap",
      },
      {
        type: "adjust-color",
      },
    ],
  };

  useEffect(() => {
    if (data) {
      setBatteryAlerts(data.batteries[0].alerts);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const {
      name,
      location: { latitude, longitude },
      vessels,
      oilWells,
      equipment,
    } = data.batteries[0];
    const batteryCoordinates = [latitude, longitude];
    // example well name "Fasken 3-25A" sort oilWells array of objects by number in name ignoring first number and dash and letter "A"
    const sortedOilWells = [...oilWells].sort((a, b) => {
      const aNum = a.name.match(/\d+/g);
      const bNum = b.name.match(/\d+/g);
      return aNum[1] - bNum[1];
    });

    const removeAlert = (id) => {
      setBatteryAlerts([...batteryAlerts].filter((alert) => alert.id !== id));
    };

    return (
      <div style={theme.batteryPage}>
        <div>
          <h1>Battery - {data.batteries[0].name}</h1>
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
        <h2>Production</h2>
        <Divider variant="inset" />
        <div style={{ width: "100vw", height: 500 }}>
          <Column {...config} />
        </div>
        <Divider variant="inset" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {months.map((month, i) => {
            const { oil, water, gas } = monthlyProduction[month];
            const productionData = [
              { type: "oil", amount: oil },
              { type: "water", amount: water },
              { type: "gas", amount: gas },
            ];
            const config = {
              data: productionData,
              xField: "type",
              yField: "amount",
              seriesField: "type",
              color: ["#2c4da0", "#f5a623", "#59d627"],
            };
            return (
              <div style={{ width: 75, height: 100 }} key={i}>
                <h3>{month}</h3>
                <Column {...config} />
              </div>
            );
          })}
        </div>
        <br />
        <br />
        <br />
        <Box className={theme.batteryPageVesselSection}>
          <h2>Vessels</h2>
          <Divider variant="inset" />
          <div>
            {vessels.map((vessel, i) => {
              const { type, sensors } = vessel;
              return (
                <div key={i}>
                  <h3>{type.replace(/_/g, " ")}</h3>
                  <List>
                    {sensors.map((sensor) => {
                      return (
                        <ListItem key={sensor.id}>
                          <Sensor type={sensor.type} />
                        </ListItem>
                      );
                    })}
                    <Divider />
                  </List>
                </div>
              );
            })}
          </div>
        </Box>
        <Box>
          <h2>Equipment</h2>
          <Divider variant="inset" style={{ marginBottom: 10 }} />
          <div>
            {equipment.map((equipment) => {
              const { id, type, sensors } = equipment;
              return (
                <div key={id}>
                  <h3>{type.replace(/_/g, " ")}</h3>
                  <List>
                    {sensors.map((sensor) => {
                      return (
                        <ListItem key={sensor.id}>
                          <Sensor type={sensor.type} />
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              );
            })}
          </div>
        </Box>
        <h2>Wells</h2>
        <Divider variant="inset" style={{ marginBottom: 10 }} />
        <div style={theme.batteryPageWellSection}>
          <List sx={theme.batteryPageWellList}>
            {sortedOilWells.map((well, i) => (
              <Link
                to={`/well/${well.id}`}
                style={theme.cardLink}
                key={well.id}
              >
                <ListItem>
                  {well.name}
                  &nbsp;
                  <Tooltip
                    title={i % 3 === 0 ? "Running" : "Idle"}
                    placement="right"
                  >
                    <FontAwesomeIcon
                      icon={faOilWell}
                      style={{
                        color: i % 3 === 0 ? "green" : "red",
                        marginLeft: "auto",
                      }}
                    />
                  </Tooltip>
                </ListItem>
                <Divider />
              </Link>
            ))}
          </List>
          <BatteryAreaMap
            wells={oilWells}
            batteryCoordinates={batteryCoordinates}
            name={name}
          />
        </div>
      </div>
    );
  }
};

export default Battery;
