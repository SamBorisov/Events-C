const { ethers } = require("hardhat");

async function main() {
  const ContractFactory = await ethers.getContractFactory("ContractFactory");
  const factory = await ContractFactory.deploy();
  await factory.deployed();

  const [addr1, addr2 , addr3] = await ethers.getSigners();

  const nameOfEvent = "My Event";
  const endTicketSale = 86200; 
  const aboutEvent = "This is my event";
  const priceForEvent = ethers.utils.parseEther("1"); // 1 ETH
  const uri = "https://example.com/my-event";

  const connectedFactory = factory.connect(addr3);

  const tx = await connectedFactory.createEventContract(nameOfEvent, endTicketSale, aboutEvent, priceForEvent, uri);

  const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
  const events = await factory.queryFilter(factory.filters.EventContractCreated(), receipt.blockNumber, receipt.blockNumber);

    const owner = events[0].args.owner
    const newEventAddress = events[0].args.newEventContractAddress;
    console.log("Owner of Event: " + owner);
    console.log("Addr3 : " + addr3.address);
    console.log("Contract address: " + newEventAddress);

    const EventContract = await ethers.getContractFactory('EventContract');
    const contractEvent = EventContract.attach(newEventAddress);

const deployedEventContract = contractEvent.connect(addr1);
const deployedEventContract2 = contractEvent.connect(addr2);
const deployedEventContractOwner = contractEvent.connect(addr3);


console.log("Buying tickets...");
await deployedEventContract.buyTickets(2, { value: ethers.utils.parseEther("2") });
await deployedEventContract2.buyTickets(3, { value: ethers.utils.parseEther("3") });

console.log("Moving time forward...");
await ethers.provider.send("evm_increaseTime", [86400]); 
await ethers.provider.send("evm_mine", []);

console.log("Choosing lucky winner...");
await deployedEventContract.chooseLuckyWinner();

console.log("Getting lucky winner...");
const luckyWinner = await deployedEventContract.getLuckyWinnerAddress();
console.log("Lucky winner:", luckyWinner);


console.log("Withdrawing funds...");
const ownerBalanceBefore = await ethers.provider.getBalance(addr3.address);
console.log("Owner balance before:", ownerBalanceBefore.toString());

await deployedEventContractOwner.withdraw();

const ownerBalanceAfter = await ethers.provider.getBalance(addr3.address);
console.log("Owner balance after:", ownerBalanceAfter.toString());

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
