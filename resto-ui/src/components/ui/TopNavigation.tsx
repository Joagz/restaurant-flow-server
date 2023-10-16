import { MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import { IconButton, Link } from "@mui/joy";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { useState } from "react";

export default function TopNavigation() {
  const [menu, setMenu] = useState(false);
  const [isClicked, setClicked] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
    setClicked(!menu);
  };

  return (
    <AppBar position="fixed" variant="outlined" sx={{ bgcolor: "#fff" }}>
      <Toolbar sx={{ width: "100%" }}>
        <IconButton onClick={toggleMenu}>
          {!isClicked ? <MenuOutlined /> : <MenuOpenOutlined />}
        </IconButton>
      </Toolbar>
      {menu && (
        <Grid xs={12} gap={1} display="flex" flexDirection="column">
          <Link
            p={1}
            px={5}
            textAlign={"center"}
            width={"100%"}
            disabled={window.location.href.includes("home")}
            href="/home"
            variant="plain"
            color="neutral"
          >
            Inicio
          </Link>
          <Link
            p={1}
            px={5}
            textAlign={"center"}
            width={"100%"}
            disabled={window.location.href.includes("pedidos")}
            href="/pedidos"
            variant="plain"
            color="neutral"
          >
            Pedidos
          </Link>
          <Link
            p={1}
            px={5}
            textAlign={"center"}
            width={"100%"}
            disabled={window.location.href.includes("menu")}
            href="/menu"
            variant="plain"
            color="neutral"
          >
            Menu
          </Link>
        </Grid>
      )}
    </AppBar>
  );
}
