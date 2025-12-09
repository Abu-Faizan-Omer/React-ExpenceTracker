import React, { useState,useEffect } from 'react';
import Items from '../items/Items';
import axios from 'axios';

const Expence = () => {
    const [formData, setFormData] = useState({
    expence: '',
    description: '',
    cat: 'food'
  });
  
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchExpenses();
  }, []);

   const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit=async (e)=>{
        e.preventDefault()
         const newExpense = { ...formData, expence: parseFloat(formData.expence), id: Date.now() };
    setExpenses([newExpense, ...expenses]);
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
       
        const body = {
          expence: formData.expence,
          description: formData.description,
          cat: formData.cat
        };

        const response = await axios.put(
          `http://localhost:3000/users/expenses/${editingId}`,
          body,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.status === 200) {
          console.log("expense updated in backend");
        }
      } else {
        
        const response = await axios.post(
          'http://localhost:3000/users/expenses',
          formData,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.status === 201) {
          console.log("expense added in backend");
        }
      }

      // Reset form + exit edit mode + refresh list
      setFormData({ expence: '', description: '', cat: 'food' });
      setEditingId(null);
      await fetchExpenses();
    } catch (err) {
      alert('Add failed: ' + err.response?.data?.error);
    } finally {
      setLoading(false);
    }

        setFormData({ expence: '', description: '', cat: 'food' });
    }
    //get
     const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/users/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.status === 200) {
            console.log("get request from backend ")
        }
      
      
       setExpenses(response.data.expenses);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

//     //////////////////

   const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/users/expenses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchExpenses(); 
      } catch (err) {
        alert('Delete failed!');
      }
    }
  };

  const handleEdit = (expense) => {
    // autofill
    setFormData({
      expence: expense.amount,
      description: expense.description,
      cat: expense.category
    })
    setEditingId(expense.id)
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
