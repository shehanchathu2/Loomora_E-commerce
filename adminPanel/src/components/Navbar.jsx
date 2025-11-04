import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Package, Plus, ShoppingCart, Sparkles, LogOut } from 'lucide-react';
import { MdAdminPanelSettings } from "react-icons/md";


const Navbar = ({setToken}) => {

    const location = useLocation()

    const navItem = [
        { path: '/', label: 'Dashboard', icon: Home },
        { path: '/allproduct', label: 'All Product', icon: Package },
        { path: '/addproduct', label: 'Add Product', icon: Plus },
        { path: '/order', label: 'Order', icon: ShoppingCart },
    ]

    return (
        <nav className='relative bg-gray-800 w-72 h-screen overflow-hidden'>
            
            <div className='absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl'></div>
            
            <div className='relative z-10 h-full flex flex-col'>
                <div className='px-6 py-8 mb-4'>
                    <div className='flex items-center gap-3 group cursor-pointer'>
                        <div className='relative'>
                            <div className='relative bg-gradient-to-br from-gray-500 to-gray-600 p-2.5 rounded-xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300'>
                                <MdAdminPanelSettings  className='w-6 h-6 text-white'/>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-wide'>
                                Menova
                            </h1>
                            <p className='text-xs text-slate-400 mt-0.5'>Admin Dashboard</p>
                        </div>
                    </div>
                </div>

                <div className='flex-1 px-4 py-4'>
                    <div className='flex flex-col gap-2'>
                        {navItem.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className='group relative'
                                >
                                    {/* Active indicator bar */}
                                    {isActive && (
                                        <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-r-full'></div>
                                    )}
                                    
                                    <div className={`
                                        relative flex items-center gap-3 px-5 py-3.5 rounded-xl
                                        transition-all duration-300 ease-out overflow-hidden
                                        ${isActive
                                            ? 'bg-gradient-to-r from-gray-600/20 to-gray-600/20 text-white shadow-lg border border-black-500/30'
                                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                                        }
                                    `}>
                                        {/* Hover glow effect */}
                                        <div className={`
                                            absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                        `}></div>
                                        
                                        <div className={`
                                            relative p-2 rounded-lg transition-all duration-300
                                            ${isActive 
                                                ? 'bg-gradient-to-br from-gray-500 to-gray-600 shadow-lg' 
                                                : 'bg-white/5 group-hover:bg-white/10'
                                            }
                                        `}>
                                            <Icon className='w-4 h-4' />
                                        </div>
                                        
                                        <span className='relative font-medium text-sm tracking-wide'>
                                            {item.label}
                                        </span>
                                        
                                        {/* Arrow indicator for active */}
                                        {isActive && (
                                            <div className='absolute right-4 text-blue-400'>
                                                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd' />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Logout Button */}
                <div className='px-4 py-6 mt-auto'>
                    <div className='relative group'>
                        {/* Glow effect behind button */}
                        
                        <button 
                            onClick={()=>setToken('')}
                            className='relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-gray-600 hover:to-gray-600 text-white px-5 py-4 rounded-xl font-medium shadow-lg border border-slate-600 hover:border-gray-500/50 transition-all duration-300 ease-out transform hover:scale-105 overflow-hidden'
                        >
                            {/* Animated background on hover */}
                            
                            <LogOut className='relative w-5 h-5 transition-transform group-hover:-translate-x-1' />
                            <span className='relative'>Log Out</span>
                            
                        </button>
                    </div>
                    
                    {/* Footer text */}
                    <p className='text-center text-xs text-slate-500 mt-4'>
                        © 2024 Menova Admin
                    </p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar