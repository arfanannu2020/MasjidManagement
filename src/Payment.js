import React, { useState } from 'react';
import './Registration.css';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Payment = () => {

    // const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    memberId:'',
    bookNo:'',
    receiptNo:'',
    receiptDate:'',
    amount:''
  });

  // State to handle errors or success messages
  const [error, setError] = useState('');
//   const [isChecked, setIsChecked] = useState(false);

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

    const paymentData = {
      amount: parseFloat(formData.amount),
      receiptDate: formData.receiptDate,
      bookNo:formData.bookNo,
      receiptNo:formData.receiptNo,
      member: {
        id: formData.memberId, // Send the memberId
      },
    };
    
    try {
      const response = await fetch('http://localhost:8080/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
        // console.log('Server response:', responseData.message);
      });
      console.log('Form data submitted:', JSON.stringify(formData));
      
      // const response = await axios.post("http://localhost:8080/api/payment", formData);
      // setFormData(response.data);
      // console.log('Server response:');
      
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            // setMembers(result);
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
            memberId:'',
            bookNo:'',
            receiptNo:'',
            receiptDate:'',
            amount:''
        });
        alert('Added Donation');
        // navigate('/home');
        setError('');
        // console.log('Server response:');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError('Error occurred while adding payment.');
      console.error(error);
    }
  };

  return (
    
    <div className="registration-container">
      <Link to="/" className="left-link">Back</Link>
      <h2>Payment Form</h2>

      <form onSubmit={handleSubmit}>
      <div>
          <label >Member Id</label>
          <input
            type="Number"
            // id="memberId"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            required
          />
        </div>
      <div>
          <label >Book No</label>
          <input
            type="Text"
            // id="member_name"
            name="bookNo"
            value={formData.bookNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label >Receipt No</label>
          <input
            type="Number"
            // id="member_name"
            name="receiptNo"
            value={formData.receiptNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label >Receipt Date</label>
          <input
            type="Date"
            // id="member_name"
            name="receiptDate"
            value={formData.receiptDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}  // Control the checkbox state
          onChange={handleChange}  // Update the state when checkbox is clicked
        />
        One year payment
      </label>
      {/* <p>{isChecked ? "Checkbox is checked!" : "Checkbox is unchecked!"}</p> */}
    {/* </div> */} 

        <div>
          <label >Donation Amount</label>
          <input
            type="Number"
            // id="member_address"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      
    <div>
     
    </div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Payment;
