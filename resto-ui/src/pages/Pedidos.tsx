import { Container, Typography } from "@mui/joy";
import OrderForm from "../components/OrderForm";
import TopNavigation from "../components/TopNavigation";
import { Menu } from "../interfaces/Menu";
import { useEffect, useState } from "react";
import { menuApi } from "../api/menuApi";

function Pedidos() {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    menuApi.get("").then((res) => setMenus(res.data));
  }, []);

  return (
    <>
      <TopNavigation></TopNavigation>
      <Container sx={{ mt: 15 }}>
        <Typography fontSize={40} m={3} component={"h1"}>
          Realiza tu pedido
        </Typography>

        <OrderForm menus={menus}></OrderForm>
      </Container>
    </>
  );
}

export default Pedidos;
