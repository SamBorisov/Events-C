# Event Factory

Front-End - `https://github.com/SamBorisov/event-fe` 

### This project consists of 2 contracts:
- Marketplace.sol: a proxy factory that deploys a new event contract with specific details and sets the sender of the function as the owner of the new contract.
- Event.sol: saves event details, allows users to buy tickets at a specific price, choose a lucky winner at the end of the event, and allows the owner to withdraw their profit from the sale.
## Usage
### Setup
- Install necessary packages: `npm install`
- Compile the contracts: `npx hardhat compile`
- Set a local node: `npx hardhat node`
### Running Tests
- Run the tests: `npx hardhat test`
- Running Script for One Contract Cycle
- Run the script that covers one contract cycle:` npx hardhat run .\scripts\fullCycle.js`


## Usage with Front End
- Install necessary packages: `npm install`
- Compile the contracts: `npx hardhat compile`
- Set a local node: `npx hardhat node`
- Deploy to localhost: `npx hardhat run .\scripts\deploy.js`
- Connect your Metamask wallet to localhost (if not set). <br>
![image](https://user-images.githubusercontent.com/88675952/229177094-acde568b-94a7-4c93-9f69-6e15a3513c61.png)
- Insert a private key from the Hardhat node with ether to Metamask to interact with the contracts.
![image](https://user-images.githubusercontent.com/88675952/229177869-0aa97b9f-99e7-4d13-9352-a218421d599d.png)
- Click the "Balance" button to see your ticket balance. Choose a number for the number of tickets you want to buy and press the "Buy Tickets" button. You can see the current and end time by clicking on the "BTN current and end time". After the sale ends, you can call "Get Lucky Winner" and see the lucky winner's address after it was chosen. (there should be at least 1 bought ticket)
- If you encounter problems with the blocks number (change the network then go agaon to localhost) or nonce, reset your Metamask account from settings/advanced.<br>
![image](https://user-images.githubusercontent.com/88675952/229178583-d31f8c84-3da9-40f5-af46-7283983ddf04.png)





