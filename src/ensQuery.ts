import { ethers } from "ethers";

async function main() {
  const providerUrl = process.env.INFURA_URL; 

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const address = await provider.resolveName("diegoa.eth");
  if (!address) {
    console.log("Unable to resolve ENS");
    return;
  }

  const balance = await provider.getBalance(address);
  const balanceInEther = ethers.utils.formatEther(balance);

  console.log(`Balance of diegoa.eth is ${balanceInEther} ETH`);
}

main().catch(console.error);
