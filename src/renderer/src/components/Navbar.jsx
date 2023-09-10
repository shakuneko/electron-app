import React from 'react'
import Logo from '../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
//use hash to check the current page
import hash from 'object-hash'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { selectPageState } from '../redux/pageSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Navbar() {
  //let pageState = useSelector(selectPageState)//default page state
  let currentState = useLocation()

  const oldHash = useRef('')

  useEffect(() => {
    const currentHash = hash(currentState)

    console.log('Old Hash:', oldHash.current)
    console.log('Current Hash:', currentHash)
    if (oldHash.current != currentHash) {
      // save file here
      oldHash.current = currentHash
      console.log('save file here')
    } else {
      console.log('no need to save file')
    }
  }, [currentState])

  return (
    <div>
      <div className="nav_logo">
        <img src={Logo} style={{ width: '82px', height: '82px' }} alt="class-unclick" />
      </div>
      <NavLink
        to="/"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
      >
        <FontAwesomeIcon icon={faHouse} />
        <div class="nav-word">課程管理</div>
      </NavLink>

      <NavLink
        to="/student"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
      >
        <FontAwesomeIcon icon={faAddressBook} />
        <div class="nav-word">學員管理</div>
      </NavLink>

      <NavLink
        to="/coach"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
      >
        <FontAwesomeIcon icon={faUser} />
        <div class="nav-word">教練管理</div>
      </NavLink>

      <NavLink
        to="/revenue"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
      >
        <FontAwesomeIcon icon={faSackDollar} />
        <div class="nav-word">金流管理</div>
      </NavLink>

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
      <NavLink
        to="/savejson"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
      >
        <FontAwesomeIcon icon={faKey} />
        <div class="nav-word">Save Page</div>
      </NavLink>
    </div>
  )
}

export default Navbar
