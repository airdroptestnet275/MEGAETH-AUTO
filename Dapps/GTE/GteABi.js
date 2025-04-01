const GteABi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "arg0",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "arg1",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "arg2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "arg3",
        type: "uint256",
      },
    ],
    name: "swapExactETHForTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [{ name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
export default GteABi;
