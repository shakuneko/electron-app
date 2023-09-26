import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import StudentsDetailTable from './StudentsDetailTable'
import DoneClasses from './DoneClasses'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
function StudentDetailCollapse({ stuData }) {
  return (
    <div style={
        {
        padding: "10px",
        margin: "10px",
       }
    }>
      <div>姓名：{stuData.stuName}</div>
      <div>性別：{stuData.stuGender}</div>
      <div>電話：{stuData.stuPhone}</div>
      <div>Email：{stuData.stuEmail}</div>
      <div>地址：{stuData.stuAddress}</div>
      <div>緊急連絡人：{stuData.stuContact}</div>
      <div>緊急連絡人電話：{stuData.stuContact_tel}</div>
      <div>備註：{stuData.stuNote}</div>
    </div>
  )
}

export default StudentDetailCollapse
