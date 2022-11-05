const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle } = require("hardhat");

describe("Attack prey contract", () => {
    it("Should allow Attack.sol to be winner after sending highest value, creating a DOS attack", async () => {
        const Prey = await ethers.getContractFactory("Prey");
        const prey = await Prey.deploy();
        await prey.deployed();

        const Attack = await ethers.getContractFactory("Attack");
        const attack = await Attack.deploy(prey.address);
        await attack.deployed();

        const [_, addr1, addr2] = await ethers.getSigners();

        let tx = await prey.connect(addr1).setCurrentAuctionPrice({
            value: ethers.utils.parseEther("1"),
        });
        await tx.wait();

        tx = await attack.attack({
            value: ethers.utils.parseEther("2"),
        });
        await tx.wait();

        tx = await prey.connect(addr2).setCurrentAuctionPrice({
            value: ethers.utils.parseEther("9"),
        });
        await tx.wait();

        expect(await prey.currentWinner()).to.equal(attack.address);
    });
});