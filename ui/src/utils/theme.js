const baseTheme = {
  palette: {
    mode: "dark",
  },
  pageBox: {
    display: "flex",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    p: 3,
  },
  cardDisplay: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    gap: 15,
  },
  cardLink: {
    textDecoration: "inherit",
    color: "inherit",
  },
  batteryPage: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  wellLink: {
    textDecoration: "inherit",
    color: "inherit",
  },
  batteryPageVesselSection: {
    display: "flex",
    marginTop: 20,
  },
  batteryPageWellSection: {
    display: "flex",
  },
  batteryPageWellList: {
    width: "25%",
    maxHeight: 425,
    overflow: "auto",
  },
  wellsPage: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 10,
    flexGrow: 1,
  },
  wellPage: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
    header: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    wellTestRow: {
      height: 400,
      marginBottom: 40,
    },
  },
  alertLinks: {
    textDecoration: "inherit",
    color: "inherit",
  },
  leaseOperatorInfoDiv: {
    padding: 10,
    minWidth: 275,
    maxHeight: 500,
    overflow: "auto",
  },
};

export default baseTheme;
