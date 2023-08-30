import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faPlusCircle, faQuestion } from '@fortawesome/free-solid-svg-icons';
import  {Nav} from './Nav.css';
import { useState } from 'react';

function Navbar() {
    const [rotate, setRotate] = useState(false);

    const handleRotate = () => {
        setRotate(true);
        setTimeout(() => {
          setRotate(false);
        }, 1000);
      };

      
    return (
        
        <aside className={`sidebar ${rotate}`}>
        <div className="sidebar-header">
          <div className="icon-container" onClick={handleRotate}>
            <FontAwesomeIcon className="rotating-icon" icon={faQuestion} size="6x" />
            <Link className="sidebar-brand" to="/questionnaire">
              Questionnaires
            </Link>
          </div>
        </div>
        <div className="sidebar-nav">
          <Link className="sidebar-link" aria-current="page" to="/">
            <FontAwesomeIcon icon={faDashboard} size="3x" className="sidebar-icon" />
          </Link>
          <Link className="sidebar-link" to="/addquestion">
            <FontAwesomeIcon icon={faPlusCircle} size="3x" className="sidebar-icon" />
          </Link>
        </div>
      </aside>
 

    );
}

export default Navbar;
