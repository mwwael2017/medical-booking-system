import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Stethoscope,
    Tag,
    FileText,
    Settings,
    LogOut,
    Menu,
    ShieldCheck
} from 'lucide-react';
import './Admin.css';

const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <NavLink to="/admin" className="sidebar-logo">
                    <ShieldCheck size={28} className="text-blue-500" />
                    <span>MedBook Admin</span>
                </NavLink>
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon"><LayoutDashboard size={20} /></span>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin/bookings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon"><Calendar size={20} /></span>
                    <span>Bookings</span>
                </NavLink>
                <NavLink to="/admin/doctors" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon"><Stethoscope size={20} /></span>
                    <span>Doctors</span>
                </NavLink>
                <NavLink to="/admin/specialties" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon"><Tag size={20} /></span>
                    <span>Specialties</span>
                </NavLink>
                <NavLink to="/admin/patients" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon"><Users size={20} /></span>
                    <span>Patients</span>
                </NavLink>
                <NavLink to="/admin/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon"><FileText size={20} /></span>
                    <span>Reports</span>
                </NavLink>
                <NavLink to="/admin/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon"><Settings size={20} /></span>
                    <span>Settings</span>
                </NavLink>
            </nav>
            <div className="sidebar-footer">
                <NavLink to="/" className="nav-item">
                    <span className="nav-icon"><LogOut size={20} /></span>
                    <span>Back to Site</span>
                </NavLink>
            </div>
        </aside>
    );
};

const AdminTopbar = ({ onToggleSidebar }) => {
    return (
        <header className="admin-topbar">
            <div className="topbar-left">
                <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                    <Menu size={24} color="white" />
                </button>
            </div>
            <div className="topbar-right">
                <div className="admin-profile">
                    <div className="avatar">A</div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--admin-text-main)' }} className="admin-name">Admin User</span>
                </div>
            </div>
        </header>
    );
};

const AdminLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Mock auth check
    const isAuthenticated = localStorage.getItem('adminToken');

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        }
    }, [isAuthenticated, navigate]);

    // Close sidebar when route changes on mobile
    React.useEffect(() => {
        setSidebarOpen(false);
    }, [navigate]);

    if (!isAuthenticated) return null;

    return (
        <div className="admin-layout">
            <div className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
            <div className={`admin-sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
                <AdminSidebar />
            </div>
            <div className="admin-main">
                <AdminTopbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
