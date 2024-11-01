import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyBudgetTracker } from './MyBudgetTracker';
import { AppProvider } from '../context/AppContext';

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <AppProvider>
      {component}
    </AppProvider>
  );
};

describe('MyBudgetTracker', () => {
  beforeEach(() => {
    renderWithContext(<MyBudgetTracker />);
  });

  test('Create an Expense', async () => {
    const nameInput = screen.getByLabelText('Name');
    const costInput = screen.getByLabelText('Cost');
    const saveButton = screen.getByText('Save');

    await userEvent.type(nameInput, 'Test Expense');
    await userEvent.type(costInput, '100');
    fireEvent.click(saveButton);

    expect(screen.getByText('Test Expense')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Spent so far: $100')).toBeInTheDocument();
    expect(screen.getByText('Remaining: $900')).toBeInTheDocument();
  });

  test('Delete an Expense', async () => {
    // First, add an expense
    const nameInput = screen.getByLabelText('Name');
    const costInput = screen.getByLabelText('Cost');
    const saveButton = screen.getByText('Save');

    await userEvent.type(nameInput, 'Test Expense');
    await userEvent.type(costInput, '100');
    fireEvent.click(saveButton);

    // Now, delete the expense
    const deleteButton = screen.getByText('x');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Expense')).not.toBeInTheDocument();
    expect(screen.getByText('Spent so far: $0')).toBeInTheDocument();
    expect(screen.getByText('Remaining: $1000')).toBeInTheDocument();
  });

  test('Budget Balance Verification', async () => {
    const budget = 1000; // Default budget

    // Add two expenses
    const nameInput = screen.getByLabelText('Name');
    const costInput = screen.getByLabelText('Cost');
    const saveButton = screen.getByText('Save');

    await userEvent.type(nameInput, 'Expense 1');
    await userEvent.type(costInput, '300');
    fireEvent.click(saveButton);

    await userEvent.type(nameInput, 'Expense 2');
    await userEvent.type(costInput, '200');
    fireEvent.click(saveButton);

    const spentSoFar = screen.getByText('Spent so far: $500');
    const remaining = screen.getByText('Remaining: $500');

    expect(spentSoFar).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();

    // Verify the equation: Budget = Remaining Balance + Total Expenditure
    const totalExpenditure = 500;
    const remainingBalance = 500;
    expect(budget).toBe(remainingBalance + totalExpenditure);
  });

  test('Edit Budget', async () => {
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const budgetInput = screen.getByDisplayValue('1000');
    await userEvent.clear(budgetInput);
    await userEvent.type(budgetInput, '1500');

    const saveButton = screen.getByText('Save', { selector: 'button:not([type="submit"])' });
    fireEvent.click(saveButton);

    expect(screen.getByText('Budget: $1500')).toBeInTheDocument();
    expect(screen.getByText('Remaining: $1500')).toBeInTheDocument();
  });
});
