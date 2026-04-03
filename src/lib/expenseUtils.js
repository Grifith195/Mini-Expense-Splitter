export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`
}

export function calculateBalances(friends, expenses) {
  const balances = Object.fromEntries(friends.map((friend) => [friend, 0]))

  expenses.forEach((expense) => {
    const amount = Number(expense.amount)
    const share = amount / expense.participants.length

    balances[expense.payer] += amount

    expense.participants.forEach((participant) => {
      balances[participant] -= share
    })
  })

  return friends.map((friend) => ({
    friend,
    amount: balances[friend]
  }))
}
