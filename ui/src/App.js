import "./App.css";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import baseTheme from "./utils/theme";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "./components/TopNav";
import Home from "./components/Home";
import Leases from "./components/Leases";
import Wells from "./components/Wells";
import Batteries from "./components/Batteries";
import Lease from "./components/Lease";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import Battery from "./components/Battery";
import Well from "./components/Well";
import Maintenance from "./components/Maintenance";
import Alerts from "./components/Alerts";
import LargeMap from "./components/LargeMap";
import Equipment from "./components/Equipment";

const getTitles = (location) => {
  const titles = {
    "/": "Home",
    "/Leases": "Leases",
    "/Lease/:leaseId": "Lease",
    "/Wells": "Wells",
    "/Batteries": "Batteries",
    "/Alerts": "Alerts",
    "/Maintenance": "Maintenance",
    "/Map": "Map",
    "/Equipment": "Equipment",
  };

  const sub = location[0];

  if (titles[location]) {
    return titles[location];
  } else if (sub.includes("/lease")) {
    return "Lease";
  } else if (sub.includes("/battery")) {
    return "Battery";
  } else if (sub.includes("/well")) {
    return "Well";
  } else if (sub.includes("/alert")) {
    return "Alert";
  } else if (sub.includes("/maintenance")) {
    return "Maintenance";
  } else if (sub.includes("/map")) {
    return "Map";
  } else if (sub.includes("/equipment")) {
    return "Equipment";
  } else {
    return "Neo4j Graph App";
  }
};

function App(props) {
  const theme = useTheme();
  const { toggleTheme } = props;
  const location = useLocation();
  useEffect(() => {
    document.title = getTitles([location.pathname]);
  });

  return (
    <Box>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Box sx={theme.pageBox}>
        <Routes>
          <Route path="/" element={<Batteries />} title="Home" />
          <Route path="/Leases" element={<Leases />} title="Leases" />
          <Route path="/Lease/:leaseId" element={<Lease />} title="Leases" />
          <Route path="/Wells" element={<Wells />} title="Wells" />
          <Route path="/Well/:wellId" element={<Well />} />
          <Route path="/Batteries" element={<Batteries />} title="Batteries" />
          <Route path="/Battery/:batteryId" element={<Battery />} />
          <Route
            path="/Equipment/:equipmentId"
            element={<Equipment />}
            title="Equipment"
          />
          <Route
            path="/Maintenance/"
            element={<Maintenance />}
            title="Maintenance"
          />
          <Route path="/Alerts" element={<Alerts />} title="Alerts" />
          <Route path="/Map" element={<LargeMap />} title="Map" />
        </Routes>
      </Box>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [appTheme] = useState(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme"));
    return savedTheme || "light";
  });
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    const updatedTheme = mode === "light" ? "dark" : "light";
    setMode(updatedTheme);
    localStorage.setItem("theme", JSON.stringify(updatedTheme));
  };

  const theme = useMemo(
    () => createTheme({ ...baseTheme, palette: { mode: mode } }),
    [mode]
  );

  useEffect(() => {
    if (appTheme) {
      setMode(appTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App toggleTheme={toggleTheme} />
        </ApolloProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
