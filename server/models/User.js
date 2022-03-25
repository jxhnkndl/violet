const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address.']
    },
    birthday: {
      type: Date,
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 128
    },
    avatar: {
      type: String
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    moods: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Mood'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// new account/update account password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const salts = 10;
    this.password = await bcrypt.hash(this.password, salts);
  }

  // call next middleware function
  next();
});

// instance method to check password validity on login
userSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// calculate total number of moods logged
userSchema.virtual('moodCount').get(function() {
  return this.moods.length;
});

const User = model('User', userSchema);

module.exports = User;