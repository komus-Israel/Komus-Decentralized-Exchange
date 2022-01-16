const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'


module.exports = async function(callback) {

    const ether=(n)=>{
        return new web3.utils.BN(
            web3.utils.toWei(n.toString(), 'ether')
        )
        
    }

    const wait=(seconds)=>{
        const milliseconds= seconds * 1000
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    //same as ether
    const tokens =(n)=>ether(n)


    let result
    const accounts = await web3.eth.getAccounts()
    const deployer = accounts[0]

    

    const exchange = await Exchange.deployed()
    const token = await  Token.deployed()

    var depositedBalance = await exchange.balanceOf(token.address, accounts[2])
    var depositedEther = await exchange.balanceOf(ETHER_ADDRESS, accounts[2])


    console.log((depositedBalance / 10**18).toString())
    console.log((depositedEther / 10**18).toString())

    result = await exchange.createOrder(ether(2), tokens(1), ETHER_ADDRESS, token.address, { from: accounts[1] } )

    await wait(1)

    const orderId = result.logs[0].args._id 

    console.log(orderId.toString())
    await exchange.fillOrder(orderId, {from: accounts[2]})

    console.log('order filled')


}