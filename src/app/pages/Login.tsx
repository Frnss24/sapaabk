import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import { Eye, EyeOff, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import logoImg from '../../assets/logo-baru.png';
import type { UserRole } from '../context/AppContext';

const ROLES: { key: UserRole; label: string; emoji: string; desc: string; color: string; activeBg: string; activeText: string; activeBorder: string }[] = [
  {
    key: 'parent',
    label: 'Orang Tua',
    emoji: '👨‍👩‍👧',
    desc: 'Pantau perkembangan anak',
    color: 'border-gray-200 hover:border-green-300',
    activeBg: 'bg-green-50',
    activeText: 'text-green-700',
    activeBorder: 'border-green-400',
  },
  {
    key: 'therapist',
    label: 'Terapis',
    emoji: '👩‍⚕️',
    desc: 'Kelola sesi terapi',
    color: 'border-gray-200 hover:border-blue-300',
    activeBg: 'bg-blue-50',
    activeText: 'text-blue-700',
    activeBorder: 'border-blue-400',
  },
  {
    key: 'admin',
    label: 'Admin',
    emoji: '⚙️',
    desc: 'Kelola platform',
    color: 'border-gray-200 hover:border-purple-300',
    activeBg: 'bg-purple-50',
    activeText: 'text-purple-700',
    activeBorder: 'border-purple-400',
  },
];

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('parent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user = DEMO_USERS.find(u => u.role === selectedRole) || DEMO_USERS[0];
    login({ ...user, name: isRegister && name ? name : user.name });
    navigate('/');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <div className="w-full max-w-5xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">

        {/* Left Panel - Branding */}
        <div className="hidden lg:flex flex-col w-2/5 bg-gradient-to-br from-green-500 to-teal-500 p-10 text-white relative overflow-hidden">
          {/* Background circles */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 -left-10 w-32 h-32 bg-white/5 rounded-full" />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center p-1">
                <img src={logoImg} alt="Komunitas Gracias" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1 }}>SAPA ABK</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>by Komunitas Gracias</div>
              </div>
            </div>

            {/* Main heading */}
            <h1 style={{ fontWeight: 900, fontSize: '2rem', lineHeight: 1.3 }} className="mb-4">
              We Serve ,<br />The Community 💪
            </h1>
            <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.7 }} className="mb-8">
              Platform pendampingan terapi okupasi untuk anak berkebutuhan khusus. Bersama lebih mudah, bersama lebih bermakna.
            </p>

            {/* Feature points */}
            <div className="space-y-3">
              {[
                '📊 Pantau perkembangan anak setiap hari',
                '✅ Checklist aktivitas yang mudah digunakan',
                '💬 Komunikasi langsung dengan terapis',
                '🏆 Sistem pencapaian yang memotivasi',
              ].map((text) => (
                <div key={text} className="flex items-start gap-2" style={{ fontSize: '0.85rem', opacity: 0.95 }}>
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-white/80" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom illustration */}
          <div className="relative z-10 mt-auto flex items-center gap-2 bg-white/10 rounded-2xl p-4">
            <Heart size={18} className="text-red-300 fill-red-300 flex-shrink-0" />
            <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>
              "Setiap langkah kecil adalah kemajuan besar bagi anak spesial kita."
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <img src={logoImg} alt="Logo" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="text-green-700" style={{ fontWeight: 900, fontSize: '1.3rem', lineHeight: 1 }}>SAPA ABK</div>
              <div className="text-gray-400" style={{ fontSize: '0.7rem' }}>by Komunitas Gracias</div>
            </div>
          </div>

          <h2 className="text-gray-800 mb-1" style={{ fontWeight: 800, fontSize: '1.6rem' }}>
            {isRegister ? '👋 Buat Akun Baru' : '👋 Selamat Datang!'}
          </h2>
          <p className="text-gray-500 mb-6" style={{ fontSize: '0.9rem' }}>
            {isRegister ? 'Daftar untuk mulai memantau perkembangan anak.' : 'Masuk untuk melanjutkan perjalanan bersama.'}
          </p>

          {/* Demo badge */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
            <span className="text-amber-600" style={{ fontSize: '0.85rem', fontWeight: 700 }}>🎯 Mode Demo</span>
            <span className="text-amber-600/80" style={{ fontSize: '0.8rem' }}>— Pilih peran dan tekan masuk untuk mencoba</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="text-gray-700 mb-2 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Masuk sebagai:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {ROLES.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => setSelectedRole(role.key)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 ${
                      selectedRole === role.key
                        ? `${role.activeBg} ${role.activeBorder} ${role.activeText}`
                        : `bg-gray-50 ${role.color} text-gray-500 hover:bg-gray-100`
                    }`}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{role.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>{role.label}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.7, textAlign: 'center', lineHeight: 1.2 }}>{role.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name field (register only) */}
            {isRegister && (
              <div>
                <label className="text-gray-700 mb-1.5 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors bg-gray-50"
                  style={{ fontSize: '0.95rem' }}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-gray-700 mb-1.5 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors bg-gray-50"
                style={{ fontSize: '0.95rem' }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 mb-1.5 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Kata sandi Anda"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors bg-gray-50 pr-12"
                  style={{ fontSize: '0.95rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white flex items-center justify-center gap-2 hover:from-green-600 hover:to-teal-600 transition-all duration-200 shadow-lg shadow-green-200 active:scale-[0.98] disabled:opacity-70 mt-2"
              style={{ fontWeight: 800, fontSize: '1rem' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isRegister ? 'Daftar Sekarang' : 'Masuk'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Toggle Register/Login */}
            <div className="text-center pt-1">
              <span className="text-gray-500" style={{ fontSize: '0.875rem' }}>
                {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
              </span>
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-green-600 hover:text-green-700 transition-colors"
                style={{ fontWeight: 700, fontSize: '0.875rem' }}
              >
                {isRegister ? 'Masuk di sini' : 'Daftar gratis'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
