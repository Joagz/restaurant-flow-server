import { Chip } from "@mui/joy";
import { Grid, ListItem, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderComponent from "../components/OrderComponent";
import { useSubscription } from "react-stomp-hooks";

function List() {
  const [messages, setMessages] = useState<any[]>([]);

  useSubscription("/topic/order", (message) =>
    setMessages([...messages, message.body])
  );

  return (
    <>
      <Grid container p={5} gap={3}>
        (la idea es que esto sea una aplicación de escritorio)
        <Typography variant="h4" width={"100%"}>
          Pedidos Pendientes:
        </Typography>
        {messages
          .sort((a, b) => a.n - b.n)
          .map((N) => (
            <OrderComponent message={N}></OrderComponent>
          ))}
      </Grid>
    </>
  );
}

export default List;
