const Token = artifacts.require("Token");

contract("Token", (accounts) => {
  console.log(accounts);
  before(async () => {
    token = await Token.deployed();
  });

  it("mint 1m to origin account", async () => {
    let amount = web3.utils.toWei("10000000000000000", "ether");

    token.mint(accounts[0], 1000000);

    let balance = await token.balanceOf(accounts[0]);

    balance = web3.utils.fromWei(balance, "ether");

    assert.equal(balance, 1000000, "should be 2m");
  });

  it("give owner 1m", async () => {
    let amount = web3.utils.toWei("1000", "ether");

    let balance = await token.balanceOf(accounts[0]);

    balance = web3.utils.fromWei(balance, "ether");

    assert.equal(2000000, balance, "balance does not match expected");
  });

  it("transfer 1k to account 2", async () => {
    let amount = web3.utils.toWei("1000", "ether");

    await token.transfer(accounts[1], amount, {
      from: accounts[0],
    });

    let balance = await token.balanceOf(accounts[1]);

    balance = web3.utils.fromWei(balance, "ether");

    assert.equal(
      balance,
      1000,
      "should be 1000 tokens but we have a different token number"
    );
  });
});
