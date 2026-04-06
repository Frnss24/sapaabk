import { useState } from 'react';
import { CHILDREN_LIST, RECENT_REPORTS, ADMIN_STATS } from '../data/mockData';
import {
  Users,
  FileText,
  TrendingUp,
  Activity,
  Settings,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  BarChart2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const DIAGNOSIS_DATA = [
  { name: 'Autisme', value: 32, color: '#60A5FA' },
  { name: 'ADHD', value: 18, color: '#4ADE80' },
  { name: 'Dyspraxia', value: 8, color: '#F97316' },
  { name: 'Down Syndrome', value: 6, color: '#A855F7' },
];

const MONTHLY_USERS = [
  { month: 'Jan', users: 48 },
  { month: 'Feb', users: 55 },
  { month: 'Mar', users: 72 },
  { month: 'Apr', users: 80 },
  { month: 'Mei', users: 95 },
  { month: 'Jun', users: 128 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <p className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</p>
        <p className="text-purple-600" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{payload[0].value} pengguna</p>
      </div>
    );
  }
  return null;
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'reports'>('dashboard');

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-5 lg:p-7 text-white mb-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-12 left-1/4 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 600 }}>Panel Administrator</p>
            <h1 style={{ fontWeight: 900, fontSize: '1.5rem' }} className="mt-0.5 mb-1">
              ⚙️ Dashboard Admin
            </h1>
            <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>Platform SAPA ABK • Komunitas Gracias</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/15 rounded-2xl px-3 py-2">
              <div style={{ fontWeight: 900, fontSize: '1.3rem' }}>{ADMIN_STATS.totalUsers}</div>
              <div style={{ fontSize: '0.6rem', opacity: 0.8, fontWeight: 600 }}>Pengguna</div>
            </div>
            <div className="bg-white/15 rounded-2xl px-3 py-2">
              <div style={{ fontWeight: 900, fontSize: '1.3rem' }}>{ADMIN_STATS.totalChildren}</div>
              <div style={{ fontSize: '0.6rem', opacity: 0.8, fontWeight: 600 }}>Anak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-2xl">
        {[
          { key: 'dashboard', label: '📊 Ringkasan' },
          { key: 'users', label: '👥 Pengguna' },
          { key: 'reports', label: '📋 Laporan' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ fontWeight: 700, fontSize: '0.8rem' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-5">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Total Pengguna', value: ADMIN_STATS.totalUsers, emoji: '👥', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
              { label: 'Total Anak', value: ADMIN_STATS.totalChildren, emoji: '👶', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
              { label: 'Terapis Aktif', value: ADMIN_STATS.totalTherapists, emoji: '👩‍⚕️', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
              { label: 'Orang Tua', value: ADMIN_STATS.totalParents, emoji: '👨‍👩‍👧', bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100' },
              { label: 'Laporan/Bulan', value: ADMIN_STATS.reportsThisMonth, emoji: '📋', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
              { label: 'Aktif Minggu Ini', value: ADMIN_STATS.activeThisWeek, emoji: '⚡', bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100' },
            ].map(stat => (
              <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-2xl p-4`}>
                <div style={{ fontSize: '1.5rem' }}>{stat.emoji}</div>
                <div className={stat.text} style={{ fontWeight: 900, fontSize: '1.6rem', lineHeight: 1 }}>{stat.value}</div>
                <div className="text-gray-500 mt-0.5" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* User Growth Chart */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1rem' }}>
                📈 Pertumbuhan Pengguna
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={MONTHLY_USERS} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#9CA3AF', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="users" fill="#A78BFA" radius={[6, 6, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Diagnosis Breakdown */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1rem' }}>
                🏥 Diagnosis Anak
              </h3>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={DIAGNOSIS_DATA}
                      cx={55}
                      cy={55}
                      innerRadius={30}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {DIAGNOSIS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {DIAGNOSIS_DATA.map(d => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-gray-600" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{d.name}</span>
                      </div>
                      <span className="text-gray-800" style={{ fontSize: '0.8rem', fontWeight: 800 }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1rem' }}>
              🕒 Aktivitas Terbaru
            </h3>
            <div className="space-y-3">
              {[
                { text: 'Sari Dewanti mengirim laporan "Makan Mandiri"', time: '12 menit lalu', type: 'report', color: 'bg-orange-100 text-orange-600' },
                { text: 'Bu Dewi memberikan feedback untuk Rizky', time: '1 jam lalu', type: 'feedback', color: 'bg-blue-100 text-blue-600' },
                { text: 'Ahmad Fauzi mendaftar sebagai orang tua baru', time: '3 jam lalu', type: 'user', color: 'bg-green-100 text-green-600' },
                { text: 'Putri Amelia naik ke level Pemula', time: '5 jam lalu', type: 'level', color: 'bg-purple-100 text-purple-600' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                    {activity.type === 'report' && <FileText size={14} />}
                    {activity.type === 'feedback' && <CheckCircle2 size={14} />}
                    {activity.type === 'user' && <UserPlus size={14} />}
                    {activity.type === 'level' && <TrendingUp size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{activity.text}</p>
                    <p className="text-gray-400" style={{ fontSize: '0.72rem' }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-700" style={{ fontWeight: 800, fontSize: '1rem' }}>
              Daftar Pengguna ({ADMIN_STATS.totalUsers})
            </h2>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-colors" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
              <UserPlus size={16} />
              Tambah Pengguna
            </button>
          </div>

          {/* User Segments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
            {[
              { label: 'Orang Tua', count: ADMIN_STATS.totalParents, color: 'bg-green-50 border-green-200', text: 'text-green-700', emoji: '👨‍👩‍👧' },
              { label: 'Terapis', count: ADMIN_STATS.totalTherapists, color: 'bg-blue-50 border-blue-200', text: 'text-blue-700', emoji: '👩‍⚕️' },
              { label: 'Admin', count: 2, color: 'bg-purple-50 border-purple-200', text: 'text-purple-700', emoji: '⚙️' },
            ].map(seg => (
              <div key={seg.label} className={`${seg.color} border rounded-2xl p-4 text-center`}>
                <div style={{ fontSize: '1.5rem' }}>{seg.emoji}</div>
                <div className={seg.text} style={{ fontWeight: 900, fontSize: '1.4rem' }}>{seg.count}</div>
                <div className="text-gray-500" style={{ fontSize: '0.78rem', fontWeight: 600 }}>{seg.label}</div>
              </div>
            ))}
          </div>

          {/* Children List */}
          {CHILDREN_LIST.map(child => (
            <div key={child.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-12 h-12 ${child.avatarBg} rounded-xl flex items-center justify-center text-white flex-shrink-0`} style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                {child.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-800" style={{ fontWeight: 800, fontSize: '0.9rem' }}>{child.name}</h4>
                <p className="text-gray-400" style={{ fontSize: '0.75rem' }}>{child.age} tahun • {child.diagnosis} • {child.parentName}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs ${child.colorClass}`} style={{ fontWeight: 700 }}>
                  {child.level}
                </span>
                <div className="text-gray-500 mt-1" style={{ fontSize: '0.7rem', fontWeight: 600 }}>{child.progress}%</div>
              </div>
              <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <h2 className="text-gray-700" style={{ fontWeight: 800, fontSize: '1rem' }}>
            Semua Laporan ({RECENT_REPORTS.length})
          </h2>
          {RECENT_REPORTS.map(report => (
            <div key={report.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-800" style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                    {report.activityName}
                  </h4>
                  <p className="text-gray-400" style={{ fontSize: '0.75rem' }}>
                    {report.parentName} ({report.childName}) • {report.date}
                  </p>
                  <p className="text-gray-600 mt-2 line-clamp-2" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                    "{report.notes}"
                  </p>
                </div>
                <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs ${
                  report.status === 'reviewed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`} style={{ fontWeight: 700 }}>
                  {report.status === 'reviewed' ? '✅ Diulas' : '⏳ Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
