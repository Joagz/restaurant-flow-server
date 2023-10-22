import { Button, Container, FormControl, Input, Typography } from "@mui/joy";
import { InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";

interface props {
  login: (data: any) => void;
}
function Login({ login }: props) {
  const { register, handleSubmit } = useForm();

  return (
    <Container
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 5,
      }}
    >
      <Typography fontSize={40} fontFamily={"Georgia"} color="success">
        Ingresar al Sistema
      </Typography>
      <form
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
        onSubmit={handleSubmit(login)}
      >
        <FormControl>
          <InputLabel htmlFor="username">Usuario</InputLabel>
          <Input
            color="success"
            {...register("username")}
            variant="outlined"
            type="text"
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Clave</InputLabel>
          <Input
            color="success"
            {...register("password")}
            variant="outlined"
            type="password"
          ></Input>
        </FormControl>
        <Button color="success" type="submit" variant="solid">
          Ingresar
        </Button>
      </form>
    </Container>
  );
}

export default Login;
