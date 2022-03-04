/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { BiRocket, BiLogIn } from "react-icons/bi";

import { AuthContext } from "lib/auth";

import LoginComponent from "./Signin";
import SignupComponent from "./Signup";

const Container = styled(Box)`
  border: 4px solid;
  max-width: 600px;
  margin: 5% auto;
  padding: 12px;
`;

function Auth() {
  const { login, signup } = useContext(AuthContext);
  const [tabs, setTabs] = useState("signin");
  const { colorMode } = useColorMode();
  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Button
          mr={3}
          leftIcon={<BiRocket />}
          colorScheme="facebook"
          variant="solid"
          onClick={() => setTabs("signup")}
        >
          Sign Up
        </Button>
        <Button
          rightIcon={<BiLogIn />}
          colorScheme="facebook"
          variant="solid"
          onClick={() => setTabs("signin")}
        >
          Login
        </Button>
      </Flex>
      <Container
        borderRadius="xl"
        borderColor={colorMode === "dark" ? "#fbc4ab" : "#000"}
      >
        {tabs === "signup" && <SignupComponent signup={signup} />}
        {tabs === "signin" && <LoginComponent login={login} />}
      </Container>
    </>
  );
}

export default Auth;
