import Web3 from 'web3';
import { tokens, EVM_REVERT, ETHER_ADDRESS, ether } from './helpers';


const Exchange = artifacts.require('./Exchange');
const Token = artifacts.require('./Token');

require('chai')
    .use(require('chai-as-promised'))
    .should()




contract('Exchange', ([sender, feeAccount, user2, user3]) => {

    let token
    let exchange
    const feePercent = 5;
    
    beforeEach(async ()=>{
        token = await Token.new()
        exchange = await Exchange.new(feeAccount, feePercent);
        
        
    })


    describe('deployment', ()=>{
        
        it("tracks the fee account", async()=>{
            const result = await exchange.feeAccount()
            result.should.equal(feeAccount)
        })

        it("tracks the fee percent", async()=>{
            const result = await exchange.feePercent();
            result.toString().should.equal(feePercent.toString())
        })

        it("tracks ether address", async()=>{
            const etherAddress = await exchange.ETHER()
            etherAddress.toString().should.be.equal(ETHER_ADDRESS)
        })

    })

    describe("fallback", ()=>{
        it("reverts when Ether is sent", async()=>{
            await exchange.sendTransaction({value:1, from:user2}).should.be.rejectedWith(EVM_REVERT)
        })
    })
    
    describe("depositing ether", ()=>{

        let result;
        let amount = ether(1)

        beforeEach(async ()=>{
            result = await exchange.depositEther({from: user2, value: amount})
        })
        
        
        it("tracks Ether deposit", async()=>{
            const balance = await exchange.tokens(ETHER_ADDRESS, user2)
            balance.toString().should.be.equal(amount.toString())
        })
    })

    describe("depositing tokens", ()=>{

        beforeEach(async ()=>{
            
            await token.approve(exchange.address, tokens(10), {from:sender});
            await token.approve(exchange.address, tokens(5), { from:user2 })
        })

        describe("success", ()=>{
           it("tracks the token deposit", async ()=>{
                const depositToken = await exchange.depositToken(token.address, tokens(3), { from:sender })
                const balance = await exchange.tokens(token.address, sender);
                balance.toString().should.equal(tokens(3).toString())
             
               
           })

           it("tracks user2 token deposit", async()=>{

                // since the account of the user is empty of our tokens, we'll funding it
                await token.transfer(user2, 15)
                await exchange.depositToken(token.address, 5, { from:user2 })
                
           })

           
        })

        describe("failure", ()=>{
            it("rejects when the depositor wants to transfer beyond the balance in their exchange", async ()=>{
                await exchange.depositToken(token.address, tokens(15), { from: sender }).should.be.rejectedWith(EVM_REVERT);
                await exchange.depositToken(token.address, tokens(10), { from: user2 }).should.be.rejectedWith(EVM_REVERT);
            })

            it("rejects user3 due because of non approval of token", async()=>{
                await exchange.depositToken(token.address, tokens(10), { from: user3 }).should.be.rejected
            })
            

            it("rejects depositing ether through the token deposit function", async()=>{
                    await exchange.depositToken(ETHER_ADDRESS, 1, {from: user2}).should.be.rejectedWith(EVM_REVERT)

            })

        })
    })

   

    

    
})