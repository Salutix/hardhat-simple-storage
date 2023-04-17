const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    // task arguments for us are blank
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}
