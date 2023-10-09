import { Container, Typography } from "@mui/joy";
import OrderForm from "../components/OrderForm";

const values = [
  {
    id: 1,
    name: "Spaghetti clásico",
    price: "2000",
    description: `                Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Laboriosam doloribus et voluptatibus dicta ab aspernatur dolorum
    labore! Assumenda ab dignissimos maiores, soluta, et ratione
    blanditiis rerum saepe ipsum omnis id.`,
    available: true,
  },
  {
    name: "Lasagna clásica",
    price: "4000",
    description: `                Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Laboriosam doloribus et voluptatibus dicta ab aspernatur dolorum
    labore! Assumenda ab dignissimos maiores, soluta, et ratione
    blanditiis rerum saepe ipsum omnis id.`,
    id: 2,
    available: true,
  },
  {
    name: "Ravioles",
    price: "1500",
    description: `                Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Laboriosam doloribus et voluptatibus dicta ab aspernatur dolorum
    labore! Assumenda ab dignissimos maiores, soluta, et ratione
    blanditiis rerum saepe ipsum omnis id.`,
    id: 3,
    available: true,
  },
  {
    name: "Carbonara",
    price: "3000",
    description: `                Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Laboriosam doloribus et voluptatibus dicta ab aspernatur dolorum
    labore! Assumenda ab dignissimos maiores, soluta, et ratione
    blanditiis rerum saepe ipsum omnis id.`,
    id: 4,
    available: true,
  },
  {
    name: "Cappeletti",
    price: "1650",
    description: `                Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Laboriosam doloribus et voluptatibus dicta ab aspernatur dolorum
    labore! Assumenda ab dignissimos maiores, soluta, et ratione
    blanditiis rerum saepe ipsum omnis id.`,
    id: 5,
    available: true,
  },
];

function Pedidos() {
  return (
    <Container>
      <Typography fontSize={40} m={3} component={"h1"}>
        Realiza tu pedido
      </Typography>

      <OrderForm menus={values}></OrderForm>
    </Container>
  );
}

export default Pedidos;
