export const documentNotaryAddress =
  "0xbBb4bcEb042f30b6272196575fB1B2406B644139";

export const documentNotaryAbi = [
  {
    inputs: [
      { internalType: "address", name: "_caseManagerAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "DocumentNotary__Busy", type: "error" },
  { inputs: [], name: "DocumentNotary__CaseHasNoDocuments", type: "error" },
  { inputs: [], name: "DocumentNotary__DocumentAlreadyExists", type: "error" },
  { inputs: [], name: "DocumentNotary__DocumentDoesNotExist", type: "error" },
  { inputs: [], name: "DocumentNotary__DoesNotCoverFees", type: "error" },
  { inputs: [], name: "DocumentNotary__NotAuthorized", type: "error" },
  {
    inputs: [],
    name: "DocumentNotary__RenouncingOwnershipNotAllowed",
    type: "error",
  },
  { inputs: [], name: "DocumentNotary__UserHasNoDocuments", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newCaseManagerAddress",
        type: "address",
      },
    ],
    name: "NewCaseManagerAddressSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_hash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "_caseId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "NewDocumentFiled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newFee",
        type: "uint256",
      },
    ],
    name: "NewFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_hash", type: "bytes32" },
      { internalType: "uint32", name: "_caseId", type: "uint32" },
    ],
    name: "getDocument",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "hash", type: "bytes32" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint32", name: "caseId", type: "uint32" },
          { internalType: "string", name: "ipfsHash", type: "string" },
        ],
        internalType: "struct DocumentNotary.Document",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "_caseId", type: "uint32" }],
    name: "getDocumentsByCaseId",
    outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
    ],
    name: "getDocumentsByUser",
    outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newCaseManagerAddress",
        type: "address",
      },
    ],
    name: "setCaseManagerAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newFee", type: "uint256" }],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_hash", type: "bytes32" },
      { internalType: "uint32", name: "_caseId", type: "uint32" },
      { internalType: "string", name: "_ipfsHash", type: "string" },
    ],
    name: "storeDocumentHash",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
