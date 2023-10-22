import { Grid, Link } from "@mui/joy";
import React from "react";

export default function OrderNavigation() {
  return (
    <Grid display={"flex"} gap={5} justifyContent={"center"}>
      <Link variant="soft" fontSize={25} color="neutral" href="/secure/list">
        Pendientes
      </Link>
      <Link
        variant="soft"
        fontSize={25}
        color="neutral"
        href="/secure/completed"
      >
        Completos
      </Link>
      <Link
        variant="soft"
        fontSize={25}
        color="neutral"
        href="/secure/new-menu"
      >
        Nuevo Menú
      </Link>
    </Grid>
  );
}
