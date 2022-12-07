import React from "react";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOilWell } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";

const WellCard = ({ well, status }) => {
  const theme = useTheme();
  const { name, id, lease, battery, leaseOperator } = well;
  return (
    <Card sx={{ minWidth: 325 }}>
      <Link to={`/well/${id}`} style={theme.cardLink}>
        <CardContent>
          <Tooltip
            title={status === "green" ? "running" : "idle"}
            placement={"top"}
          >
            <Typography variant="h5" color="text.primary" gutterBottom>
              <FontAwesomeIcon icon={faOilWell} style={{ color: status }} />{" "}
              &nbsp;
              {name}
            </Typography>
          </Tooltip>
          <hr />
          <Typography variant="h6" component="div">
            Lease: {lease.name}
          </Typography>
          <Typography variant="h6" component="div">
            Battery: {battery.name}
          </Typography>
          <Typography variant="h6" component="div">
            Lease Operator: {leaseOperator.name}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default WellCard;
