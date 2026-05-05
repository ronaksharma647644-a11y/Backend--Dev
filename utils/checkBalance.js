const Account = require('../models/Account')

module.exports = async (accountId, amount) => {
  const acc = await Account.findById(accountId)
  if (!acc || acc.balance < amount) return false
  return true
}
