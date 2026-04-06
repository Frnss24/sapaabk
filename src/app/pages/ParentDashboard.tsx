import { useState } from 'react';
import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { CHILD_DATA, WEEKLY_PROGRESS, RECENT_REPORTS, TODAY_TASKS } from '../data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  CheckCircle2,
  Circle,
  Upload,
  ChevronRight,
  Star,
  MessageCircle,
  Camera,
  Zap,
  Award,
  Calendar,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  Pemula: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', bar: 'bg-green-400' },
  Menengah: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', bar: 'bg-blue-400' },
  Mahir: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', bar: 'bg-orange-400' },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <p className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</p>
        <p className="text-green-600" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{payload[0].value} aktivitas</p>
      </div>
    );
  }
  return null;
};

export default function ParentDashboard() {
  const { user } = useApp();
  const [tasks, setTasks] = useState(TODAY_TASKS);
  const child = CHILD_DATA;
  const level = LEVEL_COLORS[child.level] || LEVEL_COLORS.Menengah;
  const completedCount = tasks.filter(t => t.done).length;
  const todayPct = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const firstName = user?.name.split(' ')[0] || 'Bunda';
  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam';

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-6xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>

      {/* Greeting Banner */}
      <div className="relative bg-gradient-to-br from-green-500 via-green-500 to-teal-500 rounded-3xl p-5 lg:p-7 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full translate-y-12" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p style={{ fontSize: '0.85rem', opacity: 0.85, fontWeight: 600 }}>{greeting},</p>
            <h1 style={{ fontWeight: 900, fontSize: '1.6rem', lineHeight: 1.2 }} className="mt-0.5 mb-1">{firstName}! 👋</h1>
            <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              {completedCount}/{tasks.length} aktivitas hari ini selesai
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 max-w-[140px] bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${todayPct}%` }}
                />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{todayPct}%</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
              {todayPct === 100 ? '🎉' : todayPct >= 60 ? '😊' : '💪'}
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.9 }}>
              {todayPct === 100 ? 'Luar Biasa!' : 'Ayo semangat!'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">

          {/* Child Profile Card */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-3xl flex-shrink-0">
                👦
              </div>
              <div className="flex-1 min-w-0">
                <h2 style={{ fontWeight: 800, fontSize: '1.1rem' }} className="text-gray-800">{child.name}</h2>
                <p className="text-gray-500" style={{ fontSize: '0.8rem' }}>{child.age} tahun • {child.diagnosis}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`px-3 py-0.5 rounded-full text-xs border ${level.bg} ${level.text} ${level.border}`} style={{ fontWeight: 700 }}>
                    Level {child.level}
                  </span>
                  <span className="text-gray-400" style={{ fontSize: '0.75rem' }}>
                    Terapis: {child.therapist.replace('Bu ', '').split(',')[0]}
                  </span>
                </div>
              </div>
              <Link to="/progress" className="p-2.5 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <TrendingUp size={20} className="text-green-600" />
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between mb-1.5">
                <span className="text-gray-600" style={{ fontSize: '0.8rem', fontWeight: 700 }}>Progress Keseluruhan</span>
                <span className="text-green-600" style={{ fontSize: '0.8rem', fontWeight: 800 }}>{child.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-teal-400 rounded-full h-3 transition-all duration-700"
                  style={{ width: `${child.progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: 'Sesi Selesai', value: child.sessionsCompleted, icon: '✅', color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Pencapaian', value: child.achievementCount, icon: '🏆', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Bergabung', value: 'Jan \'24', icon: '📅', color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map(stat => (
                <div key={stat.label} className={`${stat.bg} rounded-2xl p-3 text-center`}>
                  <div style={{ fontSize: '1.2rem' }}>{stat.icon}</div>
                  <div className={stat.color} style={{ fontWeight: 800, fontSize: '1rem' }}>{stat.value}</div>
                  <div className="text-gray-500" style={{ fontSize: '0.65rem', fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800" style={{ fontWeight: 800, fontSize: '1rem' }}>📈 Progress Minggu Ini</h3>
              <Link to="/progress" className="text-green-600 flex items-center gap-1 hover:text-green-700" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                Lihat semua <ChevronRight size={16} />
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={WEEKLY_PROGRESS} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#9CA3AF', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[0, 6]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#4ADE80"
                  strokeWidth={3}
                  fill="url(#colorCompleted)"
                  dot={{ fill: '#4ADE80', strokeWidth: 2, r: 4, stroke: 'white' }}
                  activeDot={{ r: 6, fill: '#22C55E' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/reports"
              className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-4 transition-all duration-200 shadow-lg shadow-orange-200 active:scale-[0.97]"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Upload size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Upload Laporan</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>Kirim aktivitas hari ini</div>
              </div>
            </Link>
            <Link
              to="/activities"
              className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-4 transition-all duration-200 shadow-lg shadow-blue-200 active:scale-[0.97]"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Lihat Aktivitas</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>Program harian Rizky</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Today's Tasks */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800" style={{ fontWeight: 800, fontSize: '1rem' }}>
                📋 Tugas Hari Ini
              </h3>
              <div className="flex items-center gap-1 bg-green-100 px-2.5 py-1 rounded-full">
                <span className="text-green-700" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                  {completedCount}/{tasks.length}
                </span>
              </div>
            </div>
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 text-left ${
                    task.done ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  {task.done ? (
                    <CheckCircle2 size={22} className="text-green-500 flex-shrink-0 fill-green-500" />
                  ) : (
                    <Circle size={22} className="text-gray-300 flex-shrink-0" />
                  )}
                  <span className="text-lg flex-shrink-0">{task.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`truncate ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`} style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                      {task.name}
                    </p>
                    <p className="text-gray-400" style={{ fontSize: '0.7rem' }}>{task.time}</p>
                  </div>
                </button>
              ))}
            </div>
            <Link
              to="/activities"
              className="flex items-center justify-center gap-2 mt-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl transition-all duration-200"
              style={{ fontWeight: 700, fontSize: '0.85rem' }}
            >
              <Camera size={16} />
              Upload Laporan Aktivitas
            </Link>
          </div>

          {/* Recent Feedback */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800" style={{ fontWeight: 800, fontSize: '1rem' }}>
                💬 Feedback Terapis
              </h3>
              <Link to="/reports" className="text-green-600 hover:text-green-700" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                Lihat semua
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT_REPORTS.filter(r => r.feedback && r.childName === 'Rizky Ramadhan').slice(0, 2).map((report) => (
                <div key={report.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-white" style={{ fontWeight: 700, fontSize: '0.7rem' }}>
                      DR
                    </div>
                    <div>
                      <p className="text-blue-700" style={{ fontWeight: 700, fontSize: '0.75rem' }}>Bu Dewi Rahayu</p>
                      <p className="text-blue-400" style={{ fontSize: '0.65rem' }}>{report.activityName} • {report.feedbackDate}</p>
                    </div>
                    <div className="ml-auto flex">
                      {Array.from({ length: report.rating || 0 }).map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-blue-800" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                    "{report.feedback}"
                  </p>
                </div>
              ))}
              {RECENT_REPORTS.filter(r => r.status === 'pending' && r.childName === 'Rizky Ramadhan').length > 0 && (
                <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100 flex items-center gap-3">
                  <MessageCircle size={18} className="text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="text-orange-700" style={{ fontWeight: 700, fontSize: '0.8rem' }}>Menunggu Feedback</p>
                    <p className="text-orange-500" style={{ fontSize: '0.7rem' }}>Laporan sedang diproses terapis</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Achievement Teaser */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Pencapaian</span>
              </div>
              <Link to="/progress" className="text-white/80 hover:text-white" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                Lihat semua →
              </Link>
            </div>
            <div className="flex gap-2">
              {['⭐', '🔥', '🍽️', '🦸', '🏆'].map((emoji, i) => (
                <div key={i} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">
                  {emoji}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '8px', fontWeight: 600 }}>
              🌟 {child.achievementCount} pencapaian diraih! Keren sekali!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
