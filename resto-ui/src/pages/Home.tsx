import { Container, Grid, Typography } from "@mui/material";
import Footer from "../components/ui/Footer";
import TopNavigation from "../components/ui/TopNavigation";

const Home = () => {
  return (
    <Container sx={{ width: { xs: "95%", sm: "80%" } }}>
      <TopNavigation />
      <Grid
        sx={{
          p: 2,
          pt: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h3" component="h1" fontSize={70}>
          Ciraldoe's
        </Typography>
        <Typography variant="body2" component="p">
          Las mejores pastas del país.
        </Typography>
      </Grid>
      <Grid p={5} gap={2} xs={12} display={"flex"} flexDirection={"column"}>
        <Typography variant="h5" textAlign={"center"} fontSize={50}>
          Sobre nosotros
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et mollitia
          sint, in sunt est ipsa ipsum ducimus alias magni architecto, nobis,
          commodi quisquam ullam? Magni numquam, fugit atque quae nulla corporis
          harum soluta doloribus aut placeat in odit quaerat minima officiis,
          pariatur totam nam veritatis voluptate delectus dolorem id quod!
        </Typography>
        <div style={{ border: "10px solid black", display: "flex" }}>
          <img
            src="/images/pasta.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "1px solid white",
            }}
          />
        </div>
      </Grid>
      <Grid p={5} gap={2} xs={12} display={"flex"} flexDirection={"column"}>
        <Typography variant="h5" textAlign={"center"} fontSize={50}>
          Historia
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et mollitia
          sint, in sunt est ipsa ipsum ducimus alias magni architecto, nobis,
          commodi quisquam ullam? Magni numquam, fugit atque quae nulla corporis
          harum soluta doloribus aut placeat in odit quaerat minima officiis,
          pariatur totam nam veritatis voluptate delectus dolorem id quod!
        </Typography>
        <div style={{ border: "10px solid black", display: "flex" }}>
          <img
            src="/images/old.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "1px solid white",
            }}
          />
        </div>
      </Grid>
      <Footer />
    </Container>
  );
};

export default Home;
