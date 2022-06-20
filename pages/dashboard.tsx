import type { NextPage } from "next";

//importing local components
import Layout from "../components/Layout";

//importing chakra ui components
import { Box, Center, Container } from "@chakra-ui/react";

const Dashboard: NextPage = () => {
  return (
    <Box>
      <Layout>
        <Box m={"4.5em 8.5em"} backgroundColor={"black"} display={["none", "none", "block"]}></Box>
        <Container maxW="container.full" backgroundColor={"#ffffff"} m={"4.5em 1.3em"} ms={"2"} borderRadius={"1em "}></Container>
      </Layout>
    </Box>
  );
};

export default Dashboard;
