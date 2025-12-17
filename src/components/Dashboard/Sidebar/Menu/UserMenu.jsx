import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faAward, faHeartCircleCheck, faRightFromBracket, faUserTie } from "@fortawesome/free-solid-svg-icons";
import useAuth from '../../../../hooks/useAuth';

const UserMenu = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    

    return (
        <>
            {/* Sidebar content here */}
            <ul className="menu w-full grow gap-3">
                <li className='py-4'>
                    <button 
                    onClick={()=> navigate('/')}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="chefbazar">
                        
                    <img src='./chefBazar.png' width="30px" alt="Chef Bazar"/>
                        <span className="is-drawer-close:hidden">Chef Bazar</span>
                    </button>
                </li>
                <p className='border-2 my-2'></p>
                
                {/* List item - My Orders (User Specific) */}
                <li>
                    <button
                    onClick={() => navigate("/dashboard/my-orders")}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="my orders">
                        <FontAwesomeIcon icon={faArchive} className='text-2xl' />
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
                            data-tip="favorites meals"
                          >
                            <FontAwesomeIcon icon={faHeartCircleCheck} className="text-2xl" />
                            <span className="is-drawer-close:hidden">Favorites Meals</span>
                          </button>
                        </li>
            </ul>
            {/* bottom ul */}
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
        </>
    );
}

export default UserMenu;


