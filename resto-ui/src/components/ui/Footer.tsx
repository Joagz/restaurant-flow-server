import { Divider } from "@mui/joy";
import { Grid, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Grid
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
      xs={12}
      p={4}
    >
      <Typography variant="caption">
        Web desarrollada por Joaquín Gómez | 2023
      </Typography>
      <Typography variant="caption">
        <Link sx={{ textDecoration: "none" }} href="/secure">
          PARA EMPLEADOS
        </Link>
      </Typography>
      <Divider />{" "}
      <Link sx={{ textDecoration: "none" }} href="https://github.com/Joagz">
        VER MÁS PROYECTOS
      </Link>
    </Grid>
  );
}
