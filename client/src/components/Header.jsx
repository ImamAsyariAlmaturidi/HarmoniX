import React from 'react'

const Header = ({ name}) => {
  return (
    <div className='flex justify-between '>
      {name}
    </div>
  )
}

export default Header
