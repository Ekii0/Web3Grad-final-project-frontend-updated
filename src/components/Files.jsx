import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Spinner,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Lit } from "../utils";

export function Files({ index, userFile }) {
  const [fileEncrypted, setFileEncrypted] = useState(true);
  const [urlToDecryptedFile, setUrlToDecryptedFile] = useState("");
  const lit = new Lit();

  const queryCaseFiles = gql`
    query caseFiles($docHash: Bytes!) {
      newDocumentFileds(where: { hash: $docHash }) {
        hash
        caseId
        ipfsHash
        blockTimestamp
      }
    }
  `;
  const { loading, error, data } = useQuery(queryCaseFiles, {
    variables: { docHash: userFile },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Failed to load file</Text>;
  }

  return (
    <>
      {data.newDocumentFileds.map((doc, idx) => {
        return (
          <WrapItem key={idx}>
            <Card key={doc?.hash + idx} my={3}>
              <CardHeader bg="rgba(0,0,0,0.2)">
                <Heading as="h5" size="md">{`# ${index + 1}.${
                  idx + 1
                }`}</Heading>
              </CardHeader>
              <CardBody>
                <Stack direction="column">
                  <Box>
                    <Heading as="h5" size="sm">
                      Case ID
                    </Heading>
                    <Text>{doc?.caseId}</Text>
                  </Box>
                  <Box>
                    <Heading as="h5" size="sm">
                      Date
                    </Heading>
                    <Text>
                      {new Date(doc?.blockTimestamp * 1000).toLocaleString()}
                    </Text>
                  </Box>
                  <Box>
                    <Heading as="h5" size="sm">
                      Hash
                    </Heading>
                    <Text>
                      <a
                        href={
                          "https://ekiio.infura-ipfs.io/ipfs/" + doc?.ipfsHash
                        }
                        target="_blank"
                        rel="noreferrer"
                        style={{ cursor: "pointer", textDecoration: "none" }}
                      >
                        {" "}
                        {doc?.hash?.slice(0, 6)}...
                        {doc?.hash?.slice(-4)}
                      </a>
                    </Text>
                  </Box>
                </Stack>
                <CardFooter>
                  <ButtonGroup spacing={2}>
                    <Button
                      onClick={async (e) => {
                        e.preventDefault();
                        const url = await lit.decryptFile(doc?.ipfsHash);
                        setFileEncrypted(false);
                        setUrlToDecryptedFile(url);
                      }}
                    >
                      Decrypt
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(urlToDecryptedFile);
                        window.open(urlToDecryptedFile, "_blank");
                      }}
                      isDisabled={fileEncrypted}
                    >
                      Download
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </CardBody>
            </Card>
          </WrapItem>
        );
      })}
    </>
  );
}
