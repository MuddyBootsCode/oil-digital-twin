import React from "react";
import Box from "@mui/material/Box";
import { Grid, useTheme } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import WellCard from "./WellCard";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";

const GET_WELLS = gql`
  query Wells {
    oilWells {
      name
      id
      lease {
        name
        id
      }
      battery {
        name
        id
      }
      leaseOperator {
        name
        id
      }
    }
  }
`;

const Wells = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_WELLS);
  const theme = useTheme();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const { oilWells } = data;
    // sort wells by number with letter at the end of the name alphabetically e.g (1-10A, 1-11A, 1-12B, 1-13B),
    const sortedWells = [...oilWells].sort((a, b) => {
      const aNum = a.name.match(/\d+/)[0];
      const bNum = b.name.match(/\d+/)[0];
      if (aNum === bNum) {
        return a.name > b.name ? 1 : -1;
      }
      return aNum > bNum ? 1 : -1;
    });
    return (
      <Grid container>
        <PageHeader location={location} />
        <Grid item xs={12}>
          <Box sx={theme.wellsPage}>
            {sortedWells.map((well, i) => (
              <Box key={well.id}>
                <WellCard well={well} status={i % 3 === 0 ? "green" : "red"} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    );
  }
};

export default Wells;
