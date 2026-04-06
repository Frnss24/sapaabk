import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import type { UserRole } from '../context/AppContext';
import { Map, X, ChevronRight, Home, Activity, FileText, TrendingUp, LogIn, Zap } from 'lucide-react';

const PAGES = [
  { path: '/login', label: 'Login', icon: LogIn, requireAuth: false },
  { path: '/', label: 'Beranda', icon: Home, requireAuth: true },
  { path: '/activities', label: 'Aktivitas', icon: Activity, requireAuth: true },
  { path: '/reports', label: 'Laporan', icon: FileText, requireAuth: true },
  { path: '/progress', label: 'Perkembangan', icon: TrendingUp, requireAuth: true },
];

const ROLES: { key: UserRole; label: string; emoji: string; color: string }[] = [
  { key: 'parent', label: 'Orang Tua', emoji: '👨‍👩‍👧', color: 'bg-green-100 text-green-700 border-green-300' },
  { key: 'therapist', label: 'Terapis', emoji: '👩‍⚕️', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { key: 'admin', label: 'Admin', emoji: '⚙️', color: 'bg-purple-100 text-purple-700 border-purple-300' },
];

export function DemoNavigator() {
  const [open, setOpen] = useState(false);
  const { user, login, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string, requireAuth: boolean) => {
    if (requireAuth && !user) {
      // Auto-login as parent first
      const demoUser = DEMO_USERS.find(u => u.role === 'parent')!;
      login(demoUser);
    }
    navigate(path);
    setOpen(false);
  };

  const handleSwitchRole = (role: UserRole) => {
    const demoUser = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    login(demoUser);
    navigate('/');
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpen(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-24 lg:bottom-6 right-4 z-[9999] flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800,
          fontSize: '0.8rem',
          boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
        }}
        title="Demo Navigator"
      >
        {open ? <X size={18} /> : <Zap size={18} />}
        {!open && <span>Demo</span>}
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel Card */}
          <div
            className="fixed bottom-24 lg:bottom-20 right-4 z-[9999] w-72 rounded-3xl shadow-2xl overflow-hidden"
            style={{ fontFamily: 'Nunito, sans-serif', background: 'white', border: '1px solid #e5e7eb' }}
          >
            {/* Header */}
            <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <div className="flex items-center gap-2">
                <Map size={16} className="text-white/80" />
                <span className="text-white" style={{ fontWeight: 800, fontSize: '0.9rem' }}>Demo Navigator</span>
              </div>
              <p className="text-white/70 mt-0.5" style={{ fontSize: '0.7rem' }}>
                Navigasi cepat antar halaman & peran
              </p>
            </div>

            <div className="p-3 space-y-3">
              {/* Current Status */}
              {user ? (
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-white" style={{ fontSize: '0.65rem', fontWeight: 700 }}>
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-gray-700" style={{ fontWeight: 700, fontSize: '0.75rem' }}>{user.name.split(' ')[0]}</div>
                      <div className="text-gray-400" style={{ fontSize: '0.65rem' }}>{user.role === 'parent' ? 'Orang Tua' : user.role === 'therapist' ? 'Terapis' : 'Admin'}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-600 transition-colors"
                    style={{ fontSize: '0.7rem', fontWeight: 600 }}
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-amber-600" style={{ fontSize: '0.75rem', fontWeight: 700 }}>⚠ Belum login — pilih halaman untuk auto-login</span>
                </div>
              )}

              {/* Pages */}
              <div>
                <div className="text-gray-400 px-1 mb-1.5" style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Halaman
                </div>
                <div className="space-y-1">
                  {PAGES.map(page => {
                    const Icon = page.icon;
                    const isActive = location.pathname === page.path;
                    return (
                      <button
                        key={page.path}
                        onClick={() => handleNavigate(page.path, page.requireAuth)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left ${
                          isActive
                            ? 'bg-indigo-500 text-white shadow-sm'
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <Icon size={15} className={isActive ? 'text-white' : 'text-gray-400'} />
                        <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{page.label}</span>
                        {page.requireAuth && !user && (
                          <span className="ml-auto text-amber-500" style={{ fontSize: '0.6rem', fontWeight: 700 }}>AUTO LOGIN</span>
                        )}
                        {isActive && <ChevronRight size={14} className="ml-auto text-white/70" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Switch Role */}
              <div>
                <div className="text-gray-400 px-1 mb-1.5" style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Ganti Peran
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {ROLES.map(role => (
                    <button
                      key={role.key}
                      onClick={() => handleSwitchRole(role.key)}
                      className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                        user?.role === role.key
                          ? role.color + ' border-2'
                          : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{role.emoji}</span>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, lineHeight: 1.2, textAlign: 'center' }}>{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Route hint */}
              <div className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="text-indigo-400" style={{ fontSize: '0.65rem', fontWeight: 700 }}>📍 URL SAAT INI</div>
                <div className="text-indigo-600 mt-0.5" style={{ fontSize: '0.75rem', fontWeight: 800 }}>{location.pathname}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
