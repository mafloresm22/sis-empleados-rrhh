import React, { useState, useEffect } from 'react'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import { dummyProfileData } from '../assets/assets'
import {
    LayoutDashboard,
    Users,
    Clock,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Briefcase
} from 'lucide-react'

const Sidebar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(() => {
        return localStorage.getItem('sidebar-collapsed') === 'true'
    })

    useEffect(() => {
        setUserName(dummyProfileData.firstName + ' ' + dummyProfileData.lastName)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    const toggleCollapse = () => {
        setIsCollapsed(prev => {
            const next = !prev
            localStorage.setItem('sidebar-collapsed', String(next))
            return next
        })
    }

    const handleLogout = () => {
        localStorage.removeItem('role');
        window.location.href = '/login';
    }

    const role = localStorage.getItem('role') || "Empleado"

    const menuItems = [
        { name: 'Inicio', path: '/inicio', icon: LayoutDashboard },
        { name: 'Empleados', path: '/empleados', icon: Users },
        { name: 'Asistencias', path: '/asistencias', icon: Clock },
        { name: 'Nóminas', path: '/nominas', icon: CreditCard },
        { name: 'Configuración', path: '/configuracion', icon: Settings },
    ]

    const filteredMenuItems = menuItems.filter(item => {
        if (role === 'Empleado') {
            return item.name === 'Inicio' || item.name === 'Asistencias' || item.name === 'Configuración'
        }
        return true
    })

    const getInitials = () => {
        if (!userName) return 'JD'
        return userName
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
    }

    return (
        <>
            {/* Mobile Top Navbar (Floating Header) */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-4 z-30 md:hidden">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <Briefcase size={18} />
                    </div>
                    <div>
                        <span className="font-bold text-slate-900 tracking-tight text-sm">TalentFlow</span>
                        <span className="block text-[9px] text-slate-400 font-medium tracking-wider uppercase">Portal RRHH</span>
                    </div>
                </div>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-200"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Backdrop overlay for mobile drawer */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 md:hidden transition-all duration-300"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                                    fixed inset-y-0 left-0 z-40 
                                    flex flex-col bg-white/90 backdrop-blur-lg border-r border-slate-200/85
                                    transition-all duration-300 ease-in-out
                                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                                    md:translate-x-0 md:relative 
                                    ${isCollapsed ? 'md:w-20' : 'md:w-64'}
                                    w-64 h-full text-slate-600 select-none
                                `}
            >
                {/* Sidebar Header (Logo and Toggle button) */}
                <div className="relative flex items-center justify-between px-5 py-6 border-b border-slate-100">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <Briefcase size={19} />
                        </div>
                        <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed ? 'opacity-0 md:w-0' : 'opacity-100'}`}>
                            <h1 className="font-bold text-slate-900 text-base tracking-tight leading-none">
                                Talent<span className="text-blue-600">Flow</span>
                            </h1>
                            <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-1 block">Portal RRHH</span>
                        </div>
                    </div>

                    {/* Close button for mobile menu */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="md:hidden p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                    >
                        <X size={18} />
                    </button>

                    {/* Collapse toggle button for desktop */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex absolute top-7 -right-3.5 w-7 h-7 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-slate-800 shadow-sm hover:bg-slate-50 hover:scale-105 transition-all cursor-pointer z-50"
                    >
                        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
                    {filteredMenuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                  group relative flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
                  ${isActive
                                        ? 'text-blue-600 bg-blue-50/80 border-l-[3px] border-blue-600 pl-[13px] font-semibold'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                    }
                  ${isCollapsed ? 'md:justify-center md:px-0 md:pl-0 md:border-l-0 md:mx-auto md:w-12 md:h-12' : ''}
                `}
                            >
                                <Icon size={isCollapsed ? 20 : 19} className="shrink-0 transition-transform group-hover:scale-105" />

                                <span className={`transition-all duration-300 whitespace-nowrap text-sm ${isCollapsed ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>
                                    {item.name}
                                </span>

                                {/* Collapsed Mode Tooltip */}
                                {isCollapsed && (
                                    <div className="hidden md:block absolute left-16 bg-white text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg border border-slate-200/80 translate-x-2 group-hover:translate-x-0 z-50">
                                        {item.name}
                                    </div>
                                )}
                            </NavLink>
                        )
                    })}
                </nav>

                {/* User Profile / Footer Section */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/40">
                    <div
                        className={`
                                        flex items-center gap-3 p-2 rounded-xl transition-all
                                        ${isCollapsed ? 'md:flex-col md:justify-center md:gap-4' : 'justify-between'}
                                    `}
                    >
                        {/* Avatar & User Details */}
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-blue-500/10">
                                {getInitials()}
                            </div>
                            <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>
                                <h3 className="font-semibold text-slate-800 text-sm leading-tight">{userName}</h3>
                                <span className="text-[10px] text-slate-400 font-medium tracking-wide">{role}</span>
                            </div>
                        </div>

                        {/* Logout Action */}
                        <button
                            onClick={handleLogout}
                            className={`
                                        group relative p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer border border-transparent hover:border-red-200/50
                                        ${isCollapsed ? 'w-10 h-10 flex items-center justify-center mx-auto' : ''}
                                    `}
                            title="Cerrar Sesión"
                        >
                            <LogOut size={18} className="transition-transform group-hover:translate-x-0.5" />

                            {/* Collapsed Logout Tooltip */}
                            {isCollapsed && (
                                <div className="hidden md:block absolute left-16 bg-white text-red-600 text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg border border-red-100 translate-x-2 group-hover:translate-x-0 z-50">
                                    Cerrar Sesión
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar