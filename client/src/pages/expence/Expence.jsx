import React, { useState } from 'react';
import Items from '../items/Items';

const Expence = () => {
    const [formData, setFormData] = useState({
    expence: '',
    description: '',
    cat: 'food'
  });
  
  const [expenses, setExpenses] = useState([]);

   const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit=(e)=>{
        e.preventDefault()
         const newExpense = { ...formData, expence: parseFloat(formData.expence), id: Date.now() };
    setExpenses([newExpense, ...expenses]);

        setFormData({ expence: '', description: '', cat: 'food' });
    }

    //////////////////

    const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleEdit = (expense) => {
    // form fill 
    setFormData({
      expence: expense.expence.toString(),
      description: expense.description,
      cat: expense.cat
    });
  };
  return (
    <>
    <div>Expence</div>
    <form onSubmit={handleSubmit}>
        <label htmlFor="expenceid"></label>Expence:
        <input 
            type="number" 
            name="expence" 
            id="expenceid" 
            value={formData.expence}
            onChange={handleInputChange}
            required
          />
        <label htmlFor="descriptionid"></label>Description:
         <input 
            type="text" 
            name="description" 
            id="descriptionid" 
            value={formData.description}
            onChange={handleInputChange}
            required
          />

        <label htmlFor="categoryid"></label>Categories:
        <select  name="cat" 
            id="categoryid"
            value={formData.cat}
            onChange={handleInputChange}>

            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>

        </select>
        <button type='submit'>Submit</button>
    </form>
    <Items expenses={expenses} onDelete={handleDelete} onEdit={handleEdit}/>

   
    </>
    
  )
}

export default Expence
