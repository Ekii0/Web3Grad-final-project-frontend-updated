import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

export function NewCaseForm({ caseManager }) {
  const [addressA, setAddressA] = useState("");
  const [addressB, setAddressB] = useState("");
  const [caseName, setCaseName] = useState("");
  const [warning, setWarning] = useState("");
  const [caseId, setCaseId] = useState("");

  const { account, library } = useWeb3React();
  const web3 = library ?? new Web3("https://polygon-rpc.com");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const caseHash = web3.utils.soliditySha3(
        { t: "address", v: addressA },
        { t: "address", v: addressB },
        { t: "string", v: caseName }
      );

      const caseHashToInt = new web3.utils.BN(caseHash).umod(
        new web3.utils.BN(10 ** 9)
      );

      console.log(`Trying to create new case # ${caseHashToInt}`);

      const caseExists = await caseManager.methods
        .doesCaseExist(caseHashToInt)
        .call({ from: account });

      if (caseExists) {
        console.log("Existing case. Throwing error.");
        setWarning({ message: "This case already exists!" });
      } else {
        console.log("Creating new case...");
        setWarning();
        const receipt = await caseManager.methods
          .openCase(addressA, addressB, caseName)
          .send({
            from: account,
            gasPrice: 150000000000,
          });
        setCaseId(receipt.events.NewCaseOpened.returnValues._caseId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Center>
            <Heading as="h3" size="lg">
              Open new case
            </Heading>
          </Center>
        </CardHeader>
        <form onSubmit={async (e) => await handleSubmit(e)}>
          <CardBody>
            <FormControl isRequired>
              <VStack spacing={4} alignItems="flex-start">
                <FormLabel htmlFor="AddressA">Address of Claimant</FormLabel>
                <Input
                  type="text"
                  id="AddressA"
                  onChange={(e) => setAddressA(e.target.value)}
                  required
                  minLength={42}
                  maxLength={42}
                  pattern="0x[0-9a-fA-F]{40}"
                  placeholder="0xaddressOfPartyA"
                />
                <FormLabel htmlFor="AddressB">Address of Defendant</FormLabel>
                <Input
                  type="text"
                  id="AddressB"
                  onChange={(e) => setAddressB(e.target.value)}
                  required
                  minLength={42}
                  maxLength={42}
                  pattern="0x[0-9a-fA-F]{40}"
                  placeholder="0xaddressOfPartyB"
                />
                <FormLabel htmlFor="CaseName">
                  Case name or case identifier
                </FormLabel>
                <Input
                  type="text"
                  id="CaseName"
                  maxLength={20}
                  required
                  onChange={(e) => setCaseName(e.target.value)}
                  placeholder="69/420"
                />
              </VStack>
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button type="submit">File case</Button>
          </CardFooter>
        </form>
      </Card>
      {caseId && <div>Opened new case with ID #{caseId}.</div>}
      {warning && <div>{warning.message}</div>}
    </>
  );
}
