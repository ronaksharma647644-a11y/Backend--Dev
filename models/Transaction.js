const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  fromAccount: mongoose.Schema.Types.ObjectId,
  toAccount: mongoose.Schema.Types.ObjectId,
  amount: Number,
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Transaction', transactionSchema)
