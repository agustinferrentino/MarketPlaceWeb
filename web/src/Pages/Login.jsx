import React, { useState } from "react";
import { Button, Flex, Title } from "@mantine/core";
import { Input, PasswordInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useNavigate, useNavigation } from "react-router-dom";
function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (email === "test@example.com" && password.length >= 8) {
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      console.error("Invalid credentials");
    }
  };

  return (
    <Flex
      direction={"column"}
      w={"100vw"}
      align={"center"}
      justify={"center"}
      h={"100vh"}
    >
      <Flex
        direction={"column"}
        w={"30%"}
        align={"center"}
        justify={"space-around"}
        bg={"gray"}
        h={"35%"}
        style={{ borderRadius: "10px" }}
      >
        <Title>MarketPlace</Title>
        <Input.Wrapper label="Email or Username" w={"80%"}>
          <Input
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftSection={<IconAt size={16} />}
          />
        </Input.Wrapper>
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftSection={<IconLock size={16} />}
          w={"80%"}
        />
        <Button onClick={() => handleLogin()}>Login</Button>
      </Flex>
    </Flex>
  );
}

export default Login;
