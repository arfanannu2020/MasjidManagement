import React, { useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';

const DeleteMember = () => {
    const [searchQuery, setSearchQuery] = useState('');
      const [members, setMembers] = useState({
        id:'',
        memberName: '',
        member_address: '',
        mobile_no: '',
        adhar_card_no: '',
        fixed_monthly_donation: '',
        old_donation_balance: '',
      });
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      const [response,setResponse] = useState('');
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
    setError('');
    setMembers([]);
    setSearchQuery(e.target.value);
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
        setMembers(data); 
        console.info(data[0]);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  }

  //Handle form submission
  const handleDelete = async (e) => {
    e.preventDefault();
  
    setError('');
    setMembers([]);
    
    try {
      const response = await fetch(`http://localhost:8080/api/items/${members[0].id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok){
        setError('');
        console.log("deleted succefully");
      }
      else{
        console.log("Error");
      }
      
          const text = await response.text();
          let responseData = { message: text };
          setResponse(responseData);
          console.log('Server response:', responseData.message);
          alert('Deleted Member Successfully');

        // navigate('/home');
      }
     catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/items/1`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       console.log('Item deleted successfully');
  //       // Optionally, remove the deleted item from the state to update the UI
  //       setResponse(response.status);
  //       // setItems(items.filter(item => item.id !== id));
  //     } else {
  //       console.error('Failed to delete item');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  // };


  return (
    <div>
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
      <Link to="/" class="left-link">Back</Link><br/>
      
      <h2>Delete Member</h2>
      {error && <p style={{ listStyleType: 'none', paddingLeft: 0 }}>{error}</p>}
      {members.length > 0 ?(
          <ul className="no-bullets">
            {members.map((member) => (
              <li key={member.id}>
                <p>Member Id: {member.id}</p>
                <p>Name: {member.memberName}</p>
                <p>Address: {member.member_address}</p>
                <p>Mobile No: {member.mobile_no}</p>
                <p>Adhar card no: {member.adhar_card_no}</p>
                <p>Fixed monthly donation: {member.fixed_monthly_donation}</p>
                <p>Old donation balance: {member.old_donation_balance}</p>
              </li>
            ))}
          </ul>
        ):(<></>)}
    </div><br/>
    <div>
    <button onClick={handleDelete}>Delete</button>
    </div>
    </div>
  );
};

export default DeleteMember;
