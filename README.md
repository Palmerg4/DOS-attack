# DOS Attack

DOS attacking Prey.sol by calling from a contract with no fallback function, rendering it's logic unusble by any other users

# Prevention 

By adding a seperate withdraw function, the contract can no longer be DOS attacked in the same way. Allowing other users to send a higher value than Attack.sol and being named `currentAuctionWinner` as intended

```shell
npm install
npx hardhat test
```
