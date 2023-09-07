import React from "react";
import Logo from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faHouse} from '@fortawesome/free-solid-svg-icons'
import { faSackDollar} from '@fortawesome/free-solid-svg-icons'
import { faKey} from '@fortawesome/free-solid-svg-icons'
import { faAddressBook} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
            <div className="nav_logo">
              <img src={Logo} style={{width:'82px',height:'82px'}} alt="class-unclick"/>
            </div>
            <Link to="/" className="nav-item">
                <FontAwesomeIcon icon={faHouse} />
                <div class="nav-word">課程管理</div>
            </Link>
          
            <Link to="/student" className="nav-item">
            <FontAwesomeIcon icon={faAddressBook} />
            <div class="nav-word">學員管理</div></Link>
          
            <Link to="/coach" className="nav-item">
            <FontAwesomeIcon icon={faUser} />
            <div class="nav-word">教練管理</div></Link>
          
            <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faSackDollar} />
            <div class="nav-word">金流管理</div></Link>
        
            {/* for detail page testing use */}
            {/* <Link to="/classdetail" className="nav-item">
            <FontAwesomeIcon icon={faSackDollar} />
            <div class="nav-word">classdetail</div></Link>
            <Link to="/coachdetail" className="nav-item">
            <FontAwesomeIcon icon={faSackDollar} />
            <div class="nav-word">coachdetail</div></Link>
            <Link to="/studentdetail" className="nav-item">
            <FontAwesomeIcon icon={faSackDollar} /> 
            <div class="nav-word">studentdetail</div></Link> */}

            {/* <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faKey} />
            <div class="nav-word">場地租借</div></Link> */}
            <Link to="/savejson" className="nav-item">
            <FontAwesomeIcon icon={faKey} />
            <div class="nav-word">Save Page</div></Link>
        </div>
  )
}

export default Navbar