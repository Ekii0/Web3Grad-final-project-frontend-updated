import LitJsSdk from "@lit-protocol/sdk-browser";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const client = new LitJsSdk.LitNodeClient();
const chain = "polygon";
const address = "0x367707f181Dd96EF2FA90188496D10FEDd284dc4";

// IPFS

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const authorization =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export class Lit {
  litNodeClient;
  ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  accessControlConditions(tokenId) {
    return [
      {
        contractAddress: address,
        standardContractType: "ERC1155",
        chain: chain,
        method: "balanceOf",
        parameters: [":userAddress", tokenId],
        returnValueTest: {
          key: "",
          comparator: ">=",
          value: "1", //
        },
      },
    ];
  }

  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }

  async encryptFile(file, tokenId) {
    try {
      if (!this.litNodeClient) {
        await this.connect();
      }
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
      const { zipBlob /*, symmetricKey*/ } =
        await LitJsSdk.encryptFileAndZipWithMetadata({
          authSig: authSig,
          accessControlConditions: this.accessControlConditions(tokenId),
          chain: chain,
          file: file,
          litNodeClient: this.litNodeClient,
        });
      console.log("Encrypted file successfully!");
      return zipBlob;
    } catch (err) {
      console.error(err);
    }
  }

  async decryptFile(ipfsHash) {
    try {
      console.log("Decrypting file...");
      if (!this.litNodeClient) {
        await this.connect();
      }
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
      const encryptedFileChunks = [];
      for await (const chunk of this.ipfs.cat(ipfsHash)) {
        encryptedFileChunks.push(chunk);
      }
      const encryptedFile = Buffer.concat(encryptedFileChunks);
      const encryptedFileBlob = new Blob([encryptedFile]);
      const { decryptedFile } = await LitJsSdk.decryptZipFileWithMetadata({
        authSig: authSig,
        file: encryptedFileBlob,
        litNodeClient: this.litNodeClient,
      });
      const url = window.URL.createObjectURL(new Blob([decryptedFile]));
      console.log(url);
      return url;
    } catch (err) {
      console.error(err);
    }
  }
}
