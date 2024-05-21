import { Button, Flex, Title } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ setIsAuthenticated }) {
  const navigate = useNavigate();
  return (
    <Flex direction={"column"} align={"center"} w={"100vw"} h={"60vh"} gap={15}>
      <Title order={1}>Bienvenido al Marketplace</Title>
      <Title order={2}>Información general sobre el sistema.</Title>
      <Flex w={"100%"} justify={"center"} gap={15}>
        <Button onClick={() => navigate("/calcular")}>Ver MarketPlace</Button>
        <Button onClick={() => setIsAuthenticated(false)}>Logout</Button>
      </Flex>
    </Flex>
  );
}

export default Home;
