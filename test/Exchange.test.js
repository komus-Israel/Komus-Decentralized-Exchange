const Exchange = artifacts.require('./Exchange.sol')
const Token = artifacts.require('./Token.sol')
import { tokens, EVM_REVERT } from './helpers';

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


        it("confirms that the balance of the deployer is not zero", async()=>{
            const deployerBalance = await token.balanceOf(deployer)
            deployerBalance.toString().should.not.be.equal('0')
        })

        it("confirms that the balance of the deployer is equal to the total supply", async()=>{
            const deployerBalance = await token.balanceOf(deployer)
            deployerBalance.toString().should.be.equal(tokens('1000000').toString())
        })

    })

    describe("deposit tokens", ()=>{

        let exchangeBalance

        //  get the balance of the exchanage before token deposit
        beforeEach(async()=>{
            exchangeBalance = await token.balanceOf(exchange.address)
        })

        it("exhange balance before deposit should be zero", async()=>{
            exchangeBalance.toString().should.be.equal('0')
        })


        describe("the deployer sends tokens to the exchange", ()=>{

            // the deployer deposits tokens to the exchange
            beforeEach(async()=>{
                await token.transfer(exchange.address, tokens('1'), { from: deployer })
            })

            it("deployer sent tokens to the exchange successfully", async()=>{
                const updatedExchangeTokenBalance = await token.balanceOf(exchange.address)
                updatedExchangeTokenBalance.toString().should.be.equal(tokens('1').toString(), 'transfer was successful')

            })
        })


        describe("the deployer deposit tokens to the exchange via the transferFrom function", ()=>{

           

            it("confirms that the exhange balance is still zero", ()=>{
                exchangeBalance.toString().should.be.equal('0')
            })

            it("rejects the deposit because the exchange has not be approved", async()=>{
                await exchange.depositToken(token.address, tokens('1')).should.be.rejected
            })

            describe("the deployer deposits the token by approving", ()=>{
                beforeEach(async()=>{
                    await token.approve(exchange.address, tokens('1'))
                    await exchange.depositToken(token.address, tokens('0.5'))
                })

                it("approved the exchange successfully", async()=>{
                    const approvedBalance = await token.allowance(deployer, exchange.address)
                    approvedBalance.toString().should.be.equal(tokens('0.5').toString()) //since we have deposited 0.5 already
                    
                })

                it("deposited tokens after approval", async()=>{
                    const exchangeBalance = await token.balanceOf(exchange.address)
                    exchangeBalance.toString().should.be.equal(tokens('0.5').toString())
                })
            })

            

        })


        
    })

})