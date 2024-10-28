# Budget Tracker Application Test Cases

## App Component

### App Component
- renders My Budget Planner title
- renders Budget component
- renders Remaining component
- renders Expense Total component
- renders Add Expense form

## MyBudgetTracker Component

### MyBudgetTracker
- Budget Balance Verification
- Edit Budget

## Detailed Test Descriptions

### App Component

#### renders My Budget Planner title
Verifies that the main title "My Budget Planner" is rendered correctly in the App component.

#### renders Budget component
Checks if the Budget component is present in the App, looking for the text "Budget:".

#### renders Remaining component
Ensures that the Remaining component is rendered, searching for the text "Remaining:".

#### renders Expense Total component
Confirms that the Expense Total component is displayed, looking for the text "Spent so far:".

#### renders Add Expense form
Verifies that the Add Expense form is present, checking for:
- The "Add Expense" title
- A "Name" input field
- A "Cost" input field
- A "Save" button

### MyBudgetTracker Component

#### Budget Balance Verification
This test case verifies the budget balance calculation:
1. Sets an initial budget of 1000
2. Adds two expenses: 300 and 200
3. Checks if the "Spent so far" amount is correctly displayed as $500
4. Verifies that the "Remaining" amount is correctly shown as $500
5. Confirms that the equation (Budget = Remaining Balance + Total Expenditure) holds true

#### Edit Budget
This test case checks the budget editing functionality:
1. Clicks the "Edit" button
2. Changes the budget value from 1000 to 1500
3. Clicks the "Save" button
4. Verifies that the new budget of $1500 is displayed correctly
5. Checks that the "Remaining" amount is updated to $1500

## Notes
- These tests cover the basic functionality of the Budget Tracker application.
- They ensure that all main components are rendered correctly and that the budget calculations are accurate.
- The tests also verify the edit functionality for the budget.
- Additional tests could be added to cover more edge cases and user interactions, such as adding and deleting expenses, or handling invalid inputs.