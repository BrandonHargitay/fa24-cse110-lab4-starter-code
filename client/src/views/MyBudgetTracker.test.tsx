import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MyBudgetTracker } from "./MyBudgetTracker";
import { AppProvider } from "../context/AppContext";
import * as expenseUtils from "../utils/expense-utils";
import * as budgetUtils from "../utils/budget-utils";

// Mock the utility functions
jest.mock("../utils/expense-utils");
jest.mock("../utils/budget-utils");

describe("MyBudgetTracker Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementations
    (budgetUtils.fetchBudget as jest.Mock).mockResolvedValue(1000);
    (expenseUtils.fetchExpenses as jest.Mock).mockResolvedValue([]);
    (budgetUtils.updateBudget as jest.Mock).mockImplementation((amount) => Promise.resolve(amount));
  });

  test("renders My Budget Planner title", async () => {
    await act(async () => {
      render(
        <AppProvider>
          <MyBudgetTracker />
        </AppProvider>
      );
    });
    expect(screen.getByText("My Budget Planner")).toBeInTheDocument();
  });



  
  test("Budget Balance Verification", async () => {
    // Mock initial budget and expenses
    (budgetUtils.fetchBudget as jest.Mock).mockResolvedValue(1000);
    (expenseUtils.fetchExpenses as jest.Mock).mockResolvedValue([
      { id: "1", name: "Expense 1", cost: 300 },
      { id: "2", name: "Expense 2", cost: 200 }
    ]);

    await act(async () => {
      render(
        <AppProvider>
          <MyBudgetTracker />
        </AppProvider>
      );
    });

    // Wait for data to load and verify
    await waitFor(() => {
      expect(screen.getByText("Spent so far: $500")).toBeInTheDocument();
      expect(screen.getByText("Remaining: $500")).toBeInTheDocument();
    });
  });

  test("Create and Delete Expense", async () => {
    const mockExpense = { id: "test-id", name: "Test Expense", cost: 100 };
    (expenseUtils.createExpense as jest.Mock).mockResolvedValue(mockExpense);
    
    await act(async () => {
      render(
        <AppProvider>
          <MyBudgetTracker />
        </AppProvider>
      );
    });

    // Add new expense
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Name"), { 
        target: { value: "Test Expense" } 
      });
      fireEvent.change(screen.getByLabelText("Cost"), { 
        target: { value: "100" } 
      });
      fireEvent.click(screen.getByText("Save"));
    });

    // Verify expense is added
    await waitFor(() => {
      expect(screen.getByText("Test Expense")).toBeInTheDocument();
      expect(screen.getByText("$100")).toBeInTheDocument();
    });

    // Delete expense
    await act(async () => {
      const deleteButton = screen.getByRole("button", { name: "x" });
      fireEvent.click(deleteButton);
    });

    // Verify expense is removed
    await waitFor(() => {
      expect(screen.queryByText("Test Expense")).not.toBeInTheDocument();
    });
  });

  test("Edit Budget", async () => {
    // Mock the initial budget fetch
    (budgetUtils.fetchBudget as jest.Mock).mockResolvedValue(1000);
    
    await act(async () => {
      render(
        <AppProvider>
          <MyBudgetTracker />
        </AppProvider>
      );
    });

    // Wait for initial budget to be displayed
    await waitFor(() => {
      expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    });

    // Click edit button
    await act(async () => {
      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);
    });

    // Change budget value
    const budgetInput = screen.getByTestId("budget-input");
    await act(async () => {
      fireEvent.change(budgetInput, { target: { value: "1500" } });
    });

    // Mock the update budget call
    (budgetUtils.updateBudget as jest.Mock).mockResolvedValueOnce(1500);

    // Save new budget
    await act(async () => {
      const saveButton = screen.getByTestId("save-budget-button");
      fireEvent.click(saveButton);
    });

    // Wait for the budget to update and verify
    await waitFor(() => {
      expect(budgetUtils.updateBudget).toHaveBeenCalledWith(1500);
      expect(screen.getByText("Budget: $1500")).toBeInTheDocument();
    }, {
      timeout: 3000  // Increase timeout if needed
    });
  });
}); 