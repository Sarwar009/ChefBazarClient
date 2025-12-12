import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
const Navbar = () => {
  const { user, logOut } = useAuth();

  const navItems = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/meals">Meals</NavLink>
      {
        user && (<NavLink to="/dashboard">Dashboard</NavLink>)
      }
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-60">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <h3 className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Chef Bazaar</h3>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3 text-md">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <div className="hidden md:block px-3">
          {/* Avatar */}
          <img
            className="rounded-full w-10 h-10"
            referrerPolicy="no-referrer"
            src={user && user.photoURL ? user.photoURL : avatarImg}
            alt="profile"
            height="40"
            width="40"
          />
        </div>

        {
          user ? (
            <button onClick={logOut} className="btn btn-outline btn-sm ml-2">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm ml-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-sm ml-2">
              Register
            </Link>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
