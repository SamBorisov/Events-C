// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Event.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.2/contracts/proxy/Clones.sol";

contract ContractFactory {

    event EventContractCreated(address indexed newEventContractAddress, address indexed owner);

    EventContract[] public eventContracts;
    address private _eventContractImplementation;

    constructor() {
        _eventContractImplementation = address(new EventContract("", 0, "", 0, ""));
    }
    
    function createEventContract(string memory _nameOfEvent, uint _endTicketSale, string memory _aboutEvent, uint _priceForEvent, string memory _uri) public returns (address, address) {
        address eventContractAddress = Clones.clone(_eventContractImplementation);
        EventContract eventContract = EventContract(eventContractAddress);
        eventContract.initialize(_nameOfEvent, _endTicketSale, _aboutEvent, _priceForEvent, _uri);
        emit EventContractCreated(eventContractAddress, msg.sender);
        eventContracts.push(eventContract);
        return (eventContractAddress, msg.sender);
    } 

    // Get the total number of created event contracts
    function getNumberOfEventContracts() public view returns (uint) {
        return eventContracts.length;
    }
    
    // Get the address of an event contract at a specified index in the list
    function getEventContractAddress(uint index) public view returns (address) {
        require(index < eventContracts.length, "Invalid index");
        return address(eventContracts[index]);
    }
}
