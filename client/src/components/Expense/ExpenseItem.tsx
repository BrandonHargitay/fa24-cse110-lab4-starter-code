import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense(currentExpense.id);
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== currentExpense.id
      );
      setExpenses(updatedExpenses);
    } catch (err: any) {
      console.log(err.message);
      // You might want to show an error message to the user here
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={handleDeleteExpense} className="btn btn-danger btn-sm">x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
