import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { customWellIcon, batteryIcon } from "../utils/icons";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const BatteryAreaMap = ({ wells, batteryCoordinates, name }) => {
  return (
    <div style={{ width: "100vw", height: 425 }}>
      <MapContainer
        center={batteryCoordinates}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {wells.map((well, i) => {
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
                <Link to={`/well/${well.id}`}>{well.name}</Link>
              </Popup>
            </Marker>
          );
        })}
        <Marker position={batteryCoordinates} icon={batteryIcon}>
          <Popup>Battery: {name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default BatteryAreaMap;
