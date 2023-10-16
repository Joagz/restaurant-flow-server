import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { Chip, Typography } from "@mui/joy";
import { Order, Payment } from "../../interfaces/Order";
import { checkoutApi } from "../../api/checkoutApi";
import { orderApi } from "../../api/orderApi";

import { PaymentDto } from "../../interfaces/PaymentDto";
import { useStompClient } from "react-stomp-hooks";
import { Menu } from "../../interfaces/Menu";
import CheckoutMenu from "../checkout/CheckoutMenu";

type OrderMenuProps = {
  finalPrice: number;
  name: string;
  selectedList: Menu[];
  checkoutMenuVisible: boolean;
  setCheckoutMenuVisible: React.SetStateAction<Boolean> | any;
};

export default function CompletedOrdersMenu({
  finalPrice,
  name,
  selectedList,
  checkoutMenuVisible,
  setCheckoutMenuVisible,
}: OrderMenuProps) {
  const [showOrders, setShowOrders] = useState(false);
  const stomp = useStompClient();

  async function sendOrder(payment: Payment) {
    payment.total = finalPrice;

    const order = await orderApi
      .post<Order>("", { name, items: selectedList })
      .then((order) => {
        checkoutApi
          .post("", {
            price: finalPrice,
            order: order.data.id,
          })
          .then((checkout) => {
            const paymentDto: PaymentDto = {
              fullName: payment.cardName,
              expirationDate: payment.cardExpiry,
              cardType: "CREDIT",
              company: "VISA",
              total: finalPrice,
              cardNumber: payment.cardNumber,
              securityCode: payment.cardCvc,
            };

            checkoutApi.post("/payment", paymentDto, {
              params: { checkout_id: checkout.data.id },
              headers: { "Access-Control-Allow-Origin": "*" },
            });
          })
          .catch((err) => console.log(err));
        return order;
      })
      .catch((err) => console.log(err));

    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders")!);
      orders.push(order?.data);
      localStorage.setItem("orders", JSON.stringify(orders));
    } else {
      localStorage.setItem("orders", JSON.stringify([order?.data]));
    }

    if (stomp) {
      stomp.publish({
        body: JSON.stringify(order?.data),
        destination: "/app/order",
      });
      stomp.connectHeaders = {
        orders: JSON.stringify({
          id: order?.data.id,
          items: selectedList,
          price: finalPrice,
          completed: false,
        }),
      };
    }

    window.location.replace("/pedidos");
  }

  return (
    <>
      <Typography fontSize={20} m={3} component={"h1"}>
        Ordenes completadas
      </Typography>
      {!localStorage.getItem("orders") ? (
        <Typography m={3}>No se ha realizado ningún pedido.</Typography>
      ) : (
        <>
          <Chip
            sx={{ m: 3, p: 1 }}
            onClick={() => setShowOrders(!showOrders)}
            variant="outlined"
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Mostrar Pedidos{" "}
              {!showOrders ? <ArrowDropDownRounded /> : <ArrowDropUpRounded />}
            </Typography>
          </Chip>
        </>
      )}
      <CheckoutMenu
        showOrders={showOrders}
        sendOrder={sendOrder}
        checkoutMenuVisible={checkoutMenuVisible}
        setCheckoutMenuVisible={setCheckoutMenuVisible}
      ></CheckoutMenu>
    </>
  );
}
