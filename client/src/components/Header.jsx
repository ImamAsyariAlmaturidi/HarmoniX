import React from 'react'

const Header = ({name, image}) => {
    console.log(name, image)
  return (
    <div className='flex justify-between'>
        {name}
        <img className='rounded-full w-32' src={image} alt="" />
    </div>
  )
}

export default Header
