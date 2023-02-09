import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Center,
} from "@chakra-ui/react";
import { LinkIcon, LockIcon } from "@chakra-ui/icons";
import { DropZone } from "./DropZone";
import { CaseCabinet } from "./CaseCabinet";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { Lit } from "../utils";

export function SubmitEvidenceForm({ documentNotary, ipfs }) {
  const [cid, setCid] = useState("");
  const [file, setFile] = useState("");
  const [docHash, setDocHash] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [stillCollectingData, setStillCollectingData] = useState(true);

  const { account, library } = useWeb3React();
  const web3 = library ?? new Web3("https://polygon-rpc.com");

  const lit = new Lit();

  const hashFile = async (f) => {
    const arrayBuffer = await f.arrayBuffer();
    const hashArrayBuffer = await window.crypto.subtle.digest(
      "SHA-256",
      arrayBuffer
    );
    const uint8ArrayHash = new Uint8Array(hashArrayBuffer);
    const hashString = Array.from(uint8ArrayHash)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashString;
  };

  const handleCommit = async (e) => {
    try {
      e.preventDefault();
      const receipt = await documentNotary.methods
        .storeDocumentHash(docHash, selectedCaseId, cid)
        .send({
          from: account,
          value: web3.utils.toWei("0.5"),
          //maxFeePerGas: 450000000000,
          //maxPriorityFeePerGas: 40000000000,
          gasPrice: 150000000000,
        });
      console.log(JSON.stringify(receipt));
      console.log(
        "Recorded document stored at https://ekiio.ipfs-infura.io/ipfs/" +
          receipt.events.NewDocumentFiled.returnValues._ipfsHash +
          " successfully on the blockchain!"
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      if (!file) {
        return;
      }
      const fileHash = await hashFile(file);
      console.log(fileHash);
      setDocHash("0x" + fileHash);
      console.log(
        `Trying to encrypt file using NFT # ${
          selectedCaseId.toString() + "1"
        } ...`
      );
      const encryptedFile = await lit.encryptFile(
        file,
        selectedCaseId.toString() + "1"
      );
      const receipt = await ipfs.add(encryptedFile);
      console.log(`Stored file on IPFS with CID ${receipt.cid}`);
      setCid(receipt.path);
      setStillCollectingData(false);
      //e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (f) => {
    if (f) {
      setFile(f[0]);
    }
  };

  return (
    <>
      <Center>
        <Heading as="h3" size="lg" my={6}>
          Add evidence to case
        </Heading>
      </Center>
      <Card>
        <CardHeader>
          <Heading as="h5" size="md">
            Select Case
          </Heading>
        </CardHeader>
        <form onSubmit={async (e) => handleCommit(e)}>
          <CardBody>
            <CaseCabinet
              selectedCase={selectedCaseId}
              setSelectedCase={setSelectedCaseId}
            />
            <DropZone file={file} setFile={setFile} />
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing={2}>
              {ipfs ? (
                <Button
                  onClick={async (e) => await handleUpload(e)}
                  colorScheme="cyan"
                  variant="outline"
                  disabled={!ipfs || !file}
                  title="Encrypt and upload files to decentralized storage. Only clickable when servers can be reached."
                  leftIcon={<LockIcon />}
                >
                  Encrypt File
                </Button>
              ) : (
                <div>Unable to connect to IPFS. Try again later.</div>
              )}

              <Button
                disabled={stillCollectingData}
                colorScheme="cyan"
                color="white"
                type="submit"
                title="Store your file's metadata on the blockchain once the file has been encrypted and stored."
                leftIcon={<LinkIcon />}
              >
                Commit to Blockchain
              </Button>
            </ButtonGroup>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
