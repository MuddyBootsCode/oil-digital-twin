import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useTheme } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

const GET_EQUIPMENT = gql`
  query Equipment($id: ID!) {
    equipment(where: { id: $id }) {
      id
      type
      maintenanceRecords {
        id
        date
        type
        description
        downTime
      }
      serviceProviders {
        id
        companyName
      }
      model {
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

const Equipment = () => {
  const { equipmentId } = useParams();
  const theme = useTheme();
  const { loading, error, data } = useQuery(GET_EQUIPMENT, {
    variables: { id: equipmentId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const { equipment } = data;
    console.log(equipment);
    const { maintenanceRecords, serviceProviders, type, battery, model } =
      equipment[0];
    const downTime = maintenanceRecords.reduce(
      (acc, record) => acc + parseInt(record.downTime),
      0
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {type.replace(/_/g, " ")} &nbsp;-{" "}
          {model && model.type.replace(/_/g, " ")} &nbsp;
          <ConstructionIcon fontSize="large" />
        </div>
        <hr style={{ border: "1px solid white", width: "100%" }} />
        <div>
          <h3>Maintenance Records</h3>
          {maintenanceRecords.map((record) => {
            return (
              <div
                key={record.id}
                style={{
                  marginBottom: 10,
                }}
              >
                Date: {record.date} Type: {record.type} Description:{" "}
                {record.description}
                :nbsp;
              </div>
            );
          })}
        </div>
        <div>
          <h3>Down Time</h3>
          {downTime} hours
        </div>
        <div>
          <h3>Service Providers</h3>
          {serviceProviders.map((provider) => {
            return <div key={provider.id}>{provider.companyName}</div>;
          })}
        </div>
        <div>
          <h3>Battery</h3>
          {battery && (
            <Link to={`/battery/${battery.id}`} style={theme.wellLink}>
              <div>{battery.name}</div>
            </Link>
          )}
        </div>
      </div>
    );
  }
};

export default Equipment;
