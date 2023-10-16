import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSubscription } from "react-stomp-hooks";
import { orderApi } from "../../api/orderApi";
import { Order } from "../../interfaces/Order";
import OrderNavigation from "../../components/ui/OrderNavigation";
import OrderTable from "../../components/order/OrderTable";

function List() {
  const [messages, setMessages] = useState<any[]>([]);
  const [dbOrders, setDbOrders] = useState<any[]>([]);
  useEffect(() => {
    orderApi
      .get<Order[]>("", { params: { completed: 0 } })
      .then((res) => setDbOrders(res.data.filter((order) => !order.completed)));
  }, []);

  useSubscription("/queue/order", (message) =>
    setMessages([...messages, message.body])
  );

  return (
    <>
      <Grid container p={5} gap={5}>
        <OrderNavigation />
        <Typography variant="h4" width={"100%"}>
          Pedidos Pendientes:
        </Typography>

        <OrderTable
          orders={[
            ...dbOrders,
            ...messages.map((message) => JSON.parse(message).body),
          ]}
        ></OrderTable>
      </Grid>
    </>
  );
}

export default List;
