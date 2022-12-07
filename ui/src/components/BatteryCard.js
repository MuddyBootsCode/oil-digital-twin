import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOilWell } from "@fortawesome/free-solid-svg-icons";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Tooltip from "@mui/material/Tooltip";

const BatteryCard = ({ info }) => {
  const theme = useTheme();
  if (info.cardType === "battery") {
    return (
      <Card sx={{ minWidth: 400 }} variant="outlined">
        <Link to={`/battery/${info.id}`} style={theme.cardLink}>
          <CardContent>
            <Typography variant="h5" color="text.primary" gutterBottom>
              {info.name}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Active Alarms">
                  <WarningAmberIcon style={{ color: "red" }} />
                </Tooltip>
                :&nbsp;
                {
                  info.alerts.filter((alert) => alert.status === "ACTIVE")
                    .length
                }
                &nbsp;
                <Tooltip title="Inactive Alarms">
                  <WarningAmberIcon style={{ color: "#FFBF00" }} />
                </Tooltip>
                :&nbsp;
                {
                  info.alerts.filter((alert) => alert.status === "INACTIVE")
                    .length
                }
              </div>
            </Typography>
            <hr />
            <Typography variant="h6" component="div">
              Lease: {info.lease.name}
            </Typography>
            <Typography variant="h6" component="div">
              Operator: {info.leaseOperator.name}
            </Typography>
            <div>
              <FontAwesomeIcon icon={faOilWell} />
              :&nbsp;{info.oilWells.length}
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }
  return (
    <Card sx={{ minWidth: 225 }} variant="outlined">
      <Link to={`/battery/${info.id}`} style={theme.cardLink}>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            {info.name}
          </Typography>
          <hr />
          <Typography variant="h6" component="div">
            Lease: {info.lease.name}
          </Typography>
          <Typography variant="h6" component="div">
            Well Count: {info.oilWells.length}
          </Typography>
          <Typography variant="h6" component="div">
            Alerts:
            {info.alerts.map((alert) => {
              return (
                <div>
                  {alert.type} {alert.vessel.type}
                </div>
              );
            })}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BatteryCard;
