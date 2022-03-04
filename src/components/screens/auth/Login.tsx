/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";

import type { LoginProps, SignupProps } from "../../../types";
import { db } from "config/firebase";
import { AuthContext } from "lib/auth";

const Container = styled(Box)`
  border: 4px solid;
  max-width: 600px;
  margin: 5% auto;
`;
const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupComponent = ({ signup }: SignupProps) => {
  const [ghUsername, setGhUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async () => {
    await setDoc(doc(db, "registeredUsers", ghUsername), {
      githubUsername: ghUsername,
      email,
    });
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    addUser();
    signup(email, password);
  };

  return (
    <Wrapper>
      <FormControl mb={3}>
        <FormLabel htmlFor="github">GitHub Username</FormLabel>
        <Input
          onChange={(e) => setGhUsername(e.target.value)}
          value={ghUsername}
          id="github"
          type="text"
        />
        <FormHelperText>Enter your GitHub username</FormHelperText>
      </FormControl>
      <FormControl mb={3}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="signup-email"
          type="email"
        />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
      </FormControl>
      <FormControl mb={3}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="signup-password"
          type="password"
        />
        <FormHelperText>Enter a strong password</FormHelperText>
      </FormControl>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </Wrapper>
  );
};

const LoginComponent = ({ login }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Wrapper>
      <FormControl mb={3}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          type="email"
        />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
      </FormControl>
      <FormControl mb={3}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          type="password"
        />
        <FormHelperText>Enter a strong password</FormHelperText>
      </FormControl>
      <Button onClick={() => login(email, password)}>Login</Button>
    </Wrapper>
  );
};

function Login() {
  const { login, signup } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  return (
    <Container
      borderRadius="xl"
      borderColor={colorMode === "dark" ? "#fbc4ab" : "#000"}
    >
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Sign-Up</Tab>
          <Tab>Login</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignupComponent signup={signup} />
          </TabPanel>
          <TabPanel>
            <LoginComponent login={login} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Login;
