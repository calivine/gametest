const ToonBattle = artifacts.require("ToonBattle");
const GoldCoin = artifacts.require("GoldCoin");


module.exports = function(deployer) {
  deployer.deploy(ToonBattle);
  deployer.deploy(GoldCoin);
};
