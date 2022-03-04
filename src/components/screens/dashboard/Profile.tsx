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
import { query, collection, getDocs } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";

import { db } from "config/firebase";
import { AuthContext } from "lib/auth";

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
  const value = useContext(AuthContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchusername = async () => {
      const q = query(collection(db, "registeredUsers"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.data().email === value.email) {
          setUsername(doc.data().githubUsername);
        }
      });
    };
    fetchusername();
  }, [value.email]);

  return (
    <ProfileContainer>
      {username === null ? (
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
            <Heading fontWeight="extrabold">{`Username: ${username}`}</Heading>
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
