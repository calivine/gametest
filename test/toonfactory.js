const ToonManagement = artifacts.require("ToonBattle");

contract('ToonBattle', (accounts) => {

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


    assert.equal(toonCount,0,'Toon count should be 0.');
    assert.equal(aggressionLevelOne,0,'Aggression setting should be 0 (false)');
    assert.equal(aggressionLevelTwo,1,'Aggression setting should be 1 (true)');
    assert.equal(aggressionLevelThree,true,'Aggression setting should be true');

  })

  it('Test contract address', async () => {
    const toonManagementInstance = await ToonManagement.deployed();

    const toonCount = (await toonManagementInstance.contractAddress.call());

    assert.equal(toonCount, 1, 'There should be one toon created.');

  })

})
