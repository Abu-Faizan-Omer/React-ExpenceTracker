const Expense = require("../models/expense");

exports.addExpense = async (req, res) => {
  try {
    const { expence, description, cat } = req.body;
    const userId = req.user.id; 

    const newExpense = await Expense.create({
      amount: parseFloat(expence),
      description,
      category: cat,
      userId 
    });

    res.status(201).json({
      message: "item added successfully in db",
      expense: newExpense
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.findAll({ where: { userId } });
    res.status(200).json({message:"get expence from backend",expenses});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;
    
    const deleted = await Expense.destroy({
      where: { id: expenseId, userId }
    });
    
    if (deleted) {
      res.json({ message: "Expense deleted successfully" });
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    console.log("update edit")
    const expenseId = req.params.id;
    const userId = req.user.id;
    const { expence, description, cat } = req.body;

    const [updated] = await Expense.update(
      {
        amount: parseFloat(expence),
        description,
        category: cat
      },
      {
        where: { id: expenseId, userId }
      }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
