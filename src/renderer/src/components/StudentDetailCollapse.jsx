import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import StudentsDetailTable from './StudentsDetailTable'
import DoneClasses from './DoneClasses'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
function StudentDetailCollapse({ stuData }) {
  return (
    <div
      style={{
        
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <hr></hr>
      <div style={{
        marginBottom: '10px',
        display: 'flex'
      }}>
        {/* <div className='classCoachBox-item'>姓名：{stuData.stuName}</div>
      <div className='classCoachBox-item'>性別：{stuData.stuGender}</div> */}
        <div className="classCoachBox-item">年齡：{stuData.stuAge}</div>
        <div className="classCoachBox-item">電話：{stuData.stuPhone}</div>
      </div>
      <div style={{
        display: 'flex',
      
      }}>
        <div className="classCoachBox-item">緊急連絡人：{stuData.stuContact}</div>
        <div className="classCoachBox-item">緊急連絡人電話：{stuData.stuContact_tel}</div>
        <div className="classCoachBox-item">備註：{stuData.stuNote}</div>
      </div>
      <hr></hr>
    </div>
  )
}

export default StudentDetailCollapse
