import { Flex, Heading } from "@chakra-ui/react";

export default function Apply() {
  return (
    <Flex
      flexDir="column"
      flex="1"
      justifyContent="center"
      alignItems="center"
      w="960px"
      m="auto"
    >
      <Heading as="h1" size="3xl">
        Apply as Juror!
      </Heading>
      <Heading as="h3" size="lg">
        More details to come soon...
      </Heading>
    </Flex>
  );
}
