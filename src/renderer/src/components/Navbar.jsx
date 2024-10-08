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
          
            <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faAddressBook} />
            <div class="nav-word">學員管理</div></Link>
          
            <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faUser} />
            <div class="nav-word">教練管理</div></Link>
          
            <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faSackDollar} />
            <div class="nav-word">金流管理</div></Link>
        
            {/* <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faKey} />
            <div class="nav-word">場地租借</div></Link> */}
        </div>
  )
}

export default Navbar