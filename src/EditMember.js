import React, { useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';

const EditMember = () => {
    const [searchQuery, setSearchQuery] = useState('');
      const [members, setMembers] = useState({
        memberName: '',
        member_address: '',
        mobile_no: '',
        adhar_card_no: '',
        fixed_monthly_donation: '',
        old_donation_balance: '',
      });
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

    const navigate = useNavigate();
  // State to hold form data
//   const [formData, setFormData] = useState({
//     memberName: '',
//     member_address: '',
//     mobile_no: '',
//     adhar_card_no: '',
//     fixed_monthly_donation: '',
//     old_donation_balance: '',
//   });



  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembers((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a name to search');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/home?memberName=${searchQuery}`);
      const data = await response.json();
        // setMembers({
        //     memberName : response.memberName,
        //     member_address : response.member_address,
        //     mobile_no : response.mobile_no,
        //     adhar_card_no : response.adhar_card_no,
        //     fixed_monthly_donation : response.fixed_monthly_donation,
        //     old_donation_balance : response.old_donation_balance
        // });

       // Store the members found
      if(data.length==0){
        setError('Member Not Exists');
      }
      else{
        setMembers(data[0]); 
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  }

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(members),
        // console.log('Server response:', responseData.message);
      });
      console.log('Form data submitted:', JSON.stringify(members));
      
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
        setMembers({
            memberName: '',
            member_address: '',
            mobile_no: '',
            adhar_card_no: '',
            fixed_monthly_donation: '',
            old_donation_balance: ''
        });
        alert('Updated Member Details');
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
    <div>
      <Link to="/" class="left-link">Back</Link><br/><br/>
          <h1>Search for Registered Members</h1>
           {/* Search Form */}
    <div class="search-container">
        <input
            type="text"
            placeholder="Enter member name"
            class="search-input"
            value={searchQuery}
            onChange={handleChangeSearch}
        />
        <button onClick={handleSearch}>Search</button>
    </div><br/>

    <div className="registration-container">
      <h2>Update Member</h2>
      {error && <p style={{ listStyleType: 'none', paddingLeft: 0 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label >Member name:</label>
          <input
            type="text"
            // id="member_name"
            name="memberName"
            value={members.memberName || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >Member Address:</label>
          <input
            type="text"
            // id="member_address"
            name="member_address"
            value={members.member_address || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >Mobile No:</label>
          <input
            type="Number"
            // id="mobile_no"
            name="mobile_no"
            value={members.mobile_no || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >Adhar Card Number:</label>
          <input
            type="Number"
            // id="adhar_card_no"
            name="adhar_card_no"
            value={members.adhar_card_no || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >Fixed Monthly Donation:</label>
          <input
            type="Number"
            // id="fixed_monthly_donation"
            name="fixed_monthly_donation"
            value={members.fixed_monthly_donation || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label >Old Donation Balance:</label>
          <input
            type="Number"
            // id="old_donation_balance"
            name="old_donation_balance"
            value={members.old_donation_balance || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
    </div>
  );
};

export default EditMember;
