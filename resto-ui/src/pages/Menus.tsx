import { Container, Typography, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Menu } from "../interfaces/Menu";
import { menuApi } from "../api/menuApi";
import TopNavigation from "../components/ui/TopNavigation";
import { Card, CardContent } from "@mui/joy";

function Menus() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showMenuInfo, setShowMenuInfo] = useState<any>();

  useEffect(() => {
    menuApi.get("").then((res) => setMenus(res.data));
  }, []);

  function showInfo(id: any) {
    if (id === showMenuInfo) {
      setShowMenuInfo("");
    } else {
      setShowMenuInfo(id);
    }
  }

  return (
    <>
      <TopNavigation />
      <Container sx={{ mt: 15 }}>
        <Typography m={1.5} component={"h1"} variant={"h3"}>
          Menúes disponibles
        </Typography>
        <Grid container m={0}>
          {menus.map((menu) => (
            <Grid item xs={12} p={2}>
              <Card
                variant="outlined"
                sx={{
                  "&:hover": { bgcolor: "#eee" },
                  cursor: "pointer",
                  display: "flex",
                }}
                component={Paper}
                elevation={1}
                onClick={() => showInfo(menu.id)}
              >
                <CardContent
                  sx={{
                    width: "100%",
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant={"h6"} fontWeight={700}>
                    {menu.name}
                  </Typography>
                  <Typography variant={"body2"}>{menu.description}</Typography>{" "}
                  <Typography variant={"body1"}>${menu.price}ARS</Typography>{" "}
                  <img
                    style={{
                      height: "auto",
                      width: "100%",
                      borderRadius: 10,
                      visibility: `${
                        showMenuInfo === menu.id ? "visible" : "hidden"
                      }`,
                      position: `${
                        showMenuInfo === menu.id ? "relative" : "absolute"
                      }`,
                    }}
                    src={`http://${process.env.REACT_APP_SERVER_ADDRESS}:8080/api/image/${menu.id}`}
                    alt="menu"
                  ></img>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Menus;
