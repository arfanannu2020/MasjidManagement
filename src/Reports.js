import React, { useState } from 'react';
import './reports.css';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import * as XLSX from 'xlsx';

const Reports = () => {

    // const navigate = useNavigate();
  // State to handle errors or success messages
  const [error, setError] = useState('');
  const [members, setMembers] = useState([]);
  const[memberHeader,setMemberHeader]=useState([]);
  const [exports, setExport] = useState([]);
  const [selectedOption, setSelectedOption] = useState({month:'',year:''});
  // let item;

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedOption({
      ...selectedOption,
      [name]: value,
    });
  };

  const exportToExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(members);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'DataSheet');

    // Write the workbook to a file and trigger download
    XLSX.writeFile(wb, 'data.xlsx');
  };

  const handleDownload = async () => {
    try {
      const doc = new jsPDF();
      const data = typeof members === 'object' ? JSON.stringify(members, null, 2) : members;
      // console.log(data);
      doc.text(data, 10, 10); 
      
      // doc.autoTable({
      //   head: [['Column 1', 'Column 2', 'Column 3']],
      //   body: data.map(item => [item.name]), 
      // });
      console.log(data.map(console.log()));
      doc.save('generated-file.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMemberHeader([]);
    setMembers([]);
    setExport([]);
    setError('');
    
    try {
      const response1 = await fetch(`http://localhost:8080/api/TotalDonationPerMonth/${selectedOption.month}&${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response2 = await fetch(`http://localhost:8080/api/GrandTotalDonationPerMonth/${selectedOption.month}&${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response1.ok & response2.ok) {

        const contentType = response1.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result1 = await response1.json();
            const result2 =await response2.json();
            setMemberHeader(['Member_Id','Member_Name','Book_No','Receipt_No','ReceiptDate','Amount','Month']);
            setMembers(result1);
            setExport(result2);
            // console.log('Server response:', result);
        }
        else{
          const text = await response1.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  };

  const TotalDonationPerYear = async (e)=>{
    setMemberHeader([]);
    setMembers([]);
    setExport([]);
    e.preventDefault();

    setError('');
    
    try {
      const response1 = await fetch(`http://localhost:8080/api/TotalDonationPerYear/${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
    //   console.log('Form data submitted:', JSON.stringify(formData));

    const response2 = await fetch(`http://localhost:8080/api/GrandTotalDonationPerYear/${selectedOption.year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
      
      if (response1.ok& response2.ok) {

        const contentType = response1.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result1 = await response1.json();
            const result2 = await response2.json();
            setMemberHeader(['Member_Id','Member_Name','Book_No','Receipt_No','ReceiptDate','Amount','Month']);
            setMembers(result1);
            setExport(result2);
            // console.log('Server response:', result);
        }
        else{
          const text = await response1.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  }

  const ExpenditurehandleSubmit = async (e)=>{
    setMemberHeader([]);
    setMembers([]);
    setExport([]);
    e.preventDefault();

    setError('');
    
    try {
      const response1 = await fetch(`http://localhost:8080/api/ExpenditureReport/${selectedOption.month}&${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
    //   console.log('Form data submitted:', JSON.stringify(formData));

    const response2 = await fetch(`http://localhost:8080/api/GrandExpenditureReport/${selectedOption.month}&${selectedOption.year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // console.log('Server response:', responseData.message);
    });
      
      if (response1.ok & response2.ok) {

        const contentType = response1.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result1 = await response1.json();
            const result2=await response2.json();
            setMemberHeader(['Expense Description','date','Expense Amount','Month']);
            setMembers(result1);
            setExport(result2);
            // console.log('Server response:', result);
        }
        else{
          const text = await response1.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  }

  const RamdanDonationReport = async(e)=>{
    setMembers([]);
    setMemberHeader([]);
    setExport([]);
    e.preventDefault();

    setError('');
    
    try {
      const response1 = await fetch('http://localhost:8080/api/RamdanDonationReport', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });

      const response2 = await fetch(`http://localhost:8080/api/SumOfRamdanDonationReport/${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
    //   console.log('Form data submitted:', JSON.stringify(formData));
      
      if (response1.ok & response2.ok) {

        const contentType = response1.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result1 = await response1.json();
            const result2 = await response2.json();
            setMemberHeader(['Member_Id','Member_Name','Book_No','Receipt_No','Receipt_Date','Amount']);
            setMembers(result1);
            setExport(result2);
            // console.log('Server response:', result);
        }
        else{
          const text = await response1.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  }

  const ExpenditureReportPerYear = async (e)=>{
    e.preventDefault();
    setMemberHeader([]);
    setMembers([]);
    setExport([]);
    setError('');
    
    try {
      const response1 = await fetch(`http://localhost:8080/api/ExpenditureReportPerYear/${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
    //   console.log('Form data submitted:', JSON.stringify(formData));

      const response2 = await fetch(`http://localhost:8080/api/GrandExpenditureReportPerYear/${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
      
      if (response1.ok & response2.ok) {

        const contentType = response1.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result1 = await response1.json();
            const result2 = await response2.json();
            setMemberHeader(['Expense Description','date','Expense Amount','Year']);
            setMembers(result1);
            setExport(result2);
            // console.log('Server response:', result);
        }
        else{
          const text = await response1.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  }

  const NonMemberRamdanDonationReport = async (e)=>{
    e.preventDefault();
    setMembers([]);
    setMemberHeader([]);
    setExport([]);
    setError('');
    
    try {
      const response1 = await fetch('http://localhost:8080/api/NonMemberRamdanDonationReport', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
    //   console.log('Form data submitted:', JSON.stringify(formData));

      const response2 = await fetch(`http://localhost:8080/api/SumOfNonMemberRamdanDonationReport/${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
      
      if (response1.ok & response2.ok) {

        const contentType = response1.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result1 = await response1.json();
            const result2 = await response2.json();
            setMemberHeader(['Member_Id','Member_Name','Book_No','Receipt_No','Receipt_Date','Amount']);
            setMembers(result1);
            setExport(result2);
            // console.log('Server response:', result);
        }
        else{
          const text = await response1.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  }

  const RamdanBalanceAmount = async (e)=>{
    e.preventDefault();
    setMemberHeader([]);
    setMembers([]);
    setExport([]);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:8080/api/RamdanBalanceAmount/${selectedOption.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
    //   console.log('Form data submitted:', JSON.stringify(formData));
      
      if (response.ok) {

        const contentType = response.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            setMemberHeader(['Ramdan Balance Amount']);
            setExport(result);
            // console.log('Server response:', result);
        }
        else{
          const text = await response.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  }

  const memberDeatils = async(e)=>{
    e.preventDefault();
    setMemberHeader([]);
    setMembers([]);
    setExport([]);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/memberDeatils', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
    //   console.log('Form data submitted:', JSON.stringify(formData));
      
      if (response.ok) {

        const contentType = response.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();

            setMemberHeader(['Member_Id','Name','Place']);
            setMembers(result);
            // console.log('Server response:', result);
        }
        else{
          const text = await response.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  }

  const MemberOutstanding = async(e)=>{
    e.preventDefault();
    setMemberHeader([]);
    setMembers([]);
    setExport([]);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:8080/api/MemberOutstanding/${selectedOption.month}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // console.log('Server response:', responseData.message);
      });
    //   console.log('Form data submitted:', JSON.stringify(formData));
      
      if (response.ok) {

        const contentType = response.headers.get("content-type");
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();

            setMemberHeader(['Member_Id','Name','Place','No_Of_Month_Donation_Paid']);
            setMembers(result);
            // console.log('Server response:', result);
        }
        else{
          const text = await response.text();
          responseData = { message: text };
          console.log('Server response:', responseData.message);
        }
        // console.log('Server response:');
      } else {
        // setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error occurred while registering.');
      console.error(error);
    }
  }

  return (
    <div>
    <div className="registration-container">
      
      <Link to="/" className="left-link">Back</Link><br/><br/>
    
      <h2>Reports Form</h2>
      {error && <p style={{ listStyleType: 'none', paddingLeft: 0 }}>{error}</p>}

      <label>Enter Month</label>
      <input type='text'
       name="month"
       value={selectedOption.month}
       onChange={handleSelectChange}
      ></input>

      <label>Enter Year</label>
      <input type='text'
       name="year"
       value={selectedOption.year}
       onChange={handleSelectChange}
      ></input>
      <Link onClick={memberDeatils}>Reports of Member Details</Link><br/>
            <br/><br/>
      <Link onClick={handleSubmit}>Reports of Total Donation Per Month</Link><br/>
            <br/><br/>
      <Link onClick={TotalDonationPerYear}>Reports of Total Donation Per Year</Link>
          <br/><br/>
      <Link onClick={ExpenditurehandleSubmit}>Reports of Expenditure Report</Link>
          <br/><br/>

      <Link onClick={ExpenditureReportPerYear}>Reports of Expenditure Report Per Year</Link>
            <br/><br/>
      <Link onClick={RamdanDonationReport}>Reports of Ramdan Donation Report</Link>
            <br/><br/>
      <Link onClick={NonMemberRamdanDonationReport}>Reports of NonMember Ramdan Donation Report</Link>
            <br/><br/>
      <Link onClick={RamdanBalanceAmount}>Reports of Ramdan Balance Amount</Link>
      <br/><br/>
      <Link onClick={MemberOutstanding}>Member OutStanding Report</Link>
      </div><br/><br/>
      <button onClick={handleDownload}>Download PDF</button><br/><br/>
      <button onClick={exportToExcel}>Download Excel</button><br/><br/>

      
    <div className="registration-report-data"> 
    <table>
    {/* {memberHeader.map((item,index)=>( */}
        <tr>
        <td>{memberHeader[0]}</td>
        <td>{memberHeader[1]}</td>
        <td>{memberHeader[2]}</td>
        <td>{memberHeader[3]}</td>
        <td>{memberHeader[4]}</td>
        <td>{memberHeader[5]}</td>
        <td>{memberHeader[6]}</td>
        <td>{memberHeader[7]}</td>
        </tr>
    {/* // ))} */}

    {members.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>{item[5]}</td>
              <td>{item[6]}</td>
              <td>{item[7]}</td>
            </tr>
          ))}
    <td>{exports}</td>
    </table>
    </div>
    </div>
  );
};

export default Reports;
