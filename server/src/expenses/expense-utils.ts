import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, name } = req.body;

    if (!name || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        // Insert the new expense into the database
        await db.run(
            `INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?)`,
            [id, name, cost]
        );

        const newExpense: Expense = { id, name, cost };
        res.status(201).send(newExpense);
    } catch (error) {
        res.status(500).send({ error: "Failed to create expense" });
    }
}

export async function deleteExpense(req: Request, res: Response, db: Database) {
    const { id } = req.params;

    try {
        // First check if the expense exists
        const expense = await db.get(`SELECT * FROM expenses WHERE id = ?`, [id]);
        
        if (!expense) {
            return res.status(404).send({ error: "Expense not found" });
        }

        // Delete the expense
        await db.run(`DELETE FROM expenses WHERE id = ?`, [id]);
        res.status(200).send({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete expense" });
    }
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all(`SELECT id, description as name, cost FROM expenses`);
        res.status(200).send({ "data": expenses });
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch expenses" });
    }
}