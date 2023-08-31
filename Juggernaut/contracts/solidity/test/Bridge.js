const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBridgeFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, manager, user] = await ethers.getSigners();
    const tezosAddress = "tz1burnburnburnburnburnburnburjAYjjX";

    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(owner.address, manager.address);

    return { bridge, owner, manager, user, tezosAddress };
  }

  describe("Bridge contract", function () {
    it("should allow anyone to lock funds", async function () {
      const { bridge, manager, owner, user, tezosAddress } = await loadFixture(
        deployBridgeFixture
      );

      const amount = 10 ** 9;
      expect(await bridge.connect(user).lock(tezosAddress, { value: amount }))
        .to.emit(bridge, "FundsLocked")
        .withArgs(user.address, tezosAddress, amount);
    });

    it("Insufficient balance to withdraw", async function () {
      const { bridge, manager, owner, user, tezosAddress } = await loadFixture(
        deployBridgeFixture
      );

      const amount = 10 ** 9;
      await expect(bridge.connect(owner).withdraw(amount)).to.be.revertedWith(
        "Insufficient balance"
      );
    });

    it("Lock and should allow only owner and manager to withdraw", async function () {
      const { bridge, manager, owner, user, tezosAddress } = await loadFixture(
        deployBridgeFixture
      );

      const amount = 10 ** 9;
      expect(await bridge.connect(user).lock(tezosAddress, { value: amount }))
        .to.emit(bridge, "FundsLocked")
        .withArgs(user.address, tezosAddress, amount);

      expect(await bridge.connect(manager).withdraw(amount));
    });

    it("should allow only owner to set owner and manager", async function () {
      const { bridge, manager, owner, user, tezosAddress } = await loadFixture(
        deployBridgeFixture
      );

      await expect(
        bridge.connect(user).setOwner(manager.address)
      ).to.be.revertedWith("Only the owner can call this function");

      await expect(
        bridge.connect(manager).setOwner(manager.address)
      ).to.be.revertedWith("Only the owner can call this function");

      await expect(
        bridge.connect(user).setManager(user.address)
      ).to.be.revertedWith("Only the owner can call this function");

      await expect(
        bridge.connect(manager).setManager(user.address)
      ).to.be.revertedWith("Only the owner can call this function");

      expect(await bridge.connect(owner).setOwner(manager.address));

      expect(await bridge.connect(manager).setManager(user.address));
    });
  });
});
