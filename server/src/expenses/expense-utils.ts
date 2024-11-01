import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, name } = req.body;

    if (!name || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        name,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    const { id } = req.params;

    // Find the index of the expense to delete
    const expenseIndex = expenses.findIndex(expense => expense.id === id);

    if (expenseIndex === -1) {
        return res.status(404).send({ error: "Expense not found" });
    }

    // Remove the expense from the array
    expenses.splice(expenseIndex, 1);
    
    res.status(200).send({ message: "Expense deleted successfully" });
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}