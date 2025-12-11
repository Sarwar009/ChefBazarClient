import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faRightFromBracket, faUserGear, faUserShield, faUserTie } from "@fortawesome/free-solid-svg-icons";
import useAuth from '../../../../hooks/useAuth';
import Button from '../../../Shared/Button/Button';


export default function AdminMenu() {
  const {user, role, logOut} = useAuth()
  
  const navigate = useNavigate();
  console.log(role);
  

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
      role === 'admin' && (
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-64">
    
      {/* Sidebar content here */}
      <ul className="menu w-full grow gap-3">
        <li className='py-4'>
          <button 
          onClick={()=> navigate('/')}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="chefbazar">
            
      <img src='./chefBazar.png' width="30px"/>
            <span className="is-drawer-close:hidden">Chef Bazar</span>
          </button>
        </li>
        <p className='border-2 my-2'></p>
        {/* List item */}
        <li>
          <button 
          onClick={()=> navigate("/dashboard")}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="statistics">
          
            <FontAwesomeIcon icon={faChartSimple} className='text-2xl' />
            <span className="is-drawer-close:hidden">Statistics</span>
          </button>
        </li>
        <li>
          <button 
          onClick={()=> navigate("/dashboard/admin/request")}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="manage request">
          
            <FontAwesomeIcon icon={faUserShield} className='text-2xl' />
            <span className="is-drawer-close:hidden">Manage Request</span>
          </button>
        </li>
        <li>
          <button 
          onClick={()=> navigate('/dashboard/admin/users')}className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="user management">
          
            <FontAwesomeIcon icon={faUserGear} className='text-2xl' />
            <span className="is-drawer-close:hidden">User Management</span>
          </button>
        </li>
      </ul>
      {/* bottom ul */}
      {/* --------------------------------------------------------------------------- */}
      <ul className='menu w-full grow justify-end'>
        <p className='border-2 my-6'></p>
        <li>
          <button 
          onClick={() => navigate('/dashboard/my-profile')}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="profile">
            <FontAwesomeIcon icon={faUserTie} className='text-2xl' />

            <span className="is-drawer-close:hidden">Profile</span>
          </button> 
        </li>
        <li>
          <button 
          onClick={logOut}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="logout">
            <FontAwesomeIcon icon={faRightFromBracket} className='text-2xl'/>

            <span className="is-drawer-close:hidden">Log Out</span>
          </button> 
        </li>
      </ul>
    </div>
      )
    }

    {/* --------------------------------------------------------------------------------- */}
    {/* ----------------------------------------------------------------------------------- */}
    {/* 00000000000000000000000000000000000000000000000000000000000000000000000000000000000 */}

    {
      role ==='user' && (
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-64">
    
      {/* Sidebar content here */}
      <ul className="menu w-full grow gap-3">
        <li className='py-4'>
          <button 
          onClick={()=> navigate('/')}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="chefbazar">
            
      <img src='./chefBazar.png' width="30px"/>
            <span className="is-drawer-close:hidden">Chef Bazar</span>
          </button>
        </li>
        <p className='border-2 my-2'></p>
        {/* List item */}
        <li>
          <button 
          onClick={()=> navigate("/dashboard")}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="statistics">
          
            <FontAwesomeIcon icon={faChartSimple} className='text-2xl' />
            <span className="is-drawer-close:hidden">Statistics</span>
          </button>
        </li>
        <li>
          <button 
          onClick={()=> navigate("/dashboard/admin/request")}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="manage request">
          
            <FontAwesomeIcon icon={faUserShield} className='text-2xl' />
            <span className="is-drawer-close:hidden">Manage Request</span>
          </button>
        </li>
        <li>
          <button 
          onClick={()=> navigate('/dashboard/admin/users')}className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="user management">
          
            <FontAwesomeIcon icon={faUserGear} className='text-2xl' />
            <span className="is-drawer-close:hidden">User Management</span>
          </button>
        </li>
      </ul>
      {/* bottom ul */}
      {/* --------------------------------------------------------------------------- */}
      <ul className='menu w-full grow justify-end'>
        <p className='border-2 my-6'></p>
        <li>
          <button 
          onClick={() => navigate('/dashboard/my-profile')}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="profile">
            <FontAwesomeIcon icon={faUserTie} className='text-2xl' />

            <span className="is-drawer-close:hidden">Profile</span>
          </button> 
        </li>
        <li>
          <button 
          onClick={logOut}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="logout">
            <FontAwesomeIcon icon={faRightFromBracket} className='text-2xl'/>

            <span className="is-drawer-close:hidden">Log Out</span>
          </button> 
        </li>
      </ul>
    </div>
      )
    }
  </div>
</div>
  );
}

