import React from "react";
import { useParams } from "react-router-dom";
import { Divider, useTheme } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOilWell } from "@fortawesome/free-solid-svg-icons";
import WellMap from "./WellMap";
import { wellTestData } from "../utils/mockData";
import { Column } from "@ant-design/plots";

const GET_WELL = gql`
  query GetWell($id: ID!) {
    oilWells(where: { id: $id }) {
      id
      name
      location {
        latitude
        longitude
      }
      battery {
        name
        id
        location {
          latitude
          longitude
        }
      }
      lease {
        id
        name
      }
      leaseOperator {
        id
        name
      }
      maintenanceRecords {
        id
        date
        description
        type
        downTime
      }
    }
  }
`;

const Well = () => {
  const { wellId } = useParams();
  const theme = useTheme();
  const { loading, error, data } = useQuery(GET_WELL, {
    variables: { id: wellId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const { name, id, location, battery, leaseOperator, maintenanceRecords } =
      data.oilWells[0];
    const { latitude, longitude } = location;
    const {
      location: { latitude: batteryLatitude, longitude: batteryLongitude },
      id: batteryId,
    } = battery;
    const wellData = wellTestData();
    const downTime = maintenanceRecords.reduce(
      (acc, record) => acc + parseInt(record.downTime),
      0
    );

    const oilConfig = {
      data: wellData.oil,
      xField: "date",
      yField: "amount",
      seriesField: "type",
      color: "#2c4da0",
    };

    const gasConfig = {
      data: wellData.gas,
      xField: "date",
      yField: "amount",
      seriesField: "type",
      color: "#59d627",
    };

    const waterConfig = {
      data: wellData.water,
      xField: "date",
      yField: "amount",
      seriesField: "type",
      color: "#f5a623",
    };

    return (
      <div style={theme.wellPage}>
        <div style={theme.wellPage.header}>
          <FontAwesomeIcon icon={faOilWell} size="3x" />
          &nbsp; &nbsp;
          <h1>{name}</h1>
        </div>
        <Divider />
        <div style={theme.wellPage.wellTestRow}>
          <h2>Well Tests</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Column {...oilConfig} />
            <Column {...gasConfig} />
            <Column {...waterConfig} />
          </div>
        </div>
        <Divider style={{ marginTop: 40, marginBottom: 20 }} />
        <div
          style={{
            display: "flex",
          }}
        >
          <div>
            <h2>Total Maintenance Down Time - {downTime} hours</h2>
            <h2>Lease Operator</h2>
            {leaseOperator.name}
            <h2>Maintenance Records</h2>
            {maintenanceRecords.map((record) => {
              return (
                <div key={record.id}>
                  {record.type} - {record.date} - Description:{" "}
                  {record.description}
                </div>
              );
            })}
          </div>
          <div>
            <WellMap
              wellLocation={[latitude, longitude]}
              batteryLocation={[batteryLatitude, batteryLongitude]}
              batteryName={battery.name}
              batteryId={batteryId}
              name={name}
              id={id}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Well;
