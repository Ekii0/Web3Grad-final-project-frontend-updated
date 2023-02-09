import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

export function Cases({ index, userCase, selectedCase, setSelectedCase }) {
  const { account } = useWeb3React();
  const selected = userCase?._caseId == selectedCase;
  return (
    <>
      <Card
        key={userCase?._caseId}
        variant={selected ? "filled" : "elevated"}
        borderColor={selected ? "cyan" : "gray"}
        borderWidth={selected ? "2px" : "1px"}
        cursor="pointer"
        boxShadow={selected ? "10px 10px 5px white.600" : ""}
        onClick={() => setSelectedCase(userCase?._caseId)}
      >
        <CardHeader>
          <Heading as="h5" size="md">{`# ${index + 1}`}</Heading>
        </CardHeader>
        <CardBody>
          <Stack direction="column">
            <Box>
              <Heading as="h5" size="sm">
                Case ID
              </Heading>
              <Text>{userCase?._caseId}</Text>
            </Box>
            <Box>
              <Heading as="h5" size="sm">
                Claimant
              </Heading>
              <Text>
                {account.toLowerCase() == userCase?.parties[0]
                  ? "You"
                  : userCase?.parties[0]?.slice(0, 6) +
                    "..." +
                    userCase?.parties[0]?.slice(-4)}
              </Text>
            </Box>
            <Box>
              <Heading as="h5" size="sm">
                Defendant
              </Heading>
              <Text>
                {account.toLowerCase() == userCase?.parties[1]
                  ? "You"
                  : userCase?.parties[1]?.slice(0, 6) +
                    "..." +
                    userCase?.parties[1]?.slice(-4)}
              </Text>
            </Box>
            <Box>
              <Heading as="h5" size="sm">
                Date
              </Heading>
              <Text>
                {new Date(userCase?.blockTimestamp * 1000).toLocaleString()}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
