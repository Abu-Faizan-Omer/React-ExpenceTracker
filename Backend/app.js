require('dotenv').config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");

const sequelize = require("./utils/database");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

const User = require("./models/user");
const Expense = require("./models/expense");

// MODELS 
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/users", userRoutes);
app.use("/users", expenseRoutes); 

app.use("/", (req, res) => {
  res.send("this is home page");
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running on Port 3000`);
    });
  })
  .catch((err) => {
    console.log(`Database error:`, err);
  });
