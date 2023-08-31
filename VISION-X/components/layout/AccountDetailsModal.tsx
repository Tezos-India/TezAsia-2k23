import React, { Dispatch } from 'react'
import Button from '../design/Button'
import Modal, { ModalHeader } from '../design/Modal'

type Props = {
  isOpen:boolean
  closeModal: any
}

const AccountDetailsModal = ({isOpen,closeModal}: Props) => {
  return (
    <Modal size='sm' isOpen={isOpen} closeModal={closeModal}>
      <ModalHeader className='font-bold text-xl mb-4'>Your wallet details</ModalHeader>
      <div className='flex flex-col gap-4'>
      <p>Address : </p>
      <p>Balance :</p>
      <p>Network :</p>
      <div className='flex gap-4 '>
      <Button onClick={closeModal} outline variant="primary" className='w-full'>Close</Button>
      <Button variant='danger' className='w-full'>Disconnect</Button>
      </div>
      </div>
    </Modal>
  )
}

export default AccountDetailsModal