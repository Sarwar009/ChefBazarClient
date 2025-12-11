import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faRightFromBracket, faUserGear, faUserShield, faUserTie } from "@fortawesome/free-solid-svg-icons";
import Button from '../../components/Shared/Button/Button';
import useAuth from '../../hooks/useAuth';
import AdminMenu from '../../components/Dashboard/Sidebar/Menu/AdminMenu';
import UserMenu from '../../components/Dashboard/Sidebar/Menu/UserMenu';


export default function Dashboard() {
  const {user, role, logOut} = useAuth()
  const navigate = useNavigate();
  if (!user) return <p>Login to see dashboard</p>;
  if (!role) return <p>no role</p>

  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col min-h-screen">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className='w-full flex flex-col justify-center md:flex-row md:justify-between'>
        <div>
          <div className="px-4 font-bold text-3xl bg-gradient-to-r 
  from-red-500 via-purple-500 to-blue-500 
  bg-clip-text text-transparent">Dashboard</div>
      <h3 className='px-4 font-bold'>{user.displayName}</h3>
        </div>
        {
          role === 'user' && (
            <div className='md:mx-6'>
          <Button label="Become a Chef" />
        </div>
          )
        }
        {
          role === 'seller' && (
            <div className='md:mx-6'>
          <Button label="Become Admin" />
        </div>
          )
        }
      </div>
    </nav>
    {/* Page content here */}
    <main className="grow p-4 md:p-8 overflow-y-auto">
  <Outlet />  
  </main> 
  {/* Sidebar start */}
  {/* ------------------------------------------------------------------------- */}
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    {
      role ==='user' && (
        <UserMenu />
      )
    }

        {
      role === 'admin' && (
      <AdminMenu />
      )
    }

    
  </div>
</div>
  );
}

