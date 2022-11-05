const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle } = require("hardhat");

describe("Prevent DOS attack", () => {
    it("Should allow new users to become currentAuctionWinner after Attack.sol tries to DOS attack", async () => {
        const Prevention = await ethers.getContractFactory("Prevention");
        const prevention = await Prevention.deploy();
        await prevention.deployed();

        const Attack = await ethers.getContractFactory("Attack");
        const attack = await Attack.deploy(prevention.address);
        await attack.deployed();

        const [_, addr1, addr2] = await ethers.getSigners();

        let tx = await prevention.connect(addr1).setCurrentAuctionPrice({
            value: ethers.utils.parseEther("1"),
        });
        await tx.wait();

        tx = await attack.attack({
            value: ethers.utils.parseEther("2"),
        });
        await tx.wait();

        tx = await prevention.connect(addr2).setCurrentAuctionPrice({
            value: ethers.utils.parseEther("9"),
        });
        await tx.wait();

        expect(await prevention.currentWinner()).to.equal(addr2.address);

    })
})