// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Prevention {
    error ValueLessThanCurrentAuctionPrice();
    error CurrentWinnerCannotWithdraw();

    address public currentWinner;
    uint256 public currentAuctionPrice;
    mapping(address => uint256) public balances;

    constructor() {
        currentWinner = msg.sender;
    }

    function setCurrentAuctionPrice() public payable {
        if(msg.value < currentAuctionPrice) revert ValueLessThanCurrentAuctionPrice();
        balances[currentWinner] += currentAuctionPrice;
        currentAuctionPrice = msg.value;
        currentWinner = msg.sender;
    }

    function withdraw() public {
        if(msg.sender == currentWinner) revert CurrentWinnerCannotWithdraw();

        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}