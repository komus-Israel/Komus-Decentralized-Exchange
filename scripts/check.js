const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'


module.exports = async function(callback) {
    const accounts = await web3.eth.getAccounts()
    const deployer = accounts[0]

    

    const exchange = await Exchange.deployed()
    const token = await  Token.deployed()

    var depositedBalance = await exchange.tokens(token.address, accounts[2])
    var depositedEther = await exchange.tokens(ETHER_ADDRESS, accounts[2])


    console.log((depositedBalance / 10**18).toString())
    console.log((depositedEther / 10**18).toString())


}