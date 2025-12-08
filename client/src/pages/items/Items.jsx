import React from 'react'

const Items = ({expenses,onDelete, onEdit}) => {
    const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(id);
    }
  };

  const handleEdit = (expense) => {
    onEdit(expense); 
  };
  return (
     <div >
          {expenses.length === 0 ? (
            <p>No items added</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense.id} style={{backgroundColor:"black", display:'flex',marginBottom: '10px'}} className='items'>
                <strong>₹{expense.expence}</strong> - {expense.description} - {expense.cat}
                <button type='button' onClick={() => handleEdit(expense)}>Edit</button><br />
                <button type='button' onClick={() => handleDelete(expense.id)}>Delete</button>
              </div>
             
            ))
          )}
        </div>

  )
}

export default Items