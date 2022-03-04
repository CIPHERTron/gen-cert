import {
  Box,
  Flex,
  Text,
  Tooltip,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";

import { AuthContext } from "lib/auth";

import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

const Logout = ({ logout }) => {
  return (
    <Box>
      <Tooltip label="Logout">
        <IconButton
          aria-label="logout of instadevs"
          icon={<FaSignOutAlt />}
          onClick={logout}
          backgroundColor="transparent"
        />
      </Tooltip>
    </Box>
  );
};

const Header = () => {
  const { colorMode } = useColorMode();
  const { logout, user } = useContext(AuthContext);

  return (
    <Box
      position="fixed"
      top={0}
      zIndex={5}
      backgroundColor={
        colorMode === "light" ? "rgba(247, 250, 252, 0.8)" : "#03071e"
      }
      layerStyle="blur-bg"
      width="full"
    >
      <Flex
        layerStyle="layoutBlock"
        marginX="auto"
        maxWidth="1000px"
        as="header"
        alignItems="center"
        justifyContent="space-around"
      >
        <Link href="/" passHref>
          <Text
            style={{ fontWeight: "bolder" }}
            as="a"
            cursor="pointer"
            fontSize={["md", "xl"]}
          >
            InstaDevs
          </Text>
        </Link>

        <Navigation />

        <div style={{ display: "flex" }}>
          {user && <Logout logout={logout} />}
          <ThemeToggle />
        </div>
      </Flex>
    </Box>
  );
};

export default Header;
