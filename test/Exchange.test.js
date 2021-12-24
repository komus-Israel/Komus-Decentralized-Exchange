const Exchange = artifacts.require('./Exchange.sol')
const Token = artifacts.require('./Token.sol')
import { tokens, ether, EVM_REVERT, ETHER_ADDRESS } from './helpers';
import Web3 from 'web3';

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract("Exchange", ([deployer, feeAccount, user1])=>{

    let exchange;
    let feePercent = 10;
    let token;
   

    beforeEach(async()=>{
        exchange = await Exchange.new(feeAccount, feePercent)
        token = await Token.new()
    })

    describe("fall back", ()=>{
        it("reverts when Ether is sent", async()=>{
            await exchange.sendTransaction({ value:1, from: user1 }).should.be.rejected
        })
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

            describe("the deployer deposits the token by approving", ()=>{
                
                let depositToken
                
                beforeEach(async()=>{
                    const approveToken = await token.approve(exchange.address, tokens('1'))
                    depositToken = await exchange.depositToken(token.address, tokens('0.5'))
                })

                describe("success", ()=>{

                    it("approved the exchange successfully", async()=>{
                    const approvedBalance = await token.allowance(deployer, exchange.address)
                    approvedBalance.toString().should.be.equal(tokens('0.5').toString()) //since we have deposited 0.5 already
                    
                    })


                    it("deposited tokens after approval", async()=>{
                        const exchangeBalance = await token.balanceOf(exchange.address)
                        exchangeBalance.toString().should.be.equal(tokens('0.5').toString()) // the exchange balance should then be equal to this
                    })

                    it("tracks the deposited token in the exchange account", async()=>{
                        const depositorTokenBalanceOnTheExchange = await exchange.tokens(token.address, deployer)
                        depositorTokenBalanceOnTheExchange.toString().should.be.equal(tokens('0.5').toString())  // the balance in the exchange should be equal to the amount deposited
                    })

                    it("emits deposit event", async()=>{
                        depositToken.logs[0].event.should.be.equal('Deposit')
                    })
                })

                describe("failed", ()=>{


                    it("rejects the deposit because the depositor does not have enough tokens", async()=>{
                        await token.approve(exchange.address, tokens('1'), { from: user1 })
                        await exchange.depositToken(token.address, tokens('1'), { from: user1 }).should.be.rejected
                    })


                })

                describe("token withdrawal", ()=>{

                    let withdraweBalanceBeforeWithdraw
                    let withdrawToken


                    beforeEach(async()=>{
                        
                        
                        withdraweBalanceBeforeWithdraw = await token.balanceOf(deployer)
                        withdrawToken = await exchange.withdrawTokens(token.address, tokens('0.5'), { from: deployer })
                    })

                    it("tracks the token balance of the withdrawe before withdrawing", async()=>{
                        
                        console.log('balance before withdrawal', withdraweBalanceBeforeWithdraw.toString())
                    })

                    it("withdraws successfully", async()=>{
                        const tokenBalanceAfterWithDrawing = await token.balanceOf(deployer)
                        console.log('balance after withdrawal', tokenBalanceAfterWithDrawing.toString())
                    })

                    it("tracks the withdraw event", async()=>{
                       withdrawToken.logs[0].event.should.be.equal('Withdraw')
                    })

                    it("failed to withdraw for insufficient balance", async()=>{
                        await exchange.withdrawTokens(token.address, tokens('1'), { from: deployer }).should.be.rejected
                    })

                    it("fails for trying to withdraw token from an ether address", async()=>{
                        await exchange.withdrawTokens(ETHER_ADDRESS, tokens('1'), { from: deployer }).should.be.rejected
                    })

                })

                
            })

            

        })

        describe("ether deposit", ()=>{

            //let deloyerEtherBalance
            let etherDeposit
            let etherAmount = ether('2');
            beforeEach(async()=>{
                etherDeposit = await exchange.depositEther({ from: user1, value: ether('2') })
            })

            describe("success", ()=>{
                it("deposits the ether successfully", async()=>{
                    const depositedEtherBalance = await exchange.tokens(ETHER_ADDRESS, user1);
                    depositedEtherBalance.toString().should.be.equal(etherAmount.toString())
                })
                
                it("emits deposit event", async()=>{
                    etherDeposit.logs[0].event.should.be.equal('Deposit')
                })
            })


            describe("failed", ()=>{
                it("fails when an address tries to deposit ether throught the deposit token function", async()=>{
                        await exchange.depositToken(ETHER_ADDRESS, etherAmount, { from:user1 }).should.be.rejected
                })

            })

             describe("ether withdrawal", ()=>{

                 let withdrawal

                 beforeEach(async()=>{
                    withdrawal = await exchange.withdrawEther(ether('1'), { from: user1})
                 })

                 describe("successful withdrawal", ()=>{

                    it("reduces the amount the ether in the withdrawee exchange account", async()=>{
                        const balanceAfterWithdrawal = await exchange.tokens(ETHER_ADDRESS, user1)
                        balanceAfterWithdrawal.toString().should.be.equal(ether('1').toString())
                    })

                    it("emitted the withdraw event", async()=>{
                        withdrawal.logs[0].event.should.be.equal('Withdraw')
                    })

                 })

                 describe("failed withdrawal", ()=>{
                     
                     it("rejects the withdrawal request due to insufficient ether in deposit", async()=>{
                            await exchange.withdrawEther(ether('3'), { from: deployer}).should.be.rejected
                     })
                 })

                
            })

            
        })


        describe("deposited tokens balances on the exchange", ()=>{
            it("tracks the ether balance", async()=>{
                const etherBalance = await exchange.balanceOf(ETHER_ADDRESS, deployer)
                console.log('ether balance on the exchange: ', etherBalance.toString())
            })

            it("tracks the token balance on the exchange", async()=>{
                const tokenBalance = await exchange.balanceOf(token.address, deployer )
                console.log('ether balance on the exchange: ', tokenBalance.toString())
            })
        })

        
    })


    describe("creating order", ()=>{

        let order1;
        let order2;

        beforeEach(async()=>{
            order1 = await exchange.createOrder(tokens('1'), ether('1'), token.address, ETHER_ADDRESS, { from: deployer })
            order2 = await exchange.createOrder(ether('1'), tokens('1'), ETHER_ADDRESS, token.address, { from: user1 })
        })

        it("emits an event", async()=>{
            order1.logs[0].event.should.be.equal("Order")
            order2.logs[0].event.should.be.equal("Order")
        })

        it("checks that the order has been saved in the orders storage", async()=>{
            const order1_check = await exchange.orders(1) 
            const order2_check = await exchange.orders(2) 
            order1_check._id.toString().should.be.equal('1', "id for first order is correct")
            order2_check._id.toString().should.be.equal('2', "id for second order is correct")

            // check the order creators
            order1_check._creators.should.be.equal(deployer, "order one creator is correct")
            order2_check._creators.should.be.equal(user1, "order two creator is correct")

            // check the token expected 
            order1_check._tokenGet.should.be.equal(ETHER_ADDRESS, "token expected by order one creator is correct")
            order2_check._tokenGet.should.be.equal(token.address, "token expected by order two creator is correct")
            
        })

        it("increments the order count for new orders", async()=>{
            const orderCounts = await exchange.orderCount()
            orderCounts.toString().should.be.equal('2') // should equal two since we've have created two orders so far
        })

        

    })

    

})