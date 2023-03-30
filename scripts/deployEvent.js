const { ethers } = require('hardhat');

async function main() {
  // Compile EventContract
  const EventContract = await ethers.getContractFactory('EventContract');
  console.log('Deploying EventContract...');
  const eventContract = await EventContract.deploy("eventName", 360, "event details", 1 , "https://via.placeholder.com/150");
  await eventContract.deployed();
  console.log('EventContract deployed to:', eventContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


 // string memory _nameOfEvent,  uint _endTicketSale, string memory _aboutEvent, uint _priceForEvent, string memory _uri