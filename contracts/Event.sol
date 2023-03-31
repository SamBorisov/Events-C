// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Marketplace.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";


// Define the event contract
contract EventContract is ERC1155, Ownable {

    string public nameOfEvent;
    uint public startTicketSale;
    uint public endTicketSale;
    string public aboutEvent;
    uint public priceForEvent;
    string public uri;
    bytes uriBytes = abi.encodePacked(uri);

    address[] public addressList;
    bool public luckyWinnerChosen = false;
    address public luckyWinner;

    constructor(string memory _nameOfEvent,  uint _endTicketSale, string memory _aboutEvent, uint _priceForEvent, string memory _uri) ERC1155(_uri) {
        nameOfEvent = _nameOfEvent;
        startTicketSale = block.timestamp;
        endTicketSale = block.timestamp + _endTicketSale;
        aboutEvent = _aboutEvent;
        priceForEvent = _priceForEvent;
        uri = _uri;
    }

    // handle getting tickets
    function mint(address _to, uint256 _id, uint256 _amount, bytes memory _data) internal  {
        _mint(_to, _id, _amount, _data);
    } 

    function buyTickets(uint256 _amount) public payable {
        require(msg.value >= priceForEvent * _amount, "Not enough ETH");
        require(block.timestamp < endTicketSale, "Ticket sale has ended");
        mint(msg.sender, 1, _amount, uriBytes);
        bool alreadyInList = false;
            for (uint i = 0; i < addressList.length; i++) {
                if (addressList[i] == msg.sender) {
                    alreadyInList = true;
                    break;
                }
            }
            if (!alreadyInList) {
                addressList.push(msg.sender);
            }
    }

    // after event end
    modifier onlyAfterEventEnds() {
        require(block.timestamp >= endTicketSale, "Ticket sale is still on");
        _;
    }

    function withdraw() public onlyAfterEventEnds  onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0,"There's not ETH to withdraw");
        require(luckyWinnerChosen == true, "Choose a lucky winner 1st");
        require(payable(owner()).send(address(this).balance));
    }

    function chooseLuckyWinner() public onlyAfterEventEnds  returns (address) {
        require(addressList.length > 0, "No one has bought tickets");
        require(!luckyWinnerChosen, "Lucky winner already chosen");
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % addressList.length;
        address winner = addressList[randomNumber];
        luckyWinner = winner;
        mint(winner, 1 , 1, uriBytes);
        luckyWinnerChosen = true;
        return winner;
    }

    //View functions
    function getTicketBalance() public view returns (uint256) {
        return balanceOf(msg.sender, 1);
    }

    function getLuckyWinnerAddress() public view returns (address) {
        return luckyWinner;
    }

    function getUri() public view returns (string memory) {
        return uri;
    }  

    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getEndTimestamp() public view returns (uint256) {
        return endTicketSale;
    }

    function getEventName() public view returns (string memory) {
        return nameOfEvent;
    }  

    function getEventDetails() public view returns (string memory) {
        return aboutEvent;
    }  
    
    function getEventPrice() public view returns (uint256) {
        return priceForEvent;
    }  
}

