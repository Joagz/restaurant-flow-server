import { Delete } from "@mui/icons-material";
import {
  FormControl,
  Input,
  Select,
  Card,
  Typography,
  CardContent,
  ListItem,
  Option,
  Button,
} from "@mui/joy";
import { CardActionArea } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import CheckoutMenu from "./CheckoutMenu";
import { Payment } from "../interfaces/Order";
import { checkoutApi } from "../api/checkoutApi";
import { orderApi } from "../api/orderApi";
import { Menu } from "../interfaces/Menu";
import { v4 as uuidv4 } from "uuid";
import { menuApi } from "../api/menuApi";
import { PaymentDto } from "../interfaces/PaymentDto";
type Props = {
  menus: Menu[];
};

export default function OrderForm({ menus }: Props) {
  // ? Value state of menu selection
  const [value] = useState("Elige un menú");
  // ? buyer's name
  const [name, setName] = useState("");
  // ? Selected list of menus
  const [selectedList, setSelectedList] = useState<Menu[]>([]);
  // ? Set if trash icon is visible
  const [trashVisible, setTrashVisible] = useState<string>("");
  // ? set if display info or not
  const [infoDisplay, setInfoDisplay] = useState<string>("");
  // ? final price
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const [checkoutMenuVisible, setCheckoutMenuVisible] =
    useState<boolean>(false);

  const stomp = useStompClient();

  function addValue(id: number) {
    menuApi.get(`/${id}`).then((res) => {
      const value = {
        ...res.data,
        slug: uuidv4(),
      };
      setFinalPrice(finalPrice + Number.parseInt(res.data.price));
      setSelectedList([...selectedList, value]);
    });
  }

  async function sendOrder(payment: Payment) {
    payment.total = finalPrice;

    const order = await orderApi
      .post("", { name, items: selectedList })
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
          items: selectedList,
          price: finalPrice,
        }),
      };
    }
  }

  function deleteValue(value: any) {
    setSelectedList([...selectedList.filter((n) => n.slug !== value.slug)]);
    selectedList.forEach((n) => setFinalPrice(finalPrice - value.price));
  }

  return (
    <>
      <>
        <CheckoutMenu
          sendOrder={sendOrder}
          checkoutMenuVisible={checkoutMenuVisible}
          setCheckoutMenuVisible={setCheckoutMenuVisible}
        ></CheckoutMenu>
      </>

      <FormControl sx={{ m: 3, gap: 3 }}>
        <Input
          placeholder="Nombre y Apellido"
          required
          onChange={(input) => setName(input.target.value)}
        ></Input>
      </FormControl>
      <FormControl sx={{ m: 3, gap: 3 }}>
        <Select value={value} title="Elige un menú" required>
          <Option value={"Elige un menú"}>Elige un menú</Option>
          {menus.map((v) => (
            <Option
              key={v.slug}
              onClick={() => {
                addValue(v.id);
              }}
              value={v}
            >
              {v.name}
            </Option>
          ))}
        </Select>
      </FormControl>
      {selectedList.map((item) => (
        <Card key={item.slug} sx={{ m: 3, gap: 3 }}>
          <CardActionArea
            onMouseEnter={() => setTrashVisible(item.slug!)}
            onClick={() =>
              setInfoDisplay(infoDisplay === item.slug! ? "" : item.slug!)
            }
            onMouseLeave={() => setTrashVisible("")}
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>{item.name}</Typography>
            {trashVisible === item.slug && (
              <Delete onClick={() => deleteValue(item)} color="error"></Delete>
            )}
          </CardActionArea>
          {infoDisplay === item.slug && (
            <CardContent sx={{ padding: 3, bgcolor: "#f0f0f0" }}>
              <Typography>{item.description}</Typography>
              <br />
              <Typography fontWeight={500}>Precio: ${item.price}</Typography>
            </CardContent>
          )}
        </Card>
      ))}
      {selectedList.length > 0 && name && (
        <Card sx={{ m: 3, gap: 3, p: 3 }}>
          <Typography fontWeight={500} fontSize={20}>
            Selección:
          </Typography>
          {selectedList.map((item) => (
            <ListItem sx={{ pl: 1 }}>
              {item.name}
              {"  ---  "}${item.price}
            </ListItem>
          ))}
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={500} fontSize={30}>
              Total: ${finalPrice}
            </Typography>
            <Typography fontSize={15}>
              Los precios incluyen IVA (21%)
            </Typography>
          </div>
          <br />

          {/* Confirm Action */}
          <Button onClick={() => setCheckoutMenuVisible(true)} variant="solid">
            Realizar pedido
          </Button>
        </Card>
      )}
    </>
  );
}
