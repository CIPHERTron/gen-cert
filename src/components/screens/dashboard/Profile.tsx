// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Box,
  Image,
  Stack,
  Heading,
  Flex,
  Text,
  Spinner,
  Badge,
  Button,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { FaTwitter, FaExternalLinkAlt } from "react-icons/fa";

import { octokit } from "config/octokit";

const ProfileContainer = styled(Box)`
  margin: 0 auto;
  padding: 12px;

  .profile-grid {
    display: grid;
    grid-template-columns: 3fr 5fr;
    border: 1px solid;
    border-radius: 30px;
  }

  .profile-image {
    border-radius: 30px 0 0 30px;
    margin: 0;
  }

  .profile-info {
    padding: 20px 20px 20px 0;
  }
`;

const Profile = () => {
  const { colorMode } = useColorMode();
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    const username = localStorage.getItem("githubUsername");
    async function fetchData() {
      if (username != null)
        return octokit.rest.users.getByUsername({ username });

      return {};
    }
    if (username != null) {
      const response = fetchData();
      response.then((r) => setData(r.data)).catch((err) => setError(err));
    }
  }, []);

  return (
    <ProfileContainer>
      {data === {} || !error ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="cyan.100"
          size="xl"
        />
      ) : (
        <Box
          className="profile-grid"
          bgColor={colorMode === "dark" ? "#03045e" : "#ade8f4"}
          borderColor={colorMode === "dark" ? "#ade8f4" : "#03045e"}
        >
          <Stack>
            <Image
              className="profile-image"
              src={data?.avatar_url}
              boxSize="310px"
            />
          </Stack>
          <Box className="profile-info">
            <Heading
              mb="8px"
              fontWeight="extrabold"
            >{`${data?.name} / ${data?.login}`}</Heading>
            <Badge
              fontSize="xl"
              colorScheme="green"
              mb="8px"
            >{`${data?.company}`}</Badge>
            <Text
              mb="8px"
              fontSize="md"
              fontWeight="bold"
            >{`"${data?.bio}"`}</Text>
            <Flex mb="8px">
              <Text mr={5} fontSize="xl" fontWeight="bold">
                {`Followers: ${data?.followers}`}
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {`Following: ${data?.following}`}
              </Text>
            </Flex>
            <Flex mb="8px">
              <Text mr={5} fontSize="xl" fontWeight="bold">
                {`Repositories: ${data?.public_repos}`}
              </Text>
              <Text mr={5} fontSize="xl" fontWeight="bold">
                {`Private Repos: ${data?.total_private_repos}`}
              </Text>
            </Flex>
            <Stack mb="8px" direction="row" spacing={6}>
              <Link href={`https://${data?.blog}`}>
                <Button
                  rightIcon={<FaExternalLinkAlt />}
                  colorScheme="telegram"
                  variant="outline"
                >
                  Website
                </Button>
              </Link>
              <Link href={`https://${data?.twitter_username}`}>
                <Text fontSize="xl" fontWeight="bold">
                  <Button
                    leftIcon={<FaTwitter />}
                    colorScheme="linkedin"
                    variant="solid"
                  >
                    Twitter
                  </Button>
                </Text>
              </Link>
            </Stack>
          </Box>
        </Box>
      )}
    </ProfileContainer>
  );
};

export default Profile;
