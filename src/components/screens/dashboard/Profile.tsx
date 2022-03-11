// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import {
  Box,
  Image,
  Stack,
  Heading,
  Flex,
  Text,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

// import { octokit } from "config/octokit";
import { octokit } from "config/octokit";

const ProfileContainer = styled(Box)`
  margin: 0 auto;
  padding: 12px;

  .profile-grid {
    display: grid;
    grid-template-columns: 2fr 3fr;
  }

  .profile-image {
    border-radius: 30px;
    margin: 0 auto;
  }

  .profile-info {
    border-radius: 30px;
    padding: 20px 10px;
    border: 1px solid;
  }
`;

const Profile = () => {
  const { colorMode } = useColorMode();
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    const username = localStorage.getItem("githubUsername");
    async function fetchData() {
      return octokit.rest.users.getByUsername({ username });
    }
    const response = fetchData();
    response.then((r) => setData(r.data)).catch((err) => setError(err));
  }, []);

  return (
    <ProfileContainer>
      {data === {} && !error ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Box className="profile-grid">
          <Stack>
            <Image
              className="profile-image"
              src="https://avatars.githubusercontent.com/u/56754747"
              boxSize="300px"
            />
          </Stack>
          <Box
            className="profile-info"
            bgColor={colorMode === "dark" ? "#03045e" : "#ade8f4"}
            borderColor={colorMode === "dark" ? "#ade8f4" : "#03045e"}
          >
            <Heading fontWeight="extrabold">{`Username: ${data?.login}`}</Heading>
            <Flex>
              <Text mr={5} fontSize="xl" fontWeight="bold">
                Followers: 100
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                Following: 20
              </Text>
            </Flex>
            <Text fontSize="xl" fontWeight="bold">
              Total Repositories: 1800
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              Total Contributions: 1800
            </Text>
          </Box>
        </Box>
      )}
    </ProfileContainer>
  );
};

export default Profile;
