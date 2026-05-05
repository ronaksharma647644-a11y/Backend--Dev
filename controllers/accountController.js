const Account = require('../models/Account')
const Transaction = require('../models/Transaction')
const checkBalance = require('../../utils/checkBalance')

exports.createAccount = async (req, res) => {
  const acc = await Account.create({ userId: req.user.id, accountType: req.body.type })
  res.json(acc)
}

exports.deposit = async (req, res) => {
  const acc = await Account.findById(req.body.accountId)
  acc.balance += req.body.amount
  await acc.save()
  res.json(acc)
}

exports.withdraw = async (req, res) => {
  const ok = await checkBalance(req.body.accountId, req.body.amount)
  if (!ok) return res.send('Insufficient')

  const acc = await Account.findById(req.body.accountId)
  acc.balance -= req.body.amount
  await acc.save()
  res.json(acc)
}

exports.transfer = async (req, res) => {
  const ok = await checkBalance(req.body.from, req.body.amount)
  if (!ok) return res.send('Insufficient')

  const from = await Account.findById(req.body.from)
  const to = await Account.findById(req.body.to)

  from.balance -= req.body.amount
  to.balance += req.body.amount

  await from.save()
  await to.save()

  await Transaction.create({
    fromAccount: from._id,
    toAccount: to._id,
    amount: req.body.amount
  })

  res.send('Transferred')
}

exports.history = async (req, res) => {
  const tx = await Transaction.find()
  res.json(tx)
}
