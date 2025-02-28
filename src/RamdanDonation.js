import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RamdanDonation = () => {

    const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    memberId:'',
    memberName:'',
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');

    const paymentData = {
      memberName:formData.memberName,
      amount: parseFloat(formData.amount),
      receiptDate: formData.receiptDate,
      bookNo:formData.bookNo,
      receiptNo:formData.receiptNo,
      member: {
        id: formData.memberId, // Send the memberId
      },
    };

    // console.log("paymentData",paymentData);
    let response='';
    try {
       response = await fetch('http://localhost:8080/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
        // console.log('Server response:', response.message);
      });
      // console.log('server data:', response.data);
      
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        let responseData;
        // console.log('Server response:', response);

        if (contentType && contentType.includes("application/json")) {
          // const textResponse = await response.text();
          // console.log(textResponse);
            // const result = await response.json();
            const results = await response.json();  
            console.log('Server data:', result); 
            // setMembers(result);
            // console.log('Server response:', result);
        }
        else{
          // const text = await response.text();
          // responseData = { message: text };
          // setData(responseData.message);
          // console.log('Server response:', responseData.message);
        }
        // Clear form and show success message
        setFormData({
            memberId:'',
            memberName:'',
            bookNo:'',
            receiptNo:'',
            receiptDate:'',
            amount:''
        });

        alert('Ramdan Donation added');
        // navigate('/home');
        // console.log('Server response:');
      } else {
        setError(response.message || 'Failed to add Ramdan donation');
      }
    } catch (error) {
      setError('Error occurred while adding payment.');
      console.log(response.data);
      console.error(error);
    }
  };

  return (
    <div className="registration-container">
      <Link to="/" className="left-link">Back</Link><br/><br/>

      <h2>RamdanDonation Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
          <label >Member Name</label>
          <input
            type="text"
            // id="memberId"
            name="memberName"
            value={formData.memberName}
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
      
    </div>
  );
};

export default RamdanDonation;
