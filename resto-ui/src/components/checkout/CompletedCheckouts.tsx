import { Grid, Card, CardContent, Typography, List, ListItem } from "@mui/joy";
import { Order } from "../../interfaces/Order";

type Props = {orders: Order[]};

export default function CompletedCheckouts({orders}: Props) {
  return (
    <Grid p={2} container>
      {orders.map((order) => (
        <Grid xs={12} md={6} px={1}>
          <Card color="success">
            <CardContent>
              <Typography fontSize={25} fontWeight={700}>
                Información del pedido:
              </Typography>
              <List sx={{ fontSize: 18 }}>
                <ListItem> Estado: Pendiente</ListItem>
                <ListItem>Comprador: {order.name}</ListItem>
              </List>
              <Typography fontSize={20} fontWeight={700}>
                Menúes solicitados:{" "}
              </Typography>
              <List sx={{ fontSize: 18 }}>
                {order?.items?.map((menu) => (
                  <ListItem>
                    {menu.name} - ${menu.price}ARS
                  </ListItem>
                ))}
              </List>
              <Typography fontSize={20} fontWeight={700}>
                Método de pago:
              </Typography>
              <List sx={{ fontSize: 18 }}>
                <ListItem>Titular: {order?.payment?.cardName}</ListItem>
                <ListItem>
                  Número de Tarjeta: ************
                  {order?.payment?.cardNumber?.substring(11, 15)}
                </ListItem>
              </List>
              <br />
              <Typography fontSize={25} fontWeight={700}>
                Importe final: ${order?.payment?.total}ARS
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
