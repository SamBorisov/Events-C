const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ContractFactory", function () {
  let ContractFactory;
  let contractFactory;
  let EventContract;
  let eventContract;
  let owner;
  let addr1;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, ...addrs] = await ethers.getSigners();
    ContractFactory = await ethers.getContractFactory("ContractFactory");
    EventContract = await ethers.getContractFactory("EventContract");
    contractFactory = await ContractFactory.deploy();
    await contractFactory.deployed();
  });

  describe("createEventContract", function () {
    it("should create a new EventContract and emit an EventContractCreated event", async function () {
      const uri = "https://via.placeholder.com/150";
      const result = await contractFactory.createEventContract(
        "Test Event",
        1000,
        "This is a test event",
        100,
        uri
      );
      const eventAddress = result[0];
      const eventOwner = result[1];

      // Check that a new EventContract was created and emitted an event
      expect(eventAddress).to.be.properAddress;
      expect(eventOwner).to.equal(owner.address);
      expect(await contractFactory.getNumberOfEventContracts()).to.equal(1);

      // Check that the new EventContract has the correct properties
      eventContract = await EventContract.attach(eventAddress);
      expect(await eventContract.nameOfEvent()).to.equal("Test Event");
      expect(await eventContract.endTicketSale()).to.equal(
        (await ethers.provider.getBlock("latest")).timestamp + 1000
      );
      expect(await eventContract.aboutEvent()).to.equal("This is a test event");
      expect(await eventContract.priceForEvent()).to.equal(100);
      expect(await eventContract.uri(1)).to.equal(uri);
    });
  });

  describe("getNumberOfEventContracts", function () {
    it("should return the correct number of created event contracts", async function () {
      expect(await contractFactory.getNumberOfEventContracts()).to.equal(0);

      await contractFactory.createEventContract(
        "Test Event 1",
        1000,
        "This is a test event 1",
        100,
        "https://example.com/token/{id}.json"
      );
      expect(await contractFactory.getNumberOfEventContracts()).to.equal(1);

      await contractFactory.createEventContract(
        "Test Event 2",
        2000,
        "This is a test event 2",
        200,
        "https://example.com/token/{id}.json"
      );
      expect(await contractFactory.getNumberOfEventContracts()).to.equal(2);
    });
  });

  describe("getEventContractAddress", function () {
    it("should return the correct address for a created event contract", async function () {
      const result = await contractFactory.createEventContract(
        "Test Event",
        1000,
        "This is a test event",
        100,
        "https://example.com/token/{id}.json"
      );
      const eventAddress = result[0];

      expect(await contractFactory.getEventContractAddress(0)).to.equal(eventAddress);
    });

    it("should revert if an invalid index is provided", async function () {
      await expect(contractFactory.getEventContractAddress(0)).to.be.revertedWith("Invalid index");
    });
  });
});
