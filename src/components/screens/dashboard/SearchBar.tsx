/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
// @ts-nocheck
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import { octokit } from "config/octokit";

import PreviewPR from "./PreviewPR";

const Wrapper = styled(Box)`
  margin: 3% auto;
`;

const SearchBar = () => {
  const [repo, setRepo] = useState("");
  const [pr, setPr] = useState([]);

  const fetchPulls = () => {
    const repoDetails = repo.split("/");
    const pulls = octokit.rest.pulls.list({
      owner: repoDetails[0],
      repo: repoDetails[1],
    });
    pulls
      .then((res) => {
        console.log(res.data);
        const arr = res.data.filter((item) => item.user?.login === "tengqm");
        console.log(arr);
        setPr(arr);
      })
      // .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <HStack>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={`Enter the repository name in "org/repo" format`}
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
        </InputGroup>
        <Button onClick={fetchPulls} borderRadius="8px" colorScheme="linkedin">
          Fetch
        </Button>
      </HStack>
      <Stack mt={10} spacing={3}>
        {pr.map((item) => (
          <PreviewPR
            key={item.title}
            url={item.html_url}
            title={item.title}
            desc={item.body}
            base={item.base.ref}
            head={item.head.ref}
          />
        ))}
      </Stack>
    </Wrapper>
  );
};

export default SearchBar;
