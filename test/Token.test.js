import { tokens, EVM_REVERT } from './helpers';


const Token = artifacts.require('./Token');

require('chai')
    .use(require('chai-as-promised'))
    .should()




contract('Token', ([deployer, receiver, exchange]) => {

    let token
    const tokenName = "Zamar";
    const tokenSymbol = "Zam";
    const tokenDecimals = '18';
    const tokenTotalSupply = tokens('1000000');

    beforeEach(async ()=>{
        token = await Token.new(tokenName, tokenSymbol)
        
    })


    describe('deployment', ()=>{
        it("tracks the name", async ()=>{
            const name = await token.name()
            name.should.equal(tokenName)
            //Fetch token from bc
            //Read token name here
            //Check token name is my name
        })

        it("tracks the symbol", async ()=>{
            const symbol = await token.symbol()
            symbol.should.equal(tokenSymbol)
        })


        it("tracks the decimals", async ()=>{
            const decimals = await token.decimals()
            decimals.toString().should.equal(tokenDecimals)
        })


        it("tracks the total supply", async ()=>{
            const totalSupply = await token.totalSupply()
            totalSupply.toString().should.equal(tokenTotalSupply.toString())
        })


        it("assigns the total supply to the deployer", async ()=>{
            const result = await token.balanceOf(deployer)
            result.toString().should.equal(tokenTotalSupply.toString())
        })


    })

    describe("describe delagating token transfer", ()=>{

        let amount;
        let result;


        beforeEach(async ()=>{
            amount = tokens(100)
            await token.approve(exchange, amount, { from:deployer })
        })

        describe('success', ()=>{

            beforeEach( async()=>{
                
                result = await token.transferFrom(deployer, receiver, amount, { from: exchange })
            })

            
            it("transfer token balances", async ()=> {
                let balanceOfDeployer
                let balanceOfReceiver

                //transfer token to user
                //const transferToken = await token.transferFrom(deployer, receiver, tokens(1), { from: exchange })
                

                //check balance after sending token

                balanceOfDeployer = await token.balanceOf(deployer)

                balanceOfDeployer.toString().should.equal(tokens(999900).toString())
                balanceOfReceiver = await token.balanceOf(receiver)
                balanceOfReceiver.toString().should.equal(tokens(100).toString())
                
               
                
            })

            it("resets allowance", async ()=>{

                const allowance = await token.allowance(deployer, exchange, { from: deployer })
                allowance.toString().should.equal('0')

            })

            it ("emits a transfer event", async ()=>{
                const log = result.logs[0]
                log.event.should.equal('Transfer')

                log.args._from.should.equal(deployer, 'correct deployer')

                log.args._to.should.equal(receiver, 'correct receiver')

                log.args._value.toString().should.equal(amount.toString(), 'correct amount')

            })
        })


        describe('failure', ()=>{
            it('insufficient balance', async ()=>{
                    let invalidAmount
                    invalidAmount = tokens(1000000000)  //far greater than total supply
                    await token.transfer(receiver, invalidAmount).should.be.rejectedWith(EVM_REVERT);



                    invalidAmount = tokens(10)  //insufficient amount
                    await token.transfer(deployer, invalidAmount, { from: receiver }).should.be.rejectedWith(EVM_REVERT);
            })

            it('reject invalid recipient', async ()=>{
                await token.transfer(0x0, amount, { from: deployer }).should.be.rejected;
            })
        })


        

    })

    describe('Approving tokens', ()=>{
        let result;
        let amount;

        beforeEach(async ()=>{
            amount = tokens(100)
            result = await token.approve(exchange, amount, { from: deployer })
        })

        describe('success', ()=>{

            it("allocates an allowance for delegated token spending on exchange", async ()=>{
                const allowance = await token.allowance(deployer, exchange);
                allowance.toString().should.equal(amount.toString())
            })


            it("emits approval event", async()=>{
                const logs = result.logs[0]
                logs.event.should.be.equal('Approval');
                logs.args._spender.should.be.equal(exchange, 'correct address for spender');
                logs.args._owner.should.be.equal(deployer, 'correct address for owner');
                logs.args._value.toString().should.be.equal(amount.toString(), 'correct amount')

                //spender should be the exchange, while the sender should be the deployer
            })
        })

        describe('failure', ()=>{
                it("rejects invalid spenders", async ()=>{
                    await token.approve(0x0, amount, { from: deployer }).should.be.rejected
                })

                it("rejects insufficient amount", async()=>{
                    await token.transferFrom(deployer, receiver, tokens(10000000), { from:exchange }).should.be.rejectedWith(EVM_REVERT)
                })
        })
        
    })
})