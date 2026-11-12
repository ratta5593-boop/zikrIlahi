import React, { useState } from 'react';
import { QuranSurah } from '../../types';
import { all114SurahsMetadata, detailedSurahsList } from '../../data/quranSurahs';
import { Search, BookOpen, Bookmark, Sparkles, Filter, ChevronLeft, Star } from 'lucide-react';

interface QuranExplorerProps {
  onSelectSurah: (surah: QuranSurah) => void;
  bookmarks: number[];
  onToggleBookmark: (surahNumber: number) => void;
}

export const QuranExplorer: React.FC<QuranExplorerProps> = ({
  onSelectSurah,
  bookmarks,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'makki' | 'madani' | 'bookmarked'>('all');

  // Filter surahs
  const filteredSurahs = all114SurahsMetadata.filter((surah) => {
    const matchesSearch =
      surah.urduName.includes(searchQuery) ||
      surah.arabicName.includes(searchQuery) ||
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString() === searchQuery.trim();

    if (!matchesSearch) return false;

    if (filterType === 'makki') return surah.type === 'مکی';
    if (filterType === 'madani') return surah.type === 'مدنی';
    if (filterType === 'bookmarked') return bookmarks.includes(surah.number);

    return true;
  });

  const handleSurahClick = (surahNumber: number) => {
    // Check if we have pre-detailed surah
    const existing = detailedSurahsList.find(s => s.number === surahNumber);
    if (existing) {
      onSelectSurah(existing);
      return;
    }

    // Otherwise generate dynamic comprehensive surah info
    const meta = all114SurahsMetadata.find(s => s.number === surahNumber);
    if (!meta) return;

    const dynamicSurah: QuranSurah = {
      number: meta.number,
      name: meta.arabicName,
      urduName: meta.urduName,
      englishName: meta.englishName,
      englishTranslation: meta.englishTranslation,
      revelationType: meta.type as 'مکی' | 'مدنی',
      numberOfAyahs: meta.verses,
      paraNumber: meta.para,
      bayanUlQuran: {
        summary: `یہ قرآن مجید کی ${meta.type} سورت ہے جس میں ${meta.verses} آیات ہیں۔ اس سورت کے مضامین انسان کو توحید، اخلاص، اور اللہ کے احکام کی تابعداری کی طرف بلاتے ہیں۔`,
        shanENuzul: `یہ سورت ${meta.type === 'مکی' ? 'مکہ مکرمہ کے دورِ دعوت' : 'مدینہ منورہ میں اسلامی ریاست و معاشرے کے قیام کے دوران'} نازل ہوئی۔`,
        virtues: `قرآن مجید کی ہر سورت اپنے اندر حکمت، ہدایت اور قلبی شفاء رکھتی ہے۔ اس سورت کی تلاوت سے خیر و برکت نصیب ہوتی ہے۔`,
        keyThemes: ['توحید و رسالت', 'آخرت کی جواب دہی', 'اخلاقِ حسنہ اور تقویٰ'],
        scholarlyNote: `ڈاکٹر اسرار احمدؒ اس سورت کے مطالعے میں تدبر اور عملی نفاذ پر زور دیتے ہیں۔`
      },
      tafheemUlQuran: {
        introduction: `تفہیم القرآن میں سید ابوالاعلیٰ مودودیؒ اس سورت کے نزول کے تاریخی حالات اور اس کے معاشرتی و انقلابی پیغام کا احاطہ فرماتے ہیں۔`,
        historicalBackground: `اس دور کے فکری اور سیاسی چیلنجز کے پس منظر میں یہ سورت نازل ہوئی تاکہ مومنین کی رہنمائی کی جا سکے۔`,
        coreTeachings: [
          'اللہ تعالیٰ کی حاکمیتِ مطلقہ پر غیر متزلزل یقین۔',
          'معاشرے میں عدل و انصاف کا قیام اور باطل کی نفی۔',
          'آخرت کی کامیابی کو دنیاوی اغراض پر ترجیح دینا۔'
        ],
        socialImpact: `یہ سورت انسان کو انفرادی بندگی سے آگے بڑھا کر اجتماعی سطح پر دین کو قائم کرنے کا شعور عطا کرتی ہے۔`
      },
      ayahs: [
        {
          numberInSurah: 1,
          arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          urdu: 'شروع اللہ کے نام سے جو بے انتہا مہربان اور نہایت رحم فرمانے والا ہے۔',
          bayanNote: 'ہر سورت کے آغاز پر تسمیہ اللہ کی رحمت کی چادر اور توفیق کا وسیلہ ہے۔',
          tafheemNote: 'یہ اعلان ہے کہ ہر عمل کی ابتدا خالقِ کائنات کی حاکمیت کے تحت کی جا رہی ہے۔'
        }
      ]
    };

    onSelectSurah(dynamicSurah);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans-ur">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-emerald-950 p-6 md:p-8 text-white shadow-xl border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>قرآن و تفاسیر سیکشن</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-urdu text-white tracking-wide">
              تفسیر بیان القرآن اور تفہیم القرآن
            </h2>
            <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl mt-1 leading-relaxed">
              سورتوں اور پاروں کی مکمل فہرست، شانِ نزول، فضائل و تفسیری مباحث۔ کسی بھی سورت پر کلک کر کے دونوں عظیم تفاسیر کا بیک وقت مطالعہ کریں۔
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-700/50 text-center">
              <span className="text-[10px] text-emerald-200">کل سورتیں</span>
              <div className="text-xl font-bold text-amber-300">114</div>
            </div>
            <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-700/50 text-center">
              <span className="text-[10px] text-emerald-200">پارے (اجزاء)</span>
              <div className="text-xl font-bold text-white">30</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="سورت کا نام (اردو/عربی/انگریزی) یا سورت نمبر درج کریں..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <Search className="absolute right-3 top-3 w-4 h-4 text-stone-400" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            تمام 114 سورتیں
          </button>

          <button
            onClick={() => setFilterType('makki')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterType === 'makki'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            مکی سورتیں
          </button>

          <button
            onClick={() => setFilterType('madani')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterType === 'madani'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            مدنی سورتیں
          </button>

          <button
            onClick={() => setFilterType('bookmarked')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
              filterType === 'bookmarked'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>بک مارکس ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* Surahs Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => {
          const isFav = bookmarks.includes(surah.number);
          const hasDetailedTafseer = detailedSurahsList.some(s => s.number === surah.number);

          return (
            <div
              key={surah.number}
              onClick={() => handleSurahClick(surah.number)}
              className="group relative flex items-center justify-between p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {/* Surah Number Badge */}
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold text-xs font-sans group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {surah.number}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-urdu text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {surah.urduName}
                    </h3>
                    {hasDetailedTafseer && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                        مکمل تفسیر
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    پارہ {surah.para} • {surah.verses} آیات • {surah.type}
                  </p>
                </div>
              </div>

              {/* Left Side: Arabic Calligraphy name and bookmark */}
              <div className="flex items-center gap-2">
                <span className="font-arabic text-xl text-emerald-800 dark:text-emerald-400 px-1">
                  {surah.arabicName}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(surah.number);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isFav ? 'text-amber-500 hover:text-amber-600' : 'text-stone-300 hover:text-stone-500'
                  }`}
                  title={isFav ? 'بک مارک ختم کریں' : 'بک مارک کریں'}
                >
                  <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
