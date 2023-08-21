class Timer {
  turn: number = 0;
  time: [number, number] = [0, 0];
  lastTick: number | null = null;
  started: boolean = false;
  timeout: NodeJS.Timeout | null = null;
  onTimerEnd?: (timer: Timer) => void;

  constructor() {
    this.init();
  }

  init() {
    const timerLength = 1000 * 60 * 10;
    this.time = [timerLength, timerLength];
  }

  swap(sendTime: number) {
    const now = Date.now();
    const ping = now - sendTime;
    this.time[this.turn] += ping;
    this.time[this.turn] -= now - (this.lastTick || now);
    this.lastTick = now;
    this.turn = (this.turn + 1) % 2;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.started = false;
      if (this.onTimerEnd) {
        this.onTimerEnd(this);
      }
    }, this.time[this.turn]);
  }

  currentTime(player: number): number {
    const now = Date.now();
    return this.turn === player ? this.time[this.turn] - (now - (this.lastTick || now)) : this.time[player];
  }

  start() {
    this.lastTick = Date.now();
    this.started = true;
  }

  stop() {
    this.lastTick = null;
    this.started = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  reset() {
    this.init();
  }
}

export default Timer;


// class Timer {
//   constructor() {
//     this.init()
//   }
//   init() {
//     this.turn = 0
//     let timerLength = 1000 * 60 * 10
//     this.time = [timerLength, timerLength]
//     this.lastTick = null
//     this.started = false
//     this.timeout = null
//   }
//   swap(sendTime) {
//     let now = Date.now()
//     let ping = now - sendTime
//     this.time[this.turn] += ping
//     this.time[this.turn] -= now - (this.lastTick || now)
//     this.lastTick = now
//     this.turn = (this.turn + 1) % 2
//     if (this.timeout) {
//       clearTimeout(this.timeout)
//     }
//     this.timeout = setTimeout(() => {
//       this.started = false
//       if (this.onTimerEnd) {
//         this.onTimerEnd(this)
//       }
//     }, this.time[this.turn])
//   }
//   currentTime(player) {
//     let now = Date.now()
//     return this.turn === player ? this.time[this.turn] - (now - (this.lastTick || now)) : this.time[player]
//   }
//   start() {
//     this.lastTick = Date.now()
//     this.started = true
//   }
//   stop() {
//     this.lastTick = null
//     this.started = false
//     clearTimeout(this.timeout)
//     this.timeout = null
//   }
//   reset() {
//     this.init()
//   }
// }

// module.exports = Timer