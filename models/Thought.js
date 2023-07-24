const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      //min and max length
      max_length: 280,
      min_length: 1,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      //getter for the date formatting
      //formats only on query not in db
      get: (date) => {
        return date.toLocaleString()
      },
    },
    username: {
      type: String,
      required: true,
    },
    //use the reactionSchema as a "template" for any sub documents
    reactions: [reactionSchema],
  },
  {
    id: false,
    //getter and virtuals properties set to true
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

//virtual for the number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
