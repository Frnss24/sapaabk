import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ACTIVITIES } from '../data/mockData';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Upload,
  Play,
  Lightbulb,
  Camera,
  Video,
  ChevronRight,
  Star,
} from 'lucide-react';

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activity = ACTIVITIES.find(a => a.id === id);
  const [activeLevel, setActiveLevel] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showUpload, setShowUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!activity) {
    return (
      <div className="p-6 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-gray-700" style={{ fontWeight: 800 }}>Aktivitas tidak ditemukan</h2>
        <Link to="/activities" className="text-green-600 mt-2 inline-block" style={{ fontWeight: 700 }}>
          Kembali ke daftar
        </Link>
      </div>
    );
  }

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const currentLevelData = activity.levels.find(level => level.level === activeLevel) || activity.levels[0];
  const allDone = completedSteps.size === currentLevelData.steps.length;
  const progress = Math.round((completedSteps.size / currentLevelData.steps.length) * 100);

  const handleChangeLevel = (level: number) => {
    setActiveLevel(level);
    setCompletedSteps(new Set());
  };

  const handleUpload = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      navigate('/reports');
    }, 1500);
  };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-5 transition-colors"
        style={{ fontWeight: 700, fontSize: '0.9rem' }}
      >
        <ArrowLeft size={20} />
        Kembali
      </button>

      {/* Header Card */}
      <div className={`${activity.bgClass} border ${activity.borderClass} rounded-3xl p-6 mb-5`}>
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 ${activity.iconBgClass} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
            {activity.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${activity.badgeClass}`} style={{ fontWeight: 700 }}>
                {activity.difficulty}
              </span>
              <span className="text-gray-400" style={{ fontSize: '0.75rem' }}>{activity.category}</span>
            </div>
            <h1 className="text-gray-800" style={{ fontWeight: 900, fontSize: '1.4rem' }}>
              {activity.name}
            </h1>
            <div className="flex items-center gap-1 mt-1 text-gray-500">
              <Clock size={14} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{activity.duration}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-3" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
          {activity.description}
        </p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }} className="text-gray-600">
              Level {activeLevel} selesai: {completedSteps.size}/{currentLevelData.steps.length}
            </span>
            <span className={activity.iconColorClass} style={{ fontSize: '0.8rem', fontWeight: 800 }}>
              {progress}%
            </span>
          </div>
          <div className="bg-white/60 rounded-full h-2.5">
            <div
              className={`${activity.iconBgClass.replace('100', '400')} rounded-full h-2.5 transition-all duration-500`}
              style={{ width: `${progress}%`, backgroundColor: progress === 100 ? '#4ADE80' : undefined }}
            />
          </div>
        </div>
      </div>

      {/* Video Placeholder */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden mb-5 aspect-video relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto hover:bg-white/30 cursor-pointer transition-colors">
            <Play size={28} className="text-white ml-1" fill="white" />
          </div>
          <p className="text-white/80" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
            Video Tutorial: {activity.name}
          </p>
          <p className="text-white/50 mt-1" style={{ fontSize: '0.75rem' }}>
            Klik untuk memutar panduan visual
          </p>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/40 rounded-xl px-3 py-1.5">
          <Video size={14} className="text-white" />
          <span className="text-white" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Tutorial Tersedia</span>
        </div>
      </div>

      {/* Step-by-step Instructions */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-5">
        <h2 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1.05rem' }}>
          📚 Level Home Program
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {activity.levels.map(level => (
            <button
              key={level.level}
              onClick={() => handleChangeLevel(level.level)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition-all ${
                activeLevel === level.level
                  ? 'bg-green-500 text-white border-green-500 shadow-sm shadow-green-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-600'
              }`}
              style={{ fontWeight: 700 }}
            >
              Level {level.level}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
          <p className="text-blue-700" style={{ fontWeight: 800, fontSize: '0.9rem' }}>
            {currentLevelData.title}
          </p>
          <p className="text-blue-800 mt-1" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
            Panduan orang tua: {currentLevelData.guide}
          </p>
        </div>

        <div className="space-y-3">
          {currentLevelData.steps.map((step, index) => (
            <button
              key={index}
              onClick={() => toggleStep(index)}
              className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                completedSteps.has(index)
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white ${
                completedSteps.has(index) ? 'bg-green-500' : 'bg-gray-300'
              }`} style={{ fontWeight: 800, fontSize: '0.75rem' }}>
                {completedSteps.has(index) ? '✓' : index + 1}
              </div>
              <p className={`${completedSteps.has(index) ? 'text-gray-400 line-through' : 'text-gray-700'}`}
                style={{ fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 600 }}>
                {step}
              </p>
            </button>
          ))}
        </div>

        {allDone && (
          <div className="mt-4 bg-green-100 border border-green-200 rounded-2xl p-3 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-green-600 fill-green-600" />
            <p className="text-green-700" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
              Semua langkah selesai! Jangan lupa upload laporan ya 🎉
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-3xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={18} className="text-yellow-500" />
          <h3 className="text-yellow-800" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
            Tips dari Terapis
          </h3>
        </div>
        <p className="text-yellow-800" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
          💡 {activity.tips}
        </p>
      </div>

      {/* Upload Report Section */}
      {!showUpload && !uploadSuccess && (
        <button
          onClick={() => setShowUpload(true)}
          className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl hover:from-orange-600 hover:to-orange-500 transition-all duration-200 shadow-lg shadow-orange-200 active:scale-[0.98]"
          style={{ fontWeight: 800, fontSize: '1rem' }}
        >
          <Upload size={22} />
          Upload Laporan Aktivitas
        </button>
      )}

      {showUpload && !uploadSuccess && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 mb-4" style={{ fontWeight: 800, fontSize: '1rem' }}>
            📤 Upload Laporan
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer">
              <Camera size={32} className="mx-auto mb-2 text-gray-300" />
              <p className="text-gray-500" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Klik untuk pilih foto atau video
              </p>
              <p className="text-gray-400" style={{ fontSize: '0.75rem' }}>
                JPG, PNG, MP4 (maks. 50MB)
              </p>
            </div>
            <textarea
              rows={3}
              placeholder="Ceritakan bagaimana aktivitas tadi berlangsung... Apakah anak bisa melakukan sendiri? Ada kesulitan?"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none resize-none text-gray-700"
              style={{ fontSize: '0.875rem', fontFamily: 'Nunito, sans-serif' }}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                style={{ fontWeight: 700, fontSize: '0.9rem' }}
              >
                Batal
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 py-3 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                style={{ fontWeight: 700, fontSize: '0.9rem' }}
              >
                Kirim Laporan
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadSuccess && (
        <div className="bg-green-100 border border-green-200 rounded-3xl p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-green-700" style={{ fontWeight: 800, fontSize: '1rem' }}>
            Laporan berhasil dikirim!
          </p>
          <p className="text-green-600 mt-1" style={{ fontSize: '0.85rem' }}>
            Terapis akan memberikan feedback segera...
          </p>
        </div>
      )}
    </div>
  );
}
