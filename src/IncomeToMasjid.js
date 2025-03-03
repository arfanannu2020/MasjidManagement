import React, { useState } from 'react';
import './Registration.css';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const IncomeToMasjid = () => {

    // const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    memberId:'',
    bookNo:'',
    receiptNo:'',
    receiptDate:'',
    amount:'',
    memberName:'',
    noc:'',
    rent:'',
    otherIncome:'',
    marriage:'',
    hundi:''
  });

  // State to handle errors or success messages
  const [error, setError] = useState('');
//   const [isChecked, setIsChecked] = useState(false);

  // Handle form input changes
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
  
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords don't match");
    //   return;
    // }

    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/incomeToMasjid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
            amount:'',
            memberName:'',
            noc:'',
            rent:'',
            otherIncome:'',
            marriage:'',
            hundi:''
        });

        alert('Added Income to Masjid');
        // navigate('/home');
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while adding payment.');
      console.error(error);
    }
  };

  return (
    <div className="registration-container">
      <Link to="/" className="left-link">Back</Link><br/><br/>
    
      <h2>Income To Masjid</h2>
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
        <div>
          <label >Member Name</label>
          <input
            type="text"
            // id="member_address"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label >NOC</label>
          <input
            type="checkbox"
            // id="member_address"
            name="noc"
            value={formData.noc}
            checked={formData.noc}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >rent</label>
          <input
            type="checkbox"
            // id="member_address"
            name="rent"
            value={formData.rent}
            checked={formData.rent}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >otherIncome</label>
          <input
            type="checkbox"
            // id="member_address"
            name="otherIncome"
            value={formData.otherIncome}
            checked={formData.otherIncome}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >Marriage/Engagement</label>
          <input
            type="checkbox"
            // id="member_address"
            name="marriage"
            value={formData.marriage}
            checked={formData.marriage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >hundi</label>
          <input
            type="checkbox"
            // id="member_address"
            name="hundi"
            value={formData.hundi}
            checked={formData.hundi}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      
    <div>
     
    </div>
      
    </div>
  );
};

export default IncomeToMasjid;
