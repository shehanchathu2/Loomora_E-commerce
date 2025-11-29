import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { use } from "react";
import { useEffect } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaGem } from "react-icons/fa";



const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const shop = useContext(ShopContext);
  const { navigate, token, setToken, setCartItem } = useContext(ShopContext);
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    navigate("/login");
  }
  const getCartCount = shop?.getCartCount || (() => 0);

  useEffect(() => {
    console.log(token)
  }, [])

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      {/* Content wrapper for centering */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo Section */}


        <Link to="/" className="flex items-center gap-2 group">
          <FaGem className="w-7 h-7 text-amber-500 group-hover:text-yellow-600 transition-colors" />
          <span className="text-2xl font-serif font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
            Loomora
          </span>
        </Link>



        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 font-medium text-lg font-serif text-gray-900">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 underline underline-offset-4"
                : "hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 underline underline-offset-4"
                : "hover:text-blue-600"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 underline underline-offset-4"
                : "hover:text-blue-600"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 underline underline-offset-4"
                : "hover:text-blue-600"
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-6">
          <img src={assets.search_icon} alt="search" className="w-5 cursor-pointer" />

          <div className="group relative">

            <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />

            {token &&
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 w-55">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-black rounded-md shadow">
                  <Link to="/login" className="hover:text-blue-600 font-medium">My profile</Link>
                  <Link to="/order" className="hover:text-blue-600 font-medium">Orders</Link>
                  <Link to="/login" onClick={logOut} className="hover:text-blue-600 font-medium">Logout</Link>
                </div>
              </div>
            }
          </div>





          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="cart" className="w-5" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          <img
            src={assets.menu_icon}
            onClick={() => setVisible(true)}
            className="w-5 cursor-pointer sm:hidden"
            alt="menu"
          />
        </div>
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all border h-screen ${visible ? "w-64" : "w-0"
          }`}
      >
        <div className="flex flex-col text-gray-600 cursor-pointer">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            Back
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">
            Shop
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
            About
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
