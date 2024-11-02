import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBudget, setEditedBudget] = useState(budget.toString());

  useEffect(() => {
    loadBudget();
  }, []);

  useEffect(() => {
    setEditedBudget(budget.toString());
  }, [budget]);

  const loadBudget = async () => {
    try {
      const budgetAmount = await fetchBudget();
      setBudget(budgetAmount);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedBudget = await updateBudget(Number(editedBudget));
      setBudget(updatedBudget);
      setIsEditing(false);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <>
          <input
            type="number"
            value={editedBudget}
            onChange={(e) => setEditedBudget(e.target.value)}
            data-testid="budget-input"
          />
          <button 
            onClick={handleSaveClick}
            data-testid="save-budget-button"
          >
            Save Budget
          </button>
        </>
      ) : (
        <>
          <div>Budget: ${budget}</div>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Budget;
