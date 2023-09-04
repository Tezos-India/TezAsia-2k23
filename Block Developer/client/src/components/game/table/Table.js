import React from 'react'
import { Table } from 'react-bootstrap'

function TableDiv(props) {
    return (
  <Table responsive className='table table-dark table-hover table align-middle' style={{backgroundColor: "#000", color: "#fff"}}>
  <thead>
    <tr>
      <th>#</th>
        <th>Piece</th>
        <th>From</th>
        <th>To</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {Array.from({ length: 3 }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>2</td>
      {Array.from({ length: 3 }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>3</td>
      {Array.from({ length: 3 }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
  </tbody>
</Table>
    )
}


export default TableDiv

