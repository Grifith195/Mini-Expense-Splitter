# Mini Expense Splitter for Friends: Issue Breakdown

## Issue 1: Create the one-page app shell

**Description**  
Build the basic single-page layout for the project with exactly 3 visible sections: Friends, Add Expense, and Final Balances. This issue should establish the main structure of the app without adding advanced behavior.

**Acceptance Criteria**
- [ ] The app renders on a single page with no routing or extra screens.
- [ ] The page clearly shows 3 sections: Friends, Add Expense, and Final Balances.
- [ ] The layout is simple, readable, and ready for the next features to connect to.

## Issue 2: Add friend management in memory

**Description**  
Allow the user to add friend names to an in-memory list from the Friends section. Keep validation simple and enforce the project rules that names must be non-empty and unique.

**Acceptance Criteria**
- [ ] A user can enter a friend name and add it to the list.
- [ ] Empty friend names are rejected.
- [ ] Duplicate friend names are rejected.
- [ ] Added friends appear immediately in the Friends section.
- [ ] Friend data is stored only in memory for the current session.

## Issue 3: Add expense form with payer and participants

**Description**  
Build the Add Expense section so a user can enter an amount, choose exactly one payer, and select one or more participating friends. The form should validate inputs before adding the expense to in-memory state.

**Acceptance Criteria**
- [ ] A user can enter an expense amount greater than 0.
- [ ] A user can choose exactly one payer from the friend list.
- [ ] A user can select one or more participants from the friend list.
- [ ] The payer can also be selected as a participant.
- [ ] The form prevents submission when any required field is invalid.
- [ ] A valid expense is stored in memory when submitted.

## Issue 4: Calculate and display final balances

**Description**  
Use the saved expenses to calculate each friend's final net balance and show the result in the Final Balances section. Each expense should be split equally among selected participants only.

**Acceptance Criteria**
- [ ] Each expense is split equally among the selected participants.
- [ ] Final balances are calculated from all added expenses.
- [ ] A friend who paid more than their share is shown as being owed money.
- [ ] A friend who paid less than their share is shown as owing money.
- [ ] Balances are displayed in a simple format such as "Alice is owed $20" or "Bob owes $12".

## Issue 5: Add basic empty states and assignment-ready polish

**Description**  
Add the small usability details needed to make the app clear during a class demo. This includes simple messages when there are no friends, no expenses, or no balances to show yet.

**Acceptance Criteria**
- [ ] The app shows a clear message when no friends have been added yet.
- [ ] The app shows a clear message when no expenses have been added yet.
- [ ] The Final Balances section shows a clear message before any balances can be calculated.
- [ ] The app stays within the defined scope and does not introduce persistence, editing, deleting, custom split rules, or debt simplification.
