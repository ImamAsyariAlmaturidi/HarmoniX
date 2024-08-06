import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
const BaseLayout = () => {
  return (
    <div>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default BaseLayout
