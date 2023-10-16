import { Grid, ListItem, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { orderApi } from "../../api/orderApi";
import { Chip, Link } from "@mui/joy";
import { Order } from "../../interfaces/Order";
import OrderNavigation from "../../components/ui/OrderNavigation";
import OrderTable from "../../components/order/OrderTable";

export default function Completed() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    orderApi
      .get<Order[]>("", { params: { completed: 1 } })
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <Grid container p={5} gap={5}>
      <OrderNavigation />

      <Typography variant="h4" width={"100%"}>
        Pedidos Finalizados/Entregados:
      </Typography>
      <OrderTable displayOnly={true} orders={[...orders]}></OrderTable>
    </Grid>
  );
}
