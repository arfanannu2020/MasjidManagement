import logo from './logo.svg';
import './App.css';
import Registration from './Registration';
import { Routes, Route } from 'react-router-dom';  // Import Routes and Route
import HomePage from './HomePage';
import MasjidExpense from './MasjidExpense';
import Payment from './Payment'; 
import RamdanDonation from './RamdanDonation';
import IncomeToMasjid from './IncomeToMasjid';
import EditMember from './EditMember';
import DeleteMember from './DeleteMember';
import Reports from './Reports';

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/home" element={<HomePage/>} />
       <Route path="/" element={<HomePage/>} />
       <Route path="/Registration" element={<Registration />} />
       <Route path="/payment" element={<Payment />} />
       <Route path='/ramdanExpense' element={<RamdanDonation/>}/>
       <Route path="/masjidExpense" element={<MasjidExpense />} />
       <Route path="/IncomeToMasjid" element={<IncomeToMasjid/>}/>
       <Route path="/editMember" element={<EditMember/>}/>
       <Route path="/deleteMember" element={<DeleteMember/>}/>
       <Route path="/Reports" element={<Reports/>}/>
       </Routes>
      {/* <Registration /> */}
    </div>
  );
}

export default App;
