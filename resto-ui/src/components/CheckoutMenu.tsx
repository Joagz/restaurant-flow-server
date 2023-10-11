import {
  Card,
  FormControl,
  Input,
  Button,
  CardContent,
  Typography,
} from "@mui/joy";
import { InputLabel } from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import { Order, Payment } from "../interfaces/Order";
import CompletedCheckouts from "./CompletedCheckouts";

type Props = {
  checkoutMenuVisible: boolean;
  setCheckoutMenuVisible: SetStateAction<boolean> | any;
  sendOrder: (payment: Payment) => void;
};

export default function CheckoutMenu({
  checkoutMenuVisible,
  setCheckoutMenuVisible,
  sendOrder,
}: Props) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (localStorage.getItem("orders"))
      setOrders(JSON.parse(localStorage.getItem("orders")!));
  }, []);

  return (
    <>
      <CompletedCheckouts orders={orders}></CompletedCheckouts>

      {checkoutMenuVisible && (
        <>
          <CardForm sendOrder={sendOrder}></CardForm>
          <div
            onClick={() => setCheckoutMenuVisible(false)}
            style={{
              position: "fixed",
              zIndex: 300,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#000000aa",
              padding: 10,
            }}
          ></div>
        </>
      )}
    </>
  );
}

const CardForm = ({ sendOrder }: { sendOrder: (payment: Payment) => void }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [paymentAvailable, setPaymentAvailable] = useState(true);

  async function checkout() {
    // TODO: Process the payment
    if (cardNumber && cardName && cardExpiry && cardCvc) {
      await sendOrder({
        cardNumber,
        cardName,
        cardExpiry,
        cardCvc,
        total: 0,
      });

      setPaymentAvailable(false);
    }
  }

  return (
    <Card
      sx={{
        position: "fixed",
        zIndex: 500,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
      }}
    >
      <CardContent sx={{ padding: 5, gap: 2 }}>
        <Typography variant="soft" fontSize={30}>
          Confirmar pago
        </Typography>
        <InputLabel
          sx={{ display: "flex", gap: 2, alignItems: "center" }}
          htmlFor="card_number"
        >
          Número de tarjeta
          <img src="/images/visa.png" style={{ width: "25px" }} alt="" />
          <img src="/images/mastercard.png" style={{ width: "25px" }} alt="" />
        </InputLabel>
        <FormControl>
          <Input
            type="text"
            value={cardNumber}
            onChange={(input) => {
              if (input.target.value.length <= 16)
                setCardNumber(input.target.value);
            }}
            id="card_number"
          ></Input>
        </FormControl>
        <InputLabel htmlFor="card_name">Titular de la tarjeta</InputLabel>
        <FormControl>
          <Input
            value={cardName}
            onChange={(input) => setCardName(input.target.value)}
            type="text"
            id="card_name"
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="card_expiry">Fecha de caducidad</InputLabel>
          <Input
            value={cardExpiry}
            onChange={(input) => {
              if (input.target.value.length <= 5)
                setCardExpiry(input.target.value);
            }}
            type="text"
            id="card_expiry"
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="card_cvc">Código de seguridad</InputLabel>
          <Input
            value={cardCvc}
            onChange={(input) => {
              if (input.target.value.length <= 3)
                setCardCvc(input.target.value);
            }}
            type="text"
            id="card_cvc"
          ></Input>
        </FormControl>
        <Button
          onClick={() => {
            if (paymentAvailable) checkout();
            // window.location.reload();
          }}
          type="submit"
          color="success"
          variant="solid"
        >
          Terminar pedido
        </Button>{" "}
      </CardContent>
    </Card>
  );
};
