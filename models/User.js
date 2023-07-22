const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
    },
    github: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [thoughtSchema],
    friends: [userSchema]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Student = model('student', userSchema);

module.exports = Student;
