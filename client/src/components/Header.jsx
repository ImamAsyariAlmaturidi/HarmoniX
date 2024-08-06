import React from 'react'

const Header = ({name, image}) => {
    console.log(name, image)
  return (
    <div className='flex justify-between bg-slate-500'>
        {name}
        <img src={image} alt="" />
    </div>
  )
}

export default Header
