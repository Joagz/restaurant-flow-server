import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSubscription } from "react-stomp-hooks";
import { orderApi } from "../../api/orderApi";
import { Order } from "../../interfaces/Order";
import OrderList from "../../components/order/OrderList";
import OrderDBList from "../../components/order/OrderDBList";

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
      <Grid container p={5} gap={3}>
        <Typography variant="h4" width={"100%"}>
          Pedidos Pendientes:
        </Typography>
        <OrderDBList messages={dbOrders}></OrderDBList>
        <OrderList messages={messages}></OrderList>
      </Grid>
    </>
  );
}

export default List;
