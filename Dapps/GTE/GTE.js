import handle from "../../handle.js";
import GteABi from "./GteABi.js";

const GTE = async (px) => {
  const { wallet, address, privateKey, exproler } = await handle(px);
  console.log(`address: ${address}`);
  const contractAddress = "0xA6b579684E943F7D00d616A48cF99b5147fC57A5";
  const contract = new wallet.eth.Contract(GteABi, contractAddress);
  const amount = wallet.utils.toWei("0.00000000529", "ether");
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60;
  const path = [
    "0x776401b9BC8aAe31A685731B7147D4445fD9FB19",
    "0xE9b6e75C243B6100ffcb1c66e8f78F96FeeA727F",
  ];

  const getAmount = await contract.methods.getAmountsOut(amount, path).call();
  const isAmount = (BigInt(getAmount[1]) * 95n) / 100n;

  const data = contract.methods
    .swapExactETHForTokens(isAmount.toString(), path, address, deadline)
    .encodeABI();
  const gasEstimate = await wallet.eth
    .estimateGas({
      from: address,
      to: contractAddress,
      nonce: await wallet.eth.getTransactionCount(address, "pending"),
      data: data,
      value: amount,
    })
    .catch(() => 300000);
  const gasPrice = await wallet.eth.getGasPrice();
  const transaction = {
    from: address,
    to: contractAddress,
    nonce: await wallet.eth.getTransactionCount(address, "pending"),
    data: data,
    value: amount,
    gas: Math.floor(Number(gasEstimate) * 1.2),
    gasPrice: BigInt(gasPrice) * BigInt(3),
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

export default GTE;
