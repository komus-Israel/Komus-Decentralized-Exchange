const Exchange = artifacts.require('./Exchange.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract("Exchange", ([deployer, feeAccount])=>{

    let exchange;

    beforeEach(async()=>{
        exchange = await Exchange.deployed()
    })

    describe("deployment", ()=>{
        it("deployed successfully", ()=>{
            const exchangeAddress = exchange.address
            exchangeAddress.should.not.be.equal('')
        })
    })

})