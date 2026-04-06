import { Outlet, NavLink, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { useEffect, useState } from 'react';
import {
  Home,
  Activity,
  FileText,
  TrendingUp,
  Users,
  LogOut,
  Bell,
  ChevronRight,
  Settings,
  ClipboardList,
  Menu,
  X,
  Star,
} from 'lucide-react';
import logoImg from '../../assets/logo-baru.png';

const NAV_ITEMS = {
  parent: [
    { to: '/', label: 'Beranda', icon: Home, exact: true },
    { to: '/activities', label: 'Aktivitas', icon: Activity, exact: false },
    { to: '/reports', label: 'Laporan', icon: FileText, exact: false },
    { to: '/progress', label: 'Perkembangan', icon: TrendingUp, exact: false },
  ],
  therapist: [
    { to: '/', label: 'Beranda', icon: Home, exact: true },
    { to: '/reports', label: 'Laporan Masuk', icon: ClipboardList, exact: false },
    { to: '/progress', label: 'Perkembangan', icon: TrendingUp, exact: false },
    { to: '/activities', label: 'Aktivitas', icon: Activity, exact: false },
  ],
  admin: [
    { to: '/', label: 'Dashboard', icon: Home, exact: true },
    { to: '/reports', label: 'Laporan', icon: FileText, exact: false },
    { to: '/progress', label: 'Statistik', icon: TrendingUp, exact: false },
    { to: '/activities', label: 'Aktivitas', icon: Activity, exact: false },
  ],
};

const ROLE_LABELS: Record<string, string> = {
  parent: 'Orang Tua',
  therapist: 'Terapis',
  admin: 'Admin',
};

const ROLE_COLORS: Record<string, string> = {
  parent: 'bg-green-100 text-green-700',
  therapist: 'bg-blue-100 text-blue-700',
  admin: 'bg-purple-100 text-purple-700',
};

export function Layout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const navItems = NAV_ITEMS[user.role] || NAV_ITEMS.parent;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Komunitas Gracias" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="text-green-700" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '1rem', lineHeight: 1.2 }}>
              SAPA ABK
            </div>
            <div className="text-gray-400" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '0.65rem', lineHeight: 1 }}>
              by Komunitas Gracias
            </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 mx-3 mt-4 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 border border-green-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-white" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-gray-800 truncate" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '0.85rem' }}>
              {user.name}
            </div>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs mt-0.5 ${ROLE_COLORS[user.role]}`} style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
              {ROLE_LABELS[user.role]}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="text-gray-400 px-3 mb-2" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Menu Utama
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-green-500 text-white shadow-md shadow-green-200'
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-600'} />
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto text-white opacity-70" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={20} />
          <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F0FDF4] overflow-hidden" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-72 bg-white shadow-2xl z-10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <X size={18} className="text-gray-600" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu size={22} className="text-gray-600" />
            </button>
            <div className="lg:hidden flex items-center gap-2">
              <img src={logoImg} alt="Logo" className="w-7 h-7 rounded-full object-cover" />
              <span className="text-green-700" style={{ fontWeight: 800, fontSize: '1rem' }}>SAPA ABK</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-gray-500" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {user.role === 'parent' ? '🌟 Selamat datang, ' + user.name.split(' ')[0] + '!' : 
                 user.role === 'therapist' ? '👩‍⚕️ Panel Terapis' : 
                 '⚙️ Panel Admin'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors">
              <Bell size={20} className="text-orange-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-white" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-6">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-40">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-0 ${
                    isActive ? 'text-green-600' : 'text-gray-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-green-100' : ''}`}>
                      <item.icon size={20} className={isActive ? 'text-green-600' : 'text-gray-400'} />
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 600, lineHeight: 1 }}>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-red-400 hover:bg-red-50 transition-all"
            >
              <div className="p-1.5 rounded-lg">
                <LogOut size={20} />
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, lineHeight: 1 }}>Keluar</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
