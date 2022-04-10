/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Box,
  Heading,
  Link,
  HStack,
  Badge,
  useColorMode,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FaLink, FaArrowAltCircleRight } from "react-icons/fa";

const Wrapper = styled(Box)`
  margin: 0 auto;
  padding: 2%;
  height: fit-content;
  width: 100%;
  border-radius: 8px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PreviewPR = ({ url, title, base, head }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Wrapper bg={colorMode === "dark" ? "#014f86" : "#e2eafc"}>
      <HStack>
        <Badge colorScheme="green">{head}</Badge>
        <FaArrowAltCircleRight />
        <Badge colorScheme="green">{base}</Badge>
      </HStack>
      <Link href={url} isExternal>
        <HStack>
          <FaLink />
          <Heading size="xl" fontWeight="bold">
            {title}
          </Heading>
        </HStack>
      </Link>
      {/* <Text fontSize="md">{desc}</Text> */}
    </Wrapper>
  );
};

export default PreviewPR;
