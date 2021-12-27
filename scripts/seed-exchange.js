const { default: Web3 } = require("web3")

const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')


module.exports = async function() {

    try {

        // get the accounts
        const accounts = await Web3.eth.getAccounts()

        //  fetch the deployed Token Contract
        const token = await Token.deployed()
        console.log('token fetched', token.address)


        //  fetch deployed Exchange Contract
        const exchange = await Exchange.deployed()
        console.log('exchange fetched', exchange.address)

    } catch (err) {
        console.log(err)
    }
    
}