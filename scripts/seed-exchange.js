const { default: Web3 } = require("web3")

const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')




module.exports = async function() {

    try {

        // get the accounts
        const accounts = await web3.eth.getAccounts()
        const deployer = accounts[0]
        const amount = web3.utils.toWei('1000', 'ether')
        const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

        const ether=(n)=>{
            return new web3.utils.BN(
                web3.utils.toWei(n.toString(), 'ether')
            )
            
        }
        
        //same as ether
        const tokens =(n)=>ether(n)

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
        async function checkTokenBalane(account) {
            const balance = await token.balanceOf(account)
            return balance.toString()
        }

        //  create function to deposit tokens
        async function tokenDeposit(amount) {
            // approve exchange for deposit

                await token.approve(exchange.address, amount)
                await exchange.depositToken(token.address, amount)
    
            
        }

        


         // check the token balance of the first account
         const deployersBalance = await checkTokenBalane(deployer)
         console.log('deployers balance is', deployersBalance)

        // transfer some tokens to two other accounts
        await sendTokens(accounts[1], amount)
        await sendTokens(accounts[2], amount)

        // check balance of the token recipients accounts
        const accountBalance1 =  await checkTokenBalane(accounts[1])
        console.log('token balance of the first account', accountBalance1)

        const accountBalance2 =  await checkTokenBalane(accounts[2])
        console.log('token balance of the second account', accountBalance2)


        //  deposit tokens

        await tokenDeposit(amount, { from: deployer })
        await tokenDeposit(amount, { from: accounts[1]})
        await tokenDeposit(amount, { from: accounts[2]})

        // deposit ether
        await exchange.depositEther({from: accounts[1], value:ether(2)})
        await exchange.depositEther({from: accounts[2], value:ether(15)})

        
        //  create order
        let result
        let orderId

        result = await exchange.createOrder(ether(2), tokens(100), ETHER_ADDRESS, token.address, { from: accounts[1] } )

        // account 1 cancels order
        orderId = result.logs[0].args._id 
        await exchange.cancelOrders(orderId, { from: accounts[1] })
        console.log("cancelled order from account1")


        // accoun1 creates another set of orders
        result = await exchange.createOrder(ether(2), tokens(100), ETHER_ADDRESS, token.address, { from: accounts[1] } )
        console.log("account1 makes order")


        // user two fills order
        orderId = result.logs[0].args._id
        await exchange.fillOrder(orderId, { from: accounts[2]})



        // user2 creates order
        result = await exchange.createOrder(ether(2), tokens(50), ETHER_ADDRESS, token.address, { from: accounts[2] } )
        console.log("account2 makes order")


         // user one fills order
         orderId = result.logs[0].args._id
         await exchange.fillOrder(orderId, { from: accounts[1]})



         // create open orders

         for(let i; i<=10; i++) {
            result = await exchange.createOrder(tokens(20), ether(0.5 * i), token.address, ETHER_ADDRESS, { from: accounts[2]} )
            console.log(`make order ${i} from user2`)
         }

    



        


    } catch (err) {
        console.log(err)
    }
    
}