import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";

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
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/auth",
    label: "Register",
  },
];

const Navigation = () => {
  return (
    <Flex display={["none", "none", "flex"]}>
      {navigations.map((navigation) => (
        <NavItem {...navigation} key={navigation.label} />
      ))}
    </Flex>
  );
};

export default Navigation;
