const { expect } = require("chai");

describe("EventContract", function() {
  let eventContract;

  beforeEach(async () => {
    const EventContract = await ethers.getContractFactory("EventContract");
    eventContract = await EventContract.deploy(
      "Test Event",
      3600,
      "This is a test event.",
      ethers.utils.parseEther("1"),
      "https://test-event.com/"
    );
    await eventContract.deployed();
  });

  it("should allow users to buy tickets and increase ticket balance", async function() {
    const initialBalance = await ethers.provider.getBalance(signers[0].address);
    const expectedTickets = 2;
    await eventContract.connect(signers[0]).buyTickets(expectedTickets, { value: expectedTickets * await eventContract.priceForEvent() });
    const finalBalance = await ethers.provider.getBalance(signers[0].address);
    const expectedBalance = initialBalance.sub(expectedTickets * await eventContract.priceForEvent());
    const ticketBalance = await eventContract.connect(signers[0]).getTicketBalance();
    expect(finalBalance).to.equal(expectedBalance);
    expect(ticketBalance).to.equal(expectedTickets);
  });

  it("should choose a lucky winner and increase lucky winner's ticket balance", async function() {
    const expectedTickets = 1;
    await eventContract.connect(signers[0]).buyTickets(expectedTickets, { value: await eventContract.priceForEvent() });
    await eventContract.connect(signers[1]).buyTickets(expectedTickets, { value: await eventContract.priceForEvent() });
    const winnerAddress = await eventContract.chooseLuckyWinner();
    const ticketBalance = await eventContract.balanceOf(winnerAddress, 1);
    expect(ticketBalance).to.equal(expectedTickets);
  });

  it("allows owner to withdraw profit at the end of the event", async () => {
    // Choose a lucky winner
    await eventContract.chooseLuckyWinner();
    // Advance the block time to end the event
    await network.provider.send("evm_increaseTime", [endTime - startTime + 1]);
    await network.provider.send("evm_mine");
    // Get the owner balance before withdrawing
    const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
    // Withdraw profit
    await eventContract.withdraw();
    // Get the owner balance after withdrawing
    const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
    // Calculate the expected profit
    const expectedProfit = ethers.BigNumber.from(ticketPrice).mul(numTickets).sub(eventCost);
    // Check that the owner balance has increased by the expected profit
    expect(ownerBalanceAfter.sub(ownerBalanceBefore)).to.equal(expectedProfit);
  });
  
});
