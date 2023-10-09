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
  Container,
} from "@mui/joy";
import { CardActionArea, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import CheckoutMenu from "./CheckoutMenu";

type Props = {
  menus: Array<{
    id: number;
    name: string;
    price: string;
    description: string;
    available: boolean;
  }>;
};

export default function OrderForm({ menus }: Props) {
  // ? Value state of menu selection
  const [value] = useState("Elige un menú");
  // ? buyer's name
  const [name, setName] = useState("");
  // ? Selected list of menus
  const [selectedList, setSelectedList] = useState<any[]>([]);
  // ? Set if trash icon is visible
  const [trashVisible, setTrashVisible] = useState<string>("");
  // ? set if display info or not
  const [infoDisplay, setInfoDisplay] = useState<string>("");
  // ? final price
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const [checkoutMenuVisible, setCheckoutMenuVisible] =
    useState<boolean>(false);

  const stomp = useStompClient();

  function addValue(value: any) {
    setFinalPrice(finalPrice + Number.parseInt(value.price));
    setSelectedList([...selectedList, value]);
  }

  function sendOrder() {
    if (stomp) {
      stomp.publish({
        body: JSON.stringify({ name, items: selectedList }),
        destination: "/app/order",
      });
      stomp.connectHeaders = {
        orders: JSON.stringify({ items: selectedList, price: finalPrice }),
      };
    }
  }

  function deleteValue(value: any) {
    setSelectedList([...selectedList.filter((n) => n.name !== value.name)]);
    selectedList.forEach((n) => setFinalPrice(finalPrice - value.price));
  }
  useEffect(() => {}, [selectedList]);

  function log(v: any) {
    addValue(v);
    console.log(v);
  }

  return (
    <>
      <>
        <CheckoutMenu
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
            <Option onClick={() => log(v)} value={v}>
              {v.name}
            </Option>
          ))}
        </Select>
      </FormControl>
      {selectedList.map((item) => (
        <Card sx={{ m: 3, gap: 3 }}>
          <CardActionArea
            onMouseEnter={() => setTrashVisible(item.name)}
            onClick={() =>
              setInfoDisplay(infoDisplay === item.name ? "" : item.name)
            }
            onMouseLeave={() => setTrashVisible("")}
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>{item.name}</Typography>
            {trashVisible === item.name && (
              <Delete onClick={() => deleteValue(item)} color="error"></Delete>
            )}
          </CardActionArea>
          {infoDisplay === item.name && (
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
