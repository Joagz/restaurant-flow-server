import { Grid, Typography, ListItem, Chip, Card, Button } from "@mui/joy";
import { Paper } from "@mui/material";
import React, { useState } from "react";
import { Order } from "../interfaces/Order";

interface Props {
  message: Order;
}
export default function OrderDBComponent({ message }: Props) {
  const [completed, setCompleted] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);

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
                setCompleted(true);
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
      <Grid
        component={Paper}
        xs={12}
        md={5}
        bgcolor={completed ? "#191" : "#111"}
        sx={{ transition: ".2s ease" }}
        border={`1px solid ${completed ? "#050" : "orange"}`}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          px={2}
          fontSize={20}
          sx={{ wordBreak: "break-word", color: "#fff" }}
        >
          {message?.name}
        </Typography>
        <Grid xs={12} md={5} p={2}>
          <Grid xs={12}>
            {message.items.map((item) => (
              <ListItem sx={{ fontSize: 16, color: "#fff" }}>
                {item.name} | ${item.price}
              </ListItem>
            ))}
          </Grid>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          xs={6}
          sx={{ p: 2 }}
        >
          {completed ? (
            <Chip size="lg" variant="solid" color={"success"}>
              COMPLETADO
            </Chip>
          ) : (
            <Chip
              size="lg"
              variant="solid"
              color={"warning"}
              onClick={() => {
                setConfirmAction(true);
              }}
            >
              PENDIENTE
            </Chip>
          )}
        </Grid>
      </Grid>
    </>
  );
}