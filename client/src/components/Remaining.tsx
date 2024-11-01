import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Modal, Button } from "react-bootstrap";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  const [showWarning, setShowWarning] = useState(false);

  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  const remaining = budget - totalExpenses;
  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  useEffect(() => {
    if (remaining < 0) {
      setShowWarning(true);
    }
  }, [remaining]);

  const handleClose = () => setShowWarning(false);

  return (
    <>
      <div className={`alert ${alertType}`}>
        <span>
          {remaining < 0 ? "Overspent by: " : "Remaining: "}
          ${Math.abs(remaining)}
        </span>
      </div>

      <Modal show={showWarning} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Budget Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Warning: You have exceeded your budget!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Remaining;
