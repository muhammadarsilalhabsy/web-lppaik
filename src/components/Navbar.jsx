import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import profile from "../assets/haha.jpeg";
import { logoutUser, toggleTheme } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { customFetch, getImage } from "../utils";
import UserLinks from "./UserLinks";
import { useEffect, useState } from "react";

const Navbar = () => {
  // selector
  const user = useSelector((state) => state.userState.user);
  const theme = useSelector((state) => state.userState.theme);
  const [avatarImage, setAvatarImage] = useState("");
  const isDarkTheme = theme === "dracula";

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle theme
  function handleTheme() {
    dispatch(toggleTheme());
  }

  // getImage
  async function getAvatar() {
    try {
      const response = await getImage(user.avatar);
      setAvatarImage(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.avatar) {
      if (!user.avatar.startsWith("blob:")) {
        getAvatar();
      }
    }
  }, []);

  // handel loggout
  const handleLogout = async () => {
    try {
      const response = await customFetch.delete("/auth/logout", {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    navigate("/");
    dispatch(logoutUser());
  };
  return (
    <nav className="bg-base-200 shadow-xl">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            L
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <FaBarsStaggered className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content p-2 shadow bg-base-200 z-[1] mt-3 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={handleTheme}
              defaultChecked={isDarkTheme}
            />
            {/* SUN ICON*/}
            <BsSunFill className="swap-on h-5 w-5" />
            {/* MOON ICON*/}
            <BsMoonFill className="swap-off h-5 w-5" />
          </label>

          {/* Profile */}
          {user && (
            <div
              className="ml-6 avatar dropdown dropdown-bottom dropdown-end cursor-pointer"
              tabIndex={0}
            >
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user.avatar
                      ? user.avatar.startsWith("blob:")
                        ? user.avatar
                        : avatarImage
                      : profile
                  }
                  alt="profile"
                />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content p-2 shadow bg-base-200 z-[1] mt-6 rounded-box w-52"
              >
                <UserLinks />
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error hover:text-red-500 "
                  >
                    Keluar
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
