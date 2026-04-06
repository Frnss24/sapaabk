import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CHILD_DATA,
  SKILL_AREAS,
  MONTHLY_PROGRESS,
  ACHIEVEMENTS,
} from '../data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
} from 'recharts';
import {
  ChevronUp,
} from 'lucide-react';

const LEVEL_CONFIG = {
  Pemula: {
    color: 'from-green-400 to-green-500',
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
    emoji: '🌱',
    next: 'Menengah',
    range: '0–33%',
  },
  Menengah: {
    color: 'from-blue-400 to-blue-500',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
    emoji: '🚀',
    next: 'Mahir',
    range: '34–66%',
  },
  Mahir: {
    color: 'from-orange-400 to-orange-500',
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
    emoji: '⭐',
    next: null,
    range: '67–100%',
  },
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <p className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</p>
        <p className="text-blue-600" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <p className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</p>
        <p className="text-green-600" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{payload[0].value} poin</p>
      </div>
    );
  }
  return null;
};

export default function Progress() {
  const { user } = useApp();
  const child = CHILD_DATA;
  const levelCfg = LEVEL_CONFIG[child.level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.Menengah;
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const isTherapist = user?.role === 'therapist';

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-800" style={{ fontWeight: 900, fontSize: '1.5rem' }}>
          📈 Perkembangan Anak
        </h1>
        <p className="text-gray-500 mt-1" style={{ fontSize: '0.9rem' }}>
          {isTherapist ? 'Pantau progres semua anak dalam program terapi' : `Perkembangan ${child.name} dalam program terapi`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Level Card */}
          <div className={`bg-gradient-to-br ${levelCfg.color} rounded-3xl p-6 text-white text-center relative overflow-hidden`}>
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
            <div className="relative z-10">
              <div style={{ fontSize: '3rem' }} className="mb-2">{levelCfg.emoji}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 700 }}>Level Saat Ini</div>
              <div style={{ fontWeight: 900, fontSize: '2rem', lineHeight: 1 }} className="my-1">
                {child.level}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{levelCfg.range}</div>
              <div className="mt-4 bg-white/20 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-700"
                  style={{ width: `${child.progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between" style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                <span style={{ fontWeight: 700 }}>{child.progress}%</span>
                {levelCfg.next && (
                  <span>Menuju {levelCfg.next} →</span>
                )}
              </div>
            </div>
          </div>

          {/* Child Info */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-700 mb-3" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
              👦 Profil Anak
            </h3>
            <div className="space-y-2.5">
              {[
                { label: 'Nama', value: child.name },
                { label: 'Usia', value: `${child.age} tahun` },
                { label: 'Kondisi', value: child.diagnosis },
                { label: 'Terapis', value: child.therapist.split(',')[0] },
                { label: 'Bergabung', value: child.joinDate },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-gray-400" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.label}</span>
                  <span className="text-gray-700" style={{ fontSize: '0.82rem', fontWeight: 700 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: child.sessionsCompleted, label: 'Sesi Selesai', emoji: '✅', bg: 'bg-green-50', text: 'text-green-600' },
              { value: child.achievementCount, label: 'Pencapaian', emoji: '🏆', bg: 'bg-yellow-50', text: 'text-yellow-600' },
            ].map(stat => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
                <div style={{ fontSize: '1.3rem' }}>{stat.emoji}</div>
                <div className={stat.text} style={{ fontWeight: 900, fontSize: '1.4rem', lineHeight: 1 }}>{stat.value}</div>
                <div className="text-gray-500 mt-0.5" style={{ fontSize: '0.7rem', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Monthly Progress Chart */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800" style={{ fontWeight: 800, fontSize: '1rem' }}>
                📊 Progress 6 Bulan Terakhir
              </h3>
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                <ChevronUp size={14} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>+20 poin</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={MONTHLY_PROGRESS} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#9CA3AF', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[30, 80]} />
                <Tooltip content={<CustomLineTooltip />} />
                <ReferenceLine y={50} stroke="#E5E7EB" strokeDasharray="4 4" />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4ADE80"
                  strokeWidth={3}
                  dot={{ fill: '#4ADE80', strokeWidth: 2, r: 5, stroke: 'white' }}
                  activeDot={{ r: 7, fill: '#22C55E' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Areas */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1rem' }}>
              🎯 Area Kemampuan
            </h3>
            <div className="space-y-3">
              {SKILL_AREAS.map(skill => (
                <button
                  key={skill.name}
                  onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700" style={{ fontWeight: 700, fontSize: '0.85rem' }}>{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: skill.color }}>{skill.score}%</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        skill.score >= 70 ? 'bg-green-100 text-green-700' :
                        skill.score >= 50 ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`} style={{ fontWeight: 700 }}>
                        {skill.score >= 70 ? 'Baik' : skill.score >= 50 ? 'Berkembang' : 'Perlu Latihan'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2.5">
                    <div
                      className="rounded-full h-2.5 transition-all duration-700"
                      style={{ width: `${skill.score}%`, backgroundColor: skill.color }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800" style={{ fontWeight: 800, fontSize: '1rem' }}>
                🏆 Pencapaian
              </h3>
              <span className="text-gray-400" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                {ACHIEVEMENTS.filter(a => a.earned).length}/{ACHIEVEMENTS.length} diraih
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ACHIEVEMENTS.map(achievement => (
                <div
                  key={achievement.id}
                  className={`rounded-2xl p-3 text-center transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200'
                      : 'bg-gray-50 border-2 border-gray-100 opacity-60'
                  }`}
                >
                  <div className={`text-2xl mb-1 ${!achievement.earned ? 'grayscale' : ''}`}>
                    {achievement.earned ? achievement.emoji : '🔒'}
                  </div>
                  <p className={`${achievement.earned ? 'text-gray-800' : 'text-gray-400'}`} style={{ fontWeight: 700, fontSize: '0.7rem', lineHeight: 1.3 }}>
                    {achievement.name}
                  </p>
                  {achievement.earned && (
                    <p className="text-yellow-600 mt-0.5" style={{ fontSize: '0.6rem', fontWeight: 600 }}>
                      {achievement.date}
                    </p>
                  )}
                  {!achievement.earned && (
                    <p className="text-gray-300 mt-0.5" style={{ fontSize: '0.6rem', fontWeight: 600 }}>
                      Terkunci
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skill Bar Chart */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1rem' }}>
              📉 Perbandingan Area Kemampuan
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={SKILL_AREAS} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fontFamily: 'Nunito', fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar
                  dataKey="score"
                  radius={[0, 6, 6, 0]}
                  maxBarSize={16}
                  fill="#4ADE80"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}