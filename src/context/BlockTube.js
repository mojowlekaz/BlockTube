//Import and Export  BlockTube ABI AND CA

export const BlockTubeCA = "0xeC4e42dBB2836f29F894B138Fcce0c905A66bAC2";
export const BlockTubeABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "IDcount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "videohash",
        type: "string",
      },
      {
        indexed: true,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "Uploaded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "vediohash",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    name: "Uploadvideo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "IDCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "videos",
    outputs: [
      {
        internalType: "uint256",
        name: "ID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "Hash",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
