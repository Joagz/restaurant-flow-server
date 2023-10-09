import { Card, FormControl, Input, Button } from "@mui/joy";
import { InputLabel } from "@mui/material";
import React, { SetStateAction, useState } from "react";

type Props = {
  checkoutMenuVisible: boolean;
  setCheckoutMenuVisible: SetStateAction<boolean> | any;
};

export default function CheckoutMenu({
  checkoutMenuVisible,
  setCheckoutMenuVisible,
}: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  return (
    <>
      {checkoutMenuVisible && (
        <>
          <Card
            sx={{
              position: "fixed",
              zIndex: 500,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: 10,
            }}
          >
            <InputLabel
              sx={{ display: "flex", gap: 2, alignItems: "center" }}
              htmlFor="card_number"
            >
              Número de tarjeta
              <img src="/images/visa.png" style={{ width: "25px" }} alt="" />
              <img
                src="/images/mastercard.png"
                style={{ width: "25px" }}
                alt=""
              />
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
            <div style={{ display: "flex", alignItems: "start", gap: 10 }}>
              <FormControl>
                <InputLabel htmlFor="card_expiry">
                  Fecha de caducidad
                </InputLabel>
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
            </div>

            <Button type="submit" color="success" variant="solid">
              Confirmar pago
            </Button>
          </Card>
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
