import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Cases } from "./Cases";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useQuery, gql } from "@apollo/client";

export function CaseCabinet({ selectedCase, setSelectedCase }) {
  const [userCases, setUserCases] = useState([]);

  const { account } = useWeb3React();

  const queryUserCases = gql`
    query userCases($party: Bytes!) {
      newCaseOpeneds(where: { parties_contains: [$party] }) {
        parties
        _caseId
        blockTimestamp
      }
    }
  `;

  const { loading, error, data } = useQuery(queryUserCases, {
    variables: { party: account?.toLowerCase() },
  });

  useEffect(() => {
    if (data) {
      let receivedCases = new Array(data.newCaseOpeneds.length);
      receivedCases = data.newCaseOpeneds;
      setUserCases(receivedCases);
    }
  }, [data]);

  if (loading)
    return (
      <>
        <Stack
          direction="column"
          spacing={4}
          display="flex"
          flex="1"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Spinner
            color="cyan.500"
            size="xl"
            emptyColor="gray.300"
            boxSize={12}
          />
          <Heading as="h5" size="sm">
            Loading cases...
          </Heading>
        </Stack>
      </>
    );

  if (error)
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Couldn&apos;t fetch data!</AlertTitle>
          <AlertDescription>
            Something went wrong. Please try again in a few seconds.
          </AlertDescription>
        </Alert>
      </>
    );

  return (
    <>
      <Wrap>
        {userCases.map((userCase, index) => {
          return (
            <WrapItem key={index}>
              <Cases
                key={userCase?._caseId}
                userCase={userCase}
                index={index}
                selectedCase={selectedCase}
                setSelectedCase={setSelectedCase}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
}
