import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

async function addFriend(user, name) {
  await user.type(screen.getByLabelText('Friend Name'), name)
  await user.click(screen.getByRole('button', { name: 'Add Friend' }))
}

async function addAliceAndBob(user) {
  await addFriend(user, 'Alice')
  await addFriend(user, 'Bob')
}

async function submitBasicExpense(user, { amount = '20', payer = 'Alice', participants = [] } = {}) {
  if (amount !== null) {
    await user.type(screen.getByLabelText('Amount'), amount)
  }

  if (payer !== null) {
    await user.selectOptions(screen.getByLabelText('Who Paid'), payer)
  }

  for (const participant of participants) {
    await user.click(screen.getByRole('checkbox', { name: participant }))
  }

  await user.click(screen.getByRole('button', { name: 'Add Expense' }))
}

describe('App shell', () => {
  it('renders the three main sections on one page', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Friends' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Add Expense' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Final Balances' })
    ).toBeInTheDocument()
  })

  it('lets a user add a friend and see it in the list', async () => {
    const user = userEvent.setup()

    render(<App />)

    await addFriend(user, 'Alice')

    expect(screen.getByRole('list', { name: 'Friends List' })).toHaveTextContent('Alice')
  })

  it('does not add an empty friend name', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add Friend' }))

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('does not add a duplicate friend name', async () => {
    const user = userEvent.setup()

    render(<App />)

    await addFriend(user, 'Alice')
    await addFriend(user, 'Alice')

    expect(
      screen.getAllByRole('listitem').filter((item) => item.closest('[aria-label="Friends List"]'))
    ).toHaveLength(1)
    expect(screen.getByRole('list', { name: 'Friends List' })).toHaveTextContent('Alice')
  })

  it('shows added friends as payer and participant choices in the expense form', async () => {
    const user = userEvent.setup()

    render(<App />)

    await addAliceAndBob(user)

    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Alice' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Bob' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Alice' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Bob' })).toBeInTheDocument()
  })

  it('does not add an expense when the amount is missing', async () => {
    const user = userEvent.setup()

    render(<App />)

    await addAliceAndBob(user)
    await submitBasicExpense(user, { amount: null, participants: ['Alice', 'Bob'] })

    expect(screen.getByText('Expenses added: 0')).toBeInTheDocument()
  })

  it('does not add an expense when the payer is missing', async () => {
    const user = userEvent.setup()

    render(<App />)

    await addAliceAndBob(user)
    await submitBasicExpense(user, { payer: null, participants: ['Alice', 'Bob'] })

    expect(screen.getByText('Expenses added: 0')).toBeInTheDocument()
  })

  it('does not add an expense when no participants are selected', async () => {
    const user = userEvent.setup()

    render(<App />)

    await addAliceAndBob(user)
    await submitBasicExpense(user)

    expect(screen.getByText('Expenses added: 0')).toBeInTheDocument()
  })

  it('adds one valid expense', async () => {
    const user = userEvent.setup()

    render(<App />)

    await addAliceAndBob(user)
    await submitBasicExpense(user, { participants: ['Alice', 'Bob'] })

    expect(screen.getByText('Expenses added: 1')).toBeInTheDocument()
  })

  it('shows final balances for one simple equal split expense', async () => {
    const user = userEvent.setup()

    render(<App />)

    await addAliceAndBob(user)
    await submitBasicExpense(user, { participants: ['Alice', 'Bob'] })

    expect(screen.getByText('Alice is owed $10.00')).toBeInTheDocument()
    expect(screen.getByText('Bob owes $10.00')).toBeInTheDocument()
  })

  it('shows a message when no friends have been added yet', () => {
    render(<App />)

    expect(screen.getByText('No friends added yet.')).toBeInTheDocument()
  })

  it('shows a message when no friends are available for an expense', () => {
    render(<App />)

    expect(screen.getByText('Add friends first to create an expense.')).toBeInTheDocument()
  })

  it('shows a message when no balances are available yet', () => {
    render(<App />)

    expect(screen.getByText('No balances to show yet.')).toBeInTheDocument()
  })
})
