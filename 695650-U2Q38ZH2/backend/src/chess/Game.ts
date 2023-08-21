import { generateId } from './helpers';
import Timer from './Timer';

interface Player {
  id: string;
  username: string;
}
interface GameOverData {
  winner: number;
  result: string;
  reason: string;
}

class Game {
  id: string;
  moves: string[] = [];
  players: Player[] = [];
  gameLength: number = 1000 * 60 * 10;
  time: number[] = [this.gameLength, this.gameLength];
  timer: Timer = new Timer();
  isPublic: boolean;
  gameOver: GameOverData | null = null;
  turn: number = 0;
  timeout: NodeJS.Timeout | null = null;
  _onGameOver: (data: GameOverData) => void = () => {};
  started: boolean = false;
  active: boolean[] = [true, true];
  interval: NodeJS.Timeout | null = null;
  lastTick: number | null = null;
  rematch: string | null = null;
  constructor(isPublic: boolean = false) {
    this.id = generateId();
    this.timer.onTimerEnd = (timer) => {
      this.setGameOver({
        winner: this.turn === 0 ? 1 : 0,
        result: this.turn === 0 ? '0-1' : '1-0',
        reason: 'timeout'
      });
    };
    this.isPublic = isPublic;
  }

  join(id: string, username?: string): boolean {
    if (!username) username = "Guest";
    let playerIndex = this.players.findIndex(p => p.id === id);
    if (playerIndex === -1) {
      if (this.players.length >= 2) return false;
      if (this.players.length === 0) {
        this.active[0] = true;
      } else {
        this.active[1] = true;
      }
      this.players.push({ id, username });
    }
    return true;
  }

  handleTime() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      let amt = this.lastTick == null ? 0 : Date.now() - this.lastTick;
      this.lastTick = Date.now();
      this.time[this.turn] -= amt;
      if (this.time[this.turn] <= 0) {
        this.setGameOver({
          winner: this.turn === 0 ? 1 : 0,
          result: this.turn === 0 ? '0-1' : '1-0',
          reason: 'timeout'
        });
        clearInterval(this.interval!);
      }
    }, 100);
  }

  data() {
    return {
      id: this.id,
      moves: this.moves,
      players: this.players,
      time: this.timer.time,
      turn: this.turn,
      gameOver: this.gameOver,
      isPublic: this.isPublic
    };
  }

  start() {
    if (this.started) return;
    this.lastTick = Date.now();
    this.started = true;
    this.timer.start();
  }

  setGameOver(data: GameOverData) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    let amt = this.lastTick || Date.now();
    this.time[this.turn] -= Date.now() - amt;
    this.timer.stop();
    this.gameOver = data;
    this._onGameOver(this.gameOver);
  }

  set onGameOver(cb: (data: GameOverData) => void) {
    this._onGameOver = cb;
  }

  move(move: string, sendTime: number) {
    this.moves.push(move);
    this.timer.swap(sendTime);
    this.turn = this.turn === 0 ? 1 : 0;
    this.lastTick = Date.now();
  }

  runRematch() {
    this.players = this.players.reverse();
    this.time = [this.gameLength, this.gameLength];
    this.timer.reset();
    this.gameOver = null;
    this.started = false;
    this.lastTick = null;
    this.turn = 0;
    this.moves = [];
  }
}

export default Game;
