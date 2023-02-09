import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { injected /*, walletconnect */ } from "../utils";
import { Button, Box, Flex, Heading, HStack } from "@chakra-ui/react";

export function Header() {
  const { active, account, activate, deactivate } = useWeb3React();

  const connect = async (e) => {
    e.preventDefault();
    try {
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = (e) => {
    e.preventDefault();
    deactivate();
  };

  return (
    <>
      <Flex flexDir="row" justifyContent="space-between" py={4}>
        <Heading as="h1" size="lg">
          <Link href="./">Evidence Management System</Link>
        </Heading>
        <HStack as="nav" spacing={5}>
          <Button>
            <Link href="./about">About</Link>
          </Button>
          <Button>
            <Link href="./apply">Become a Juror</Link>
          </Button>
          <Button>
            <Link href="./ems">Open App</Link>
          </Button>
        </HStack>
        <Box px={4}>
          {active ? (
            <Button
              colorScheme="cyan"
              color="white"
              width={40}
              onClick={(e) => {
                disconnect(e);
              }}
            >
              {account.slice(0, 4)}...{account.slice(-4)}
            </Button>
          ) : (
            <Button
              variant="outline"
              colorScheme="cyan"
              width={40}
              onClick={async (e) => {
                await connect(e);
              }}
            >
              Connect
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
}
