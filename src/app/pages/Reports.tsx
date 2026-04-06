import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RECENT_REPORTS, ACTIVITIES } from '../data/mockData';
import {
  Upload,
  CheckCircle2,
  Clock,
  MessageCircle,
  Camera,
  Star,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  X,
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  reviewed: {
    label: 'Sudah Diulas',
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: <CheckCircle2 size={14} />,
  },
  pending: {
    label: 'Menunggu Ulasan',
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    icon: <Clock size={14} />,
  },
};

export default function Reports() {
  const { user } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  const isParent = user?.role === 'parent';
  const reports = isParent
    ? RECENT_REPORTS.filter(r => r.parentName === 'Sari Dewanti')
    : RECENT_REPORTS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setSelectedActivity('');
      setNotes('');
      setHasFile(false);
    }, 3000);
  };

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-gray-800" style={{ fontWeight: 900, fontSize: '1.5rem' }}>
            {isParent ? '📤 Laporan Saya' : '📋 Laporan Masuk'}
          </h1>
          <p className="text-gray-500 mt-1" style={{ fontSize: '0.9rem' }}>
            {isParent
              ? 'Kirim laporan aktivitas dan lihat feedback dari terapis'
              : 'Laporan aktivitas dari orang tua yang perlu ditinjau'}
          </p>
        </div>
        {isParent && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-md shadow-orange-200 flex-shrink-0"
            style={{ fontWeight: 700, fontSize: '0.85rem' }}
          >
            <Upload size={18} />
            <span className="hidden sm:inline">Kirim Laporan</span>
            <span className="sm:hidden">+</span>
          </button>
        )}
      </div>

      {/* Upload Form */}
      {showForm && !submitted && isParent && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-800" style={{ fontWeight: 800, fontSize: '1.05rem' }}>
              📋 Kirim Laporan Baru
            </h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Activity Select */}
            <div>
              <label className="text-gray-700 mb-2 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Aktivitas yang Dilakukan *
              </label>
              <div className="relative">
                <select
                  value={selectedActivity}
                  onChange={e => setSelectedActivity(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-orange-400 focus:outline-none appearance-none text-gray-700"
                  style={{ fontSize: '0.9rem', fontFamily: 'Nunito, sans-serif' }}
                >
                  <option value="">Pilih aktivitas...</option>
                  {ACTIVITIES.map(a => (
                    <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="text-gray-700 mb-2 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Foto / Video (Opsional)
              </label>
              <div
                onClick={() => setHasFile(!hasFile)}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  hasFile ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                }`}
              >
                {hasFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <ImageIcon size={24} className="text-orange-500" />
                    <div className="text-left">
                      <p className="text-orange-700" style={{ fontWeight: 700, fontSize: '0.9rem' }}>foto_aktivitas.jpg</p>
                      <p className="text-orange-400" style={{ fontSize: '0.75rem' }}>2.4 MB • Siap dikirim</p>
                    </div>
                    <CheckCircle2 size={20} className="text-green-500 ml-auto" />
                  </div>
                ) : (
                  <>
                    <Camera size={28} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-gray-500" style={{ fontWeight: 700, fontSize: '0.875rem' }}>Klik untuk pilih foto atau video</p>
                    <p className="text-gray-400 mt-1" style={{ fontSize: '0.75rem' }}>Foto akan membantu terapis memberikan feedback yang lebih baik</p>
                  </>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-gray-700 mb-2 block" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Catatan & Cerita *
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                required
                rows={4}
                placeholder="Ceritakan bagaimana aktivitas berlangsung hari ini... 
• Apakah anak bisa melakukan sendiri?
• Ada kesulitan di langkah mana?
• Bagaimana suasana hati anak?"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-orange-400 focus:outline-none resize-none text-gray-700"
                style={{ fontSize: '0.875rem', fontFamily: 'Nunito, sans-serif', lineHeight: 1.6 }}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                style={{ fontWeight: 700 }}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 transition-all shadow-md shadow-orange-200 flex items-center justify-center gap-2"
                style={{ fontWeight: 800 }}
              >
                <Upload size={18} />
                Kirim Laporan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success State */}
      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mb-5 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-green-700" style={{ fontWeight: 800, fontSize: '1rem' }}>Laporan berhasil dikirim!</p>
          <p className="text-green-600 mt-1" style={{ fontSize: '0.85rem' }}>Terapis akan memberikan feedback dalam 1x24 jam</p>
        </div>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        <h2 className="text-gray-700" style={{ fontWeight: 800, fontSize: '1rem' }}>
          {isParent ? '📁 Riwayat Laporan' : `📁 ${reports.length} Laporan Masuk`}
        </h2>
        {reports.map((report) => {
          const status = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
          return (
            <div key={report.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-gray-800 truncate" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                      {report.activityName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      {!isParent && (
                        <span className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                          👤 {report.parentName} ({report.childName})
                        </span>
                      )}
                      <span className="text-gray-400" style={{ fontSize: '0.75rem' }}>
                        📅 {report.date} • {report.time}
                      </span>
                      {report.hasMedia && (
                        <span className="flex items-center gap-1 text-blue-500" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                          <Camera size={12} />
                          Ada foto
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs flex-shrink-0 ${status.bg} ${status.text}`} style={{ fontWeight: 700 }}>
                  {status.icon}
                  {status.label}
                </span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-3 mb-3">
                <p className="text-gray-600" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  "{report.notes}"
                </p>
              </div>

              {/* Feedback */}
              {report.feedback ? (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center text-white" style={{ fontSize: '0.65rem', fontWeight: 800 }}>
                      DR
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-700" style={{ fontWeight: 700, fontSize: '0.8rem' }}>Bu Dewi Rahayu</p>
                      <p className="text-blue-400" style={{ fontSize: '0.65rem' }}>{report.feedbackDate}</p>
                    </div>
                    {report.rating && (
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < report.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-blue-800" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                    💬 {report.feedback}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-orange-500 bg-orange-50 rounded-2xl p-3">
                  <MessageCircle size={16} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    {isParent ? 'Menunggu feedback dari terapis...' : 'Belum ada feedback — berikan ulasan'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
