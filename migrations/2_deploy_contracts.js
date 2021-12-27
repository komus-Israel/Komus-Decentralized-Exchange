const Token = artifacts.require("Token");
const Exchange = artifacts.require("Exchange")

module.exports = async function (deployer) {
  await deployer.deploy(Token, "Komus", "KOM");
  await deployer.deploy(Exchange, feeAccount ,10)
};




