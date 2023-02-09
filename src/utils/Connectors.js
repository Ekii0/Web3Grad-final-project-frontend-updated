import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [137, 31337],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    137: "https://matic-mainnet.chainstacklabs.com",
    31337: "http://localhost:8545",
  },
});
