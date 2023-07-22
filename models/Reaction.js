const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
  ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// function formatDate() {

// }

module.exports = reactionSchema;
