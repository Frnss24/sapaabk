import { useState } from 'react';
import { Link } from 'react-router';
import { ACTIVITIES } from '../data/mockData';
import { Search, ChevronRight, Clock, Filter } from 'lucide-react';

const CATEGORIES = ['Semua', 'Pengolahan Pangan', 'Budidaya', 'Pengemasan'];

const DIFFICULTY_COLORS: Record<string, { badge: string; dot: string }> = {
  Pemula: { badge: 'bg-green-100 text-green-700', dot: 'bg-green-400' },
  Menengah: { badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
  Mahir: { badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400' },
};

export default function ActivityModule() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filtered = ACTIVITIES.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Semua' || a.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-800" style={{ fontWeight: 900, fontSize: '1.5rem' }}>
          🏠 Home Program
        </h1>
        <p className="text-gray-500 mt-1" style={{ fontSize: '0.9rem' }}>
          Program keterampilan berbasis praktik untuk melatih kemandirian, ketelitian, dan tanggung jawab anak
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari aktivitas..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-100 bg-white focus:border-green-400 focus:outline-none transition-colors"
            style={{ fontSize: '0.9rem' }}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border-2 border-gray-100 text-gray-600 hover:border-green-300 hover:text-green-600 transition-all">
          <Filter size={18} />
          <span className="hidden sm:inline" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Filter</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full flex-shrink-0 transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-green-500 text-white shadow-md shadow-green-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-600'
            }`}
            style={{ fontWeight: 700, fontSize: '0.8rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-gray-400 mb-4" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
        {filtered.length} aktivitas ditemukan
      </p>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((activity) => {
          const difficulty = DIFFICULTY_COLORS[activity.difficulty] || DIFFICULTY_COLORS.Pemula;
          return (
            <Link
              key={activity.id}
              to={`/activities/${activity.id}`}
              className={`${activity.bgClass} border ${activity.borderClass} rounded-3xl p-5 block hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${activity.iconBgClass} rounded-2xl flex items-center justify-center text-2xl`}>
                  {activity.emoji}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs ${difficulty.badge}`} style={{ fontWeight: 700 }}>
                  {activity.difficulty}
                </span>
              </div>
              <h3 className="text-gray-800 mb-1" style={{ fontWeight: 800, fontSize: '1rem' }}>
                {activity.name}
              </h3>
              <p className="text-gray-500 mb-3 line-clamp-2" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                {activity.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={14} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-white/80 ${activity.iconColorClass}`} style={{ fontWeight: 600 }}>
                    {activity.category}
                  </span>
                  <ChevronRight size={16} className={activity.iconColorClass} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-gray-500" style={{ fontWeight: 700, fontSize: '1rem' }}>Aktivitas tidak ditemukan</p>
          <p className="text-gray-400" style={{ fontSize: '0.85rem' }}>Coba kata kunci lain</p>
        </div>
      )}
    </div>
  );
}
