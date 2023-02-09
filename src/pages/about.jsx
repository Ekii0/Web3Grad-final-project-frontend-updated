import {
  Flex,
  Heading,
  ListItem,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
export default function About() {
  return (
    <>
      <VStack spacing={10}>
        <Heading as="h1" size="3xl" pt={20}>
          About this project
        </Heading>
        <Tabs variant="enclosed-colored" colorScheme="cyan">
          <TabList>
            <Tab>Background story</Tab>
            <Tab>What is EMS?</Tab>
            <Tab>How does EMS work?</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex
                flexDir="column"
                justifyContent="space-evenly"
                alignItems="center"
                w="960px"
                flex="1"
                m="auto"
              >
                <Heading as="h2" size="lg" py={10}>
                  A little background
                </Heading>
                <UnorderedList
                  style={{ textAlign: "justify", lineHeight: "2em" }}
                >
                  <ListItem>
                    <Text>
                      The legal sector is often riddled with inefficiencies and
                      legacy systems, making obtaining information
                      time-consuming and expensive.
                    </Text>
                  </ListItem>
                  <UnorderedList>
                    <ListItem>
                      <Text>Ex. Land registry, notarial deeds, etc.</Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        Administrative tasks take up nearly 50% of a
                        lawyer&apos;s time (
                        <a
                          style={{ textDecoration: "underline" }}
                          target="_blank"
                          rel="noreferrer"
                          href="https://www.clio.com/resources/legal-trends/2018-report/"
                        >
                          Clio’s Legal Trends Report 2018
                        </a>
                        ).{" "}
                      </Text>
                    </ListItem>
                  </UnorderedList>
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      Blockchain technology is ideally suited for storing
                      tamper-proof records on a distributed ledger and thus can
                      be a great candidate for digitalizing the legal sector and
                      associated industries.
                    </Text>
                  </ListItem>
                  <UnorderedList>
                    <ListItem>
                      <Text>
                        Ex. Tokenization of real-world assets, electronic
                        signatures, dispute arbitration
                      </Text>
                    </ListItem>
                  </UnorderedList>
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      Transparency, one of the key benefits of using blockchain
                      technology, is also one of its greatest weak points,
                      especially in the legal sector where confidentiality is
                      paramount.
                    </Text>
                  </ListItem>
                  <UnorderedList>
                    <ListItem>
                      <Text>Use of permissioned blockchains.</Text>
                    </ListItem>
                  </UnorderedList>
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      But what about truly decentralized, trustless solutions in
                      the Web3 spirit? And how can privacy be ensured in Web3?
                    </Text>
                  </ListItem>
                </UnorderedList>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                w="960px"
                flex="1"
                m="auto"
                flexDir="column"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Heading as="h2" size="lg" py={10}>
                  What is the Evidence Management System?
                </Heading>
                <UnorderedList
                  style={{ textAlign: "justify", lineHeight: "2em" }}
                >
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      The idea is to have a decentralized way of storing,
                      encrypting and authenticating documents.
                    </Text>
                  </ListItem>
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      In the current version of this concept, users basically
                      will be sharing files with a designated counterpart. Only
                      they and the addressee will be able to read the content of
                      the stored files.
                    </Text>
                  </ListItem>
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      The grand concept is to have an entire evidence management
                      ecosystem that will offer users the full range of services
                      of a decentralized notary, such as:
                    </Text>
                  </ListItem>
                  <UnorderedList>
                    <ListItem>
                      <Text>Sharing confidential documents</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Contract signing</Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        Deed authentication, either by an issuing organization
                        or a &quot;marketplace&quot; of selected jurors
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        Submitting evidence for court cases or (decentralized)
                        arbitration services, and making evidence accessible to
                        a panel of jurors.
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </UnorderedList>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                w="960px"
                flex="1"
                flexDir="column"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Heading as="h2" size="lg" py={10}>
                  How does it work?
                </Heading>
                <UnorderedList
                  style={{ textAlign: "justify", lineHeight: "2em" }}
                >
                  <ListItem>
                    <Text>
                      Users will be able to create special data rooms
                      (&quot;cases&quot;) in which they can share documents.
                    </Text>
                  </ListItem>
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      A unique identifier will be created from the documents
                      (&quot;hash&quot;) and stored together with other metadata
                      on the blockchain. This notarizing ability ensures that
                      there will be proof of existence and proof of authenticity
                      of the submitted files.
                    </Text>
                  </ListItem>
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      Documents will be stored in decentralized storage,
                      ensuring the availability of documents and eliminating
                      single points of failure.
                    </Text>
                  </ListItem>
                  <ListItem style={{ margin: "2em 0 0 0" }}>
                    <Text>
                      Only priviledged users will be able to encrypt and decrypt
                      files by signing a transaction that proves control over a
                      particular address. A specific access token
                      (&quot;NFT&quot;) is used to grant users access to a
                      specific data room they created. This access token also
                      enables the decentralized encryption and decryption
                      provided by the Lit Network (
                      <a
                        style={{ textDecoration: "underline" }}
                        href="https://litprotocol.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        litprotocol.com
                      </a>
                      )
                    </Text>
                  </ListItem>
                </UnorderedList>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
}
