const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    // let ... so this variabels are not only in scope of beforeEach function
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    // if it.only - only this test will be made
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // expect and assert
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue) - the same as above
    })

    it("Should update when we call store", async function () {
        const expectedValue = "33"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add new person to array and update name to favoriteNumber", async function () {
        const expectedNumber = "33"
        const expectedName = "George"
        const transactionResponse = await simpleStorage.addPerson(
            expectedName,
            expectedNumber
        )
        await transactionResponse.wait(1)

        const currentPerson = await simpleStorage.people(0)
        assert.equal(currentPerson.name, expectedName)
        assert.equal(currentPerson.favoriteNumber.toString(), expectedNumber)

        const currentNumber = await simpleStorage.nameToFavoriteNumber(
            expectedName
        )
        assert.equal(currentNumber.toString(), expectedNumber)
    })
})
