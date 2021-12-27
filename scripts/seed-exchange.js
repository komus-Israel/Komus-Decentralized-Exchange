const { default: Web3 } = require("web3")

const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')




module.exports = async function() {

    try {

        // get the accounts
        const accounts = await web3.eth.getAccounts()
        const deployer = accounts[0]
        const amount = web3.utils.toWei('1000', 'ether')

        //  fetch the deployed Token Contract
        const token = await Token.deployed()
        console.log('token fetched', token.address)


        //  fetch deployed Exchange Contract
        const exchange = await Exchange.deployed()
        console.log('exchange fetched', exchange.address)


       

        // create function to send tokens
        async function sendTokens(recipient, amount){
            await token.transfer(recipient, amount,  { from: deployer })
        }

        // create function to check token balance tokens
        async function checkTokenBalane(account){
            const balance = await token.balanceOf(account)
            return balance.toString()
        }


         // check the token balance of the first account
         const deployersBalance = await checkTokenBalane()
         console.log('deployers balance is', deployersBalance)
         
        // transfer some tokens to two other accounts
        await sendTokens(accounts[1], amount)
        await sendTokens(accounts[2], amount)

        // check balance of these accounts
        const tokenBalance1 = await token.balanceOf(accounts[1])
        console.log('token balance of the first account', tokenBalance1.toString())

        const tokenBalance2 = await token.balanceOf(accounts[2])
        console.log('token balance of the first account', tokenBalance2.toString())

    } catch (err) {
        console.log(err)
    }
    
}