import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";

import type { LoginProps } from "../../../types";

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginComponent = ({ login }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(username, email, password);
  };

  return (
    <Wrapper>
      <FormControl mb={3}>
        <FormLabel htmlFor="ghusername">GitHub Username</FormLabel>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="ghusername"
          type="text"
        />
        <FormHelperText>Enter your GitHub Username</FormHelperText>
      </FormControl>
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
      <Button onClick={handleLogin}>Login</Button>
    </Wrapper>
  );
};

export default LoginComponent;
