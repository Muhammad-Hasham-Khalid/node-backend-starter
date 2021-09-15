import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      length: 50,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (error, hash) => {
    if (error) return next(error);
    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return bcrypt.compare(password, passwordHash);
};

export const userValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required().label('name').messages({
    'string.base': '`name` should be a string',
    'string.min': '`name` should be atleast 3 characters long',
    'string.max': '`name` can be atmost 50 characters long',
    'any.required': '`name` is required',
  }),
  password: Joi.string().required().label('password').messages({
    'string.base': '`password` should be string',
    'any.required': '`password` is required',
  }),
  email: Joi.string().required().label('email').messages({
    'string.base': '`email` should be string',
    'any.required': '`email` is required',
  }),
});

export const User = mongoose.model('user', userSchema);
