import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { batteryIcon, customWellIcon } from "../utils/icons";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const WellMap = ({
  name,
  wellLocation,
  batteryLocation,
  batteryName,
  batteryId,
}) => {
  return (
    <div style={{ width: "50vw", height: 425, marginLeft: "auto" }}>
      <MapContainer
        center={wellLocation}
        zoom={13}
        style={{ height: 425, width: "50vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={wellLocation} icon={customWellIcon("green")}>
          <Popup>{name}</Popup>
        </Marker>
        <Marker position={batteryLocation} icon={batteryIcon}>
          <Popup>
            <Link to={`/battery/${batteryId}`}>{batteryName}</Link>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WellMap;
