import { Button, Card, ListItem, Typography } from "@mui/joy";
import React, { useState } from "react";
import { Order } from "../../interfaces/Order";
import { useStompClient } from "react-stomp-hooks";
import { orderApi } from "../../api/orderApi";

type Props = { order: Order; displayOnly?: boolean };

export default function OrderTableItem({ order, displayOnly }: Props) {
  const [completed, setCompleted] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const stomp = useStompClient();

  const complete = async () => {
    if (stomp) {
      order.completed = completed;
      setCompleted(true);
      await orderApi
        .put(`/complete/${order.id}`, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => console.log(res));
    }
  };

  return (
    <>
      {confirmAction && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 1000,
            backgroundColor: "#000000aa",
          }}
        >
          <Card
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 2000,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography>
              ¿Estás seguro de que quieres completar el pedido?
            </Typography>
            <Button
              onClick={() => {
                setConfirmAction(false);
              }}
              variant="solid"
              color="danger"
            >
              NO
            </Button>
            <Button
              onClick={() => {
                complete();
                setConfirmAction(false);
              }}
              variant="outlined"
              color="success"
            >
              SI
            </Button>
          </Card>
        </div>
      )}
      <tr
        style={{
          backgroundColor: `${completed ? "#00ff00aa" : ""}`,
        }}
      >
        <td>
          <Typography fontWeight={600}>{order.name}</Typography>
        </td>
        <td>
          {order.items.map((item) => (
            <ListItem
              variant="soft"
              sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography fontWeight={500}>{item.name}</Typography>
              <Typography color="warning"> ${item.price}ARS</Typography>
            </ListItem>
          ))}
        </td>
        <td>
          <Typography fontSize={26}>{order.finalPrice}</Typography>
        </td>
        <td>
          <Typography fontWeight={500} fontSize={26}>
            {order.completed ? "Completada" : "Pendiente"}
          </Typography>
        </td>
        {!displayOnly && (
          <td>
            <Button
              onClick={() => {
                setConfirmAction(true);
              }}
            >
              Finalizar orden
            </Button>
          </td>
        )}
      </tr>
    </>
  );
}
