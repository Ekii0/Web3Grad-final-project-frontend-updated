/* import "../styles/globals.css"; */
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Web3 from "web3";
import { Header } from "../components";
import { Layout } from "../components";

const apollo = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/ekii0/ems",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  const getLibrary = (provider) => {
    return new Web3(provider);
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={apollo}>
        <ChakraProvider>
          <Layout>
            <Header />
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </Web3ReactProvider>
  );
}
