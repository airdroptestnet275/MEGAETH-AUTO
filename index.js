import chalk from "chalk";
import figlet from "figlet";
import GTE from "./Dapps/GTE/GTE.js";
import Bronto from "./Dapps/bronto/bronto.js";
import fs from "fs/promises";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const displayBanner = () => {
  console.log(
    chalk.cyan(
      figlet.textSync("Makmum Airdrop", {
        font: "Slant",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );
  const hakari = chalk.bgBlue("Created by https://t.me/hakaringetroll");
  console.log(hakari);
  console.log("Join To get Info airdrop : https://t.me/makmum");
};
(async () => {
  displayBanner();
  console.log(`Start Swap ETH to CapxUSDC and CapxUSDC to WETH`);
  const wallet = (await fs.readFile("wallet.txt", "utf-8"))
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean);
  while (true) {
    for (const px of wallet) {
      try {
        const gte = await GTE(px);
        if (gte) {
          console.log(
            chalk.green("Success Swap ETH to CapxUSDC On GTHE: ", gte)
          );
        }
        const bronto = await Bronto(px);
        if (bronto) {
          console.log(
            chalk.green("Success Swap CapxUSDC to WETH ON Bronto: ", bronto)
          );
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
    console.log("Wait 24 Hour to Swap daily again ...");
    await delay(86400000);
  }
})();
