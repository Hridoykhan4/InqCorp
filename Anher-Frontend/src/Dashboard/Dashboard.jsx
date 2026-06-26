import React from 'react'
import { Sidebar } from './SideBar/Sidebar'
import { Outlet, useOutletContext } from 'react-router'

export const Dashboard = () => {
  const data = useOutletContext()
  return (
    <div className='mx-auto flex w-full max-w-[1440px] gap-2 py-2'>
      <Sidebar />
      <main className='min-w-0 flex-1 overflow-x-hidden px-2 sm:px-3'>
        <Outlet context={data} />
      </main>
    </div>
  )
}
