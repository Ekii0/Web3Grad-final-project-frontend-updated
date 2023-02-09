import Head from "next/head";
import { Inter } from "@next/font/google";
import { Flex } from "@chakra-ui/react";
const inter = Inter({ subsets: ["latin"] });

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Evidence Management System</title>
        <meta
          name="description"
          content="A web3 document manager providing fully decentralized encryption, storage and authentication of files."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Flex flexDir="column" minH="100vh" maxW="1200px" m="auto">
          {children}
        </Flex>
      </main>
    </>
  );
}
