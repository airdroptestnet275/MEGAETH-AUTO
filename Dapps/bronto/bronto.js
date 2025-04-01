import handle from "../../handle.js";
import approve from "../approve.js";
import { brontoABi } from "./brontoABi.js";
import { mintCapxUSDCFaucet } from "../mintFaucet.js";

const Bronto = async (px) => {
  const { wallet, address, privateKey, exproler } = await handle(px);
  const contractAddress = "0xc063017B825091798E60e776Be426c54c10ceE0c";
  const tokenCA = "0xe9b6e75c243b6100ffcb1c66e8f78f96feea727f";
  const mint = await mintCapxUSDCFaucet(px);
  if (!mint) {
    console.log("Mint failed");
    return null;
  }
  console.log(`Success Mint CapxUSDC: ${mint}`);
  const getDatapprove = await approve(privateKey, tokenCA, contractAddress);
  if (!getDatapprove) {
    console.log("Approve failed");
    return null;
  }
  const contract = new wallet.eth.Contract(brontoABi, contractAddress);
  const amount = wallet.utils.toWei("1", "ether");
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60;
  const params = [
    `0xe9b6e75c243b6100ffcb1c66e8f78f96feea727f0000c84eb2bd7bee16f38b1f4a0a5796fffd028b6040e9`,
    address,
    deadline,
    amount,
    "0",
  ];
  const data = contract.methods.exactInput(params).encodeABI();
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

export default Bronto;
