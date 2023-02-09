import { useWeb3React } from "@web3-react/core";
import {
  caseManagerAbi,
  caseManagerAddress,
  documentNotaryAbi,
  documentNotaryAddress,
} from "../contracts";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";
import {
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Center,
} from "@chakra-ui/react";
import Web3 from "web3";
import { NewCaseForm } from "../components";
import { FileCabinet } from "../components";
import { SubmitEvidenceForm } from "../components";
import { Involvements } from "../components";

export default function Ems() {
  /*
   * IPFS-HTTP-Client invocation
   */

  const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_API_KEY;
  const authorization =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  /*
   * Web3Js integration
   */
  const { active, library } = useWeb3React();
  const web3 = library ?? new Web3(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL);
  const caseManager = new web3.eth.Contract(caseManagerAbi, caseManagerAddress);
  const documentNotary = new web3.eth.Contract(
    documentNotaryAbi,
    documentNotaryAddress
  );

  return (
    <>
      <Center>
        <Heading as="h1" size="3xl" my={20}>
          Manage your cases and files
        </Heading>
      </Center>
      {active ? (
        <>
          <div>
            <Tabs>
              <TabList>
                <Tab>Open new case</Tab>
                <Tab>Add evidence to case</Tab>
                <Tab>View submitted files</Tab>
                <Tab>Your involvements</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <NewCaseForm caseManager={caseManager} />
                </TabPanel>
                <TabPanel>
                  <SubmitEvidenceForm
                    documentNotary={documentNotary}
                    ipfs={ipfs}
                  />
                </TabPanel>
                <TabPanel>
                  <FileCabinet />
                </TabPanel>
                <TabPanel>
                  <Involvements />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </>
      ) : (
        <Heading as="h3" size="lg">
          You are missing out on the fun if you don&apos;t connect!
        </Heading>
      )}
    </>
  );
}
