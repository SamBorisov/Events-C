// test/ContractFactory.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ContractFactory", function () {
  let contractFactory;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const ContractFactory = await ethers.getContractFactory("ContractFactory");
    contractFactory = await ContractFactory.deploy();
  });

  describe("createEventContract", function () {
    it("should create a new event contract", async function () {
      const nameOfEvent = "Test Event";
      const endTicketSale = Math.floor(Date.now() / 1000) + 86400;
      const aboutEvent = "This is a test event";
      const priceForEvent = ethers.utils.parseEther("1");
      const uri = "https://myjsonserver.com/events/1";

      const tx = await contractFactory.connect(addr1).createEventContract(
        nameOfEvent,
        endTicketSale,
        aboutEvent,
        priceForEvent,
        uri
      );
      await tx.wait();

    const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
    const events = await contractFactory.queryFilter(contractFactory.filters.EventContractCreated(), receipt.blockNumber, receipt.blockNumber);

    expect(events.length).to.equal(1);
    expect(events[0].args.owner).to.be.properAddress;
    expect(events[0].args.newEventContractAddress).to.be.properAddress;


    });
  });


  describe("getNumberOfEventContracts", function () {
    it("should return the number of event contracts created", async function () {
      const numberOfContracts = await contractFactory.getNumberOfEventContracts();
      expect(numberOfContracts).to.equal(0);

      await contractFactory.createEventContract(
        "Test Event",
        Math.floor(Date.now() / 1000) + 86400,
        "This is a test event",
        ethers.utils.parseEther("1"),
        "https://myjsonserver.com/events/1"
      );

      const newNumberOfContracts = await contractFactory.getNumberOfEventContracts();
      expect(newNumberOfContracts).to.equal(1);
    });
  });

  describe("getEventContractAddress", function () {
    it("should return the address of an event contract at the specified index", async function () {
      await contractFactory.createEventContract(
        "Test Event",
        Math.floor(Date.now() / 1000) + 86400,
        "This is a test event",
        ethers.utils.parseEther("1"),
        "https://myjsonserver.com/events/1"
      );

      const eventAddress = await contractFactory.getEventContractAddress(0);
      expect(eventAddress).to.not.be.undefined;
    });

    it("should throw an error if the specified index is out of range", async function () {
      await expect(contractFactory.getEventContractAddress(0)).to.be.rejectedWith(
        "Invalid index"
      );
    });
  });
});
