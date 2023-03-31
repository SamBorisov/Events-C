# Event Factory

The project contains 2 contracts: 
Marketplace.sol - a proxy factory that has a function which deploys an event contract with specific event details, and set the sender of the function as the owner of the new contract.
Event.sol - saves details of the event, and allows users to buy tickets at a specific price, at the end of the event a lucky winner could be chosen with a function call, and after the owner could withdraw his profit from the sale.

How to use:
1 - install necessary packages 
npm install
2 - compile the contracts 
npx hardhat compile
3 - set a local node
npx hardhat node
4 - run the tests
npx hardhat test
5 - run the script that covers one contract cycle
npx hardhat run .\scripts\fullCycle.js


How to use with the front end:
1 - install necessary packages 
npm install
2 - compile the contracts 
npx hardhat compile
3 - set a local node
npx hardhat node
4 - run the script for deploying it to localhost
npx hardhat run .\scripts\deploy.js
5 - connect your metamask using localhost (if not set)
![image](https://user-images.githubusercontent.com/88675952/229177094-acde568b-94a7-4c93-9f69-6e15a3513c61.png)
6 - insert a private key from the Hardhat node with ether to Metamask, so you can interact with the contracts:
![image](https://user-images.githubusercontent.com/88675952/229177869-0aa97b9f-99e7-4d13-9352-a218421d599d.png)
7 - You can see the balance of your tickets by clicking the balance button, choosing a number for the number of tickets you want to buy a press button for buy tickets.
By clicking on BTN current and end time - you can see when the end of the sale ends(set by the deployed test). You can call "Get lucky winner" after the sale ends and see the lucky winner's address after it was chosen! (there should be at least 1 bought ticket)
8 - if there's a problem with the blocks number or nonce, Reset your metamask account from settings/advanced:
![image](https://user-images.githubusercontent.com/88675952/229178583-d31f8c84-3da9-40f5-af46-7283983ddf04.png)

