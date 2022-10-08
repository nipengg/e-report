import React from 'react'
import { CDBFooter, CDBBox } from 'cdbreact'

const Footer = () => {
  return (
    <CDBFooter className="shadow" style={{
      position: '',
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: "orange"
    }}>
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
          <small className="ml-2">&copy; Suspath, 2022. All rights reserved.</small>
        </CDBBox>
      </CDBBox>
    </CDBFooter>
  )
}

export default Footer