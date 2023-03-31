// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Event.sol";

contract ContractFactory {

    event EventContractCreated(address indexed newEventContractAddress, address indexed owner);

    EventContract[] public eventContracts;
    
    function createEventContract(string memory _nameOfEvent, uint _endTicketSale, string memory _aboutEvent, uint _priceForEvent, string memory _uri) public returns (address, address) {
        EventContract eventContract = new EventContract(_nameOfEvent, _endTicketSale, _aboutEvent, _priceForEvent, _uri);
        address eventAddress = address(eventContract);
        address eventOwner = eventContract.owner();
        emit EventContractCreated(eventAddress, msg.sender);
        eventContracts.push(eventContract);
        eventContract.transferOwnership(msg.sender);
        return (eventAddress, eventOwner);
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