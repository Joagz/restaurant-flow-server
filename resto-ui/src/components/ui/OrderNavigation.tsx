import { Grid, Link } from "@mui/joy";
import React from "react";

export default function OrderNavigation() {
  return (
    <Grid
      display={"flex"}
      gap={5}
      width={'100%'}
      bgcolor={'#FFF'}
      height={'fit-content'}
      justifyContent={"center"}
    >
      <Link
        sx={{ height: 50 }}
        variant="soft"
        fontSize={25}
        color="neutral"
        href="/secure/list"
      >
        Pendientes
      </Link>
      <Link
        sx={{ height: 50 }}
        variant="soft"
        fontSize={25}
        color="neutral"
        href="/secure/completed"
      >
        Completos
      </Link>
      <Link
        sx={{ height: 50 }}
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
