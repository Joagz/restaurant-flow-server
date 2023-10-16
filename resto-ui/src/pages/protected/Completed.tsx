import { Grid, ListItem, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { orderApi } from "../../api/orderApi";
import { Chip } from "@mui/joy";
import { Order } from "../../interfaces/Order";

export default function Completed() {
  const [menus, setMenus] = useState<Order[]>([]);

  useEffect(() => {
    orderApi
      .get<Order[]>("", { params: { completed: 1 } })
      .then((res) => setMenus(res.data));
  }, []);

  return (
    <Grid container p={5}>
      <Typography variant="h4" width={"100%"}>
        Pedidos Completados:
      </Typography>
      {menus.map((item) => (
        <Grid
          position={"relative"}
          sx={{
            transition: ".2s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          my={5}
          p={1}
        >
          <Grid
            bgcolor={"#111"}
            p={2}
            py={5}
            width={"100%"}
            item
            component={Paper}
          >
            <Chip
              sx={{ position: "absolute", top: -25, p: 1 }}
              size="lg"
              variant="solid"
              color={"success"}
            >
              COMPLETADO
            </Chip>
            <Grid container width={"100%"} py={1}>
              <Typography
                px={2}
                fontSize={20}
                sx={{ wordBreak: "break-word", color: "#fff" }}
              >
                {item?.name}
              </Typography>
              {item.items.map((menu) => (
                <Grid
                  item
                  xs={12}
                  my={1}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItem sx={{ fontSize: 16, color: "#fff" }}>
                    {menu.name}
                  </ListItem>
                  <ListItem
                    sx={{
                      fontSize: 16,
                      color: "#fff",
                      bgcolor: "#222",
                      borderRadius: 1,
                    }}
                  >
                    ${menu.price}
                  </ListItem>
                </Grid>
              ))}
              <Typography color={"#fff"} fontWeight={600} m={2} fontSize={20}>
                Precio final: {item.payment?.total}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
