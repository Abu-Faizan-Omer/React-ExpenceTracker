import React, { useState, useEffect } from 'react';
import Items from '../items/Items';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses, addExpense, updateExpense, deleteExpense, selectExpenses, selectIsPremium } from '../../store/expenseSlice';
import { useSelector as useReduxSelector } from 'react-redux';

const Expence = () => {
  const [formData, setFormData] = useState({
    expence: '',
    description: '',
    cat: 'food'
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const token = useSelector(state => state.auth.token);
  const isPremium = useSelector(selectIsPremium);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/expenses', {
      headers: { Authorization: `Bearer ${token}` }
    });

    //  Backend se sirf array aaye (controllers/expense.js me res.json(expenses))
    const data = response.data;
    dispatch(setExpenses(Array.isArray(data) ? data : data.expenses || []));
  } catch (err) {
    console.error('Fetch error:', err.response?.data || err.message);
    dispatch(setExpenses([]));
  }
};


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      expence: formData.expence,
      description: formData.description,
      cat: formData.cat
    };

    try {
      if (editingId) {
        const response = await axios.put(
          `http://localhost:3000/users/expenses/${editingId}`,
          body,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          // backend me updateExpense response me updated expense bhejna achha rahega
          // assume: res.json({ expense: updatedExpense })
          alert('Edit Succesfull')
          dispatch(updateExpense(response.data.expense));
        }
      } else {
        const response = await axios.post(
          'http://localhost:3000/users/expenses',
          body,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 201) {
          // assume: res.json({ expense: newExpense })
          
          dispatch(addExpense(response.data.expense));
        }
      }

      setFormData({ expence: '', description: '', cat: 'food' });
      setEditingId(null);
    } catch (err) {
      alert('Add/Update failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try {
      await axios.delete(`http://localhost:3000/users/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(deleteExpense(id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      expence: expense.amount,
      description: expense.description,
      cat: expense.category
    });
    setEditingId(expense.id);
  };

  return (
    <>
      <div>Expence</div>

      {isPremium && (
        <button
          onClick={() => console.log('Activate premium clicked')}
          style={{ marginBottom: '1rem', backgroundColor: 'gold', padding: '0.5rem 1rem' }}
        >
          Activate Premium
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="expenceid"></label>Expence:
        <input
          type="number"
          name="expence"
          id="expenceid"
          value={formData.expence}
          onChange={handleInputChange}
          required
          disabled={loading}
        />
        <label htmlFor="descriptionid"></label>Description:
        <input
          type="text"
          name="description"
          id="descriptionid"
          value={formData.description}
          onChange={handleInputChange}
          required
          disabled={loading}
        />

        <label htmlFor="categoryid"></label>Categories:
        <select
          name="cat"
          id="categoryid"
          value={formData.cat}
          onChange={handleInputChange}
          disabled={loading}
        >
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>
        <button type='submit' disabled={loading}>
          {editingId ? 'Update' : 'Submit'}
        </button>
      </form>

      <Items expenses={expenses} onDelete={handleDelete} onEdit={handleEdit} />
    </>
  );
};

export default Expence;
