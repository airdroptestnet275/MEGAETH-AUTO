import handle from "../handle.js";
import { capxUSDC } from "./capxUSDC.js";

export const mintCapxUSDCFaucet = async (px) => {
  const { wallet, address, privateKey, exproler } = await handle(px);
  const contractAddress = "0xe9b6e75c243b6100ffcb1c66e8f78f96feea727f";
  const contract = new wallet.eth.Contract(capxUSDC, contractAddress);
  const amount = wallet.utils.toWei("1000", "ether");
  const data = contract.methods.mint(address, amount).encodeABI();
  const gasEstimate = await wallet.eth
    .estimateGas({
      from: address,
      to: contractAddress,
      data: data,
    })
    .catch(() => 300000);
  const gasPrice = await wallet.eth.getGasPrice();
  const transaction = {
    from: address,
    to: contractAddress,
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
