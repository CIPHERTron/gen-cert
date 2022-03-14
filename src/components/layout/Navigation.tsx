import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

import { AuthContext } from "../../lib/auth";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem = ({ href, label }: NavItemProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const handleClickNavigation = () => {
    router.push(href);
  };

  return (
    <Text
      cursor="pointer"
      margin="auto 32px"
      fontWeight="bold"
      onClick={handleClickNavigation}
      color="#808080"
      _hover={{ color: colorMode === "dark" ? "#fff" : "#000" }}
    >
      {label}
    </Text>
  );
};

const navigations: NavItemProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/",
    label: "Docs",
  },
  {
    href: "/posts",
    label: "Posts",
  },
  {
    href: "/auth",
    label: "Register",
  },
];

const Navigation = () => {
  const { email } = useContext(AuthContext);
  return (
    <Flex display={["none", "none", "flex"]}>
      {navigations.map((navigation) => (
        <NavItem {...navigation} key={navigation.label} />
      ))}
      {email && <NavItem key="dashboard" href="/dashboard" label="Dashboard" />}
    </Flex>
  );
};

export default Navigation;
