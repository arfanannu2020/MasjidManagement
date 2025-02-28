import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MasjidExpense = () => {

    const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    date: '',
    expenseDescription: '',
    expenseAmount: '',
    ramdan: false
  });

  // State to handle errors or success messages
  const [error, setError] = useState('');

  // Handle form input changes
  // const handleChange = (e) => {
  //   const { name, type, checked, value } = e.target;
  //   if (type === 'checkbox') {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: formData.Ramdan? false:true, // Set 1 if checked, otherwise set 0
  //     }));
  //   } else {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // }
  // };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
    });
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // console.log('Server response:', responseData.message);
      });
      console.log('Form data submitted:', JSON.stringify(formData));
      
      if (response.ok) {

        const contentType = response.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            console.log('Server response:', result);
        }
        else{
          const text = await response.text();
          responseData = { message: text };
          // setData(responseData.message);
          console.log('Server response:', responseData.message);
        }
        // Clear form and show success message
        setFormData({
            date: '',
            expenseDescription: '',
            expenseAmount: '',
            ramdan:''
        });
        alert('Expense added');
        // navigate('/home');
        // console.log('Server response:');
      } else {
        alert('Failed to add Expense');
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  };


  return (
    <div className="registration-container">
      <Link to="/" className="left-link">Back</Link><br/><br/>
      
      <h2>Expense Form</h2>
      {error && <p style={{ listStyleType: 'none', paddingLeft: 0 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label >Date:</label>
          <input
            type="Date"
            // id="member_name"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label >Description:</label>
          <textarea
            type="text"
            // id="member_address"
            name="expenseDescription"
            value={formData.expenseDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label >Amount:</label>
          <input
            type="Number"
            // id="mobile_no"
            name="expenseAmount"
            value={formData.expenseAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Ramdan Expense</label>
          <input
            type="checkbox"
            // id="member_address"
            name="ramdan"
            // value={formData.Ramdan}
            // checked={formData.Ramdan}
            checked={formData.ramdan}
            onChange={handleChange}
          />
        </div>
        <p>{formData.ramdan}</p><br/>
        <button type="submit">Add Expense</button>
      </form>
      
    </div>
  );
};

export default MasjidExpense;
