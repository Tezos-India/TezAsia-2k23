const {
  loadFixture,
  time,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Tournament", function () {
  async function deployTournamentFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, manager, user, user2, user3] = await ethers.getSigners();
    // const tezosAddress = "tz1burnburnburnburnburnburnburjAYjjX";

    const Tournament = await ethers.getContractFactory("Tournaments");
    const tournament = await Tournament.deploy(owner.address, manager.address);

    return { tournament, owner, manager, user, user2, user3 };
  }

  describe("Tournament contract", function () {
    it("should allow only manager or owner to create tournaments", async function () {
      const { tournament, manager, owner, user, user2, user3 } =
        await loadFixture(deployTournamentFixture);

      const amount = 10 ** 9;
      const initialTime = await time.latest();

      await expect(
        tournament
          .connect(user)
          .createTournament(1, amount, initialTime - 1000, initialTime + 1000)
      ).to.be.revertedWith("Only the owner or manager can call this function");

      expect(
        await tournament
          .connect(owner)
          .createTournament(1, amount, initialTime - 1000, initialTime + 1000)
      )
        .to.emit(tournament, "TournamentCreated")
        .withArgs(1, 1, amount, 1692100165, 1693396165);

      expect(await tournament.connect(user).enterGame(0, { value: amount }))
        .to.emit(tournament, "GameInstanceStarted")
        .withArgs(tournament.gameInstanceCount, 1, user);

      expect(await tournament.connect(user2).enterGame(0, { value: amount }))
        .to.emit(tournament, "GameInstanceStarted")
        .withArgs(tournament.gameInstanceCount, 1, user2);

      expect(await tournament.connect(owner).postGameResult(0, user, 1200))
        .to.emit(tournament, "GameInstanceEnded")
        .withArgs(0, user, 1200);

      time.increase(1000);

      expect(
        await tournament.connect(owner).resolveTournament(0, [[user, amount]])
      )
        .to.emit(tournament, "WinnersAnnounced")
        .withArgs(0, [[user, amount]]);

      expect(await tournament.connect(user).claimReward(0))
        .to.emit(tournament, "RewardClaimed")
        .withArgs(0, amount, user);
    });
  });
});
