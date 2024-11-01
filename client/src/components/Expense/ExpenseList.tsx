import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchExpenses } from "../../utils/expense-utils";
import ExpenseItem from "./ExpenseItem";
import { Expense } from "../../types/types";

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  // Fetch expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  // Function to load expenses and handle errors
  const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses();
      setExpenses(expenseList);
    } catch (err: any) {
      console.log(err.message);
      // You might want to show an error message to the user here
    }
  };

  return (
    <ul className="list-group">
      {expenses.map((expense: Expense) => (
        <ExpenseItem key={expense.id} id={expense.id} name={expense.name} cost={expense.cost} />
      ))}
    </ul>
  );
};

export default ExpenseList;
