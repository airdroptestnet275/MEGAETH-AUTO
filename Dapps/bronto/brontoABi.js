export const brontoABi = [
  {
    constant: false,
    inputs: [
      {
        name: "params",
        type: "tuple",
        components: [
          {
            name: "path",
            type: "bytes",
          },
          {
            name: "recipient",
            type: "address",
          },
          {
            name: "deadline",
            type: "uint256",
          },
          {
            name: "amountIn",
            type: "uint256",
          },
          {
            name: "amountOutMinimum",
            type: "uint256",
          },
        ],
      },
    ],
    name: "exactInput",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
