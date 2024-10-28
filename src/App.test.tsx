import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders My Budget Planner title', () => {
    const titleElement = screen.getByText(/My Budget Planner/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders Budget component', () => {
    const budgetElement = screen.getByText(/Budget:/i);
    expect(budgetElement).toBeInTheDocument();
  });

  test('renders Remaining component', () => {
    const remainingElement = screen.getByText(/Remaining:/i);
    expect(remainingElement).toBeInTheDocument();
  });

  test('renders Expense Total component', () => {
    const expenseTotalElement = screen.getByText(/Spent so far:/i);
    expect(expenseTotalElement).toBeInTheDocument();
  });

  test('renders Add Expense form', () => {
    const addExpenseTitle = screen.getByText(/Add Expense/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const costInput = screen.getByLabelText(/Cost/i);
    const saveButton = screen.getByText(/Save/i);

    expect(addExpenseTitle).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(costInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});
