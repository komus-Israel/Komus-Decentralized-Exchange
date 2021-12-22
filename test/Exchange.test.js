const Exchange = artifacts.require('./Exchange.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract("Exchange", ([deployer, feeAccount])=>{

    let exchange;
    let feePercent = 10

    beforeEach(async()=>{
        exchange = await Exchange.new(feeAccount, feePercent)
    })

    describe("deployment", ()=>{
        it("deployed successfully", ()=>{
            const exchangeAddress = exchange.address
            exchangeAddress.should.not.be.equal('')
        })

        it("it sets the transaction fee account on deployment", async()=>{
            const transactionFeeAccount = await exchange.transactionFeeAccount()
            transactionFeeAccount.should.be.equal(feeAccount)
        })
        
        it("sets the feePercent", async()=>{
            const transactionFeePercent = await exchange.transactionFeePercent()
            transactionFeePercent.toString().should.be.equal(feePercent.toString())
        })
    })

})