const mongoose = require('mongoose');

const EVENT_DEAD_LETTER_QUEUE = mongoose.Schema(
  {
    contract: {type: String, required: true},
    event: {
      blockNumber: {type: Number, required: true},
      blockHash: {type: String, required: true},
      event: {type: String, required: true},
      transactionHash: {type: String, required: true},
      transactionIndex: {type: Number, required: true},
      removed: {type: Boolean, required: false},
      data: {type: String, required: false},
      topics: {type: Array, required: false},
      logIndex: {type: Number, required: true},
      args: {type: Array, required: true},
    }
  },
  {
    timestamps: true,
  },
);
EVENT_DEAD_LETTER_QUEUE.index({ event: { transactionHash: 1 }}, { unique: true });

const EventDeadLetterQueue = mongoose.model('EventDeadLetterQueue', EVENT_DEAD_LETTER_QUEUE);

module.exports = EventDeadLetterQueue;
