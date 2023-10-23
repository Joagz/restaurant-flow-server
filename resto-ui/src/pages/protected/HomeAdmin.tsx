import React from "react";
import Authenticate from "../auth/Authenticate";
import { Grid } from "@mui/joy";
import OrderNavigation from "../../components/ui/OrderNavigation";

function HomeAdmin() {
  return (
    <Authenticate>
      <Grid
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OrderNavigation></OrderNavigation>
      </Grid>
    </Authenticate>
  );
}

export default HomeAdmin;
