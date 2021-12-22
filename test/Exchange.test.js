const Exchange = artifacts.require('./Exchange.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract("Exchange", ([address1])=>{

    let exchange;

    beforeEach(async()=>{
        exchange = await Exchange.new()
    })

    describe("deployment", ()=>{
        it("deployed successfully", ()=>{
            const exchangeAddress = exchange.address
            exchangeAddress.should.not.be.equal('')
        })
    })

})