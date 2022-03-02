import { Divider, Link, Stack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Stack as="footer" width="full" layerStyle="layoutBlock" spacing={6}>
      <Divider />

      <Text align="center" fontSize={["xs", "sm"]}>
        Built with{" "}
        <span style={{ marginRight: "5px", marginLeft: "5px" }}>💜</span> by{" "}
        <Link
          href="https://pritishsamal.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pritish Samal
        </Link>
      </Text>
    </Stack>
  );
};

export default Footer;
