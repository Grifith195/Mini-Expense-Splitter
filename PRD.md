# Mini Expense Splitter for Friends

## Purpose

Mini Expense Splitter for Friends is a small student project that helps a user record shared expenses among friends and view each person's final net balance. The goal is to build a very small, clear, one-page app that demonstrates form handling, simple calculations, and basic state management.

## Target User

The target user is a student or casual user who wants to quickly split a few shared expenses among friends during a single session. The app is meant for simple classroom demonstration, not for real-world financial management.

## Core Features

- Add a friend by name
- Add an expense amount
- Choose exactly one payer
- Select the participating friends for that expense
- Split the expense equally among selected participants
- Show final net balances for all friends

## Functional Requirements

- The app must use a single page with exactly 3 sections:
  - Friends
  - Add Expense
  - Final Balances
- Users must be able to add friend names to a shared list.
- Friend names must be non-empty and unique.
- Users must be able to enter an expense amount greater than 0.
- Users must choose exactly one payer for each expense.
- Users must choose at least one participant for each expense.
- The payer may also be one of the participants.
- Each expense must be split equally among the selected participants only.
- The app must calculate and display simple final net balances.
- Final balances should be shown in a clear format such as "Alice is owed $20" or "Bob owes $12".
- All data must stay in memory only for the current session.

## Non-Goals

- Editing or deleting expenses
- Editing or deleting friends
- Debt simplification or transfer matching
- Data persistence after refresh
- Multiple pages or routing
- Custom split rules
- Percentage-based splits
- Uneven or manual shares
- Reimbursements or negative expenses
- Multiple currencies
