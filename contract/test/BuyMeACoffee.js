require("@nomicfoundation/hardhat-toolbox");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
//const { providers } = require("ethers");
const { ethers } = require("hardhat");

async function getBalance(address) {
  const providers = ethers.getDefaultProvider();
  const balanceBigInt = await providers.getBalance(address);
  return ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

describe("BuyMeACoffee Test", function () {
  async function deployContractFixture() {
    const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners();

    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();

    return { buyMeACoffee, owner, tipper1, tipper2, tipper3 };
  }

  describe("BuyMeACoffee Unit Test", function () {
    it("Deploy the contract", async function () {
      const { buyMeACoffee } = await loadFixture(deployContractFixture);
      console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);
    });

    it("Check balances before the coffee purchase", async function () {
      const { owner, tipper1, tipper2, tipper3 } = await loadFixture(
        deployContractFixture
      );
      const addresses = [
        owner.address,
        tipper1.address,
        tipper2.address,
        tipper3.address,
      ];
      await printBalances(addresses);
    });
  });
});
