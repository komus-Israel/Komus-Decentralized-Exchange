const Exchange = artifacts.require('./Exchange.sol')
const Token = artifacts.require('./Token.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract("Exchange", ([deployer, feeAccount])=>{

    let exchange;
    let feePercent = 10;
    let token;

    beforeEach(async()=>{
        exchange = await Exchange.new(feeAccount, feePercent)
        token = await Token.new()
    })

    describe("deployment", ()=>{
        it("deployed exhange contract successfully", ()=>{
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

        it("deployed the token contract successfully", async()=>{
            const tokenAddress = await token.address 
            tokenAddress.should.not.be.equal('')
        })

    })

    describe("deposit tokens", ()=>{

        let exchangeBalance

        //  get the balance of the exchanage before token deposit
        beforeEach(async()=>{
            exchangeBalance = await token.balanceOf(exchange.address)
        })

        it("exhange balance before deposit should be zer", async()=>{
            exchangeBalance.toString().should.be.equal('0')
        })
    })

})