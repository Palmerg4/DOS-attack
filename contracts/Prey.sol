// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Prey {
    error ValueLessThanCurrentAuctionPrice();

    address public currentWinner;
    uint256 public currentAuctionPrice;

    constructor() {
        currentWinner = msg.sender;
    }

    function setCurrentAuctionPrice() public payable {
        if(msg.value < currentAuctionPrice) revert ValueLessThanCurrentAuctionPrice();

        // Send currentWinner back their deposit if new user provides higher value
        (bool sent, ) = currentWinner.call{value: currentAuctionPrice}("");
        if(sent) {
            currentAuctionPrice = msg.value;
            currentWinner = msg.sender;
        }
    }
}