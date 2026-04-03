# Mini Expense Splitter for Friends: Simple TDD Plan

This guide keeps the project small and beginner-friendly. Build one tiny behavior at a time.

Recommended testing focus:
- test visible page behavior
- test validation behavior
- test final balance calculation behavior
- avoid testing internal implementation details

Assumption for this plan:
- you will build a one-page frontend app
- you can use one UI test setup and one small pure calculation helper when needed

## Suggested build order

1. App shell
2. Friend management
3. Expense form validation
4. Add valid expenses
5. Final balance calculation
6. Empty states and polish

## Step 1: Render the one-page app shell

### Test to write

Write one test that checks the page shows the 3 required section headings:
- Friends
- Add Expense
- Final Balances

Example behavior:
"The app renders the 3 main sections on one page."

### Code to implement

Create the main app component with:
- a Friends section heading
- an Add Expense section heading
- a Final Balances section heading

Do not add logic yet. Just make the page render successfully.

### Next small step

Once this passes, move to adding one friend through the Friends section.

## Step 2: Add one friend

### Test to write

Write one test that:
- enters a friend name
- clicks Add Friend
- sees that friend appear in the Friends section

Example behavior:
"A user can add a friend name and see it in the list."

### Code to implement

Add:
- one text input for the friend name
- one Add Friend button
- in-memory state for the friend list
- rendering for the friend list

Keep it minimal. Only support the happy path first.

### Next small step

After this passes, add validation for empty and duplicate names.

## Step 3: Validate friend names

### Test to write

Write one test for empty input:
- leave the input empty
- click Add Friend
- confirm no friend is added

Then write one more test for duplicate names:
- add Alice
- try adding Alice again
- confirm the list still contains only one Alice

### Code to implement

Add simple validation rules:
- trim the input
- reject empty names
- reject duplicate names

You can show a simple error message, or just prevent the invalid add if that matches your assignment style.

### Next small step

Once friend entry works, move to the expense form with the smallest possible valid input path.

## Step 4: Show the expense form using the added friends

### Test to write

Write one test that:
- adds two friends
- confirms the Add Expense section shows those friends as choices for payer and participants

Example behavior:
"Added friends can be selected in the expense form."

### Code to implement

Add the expense form fields:
- amount input
- payer selection
- participant selection

At this step, the form only needs to render available friend choices correctly.

### Next small step

Then validate the expense form before trying to save expenses.

## Step 5: Validate the expense form

### Test to write

Write one test at a time for each rule:
- amount must be greater than 0
- exactly one payer must be selected
- at least one participant must be selected

Pick the smallest first test, such as:
"Submitting with no amount does not add an expense."

Then add the next validation test only after the previous one passes.

### Code to implement

Add just enough validation to make each test pass:
- reject empty or zero amount
- require one payer
- require at least one participant

Do not build advanced error handling. Keep messages short and clear if you choose to show them.

### Next small step

After validation works, save one valid expense in memory.

## Step 6: Add one valid expense

### Test to write

Write one test that:
- adds friends
- fills in a valid expense
- submits the form
- confirms the expense was accepted

The visible confirmation can be:
- the form resets, or
- an expense count appears, or
- balances update

Choose one clear public behavior and test only that.

### Code to implement

Add in-memory expense state and save a valid expense object when the form is submitted.

Keep the expense shape simple:
- amount
- payer
- participants

### Next small step

Once an expense can be added, calculate balances from that data.

## Step 7: Calculate balances for one simple expense

### Test to write

Write one test for a very small scenario:
- add Alice and Bob
- create a $20 expense
- payer is Alice
- participants are Alice and Bob
- expect final balances to show:
  - Alice is owed $10
  - Bob owes $10

Example behavior:
"The app shows correct final balances for one equal split expense."

### Code to implement

Add the minimum balance logic:
- split the expense equally among selected participants
- subtract each participant's share
- add the full payment to the payer
- show the net result for each friend

This is a good place to extract a small pure helper like `calculateBalances(friends, expenses)` because it keeps the math isolated and easier to reason about.

### Next small step

Then verify the calculation still works across multiple expenses.

## Step 8: Calculate balances across multiple expenses

### Test to write

Write one test with two expenses, for example:
- Alice pays $30 for Alice, Bob, and Cara
- Bob pays $12 for Bob and Cara

Then assert that the Final Balances section shows the correct net results.

### Code to implement

Update the balance calculation so it combines all expenses correctly.

Refactor only if needed:
- keep the interface simple
- keep the math readable

### Next small step

After balances work, finish the empty-state messages.

## Step 9: Add empty states

### Test to write

Write one test at a time for these messages:
- no friends added yet
- no expenses added yet
- no balances to show yet

Example behavior:
"The app explains what to do before any data is entered."

### Code to implement

Add short empty-state text in each section so the page is clear during a demo.

### Next small step

Run through a full manual demo:
- add friends
- add one or two expenses
- confirm balances
- confirm no out-of-scope features were added

## Very small TDD loop to follow each time

For every step:

1. Write one failing test
2. Write the smallest code to pass it
3. Run tests
4. Clean up only if the code feels messy
5. Move to the next tiny behavior

## What not to add

Stay within scope:
- no persistence
- no edit/delete
- no custom split types
- no debt simplification
- no multiple pages

## Best beginner-friendly testing targets

If you want to keep testing very light, prioritize these:
- the 3 section headings render
- a friend can be added
- duplicate and empty names are rejected
- a valid expense can be submitted
- one simple balance scenario is calculated correctly
- empty states appear when needed
