import handle from "../handle.js";

const approve = async (px, tokenCA, smartContract) => {
  const { wallet, address, privateKey, exproler } = await handle(px);
  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contract = new wallet.eth.Contract(abi, tokenCA);
  const maxUint256 =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  const data = contract.methods.approve(smartContract, maxUint256).encodeABI();

  const gasEstimate = await wallet.eth
    .estimateGas({
      from: address,
      to: tokenCA,
      data: data,
    })
    .catch(() => 300000);

  const gasPrice = await wallet.eth.getGasPrice();

  const transaction = {
    from: address,
    to: tokenCA,
    data: data,
    gas: Math.floor(Number(gasEstimate) * 1.2),
    gasPrice: Math.floor(Number(gasPrice) * 1.1).toString(),
  };

  const signedTransaction = await wallet.eth.accounts.signTransaction(
    transaction,
    privateKey
  );

  const receipt = await wallet.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );

  return `${exproler}${receipt.logs[0].transactionHash}`;
};

export default approve;
