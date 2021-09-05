import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Item = new mongoose.model('item', itemSchema);
