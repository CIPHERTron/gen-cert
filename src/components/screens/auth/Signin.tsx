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

export default LoginComponent;
