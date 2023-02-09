import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Spinner,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CaseCabinet } from "./CaseCabinet";
import { useQuery, gql } from "@apollo/client";
import { Lit } from "../utils";

export function Involvements() {
  const [selectedCase, setSelectedCase] = useState(0);
  const [files, setFiles] = useState([]);
  const [fileEncrypted, setFileEncrypted] = useState({});
  const [urlToDecryptedFile, setUrlToDecryptedFile] = useState({});

  const lit = new Lit();

  const queryCaseFiles = gql`
    query getAllCaseFiles($id: BigInt!) {
      newDocumentFileds(where: { caseId: $id }) {
        hash
        caseId
        ipfsHash
        blockTimestamp
      }
    }
  `;
  const { data, loading, refetch } = useQuery(queryCaseFiles, {
    variables: { id: selectedCase },
  });

  const decryptHandler = async (ipfsHash) => {
    const url = await lit.decryptFile(ipfsHash);
    setFileEncrypted({
      ...fileEncrypted,
      [ipfsHash]: false,
    });
    setUrlToDecryptedFile({
      ...urlToDecryptedFile,
      [ipfsHash]: url,
    });
  };

  useEffect(() => {
    refetch({ id: selectedCase }).then((data) => {
      setFiles(data.data.newDocumentFileds);
    });
  }, [selectedCase]);

  useEffect(() => {
    files.forEach((file) =>
      setFileEncrypted((prevState) => ({
        ...prevState,
        [file.ipfsHash]: true,
      }))
    );
  }, [files]);

  return (
    <>
      <Center>
        <Heading as="h3" size="lg" my={6}>
          View cases you&apos;re involved in
        </Heading>
      </Center>
      <CaseCabinet
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
      />
      {!data || loading ? (
        <Spinner />
      ) : (
        <Wrap>
          {files.map((userFile, index) => {
            return (
              <WrapItem key={index}>
                <Card key={userFile.hash} my={6}>
                  <CardHeader bg="rgba(0,0,0,0.2)">
                    <Heading as="h5" size="md">{`# ${index + 1}`}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack direction="column">
                      <Box>
                        <Heading as="h5" size="sm">
                          Case ID
                        </Heading>
                        <Text>{userFile.caseId}</Text>
                      </Box>
                      <Box>
                        <Heading as="h5" size="sm">
                          Date
                        </Heading>
                        <Text>
                          {new Date(
                            userFile.blockTimestamp * 1000
                          ).toLocaleString()}
                        </Text>
                      </Box>
                      <Box>
                        <Heading as="h5" size="sm">
                          Hash
                        </Heading>
                        <Text>
                          <a
                            href={
                              "https://ekiio.infura-ipfs.io/ipfs/" +
                              userFile.ipfsHash
                            }
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
                            {userFile.hash?.slice(0, 6)}...
                            {userFile.hash?.slice(-4)}
                          </a>
                        </Text>
                      </Box>
                    </Stack>
                    <CardFooter>
                      <ButtonGroup spacing={2}>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            decryptHandler(userFile.ipfsHash);
                          }}
                        >
                          Decrypt
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(urlToDecryptedFile[userFile.ipfsHash]);
                            window.open(
                              urlToDecryptedFile[userFile.ipfsHash],
                              "_blank"
                            );
                          }}
                          isDisabled={fileEncrypted[userFile.ipfsHash]}
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
        </Wrap>
      )}
    </>
  );
}
