const toWei = (num) => ethers.utils.parseEther(num.toString())

async function main() {

  const [deployer, addr1, addr2] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy contracts here:
  const LIMEToken = await ethers.getContractFactory('LIMEToken');
  const token = await LIMEToken.deploy(toWei(100000));
  const LuckyNFT = await ethers.getContractFactory('LuckyNFT');
  const nft = await LuckyNFT.deploy(token.address);

  await nft.connect(deployer).setPrice(toWei(10))
  await nft.connect(deployer).setMaxMintAmount(4)
  await nft.connect(deployer).setAccounts(addr1.address, addr2.address)
  await nft.connect(deployer).setRoyalty(5)
  
  
  // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
  saveFrontendFiles(nft, 'LuckyNFT');
  saveFrontendFiles(token, 'LIMEToken');
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
