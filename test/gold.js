const ToonManagement = artifacts.require("ToonBattle");
const GoldCoin = artifacts.require("GoldCoin");

contract('ToonBattle', (accounts) => {

  it('Create GoldCoin supply of 10,000', async () => {

    const goldCoinInstance = await GoldCoin.deployed();

    await goldCoinInstance.mint(10000);
    const totalSupply = (await goldCoinInstance.totalSupply()).toNumber();
    assert.equal(totalSupply, 10000, 'Gold supply should be 10000.')
    const accountOneBalance = (await goldCoinInstance.balanceOf.call(accounts[0])).toNumber();
    assert.equal(accountOneBalance, 10000, 'Account Ones balance should be 10,000');



  })
  it('Mint new coins and send to Account One', async () => {

    const goldCoinInstance = await GoldCoin.deployed();
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    await goldCoinInstance.mint(accountOne, 10000);
    const totalSupply = (await goldCoinInstance.totalSupply()).toNumber();
    const accountOneBalance = (await goldCoinInstance.balanceOf.call(accountOne)).toNumber();
    assert.equal(totalSupply, 20000, 'Gold supply should be 20,000.');
    assert.equal(accountOneBalance, 20000, 'Account Ones balance should be 20,000');

  })
  it('Mint new coins, send to Account Two and complete a transfer', async () => {
    const goldCoinInstance = await GoldCoin.deployed();
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    await goldCoinInstance.mint(accountTwo, 10000);
    const totalSupply = (await goldCoinInstance.totalSupply()).toNumber();
    assert.equal(totalSupply, 30000, 'Gold supply should be 30,000.');
    await goldCoinInstance.transfer(accountOne, 2000, {from: accountTwo});
    const accountOneBalance = (await goldCoinInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoBalance = (await goldCoinInstance.balanceOf.call(accountTwo)).toNumber();

    assert.equal(accountOneBalance, 22000, 'Account ones balance should be 22,000');
    assert.equal(accountTwoBalance, 8000, 'Account twos balance should be 8,000');
    const totalSupply1 = (await goldCoinInstance.totalSupply()).toNumber();
    assert.equal(totalSupply1, 30000, 'Gold supply should be 30,000.');
  })

  it('Mint GoldCoins', async () => {

    const goldCoinInstance = await GoldCoin.deployed();

    await goldCoinInstance.mint(10000);
    const totalSupply = (await goldCoinInstance.totalSupply()).toNumber();
    assert.equal(totalSupply, 40000, 'Gold supply should be 40,000.')
    const accountOneBalance = (await goldCoinInstance.balanceOf.call(accounts[0])).toNumber();
    assert.equal(accountOneBalance, 32000, 'Account Ones balance should be 32,000');
  })

  it('Mint gold coins for Account Two', async () => {
    const goldCoinInstance = await GoldCoin.deployed();
    await goldCoinInstance.mint(accounts[1], 10000);
    const totalSupply = (await goldCoinInstance.totalSupply()).toNumber();

    assert.equal(totalSupply, 50000, 'Gold supply should be 50,000.');
    console.log(totalSupply);
    const accountTwoBalance = (await goldCoinInstance.balanceOf.call(accounts[1])).toNumber();
    assert.equal(accountTwoBalance, 18000, 'Account Ones balance should be 18,000');

  })




})
