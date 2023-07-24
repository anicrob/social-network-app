const { Schema, model } = require('mongoose');

// Schema to create User model
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
      //validation for email
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    //reference the thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    //reference the user model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ]
  },
  {
    id:false,
    //virtuals property set to true
    toJSON: {
      virtuals: true
    },
  }
);

//virtual for the number of friends
userSchema.virtual('numFriends').get(function() {
  return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;
