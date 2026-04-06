import { useState } from 'react';
import { Link } from 'react-router';
import { CHILDREN_LIST, RECENT_REPORTS, WEEKLY_PROGRESS } from '../data/mockData';
import {
  Users,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  Clock,
  MessageCircle,
  Star,
  ChevronRight,
  FileText,
  Send,
  X,
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
} from 'recharts';

const pendingReports = RECENT_REPORTS.filter(r => r.status === 'pending');
const reviewedToday = RECENT_REPORTS.filter(r => r.status === 'reviewed').length;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <p className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</p>
        <p className="text-blue-600" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{payload[0].value} aktivitas</p>
      </div>
    );
  }
  return null;
};

export default function TherapistDashboard() {
  const [feedbackModal, setFeedbackModal] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'children'>('overview');

  const handleSendFeedback = (reportId: string) => {
    setFeedbackSent(prev => new Set(prev).add(reportId));
    setFeedbackModal(null);
    setFeedbackText('');
    setFeedbackRating(0);
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-5 lg:p-7 text-white mb-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-12 left-1/3 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 600 }}>Panel Terapis</p>
            <h1 style={{ fontWeight: 900, fontSize: '1.5rem' }} className="mt-0.5 mb-1">
              👩‍⚕️ Dyah Miyura Sari, S.Tr. Kes
            </h1>
            <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>Terapi Okupasi • {CHILDREN_LIST.length} anak aktif</p>
          </div>
          <div className="flex gap-3 text-center">
            <div className="bg-white/15 rounded-2xl px-4 py-3">
              <div style={{ fontWeight: 900, fontSize: '1.5rem' }}>{pendingReports.length}</div>
              <div style={{ fontSize: '0.65rem', opacity: 0.8, fontWeight: 600 }}>Menunggu</div>
            </div>
            <div className="bg-white/15 rounded-2xl px-4 py-3">
              <div style={{ fontWeight: 900, fontSize: '1.5rem' }}>{reviewedToday}</div>
              <div style={{ fontSize: '0.65rem', opacity: 0.8, fontWeight: 600 }}>Diulas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-2xl">
        {[
          { key: 'overview', label: '📊 Ringkasan', icon: BarChart2 },
          { key: 'reports', label: `📋 Laporan (${pendingReports.length})`, icon: ClipboardList },
          { key: 'children', label: '👶 Data Anak', icon: Users },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ fontWeight: 700, fontSize: '0.8rem' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Anak', value: CHILDREN_LIST.length, emoji: '👶', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
              { label: 'Laporan Masuk', value: RECENT_REPORTS.length, emoji: '📋', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
              { label: 'Pending Review', value: pendingReports.length, emoji: '⏳', bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100' },
              { label: 'Sudah Diulas', value: reviewedToday, emoji: '✅', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
            ].map(stat => (
              <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-2xl p-4`}>
                <div style={{ fontSize: '1.5rem' }}>{stat.emoji}</div>
                <div className={stat.text} style={{ fontWeight: 900, fontSize: '1.6rem', lineHeight: 1 }}>{stat.value}</div>
                <div className="text-gray-500 mt-0.5" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Activity Chart */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1rem' }}>
              📈 Aktivitas Mingguan (Semua Anak)
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={WEEKLY_PROGRESS} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#9CA3AF', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Nunito', fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completed" fill="#60A5FA" radius={[6, 6, 0, 0]} maxBarSize={40} />
                <Bar dataKey="target" fill="#DBEAFE" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2 justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Selesai</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-100" />
                <span className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Target</span>
              </div>
            </div>
          </div>

          {/* Children Progress Overview */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1rem' }}>
              👶 Progress Anak-anak
            </h3>
            <div className="space-y-3">
              {CHILDREN_LIST.map(child => (
                <div key={child.id} className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${child.avatarBg} rounded-xl flex items-center justify-center text-white flex-shrink-0`} style={{ fontWeight: 800, fontSize: '0.75rem' }}>
                    {child.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-800 truncate" style={{ fontWeight: 700, fontSize: '0.85rem' }}>{child.name}</span>
                      <span className="text-gray-500 ml-2 flex-shrink-0" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{child.progress}%</span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-2">
                      <div
                        className={`${child.avatarBg} rounded-full h-2 transition-all duration-700`}
                        style={{ width: `${child.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${child.colorClass}`} style={{ fontWeight: 700 }}>
                    {child.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {/* Pending Reports */}
          {pendingReports.length > 0 && (
            <div>
              <h3 className="text-gray-700 mb-3" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                ⏳ Menunggu Feedback ({pendingReports.length})
              </h3>
              <div className="space-y-3">
                {pendingReports.map(report => (
                  <div key={report.id} className={`bg-white rounded-3xl p-5 shadow-sm border ${feedbackSent.has(report.id) ? 'border-green-200' : 'border-orange-100'}`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="text-gray-800" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                          {report.activityName}
                        </h4>
                        <p className="text-gray-500 mt-0.5" style={{ fontSize: '0.75rem' }}>
                          👤 {report.parentName} ({report.childName}) • {report.date}
                        </p>
                      </div>
                      {feedbackSent.has(report.id) ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs flex-shrink-0" style={{ fontWeight: 700 }}>
                          <CheckCircle2 size={12} />
                          Terkirim
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs flex-shrink-0" style={{ fontWeight: 700 }}>
                          <Clock size={12} />
                          Pending
                        </span>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-3 mb-3">
                      <p className="text-gray-600" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                        "{report.notes}"
                      </p>
                    </div>
                    {!feedbackSent.has(report.id) ? (
                      <button
                        onClick={() => setFeedbackModal(report.id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                        style={{ fontWeight: 700, fontSize: '0.85rem' }}
                      >
                        <MessageCircle size={16} />
                        Berikan Feedback
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        <CheckCircle2 size={16} />
                        Feedback telah dikirim
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviewed Reports */}
          <div>
            <h3 className="text-gray-700 mb-3" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
              ✅ Sudah Diulas
            </h3>
            <div className="space-y-3">
              {RECENT_REPORTS.filter(r => r.status === 'reviewed').map(report => (
                <div key={report.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-700" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      {report.activityName}
                    </h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className={i < (report.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400" style={{ fontSize: '0.75rem' }}>
                    👤 {report.parentName} ({report.childName}) • {report.date}
                  </p>
                  {report.feedback && (
                    <div className="bg-blue-50 rounded-xl p-3 mt-3">
                      <p className="text-blue-700" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                        💬 "{report.feedback}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Children Tab */}
      {activeTab === 'children' && (
        <div className="space-y-4">
          {CHILDREN_LIST.map(child => (
            <div key={child.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${child.avatarBg} rounded-2xl flex items-center justify-center text-white flex-shrink-0`} style={{ fontWeight: 900, fontSize: '1.1rem' }}>
                  {child.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-800" style={{ fontWeight: 800, fontSize: '1rem' }}>{child.name}</h3>
                  <p className="text-gray-500" style={{ fontSize: '0.8rem' }}>
                    {child.age} tahun • {child.diagnosis}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${child.colorClass}`} style={{ fontWeight: 700 }}>
                      {child.level}
                    </span>
                    <span className="text-gray-400" style={{ fontSize: '0.72rem' }}>
                      Orang tua: {child.parentName}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-gray-800" style={{ fontWeight: 900, fontSize: '1.2rem' }}>{child.progress}%</div>
                  <div className="text-gray-400" style={{ fontSize: '0.7rem', fontWeight: 600 }}>progress</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`${child.avatarBg} rounded-full h-2.5 transition-all duration-700`}
                    style={{ width: `${child.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-400" style={{ fontSize: '0.75rem' }}>
                  Aktivitas terakhir: {child.lastActivity}
                </span>
                <Link
                  to="/progress"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                  style={{ fontSize: '0.8rem', fontWeight: 700 }}
                >
                  Detail <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-gray-800" style={{ fontWeight: 800, fontSize: '1.05rem' }}>💬 Berikan Feedback</h3>
              <button onClick={() => setFeedbackModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Rating Perkembangan:
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFeedbackRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={star <= feedbackRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback text */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Pesan untuk Orang Tua:
              </label>
              <textarea
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                rows={4}
                placeholder="Berikan feedback yang positif dan konstruktif... Ceritakan perkembangan anak dan saran untuk kegiatan selanjutnya."
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-400 focus:outline-none resize-none text-gray-700"
                style={{ fontSize: '0.875rem', fontFamily: 'Nunito, sans-serif', lineHeight: 1.6 }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setFeedbackModal(null)}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                style={{ fontWeight: 700 }}
              >
                Batal
              </button>
              <button
                onClick={() => handleSendFeedback(feedbackModal)}
                className="flex-1 py-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                style={{ fontWeight: 700 }}
              >
                <Send size={16} />
                Kirim Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
