import { Flex, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Flex
        flexDir="column"
        flex="1"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1" size="3xl">
          <Text
            as="span"
            bgGradient="linear(to-r, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047)"
            bgClip="text"
          >
            Web3
          </Text>{" "}
          Evidence Management
        </Heading>
        <Heading as="h3" size="lg">
          Decentralized storage. Encrypted. Priviledged access.
        </Heading>
      </Flex>
    </>
  );
}
