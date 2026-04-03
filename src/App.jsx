import { useState } from 'react'
import './styles.css'

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`
}

function calculateBalances(friends, expenses) {
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

export default function App() {
  const [friendName, setFriendName] = useState('')
  const [friends, setFriends] = useState([])
  const [expenseAmount, setExpenseAmount] = useState('')
  const [payer, setPayer] = useState('')
  const [participants, setParticipants] = useState([])
  const [expenses, setExpenses] = useState([])
  const balances = calculateBalances(friends, expenses)

  function handleAddFriend(event) {
    event.preventDefault()
    const trimmedFriendName = friendName.trim()

    if (!trimmedFriendName || friends.includes(trimmedFriendName)) {
      return
    }

    setFriends((currentFriends) => [...currentFriends, trimmedFriendName])
    setFriendName('')
  }

  function handleParticipantChange(event) {
    const { checked, value } = event.target

    setParticipants((currentParticipants) => {
      if (checked) {
        return [...currentParticipants, value]
      }

      return currentParticipants.filter((participant) => participant !== value)
    })
  }

  function handleAddExpense(event) {
    event.preventDefault()

    if (!expenseAmount || !payer || participants.length === 0) {
      return
    }

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        amount: expenseAmount,
        payer,
        participants
      }
    ])
  }

  return (
    <main className="app-shell">
      <h1>Mini Expense Splitter for Friends</h1>

      <section aria-labelledby="friends-heading" className="panel">
        <h2 id="friends-heading">Friends</h2>
        <form className="friend-form" onSubmit={handleAddFriend}>
          <label htmlFor="friend-name">Friend Name</label>
          <input
            id="friend-name"
            name="friendName"
            type="text"
            value={friendName}
            onChange={(event) => setFriendName(event.target.value)}
          />
          <button type="submit">Add Friend</button>
        </form>

        {friends.length === 0 ? (
          <p>No friends added yet.</p>
        ) : (
          <ul aria-label="Friends List" className="friend-list">
            {friends.map((friend) => (
              <li key={friend}>{friend}</li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="expense-heading" className="panel">
        <h2 id="expense-heading">Add Expense</h2>
        {friends.length === 0 ? (
          <p>Add friends first to create an expense.</p>
        ) : (
          <form className="expense-form" onSubmit={handleAddExpense}>
            <label htmlFor="expense-amount">Amount</label>
            <input
              id="expense-amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={expenseAmount}
              onChange={(event) => setExpenseAmount(event.target.value)}
            />

            <label htmlFor="payer">Who Paid</label>
            <select
              id="payer"
              name="payer"
              value={payer}
              onChange={(event) => setPayer(event.target.value)}
            >
              <option value="" disabled>
                Select a friend
              </option>
              {friends.map((friend) => (
                <option key={friend} value={friend}>
                  {friend}
                </option>
              ))}
            </select>

            <fieldset className="participants-group">
              <legend>Participants</legend>
              {friends.map((friend) => (
                <label key={friend} className="checkbox-row">
                  <input
                    type="checkbox"
                    name="participants"
                    value={friend}
                    checked={participants.includes(friend)}
                    onChange={handleParticipantChange}
                  />
                  <span>{friend}</span>
                </label>
              ))}
            </fieldset>

            <button type="submit">Add Expense</button>
          </form>
        )}
        <p>Expenses added: {expenses.length}</p>
      </section>

      <section aria-labelledby="balances-heading" className="panel">
        <h2 id="balances-heading">Final Balances</h2>
        {expenses.length === 0 ? (
          <p>No balances to show yet.</p>
        ) : (
          <ul aria-label="Balance List" className="balance-list">
            {balances.map(({ friend, amount }) => {
              if (amount > 0) {
                return (
                  <li key={friend}>
                    {friend} is owed {formatCurrency(amount)}
                  </li>
                )
              }

              if (amount < 0) {
                return (
                  <li key={friend}>
                    {friend} owes {formatCurrency(Math.abs(amount))}
                  </li>
                )
              }

              return (
                <li key={friend}>
                  {friend} is settled up
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}
