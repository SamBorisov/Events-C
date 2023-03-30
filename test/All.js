// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("EventContract", function () {
//   let contract;
//   let owner;
//   let addr1;
//   let addr2;
//   let addrs;

//   beforeEach(async function () {
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

//     const Marketplace = await ethers.getContractFactory("ContractFactory");
//     const marketplace = await Marketplace.deploy();

//     const EventContract = await ethers.getContractFactory("EventContract");
//     contract = await EventContract.deploy(
//       "Event Name",
//       86400,
//       "Event description",
//       ethers.utils.parseEther("1"),
//       "https://myjsonserver.com/events/1"
//     );

//   });

//   describe("Deployment", function () {
//     it("Should set the right owner", async function () {
//       expect(await contract.owner()).to.equal(owner.address);
//     });

//     it("Should set the right name of the event", async function () {
//       expect(await contract.nameOfEvent()).to.equal("Event Name");
//     });

//     it("Should set the right end time of the event", async function () {
//       expect(await contract.endTicketSale()).to.not.equal(0);
//     });

//     it("Should set the right description of the event", async function () {
//       expect(await contract.aboutEvent()).to.equal("Event description");
//     });

//     it("Should set the right price for the event", async function () {
//       expect(await contract.priceForEvent()).to.equal(ethers.utils.parseEther("1"));
//     });

//     it("Should set the right URI for the event", async function () {
//       expect(await contract.getUri()).to.equal("https://myjsonserver.com/events/1");
//     });
//   });

//   describe("Buy Tickets", function () {
//     it("should allow buying tickets", async function () {
//       await contract.connect(addr1).buyTickets(1, { value: ethers.utils.parseEther("1") });
//       expect(await contract.balanceOf(addr1.address, 1)).to.equal(1);
//     });

//     it("should not allow buying tickets after the end time", async function () {
//       await ethers.provider.send("evm_increaseTime", [86400]); // Move 1 day ahead
//       await ethers.provider.send("evm_mine", []);

//       await expect(contract.connect(addr1).buyTickets(1, { value: ethers.utils.parseEther("1") })).to.be.revertedWith("Ticket sale has ended");
//     });

//     it("should not allow buying tickets with less than the required ETH", async function () {
//       await expect(contract.connect(addr1).buyTickets(1, { value: ethers.utils.parseEther("0.5") })).to.be.revertedWith("Not enough ETH");
//     });
//   });

//   describe("chooseLuckyWinner", function () {
//     it("should choose a lucky winner after the event has ended", async function () {
//       // Two users buy one ticket each
//       await contract.connect(addr1).buyTickets(1, { value: ethers.utils.parseEther("1") });
//       await contract.connect(addr2).buyTickets(1, { value: ethers.utils.parseEther("1") });
  
//       // Move time forward by one day
//       await ethers.provider.send("evm_increaseTime", [86400]); 
//       await ethers.provider.send("evm_mine", []);
  
//       // Choose lucky winner
//       await contract.chooseLuckyWinner();
  
//       // Get winner and check that they are either addr1 or addr2
//       const luckyWinner = await contract.getLuckyWinnerAddress();
//       expect(luckyWinner == addr1.address || luckyWinner == addr2.address).to.be.true;
  
//       // Check that the event has ended and can't be interacted with anymore
//       await expect(contract.connect(owner).buyTickets(1, { value: ethers.utils.parseEther("1") }))
//         .to.be.revertedWith("Ticket sale has ended");
//       await expect(contract.connect(owner).chooseLuckyWinner()).to.be.revertedWith("Lucky winner already chosen");
//     });

//     it("should throw an error no one bought ticket", async function () {
//         // Move time forward by one day
//         await ethers.provider.send("evm_increaseTime", [86400]); 
//         await ethers.provider.send("evm_mine", []);

//         await expect(contract.chooseLuckyWinner()).to.be.revertedWith("No one has bought tickets");
//       });
//   });

// describe("Withdraw function", function () {
//     it("should withdraw the balance to owner", async function () {
//       await contract.connect(addr1).buyTickets(1, { value: ethers.utils.parseEther("1") });
//       await contract.connect(addr2).buyTickets(1, { value: ethers.utils.parseEther("1") });
  
//       await ethers.provider.send("evm_increaseTime", [86400]); // Move 1 day ahead
//       await ethers.provider.send("evm_mine", []);
  
//       await contract.chooseLuckyWinner();
  
//       const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
  
//       await contract.withdraw();
  
//       const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
  
//       expect(ownerBalanceAfter).to.be.above(ownerBalanceBefore);
//     });
  
//     it("should throw an error if called before event ends", async function () {
//       await expect(contract.withdraw()).to.be.revertedWith("Ticket sale is still on");
//     });
  
//     it("should throw an error if there's no ETH to withdraw", async function () {
//       await ethers.provider.send("evm_increaseTime", [86400]); // Move 1 day ahead
//       await ethers.provider.send("evm_mine", []);
  
//       await expect(contract.withdraw()).to.be.revertedWith("There's not ETH to withdraw");
//     });
  
//     it("should throw an error if there's no luky winner before withdraw", async function () {
//        // Two users buy one ticket each
//        await contract.connect(addr1).buyTickets(1, { value: ethers.utils.parseEther("1") });
//        await contract.connect(addr2).buyTickets(1, { value: ethers.utils.parseEther("1") });
   
//        // Move time forward by one day
//        await ethers.provider.send("evm_increaseTime", [86400]); 
//        await ethers.provider.send("evm_mine", []);
   
//        await expect(contract.withdraw()).to.be.revertedWith("Choose a lucky winner 1st");
//     });
//   });
  

// });

