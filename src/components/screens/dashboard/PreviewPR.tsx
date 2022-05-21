/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Box,
  Heading,
  Link,
  Text,
  HStack,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useColorMode,
  useDisclosure,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <HStack justifyContent="center">
        <Button onClick={onOpen} borderRadius="8px" colorScheme="linkedin">
          Share
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Add Caption</Text>
            <Input placeholder="Add caption here" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="linkedin" mr={3}>
              Post
            </Button>
            <Button colorScheme="linkedin" onClick={onClose} variant="outline">
              Discard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default PreviewPR;
