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

  const loadBudget = async () => {
    try {
      const budgetAmount = await fetchBudget();
      setBudget(budgetAmount);
      setEditedBudget(budgetAmount.toString());
    } catch (err: any) {
      console.log(err.message);
      // You might want to show an error message to the user here
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
      // You might want to show an error message to the user here
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
          />
          <button onClick={handleSaveClick}>Save</button>
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
