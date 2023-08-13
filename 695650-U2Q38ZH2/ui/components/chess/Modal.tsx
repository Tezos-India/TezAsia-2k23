import React, { useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

function Modal({ children, onClose }) {
  const [open, setOpen] = useState(true)
  return open && (
    <div className='modal-container'>
      <div className='modal'>
        { children }
        <div className='modal-close' style={{color: 'black'}} onClick={onClose}>X</div>
      </div>
    </div>
  )
}

Modal.Header = function(props) {
  return (
    <div className='modal-header'>
      { props.children }
    </div>
  )
}

Modal.Body = function({ children }) {
  return (
    <div className='modal-body'>
      { children }
    </div>
  )
}

export default Modal