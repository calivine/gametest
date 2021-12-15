const ToonManagement = artifacts.require("ToonBattle");
const GoldCoin = artifacts.require("GoldCoin");

contract('ToonBattle', (accounts) => {

  it('Should create random Toon named Adam', async () => {
    const toonManagementInstance = await ToonManagement.deployed();


    await toonManagementInstance.createRandomToon('Adam', {from: accounts[0]});
    const toonCount = (await toonManagementInstance.totalToons.call()).toNumber();

    assert.equal(toonCount, 1, 'There should be one toon created.');

  })

  it('Should create random Toon named Alex and level up', async () => {
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const toonManagementInstance = await ToonManagement.deployed();
    await toonManagementInstance.createRandomToon('Alex', {from: accountTwo});
    await toonManagementInstance.train({from: accountTwo, value: 10000000000000});
    const level = (await toonManagementInstance.getToonLevel({from: accountTwo})).toNumber();

    const strengthOne = (await toonManagementInstance.getToonStrength({from: accountTwo})).toNumber();
    const strengthTwo = (await toonManagementInstance.getToonStrength({from: accountOne})).toNumber();

    const toonCount = (await toonManagementInstance.getTotalToons({from: accountTwo})).toNumber();

    assert.equal(level,2,'Level should be 2.');
    assert.equal(toonCount,2,'Toon count should be 2.');
    assert.equal(strengthOne,11,'Toon two strength should be 11.');
    assert.equal(strengthTwo,10,'Toon one strength should be 10.');

  })
  it('Should set toon aggression to true', async () => {
    const toonManagementInstance = await ToonManagement.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    const toonCount = (await toonManagementInstance.getTotalToons.call()).toNumber();
    const aggressionLevelOne = (await toonManagementInstance.getStance({from: accountTwo})).toNumber();

    await toonManagementInstance.setStance({from: accountTwo});
    const aggressionLevelTwo = (await toonManagementInstance.getStance({from: accountTwo})).toNumber();
    const aggressionLevelThree = await toonManagementInstance.getStanceFlag({from: accountTwo});

    // Flag willing to fight
    await toonManagementInstance.setStance({from: accountOne});


    assert.equal(toonCount,2,'Toon count should be 2.');
    assert.equal(aggressionLevelOne,0,'Aggression setting should be 0 (false)');
    assert.equal(aggressionLevelTwo,1,'Aggression setting should be 1 (true)');
    assert.equal(aggressionLevelThree,true,'Aggression setting should be true');

  })

  it('Stage a battle between accounts one and two', async () => {
    const toonManagementInstance = await ToonManagement.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    await toonManagementInstance.challenge(accountOne, {from: accountTwo});

    const accountOneWins = (await toonManagementInstance.getWins({from: accountOne})).toNumber();
    const accountTwoWins = (await toonManagementInstance.getWins({from: accountTwo})).toNumber();

    assert.equal(accountOneWins, 0, 'Account One should have no wins.');
    assert.equal(accountTwoWins, 1, 'Account Two should have one win.');

  })

  it('Stage another battle', async () => {
    const toonManagementInstance = await ToonManagement.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    await toonManagementInstance.challenge(accountOne, {from: accountTwo});
    const accountTwoWins = (await toonManagementInstance.getWins({from: accountTwo})).toNumber();
    assert.equal(accountTwoWins, 2, 'Account Two should have two wins.');

  })

  it('Stage battle 3', async () => {
    const toonManagementInstance = await ToonManagement.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    await toonManagementInstance.challenge(accountOne, {from: accountTwo});
    const accountTwoWins = (await toonManagementInstance.getWins({from: accountTwo})).toNumber();
    assert.equal(accountTwoWins, 3, 'Account Two should have three wins.');

  })
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




})
