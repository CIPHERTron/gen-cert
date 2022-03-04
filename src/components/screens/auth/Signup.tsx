/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

import type { SignupProps } from "../../../types";
import { db } from "config/firebase";

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

export default SignupComponent;
