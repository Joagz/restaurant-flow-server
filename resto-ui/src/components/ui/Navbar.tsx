
import { Link } from "@mui/joy";
import { Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <Toolbar
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" component="h1">
        Ciraldoe's
      </Typography>
      <Typography variant="body2" component="p">
        Las mejores pastas del país.
      </Typography>
      <br />
      <Link  href={"/home"} variant="plain" color="warning">
        Inicio
      </Link>
      <Link  href={"/pedidos"} variant="plain" color="warning">
        Pedidos
      </Link>
      <Link  href={"/menu"} variant="plain" color="warning">
        Menu
      </Link>

      <br />
      <Typography variant="body2" component="p" fontSize={14}>
        Para realizar un pedido, ver la sección 'PEDIDOS'.
      </Typography>
    </Toolbar>
  );
}
