// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

// import "hardhat/console.sol";

contract Tournaments {
    address owner;
    address manager;

    struct Tournament {
        mapping(address => uint256) scores; // {player: score}
        mapping(address => uint256) winners; // {player: reward}
        uint256 gameId;
        uint256 rewardPool;
        uint256 entryFee;
        uint256 startTime;
        uint256 endTime;
        bool resolved;
    }

    struct GameInstance {
        address player;
        uint256 tournamentId;
    }

    struct Winner {
        address winner;
        uint256 reward;
    }

    mapping(uint256 => Tournament) public tournaments;
    uint256 public tournamentCount;

    mapping(uint256 => GameInstance) public gameInstances;
    uint256 public gameInstanceCount;

    event TournamentCreated(
        uint256 tournamentId,
        uint256 gameId,
        uint256 entryFee,
        uint256 startTime,
        uint256 endTime
    );
    event WinnersAnnounced(uint256 tournamentId, Winner[] winners);
    event GameInstanceStarted(
        uint256 gameInstanceId,
        uint256 tournamentId,
        address player
    );
    event GameInstanceEnded(
        uint256 gameInstanceId,
        uint256 tournamentId,
        address player,
        uint256 score
    );
    event RewardClaimed(
        uint256 tournamentId,
        address player,
        uint256 rewardAmount
    );

    constructor(address _owner, address _manager) {
        owner = _owner;
        manager = _manager;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyOwnerOrManager() {
        require(
            msg.sender == owner || msg.sender == manager,
            "Only the owner or manager can call this function"
        );
        _;
    }

    modifier onlyTournamentOngoing(uint256 tournamentId) {
        require(
            block.timestamp >= tournaments[tournamentId].startTime &&
                block.timestamp <= tournaments[tournamentId].endTime,
            "Tournament is not ongoing"
        );
        _;
    }

    function setOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    function setManager(address newManager) external onlyOwner {
        manager = newManager;
    }

    function createTournament(
        uint256 gameId,
        uint256 entryFee,
        uint256 startTime,
        uint256 endTime
    ) external onlyOwnerOrManager {
        Tournament storage tournament = tournaments[tournamentCount];
        tournament.gameId = gameId;
        tournament.entryFee = entryFee;
        tournament.startTime = startTime;
        tournament.endTime = endTime;

        emit TournamentCreated(
            tournamentCount,
            gameId,
            entryFee,
            startTime,
            endTime
        );
        tournamentCount++;
    }

    function enterGame(
        uint256 tournamentId
    ) external payable onlyTournamentOngoing(tournamentId) {
        Tournament storage tournament = tournaments[tournamentId];
        require(msg.value == tournament.entryFee, "Incorrect entry fee");

        gameInstances[gameInstanceCount] = GameInstance(
            msg.sender,
            tournamentId
        );
        tournament.rewardPool += msg.value;

        emit GameInstanceStarted(gameInstanceCount, tournamentId, msg.sender);
        gameInstanceCount++;
    }

    function postGameResult(
        uint256 gameInstanceId,
        address player,
        uint256 score
    ) external onlyOwnerOrManager {
        GameInstance storage gameInstance = gameInstances[gameInstanceId];
        Tournament storage tournament = tournaments[gameInstance.tournamentId];

        require(!tournament.resolved, "Tournament already resolved");
        require(gameInstance.player == player, "Invalid player");

        tournament.scores[player] += score;
        delete gameInstances[gameInstanceId];

        emit GameInstanceEnded(
            gameInstanceId,
            gameInstance.tournamentId,
            player,
            score
        );
    }

    function resolveTournament(
        uint256 tournamentId,
        Winner[] calldata winners
    ) external onlyOwnerOrManager {
        Tournament storage tournament = tournaments[tournamentId];

        require(
            block.timestamp > tournament.endTime,
            "Tournament is still ongoing"
        );

        for (uint256 i = 0; i < winners.length; i++) {
            tournament.winners[winners[i].winner] = winners[i].reward;
        }
        tournament.resolved = true;

        emit WinnersAnnounced(tournamentId, winners);
    }

    function claimReward(uint256 tournamentId) external {
        Tournament storage tournament = tournaments[tournamentId];
        require(tournament.scores[msg.sender] > 0, "No reward to claim");

        uint256 rewardAmount = tournament.scores[msg.sender];
        tournament.scores[msg.sender] = 0;

        emit RewardClaimed(tournamentId, msg.sender, rewardAmount);
        payable(msg.sender).transfer(rewardAmount);
    }

    function getPlayerScore(
        uint256 tournamentId,
        address player
    ) external view returns (uint256) {
        return tournaments[tournamentId].scores[player];
    }

    function getTournamentRewardPool(
        uint256 tournamentId
    ) external view returns (uint256) {
        return tournaments[tournamentId].rewardPool;
    }

    function isPlayerWinner(
        uint256 tournamentId,
        address player
    ) external view returns (bool) {
        return tournaments[tournamentId].winners[player] > 0;
    }

    function getPlayerReward(
        uint256 tournamentId,
        address player
    ) external view returns (uint256) {
        return tournaments[tournamentId].winners[player];
    }
}
