import React from "react";
import { Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const PageHeader = ({ location }) => {
  const title = location.pathname.replace("/", "");
  return (
    <Grid item xs={12}>
      <Typography variant="h5" color="text.primary" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ marginBottom: 5 }} />
    </Grid>
  );
};

export default PageHeader;
