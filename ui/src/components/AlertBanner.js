import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Collapse, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const AlertBanner = ({ alert, removeAlert }) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  return (
    <Collapse in={open}>
      <Alert
        severity={alert.status === "ACTIVE" ? "error" : "warning"}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="large"
            onClick={() => {
              setOpen(!open);
              removeAlert(alert.id);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          style={theme.alertLinks}
          to={alert.battery ? `/battery/${alert.battery.id}` : "/alerts"}
        >
          {alert.type.replace(/_/g, " ")}
          {alert.vessel ? ` ${alert.vessel.type.replace(/_/g, " ")}` : ""}
          {alert.battery ? ` - ${alert.battery.name}` : ""}
        </Link>
      </Alert>
    </Collapse>
  );
};

export default AlertBanner;
