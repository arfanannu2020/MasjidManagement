import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle change in search input
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search action
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter id to search');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/home?id=${searchQuery}`);
      const data = await response.json();
      setMembers(data);  // Store the members found
      console.log("server response",data);
      if(data.length==0){
        setError('Member Not Exists');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
    <div>
      <div>
      <div>
      <Link to="/" className="left-link">Back</Link><br/><br/>
      
      <h1>Search for Registered Members</h1>
      </div>

      {/* Search Form */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter member Id"
          value={searchQuery}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Display Results */}
      <div>
        {members.length > 0 ?(
          <ul>
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
        </div>
       
      </div>
      <div>
      {error && <p>{error}</p>}
      </div>
    </div>
     <div className="navbar">
     <ul>
     <li><Link to="/Payment">Add Donation</Link></li>
     <li><Link to="/MasjidExpense">Add Masjid Expense</Link></li>
     <li><Link to="/ramdanExpense">Ramdan Expense</Link></li>
     <li><Link to="/IncomeToMasjid">Income To Masjid</Link></li>
     <li><Link to="/Reports">Reports</Link></li>
     <li><Link to="/Registration">Register Member</Link></li>
     </ul>
     </div>
     </div>
  );
};

export default HomePage;
