import { Button, Container, Input, SvgIcon, styled } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Menu } from "../../interfaces/Menu";
import { InputLabel, Typography } from "@mui/material";
import { menuApi } from "../../api/menuApi";
import Authenticate from "../auth/Authenticate";
import OrderNavigation from "../../components/ui/OrderNavigation";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

function NewMenu() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Menu>();

  const uploadMenu = (data: any) => {
    menuApi
      .post(
        "",
        {
          menu_id: 0,
          name: data.name,
          image: data.image[0],
          description: data.description,
          price: data.price,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then(() => window.location.reload());
  };

  return (
    <Authenticate>
      <Container sx={{ p: 5 }}>
        <OrderNavigation />
        <form
          encType="multipart/form-data"
          style={{ gap: 15, display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(uploadMenu)}
        >
          {errors.name && <Typography>Ingrese un nombre</Typography>}
          <InputLabel variant="filled" htmlFor="name">
            Nombre del menú
          </InputLabel>
          <Input type="text" {...register("name")} />{" "}
          {errors.description && (
            <Typography>Ingrese una descripción</Typography>
          )}
          <InputLabel variant="filled" htmlFor="description">
            Descripción
          </InputLabel>
          <Input type="text" {...register("description")} />
          {errors.price && <Typography>Ingrese un precio</Typography>}
          <InputLabel variant="filled" htmlFor="price">
            Precio
          </InputLabel>
          <Input variant="outlined" type="text" {...register("price")} />{" "}
          <InputLabel variant="filled" htmlFor="price">
            Imágen del menú
          </InputLabel>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </SvgIcon>
            }
          >
            Subir
            <VisuallyHiddenInput type="file" {...register("image")} />
          </Button>
          <Button type="submit">Enviar</Button>
        </form>
      </Container>
    </Authenticate>
  );
}

export default NewMenu;
