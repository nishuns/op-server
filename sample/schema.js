const mongoose = require('mongoose')

exports.redeemSchema = new mongoose.Schema(
  [
    {
      user_id: String,
      user_name: String,
      email: String,
      wallet_address: String,
      token: Number,
      isApproved: { type: Boolean, default: false },
    },
  ],
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
