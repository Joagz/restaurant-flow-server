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
import { useState } from "react";
import { Menu } from "../../interfaces/Menu";
import { v4 as uuidv4 } from "uuid";
import { menuApi } from "../../api/menuApi";
import CompletedOrdersMenu from "./CompletedOrdersMenu";

type Props = {
  menus: Menu[];
};

export default function OrderForm({ menus }: Props) {
  // ? Value state of menu selection
  const [value] = useState("Elige un menú");
  // ? buyer's name
  const [name, setName] = useState("");
  // ? Show orders made
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

  function deleteValue(value: any) {
    setSelectedList([...selectedList.filter((n) => n.slug !== value.slug)]);
    selectedList.forEach((n) => setFinalPrice(finalPrice - value.price));
  }

  return (
    <>
      <CompletedOrdersMenu
        finalPrice={finalPrice}
        name={name}
        selectedList={selectedList}
        checkoutMenuVisible={checkoutMenuVisible}
        setCheckoutMenuVisible={setCheckoutMenuVisible}
      />
      <Typography fontSize={20} m={3} component={"h1"}>
        Realizar nuevo pedido
      </Typography>

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
