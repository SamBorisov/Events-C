const { ethers } = require('hardhat');

async function main() {
  // Compile ContractFactory
  const ContractFactory = await ethers.getContractFactory('ContractFactory');
  console.log('Deploying ContractFactory...');
  const contractFactory = await ContractFactory.deploy();
  await contractFactory.deployed();
  console.log('ContractFactory deployed to:', contractFactory.address);

  // Call createEventContract function and wait for it to be mined
  const tx = await contractFactory.createEventContract("eventName", 360, "event details", 1 , "https://www.shutterstock.com/shutterstock/photos/2159154415/display_1500/stock-vector-golden-nft-ticket-template-to-metaverse-blockchain-access-pass-2159154415.jpg");
  const { events } = await tx.wait();

  // Find the EventContractCreated event and log its arguments
  const eventContractCreatedEvent = events.find((event) => event.event === 'EventContractCreated');
  console.log('EventContractCreated:', eventContractCreatedEvent.args);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
