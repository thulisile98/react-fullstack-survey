import Navbar from './layout/Navbar';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from  'react-router-dom';
import AddQuestion from './pages/AddQuestion';
import Dashboard from './pages/Dashboard';
import Questionnaire from './pages/Questionnaire';
import { useState } from 'react';

function App() {

    const [agreeCount, setAgreeCount] = useState(0);
    const [neutralCount, setNeutralCount] = useState(0);
    const [disagreeCount, setDisagreeCount] = useState(0);

  return (
    <div className="App">
  <Router>
        <Navbar/>
        <Routes>
           <Route exact path="/addquestion" element={<AddQuestion/>} />
           <Route
                    path="/"
                    element={<Dashboard
                        agreeCount={agreeCount}
                        neutralCount={neutralCount}
                        disagreeCount={disagreeCount}
                    />}
                />
                <Route path="/questionnaire" element={<Questionnaire
                    setAgreeCount={setAgreeCount}
                    setNeutralCount={setNeutralCount}
                    setDisagreeCount={setDisagreeCount}
                />} />
        </Routes>
    
      </Router>
    </div>
  );
}

export default App;
