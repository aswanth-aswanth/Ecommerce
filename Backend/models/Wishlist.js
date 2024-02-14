const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    unique: true, 
  },
  items: [{
    productVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant', 
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;
