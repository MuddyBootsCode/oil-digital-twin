import React from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import { batteryIcon, customWellIcon } from "../utils/icons";
import { Link, useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import PageHeader from "./PageHeader";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const GET_MAP_ELEMENTS = gql`
  query {
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
    }
    leases {
      id
      name
      coordinates {
        latitude
        longitude
      }
    }
    pipelineStations {
      id
      name
      location {
        latitude
        longitude
      }
    }
    oilPipelines {
      id
      name
      start {
        latitude
        longitude
      }
      end {
        latitude
        longitude
      }
    }
    swds {
      id
      name
      location {
        latitude
        longitude
      }
    }
  }
`;

const LargeMap = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_MAP_ELEMENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const {
      oilWells,
      batteries,
      leases,
      pipelineStations,
      oilPipelines,
      swds,
    } = data;
    return (
      <Grid container style={{ width: "100vw", height: "100vh" }}>
        <PageHeader location={location} />
        <MapContainer
          center={[32.05534427756149, -102.20180259815183]}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {oilWells.map((well, i) => {
            const {
              location: { latitude, longitude },
            } = well;
            return (
              <Marker
                position={[latitude, longitude]}
                key={well.id}
                icon={customWellIcon(i % 3 === 0 ? "green" : "red")}
              >
                <Popup>
                  Oil Well: &nbsp;
                  <Link to={`/well/${well.id}`}>{well.name}</Link>
                </Popup>
              </Marker>
            );
          })}
          {batteries.map((battery) => {
            const {
              location: { latitude, longitude },
            } = battery;
            return (
              <Marker
                position={[latitude, longitude]}
                key={battery.id}
                icon={batteryIcon}
              >
                <Popup>
                  Battery: &nbsp;
                  <Link to={`/battery/${battery.id}`}>{battery.name}</Link>
                </Popup>
              </Marker>
            );
          })}
          {leases.map((lease) => {
            const { coordinates } = lease;
            // convert coordinates to array of arrays of lat and long
            const latLongs = coordinates.map((coord) => [
              coord.latitude,
              coord.longitude,
            ]);
            return (
              <Polygon positions={latLongs} key={lease.id}>
                <Popup>
                  Lease: &nbsp;
                  <Link to={`/lease/${lease.id}`}>{lease.name}</Link>
                </Popup>
              </Polygon>
            );
          })}
          {
            // pipeline stations
            pipelineStations.map((station) => {
              const {
                location: { latitude, longitude },
              } = station;
              return (
                <Marker
                  position={[latitude, longitude]}
                  key={station.id}
                  icon={batteryIcon}
                >
                  <Popup>
                    Pipeline Station: &nbsp;
                    <Link to={`/pipelineStation/${station.id}`}>
                      {station.name}
                    </Link>
                  </Popup>
                </Marker>
              );
            })
          }
          {
            // oil pipelines
            oilPipelines.map((pipeline) => {
              const {
                start: { latitude: startLat, longitude: startLong },
                end: { latitude: endLat, longitude: endLong },
              } = pipeline;
              return (
                <Polyline
                  pathOptions={{ color: "black" }}
                  positions={[
                    [startLat, startLong],
                    [endLat, endLong],
                  ]}
                  key={pipeline.id}
                >
                  <Popup>
                    Oil Pipeline: &nbsp;
                    <Link to={`/pipeline/${pipeline.id}`}>{pipeline.name}</Link>
                  </Popup>
                </Polyline>
              );
            })
          }
          {
            // SWD
            swds.map((swd) => {
              const {
                location: { latitude, longitude },
              } = swd;
              return (
                <Marker
                  position={[latitude, longitude]}
                  key={swd.id}
                  icon={batteryIcon}
                >
                  <Popup>
                    SWD: &nbsp;
                    <Link to={`/swd/${swd.id}`}>{swd.name}</Link>
                  </Popup>
                </Marker>
              );
            })
          }
        </MapContainer>
      </Grid>
    );
  }
};

export default LargeMap;
