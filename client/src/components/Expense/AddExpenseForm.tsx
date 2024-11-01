import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from 'uuid';
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const expense = {
      id: uuidv4(),
      name: name,
      cost: parseInt(cost)
    };

    try {
      await createExpense(expense);
      setExpenses([...expenses, expense]);
      
      // Reset form
      setName('');
      setCost('');
    } catch (err: any) {
      console.log(err.message);
      // You might want to show an error message to the user here
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
