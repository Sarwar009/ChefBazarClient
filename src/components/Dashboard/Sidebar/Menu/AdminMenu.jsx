import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArchive,
  faAward,
  faChartSimple,
  faHands,
  faHeartCircleCheck,
  faRightFromBracket,
  faUserGear,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../../hooks/useAuth';

const AdminMenu = () => {
  const {logOut} = useAuth ();

  const navigate = useNavigate ();

  return (
    <div className="flex h-screen flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full  grow gap-3">
        <li className="py-4">
          <button
            onClick={() => navigate ('/')}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="chefbazar"
          >

            <img src="./chefBazar.png" width="30px" />
            <span className="is-drawer-close:hidden">Chef Bazar</span>
          </button>
        </li>
        <p className="border-2 my-2" />
        {/* List item */}
        <li>
          <button
            onClick={() => navigate ('/dashboard')}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="statistics"
          >

            <FontAwesomeIcon icon={faChartSimple} className="text-2xl" />
            <span className="is-drawer-close:hidden">Statistics</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate ('/dashboard/my-orders')}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="my orders"
          >
            <FontAwesomeIcon icon={faArchive} className="text-2xl" />
            <span className="is-drawer-close:hidden">My Orders</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate ('/dashboard/my-review')}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="my review"
          >
            <FontAwesomeIcon icon={faAward} className="text-2xl" />
            <span className="is-drawer-close:hidden">My Review</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate ('/dashboard/favorites-meals')}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="my review"
          >
            <FontAwesomeIcon icon={faHeartCircleCheck} className="text-2xl" />
            <span className="is-drawer-close:hidden">Favorites Meals</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate ('/dashboard/request')}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="manage request"
          >

            <FontAwesomeIcon icon={faHands} className="text-2xl" />
            <span className="is-drawer-close:hidden">Manage Request</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate ('/dashboard/manage-users')}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="user management"
          >

            <FontAwesomeIcon icon={faUserGear} className="text-2xl" />
            <span className="is-drawer-close:hidden">User Management</span>
          </button>
        </li>
      </ul>
      {/* bottom ul */}
      {/* --------------------------------------------------------------------------- */}
      <ul className="menu w-full grow justify-end">
        <p className="border-2 my-6" />
        <li>
          <button
            onClick={() => navigate ('/dashboard/my-profile')}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="profile"
          >
            <FontAwesomeIcon icon={faUserTie} className="text-2xl" />

            <span className="is-drawer-close:hidden">Profile</span>
          </button>
        </li>
        <li>
          <button
            onClick={logOut}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="logout"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl" />

            <span className="is-drawer-close:hidden">Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
