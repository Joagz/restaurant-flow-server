import { Container, Link } from "@mui/joy";
import { Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <Toolbar>
      <Container
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Typography variant="h3" component="h1">
          Ciraldoe's
        </Typography>
        <Typography variant="body1" component="p">
          Las mejores pastas del país.
        </Typography>
        <br />
        <Link
          variant="outlined"
          fontSize={30}
          sx={{ width: "100%" }}
          href={"/home"}
          color="warning"
        >
          Inicio
        </Link>
        <Link
          variant="outlined"
          fontSize={30}
          sx={{ width: "100%" }}
          href={"/pedidos"}
          color="warning"
        >
          Pedidos
        </Link>
        <Link
          variant="outlined"
          fontSize={30}
          sx={{ width: "100%" }}
          href={"/menu"}
          color="warning"
        >
          Menu
        </Link>

        <br />
        <Typography variant="body2" component="p" fontSize={14}>
          Para realizar un pedido, ver la sección 'PEDIDOS'.
        </Typography>
      </Container>
    </Toolbar>
  );
}
