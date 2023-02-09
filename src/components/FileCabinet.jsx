import { Center, Heading, Wrap } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { Files } from "./Files";
import { documentNotaryAbi, documentNotaryAddress } from "../contracts";
import Web3 from "web3";

export function FileCabinet(/* delegated */) {
  const [userFiles, setUserFiles] = useState([]);
  const { account, library } = useWeb3React();
  const web3 = library ?? new Web3(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL);

  const documentNotary = new web3.eth.Contract(
    documentNotaryAbi,
    documentNotaryAddress
  );

  const getUserFiles = async () => {
    try {
      const docHashArray = await documentNotary.methods
        .getDocumentsByUser(account)
        .call({ from: account });
      console.log(`Got these doc hashes: ${docHashArray}`);
      setUserFiles([...new Set(docHashArray)]);
    } catch (err) {
      console.log(
        "Couldn't fetch user files. Probably there aren't any files associated with this account."
      );
      console.error(err);
    }
  };

  useEffect(() => getUserFiles, []);

  return (
    <>
      <Center>
        <Heading as="h3" size="lg" my={6}>
          All your submitted documents
        </Heading>
      </Center>
      <Wrap>
        {userFiles.map((userFile, index) => {
          return (
            <div key={index}>
              <Files userFile={userFile} index={index} />
            </div>
          );
        })}
      </Wrap>
    </>
  );
}
