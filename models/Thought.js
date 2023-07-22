const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
    ],
    reactions: [reactionSchema],
  },
  {
    id: false,
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

function formatDate() {
  
}

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
