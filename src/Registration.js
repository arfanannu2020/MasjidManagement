import React, { useState } from 'react';
import './Registration.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import home from './HomePage';

const Registration = () => {

    const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    memberName: '',
    member_address: '',
    mobile_no: '',
    adhar_card_no: '',
    fixed_monthly_donation: '',
    old_donation_balance: '',
  });

  // State to handle errors or success messages
  const [error, setError] = useState('');
  const [members, setMembers] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords don't match");
    //   return;
    // }

    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // console.log('Server response:', responseData.message);
      });
      console.log('Form data submitted:', JSON.stringify(formData));
      
      // const response = await axios.post("http://localhost:8080/api/register", formData);
      // setFormData(response.data);
      // console.log('Server response:');
      
      if (response.ok) {

        const contentType = response.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            setMembers(result);
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
            memberName: '',
            member_address: '',
            mobile_no: '',
            adhar_card_no: '',
            fixed_monthly_donation: '',
            old_donation_balance: ''
        });

        alert('Member Registered Successully');
        // navigate('/home');
        // console.log('Server response:');
      } else {
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
      
      <h2>Registration Form</h2>
      {error && <p style={{ listStyleType: 'none', paddingLeft: 0 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label >Member name:</label>
          <input
            type="text"
            // id="member_name"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label >Member Address:</label>
          <input
            type="text"
            // id="member_address"
            name="member_address"
            value={formData.member_address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label >Mobile No:</label>
          <input
            type="Number"
            // id="mobile_no"
            name="mobile_no"
            value={formData.mobile_no}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label >Adhar Card Number:</label>
          <input
            type="Number"
            // id="adhar_card_no"
            name="adhar_card_no"
            value={formData.adhar_card_no}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label >Fixed Monthly Donation:</label>
          <input
            type="Number"
            // id="fixed_monthly_donation"
            name="fixed_monthly_donation"
            value={formData.fixed_monthly_donation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label >Old Donation Balance:</label>
          <input
            type="Number"
            // id="old_donation_balance"
            name="old_donation_balance"
            value={formData.old_donation_balance}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      
      <div>
      <Link to="/editMember">Edit Members</Link><br/>
      <Link to="/deleteMember">Delete Members</Link><br/>
    </div>
      
    </div>
  );
};

export default Registration;
