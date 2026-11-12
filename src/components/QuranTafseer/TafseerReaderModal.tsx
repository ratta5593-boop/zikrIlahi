import React, { useState } from 'react';
import { QuranSurah } from '../../types';
import { 
  X, 
  BookOpen, 
  Bookmark, 
  Share2, 
  Type, 
  Sparkles, 
  Info, 
  Layers, 
  Check,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface TafseerReaderModalProps {
  surah: QuranSurah | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (surahNumber: number) => void;
}

export const TafseerReaderModal: React.FC<TafseerReaderModalProps> = ({
  surah,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [activeTafseer, setActiveTafseer] = useState<'bayan' | 'tafheem'>('bayan');
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  if (!isOpen || !surah) return null;

  const handleCopyAyah = (arabic: string, urdu: string, num: number) => {
    navigator.clipboard.writeText(`${arabic}\n\nترجمہ: ${urdu}\n[${surah.urduName} - آیت ${num}]`);
    setCopiedAyah(num);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const handleShareSurah = () => {
    if (navigator.share) {
      navigator.share({
        title: `${surah.urduName} - تفسیر بیان القرآن و تفہیم القرآن`,
        text: `مطالعہ ${surah.urduName} مع تفسیر بیان القرآن و تفہیم القرآن:\n\n${surah.bayanUlQuran.summary}`,
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans-ur">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden text-right max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-5 md:p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="بند کریں"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => onToggleBookmark(surah.number)}
                className={`p-1.5 rounded-full transition-colors ${
                  isBookmarked ? 'bg-amber-400 text-stone-950' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                title={isBookmarked ? 'بک مارک ختم کریں' : 'بک مارک کریں'}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareSurah}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300"
                title="شیئر کریں"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Surah Badges */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-stone-950">
                پارہ {surah.paraNumber}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-emerald-800/80 text-emerald-100 border border-emerald-600/50">
                {surah.revelationType} سورت • {surah.numberOfAyahs} آیات
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-urdu text-2xl md:text-3xl font-bold text-amber-300 flex items-center gap-2">
                <span>{surah.urduName}</span>
                <span className="font-arabic text-xl md:text-2xl text-emerald-200">({surah.name})</span>
              </h2>
              <p className="text-xs text-emerald-200/80 mt-1">
                سورت نمبر {surah.number} • {surah.englishName} ({surah.englishTranslation})
              </p>
            </div>

            {/* Font Size Adjuster Controls */}
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-2xl border border-emerald-700/40 self-start sm:self-auto">
              <span className="text-[11px] text-emerald-200 ml-1">فونٹ سائز:</span>
              <button
                onClick={() => setFontSizeOffset(prev => Math.max(-2, prev - 1))}
                className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-xs flex items-center justify-center cursor-pointer"
                title="چھوٹا کریں"
              >
                -
              </button>
              <span className="text-xs font-bold px-1.5 font-sans">{fontSizeOffset >= 0 ? `+${fontSizeOffset}` : fontSizeOffset}</span>
              <button
                onClick={() => setFontSizeOffset(prev => Math.min(5, prev + 1))}
                className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-xs flex items-center justify-center cursor-pointer"
                title="بڑا کریں"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Tafseer Selector Switch Tabs (بیان القرآن بمقابلہ تفہیم القرآن) */}
        <div className="bg-emerald-50 dark:bg-stone-950 p-3 border-b border-emerald-200 dark:border-stone-800 flex items-center justify-center gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTafseer('bayan')}
            className={`flex-1 max-w-xs py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTafseer === 'bayan'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>تفسیر بیان القرآن (ڈاکٹر اسرار احمدؒ)</span>
          </button>

          <button
            onClick={() => setActiveTafseer('tafheem')}
            className={`flex-1 max-w-xs py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTafseer === 'tafheem'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-200" />
            <span>تفسیر تفہیم القرآن (سید مودودیؒ)</span>
          </button>
        </div>

        {/* Scrollable Reading Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-grow text-stone-800 dark:text-stone-200">
          
          {/* Active Tafseer Introduction Card */}
          {activeTafseer === 'bayan' ? (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-stone-900 border border-emerald-200 dark:border-emerald-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>بیان القرآن: سورت کا اجمالی تعارف و شانِ نزول</span>
              </div>
              
              <p className="font-urdu text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {surah.bayanUlQuran.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white/80 dark:bg-stone-800/80 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <strong className="text-emerald-800 dark:text-emerald-400 block mb-1">شانِ نزول و تاریخ:</strong>
                  <span>{surah.bayanUlQuran.shanENuzul}</span>
                </div>
                <div className="p-3 bg-white/80 dark:bg-stone-800/80 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <strong className="text-amber-700 dark:text-amber-400 block mb-1">فضائل و برکات:</strong>
                  <span>{surah.bayanUlQuran.virtues}</span>
                </div>
              </div>

              {/* Scholarly reflection by Dr Israr Ahmed */}
              <div className="p-3.5 bg-emerald-900/10 dark:bg-emerald-900/20 rounded-xl border-r-4 border-emerald-700 text-xs">
                <strong className="text-emerald-900 dark:text-emerald-300 block mb-1 font-bold">
                  فکری نکتہ (ڈاکٹر اسرار احمدؒ):
                </strong>
                <p className="font-urdu leading-relaxed">{surah.bayanUlQuran.scholarlyNote}</p>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 dark:from-stone-900 dark:to-stone-850 border border-amber-200 dark:border-stone-700 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>تفہیم القرآن: سورت کا پس منظر و اجتماعی دعوت</span>
              </div>

              <p className="font-urdu text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {surah.tafheemUlQuran.introduction}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white/80 dark:bg-stone-800/80 rounded-xl border border-amber-200 dark:border-stone-700">
                  <strong className="text-amber-800 dark:text-amber-400 block mb-1">تاریخی پس منظر:</strong>
                  <span>{surah.tafheemUlQuran.historicalBackground}</span>
                </div>
                <div className="p-3 bg-white/80 dark:bg-stone-800/80 rounded-xl border border-amber-200 dark:border-stone-700">
                  <strong className="text-teal-700 dark:text-teal-400 block mb-1">معاشرتی اثرات و عملی تطبیق:</strong>
                  <span>{surah.tafheemUlQuran.socialImpact}</span>
                </div>
              </div>

              {/* Core teachings */}
              <div className="p-3.5 bg-amber-900/10 dark:bg-amber-900/20 rounded-xl border-r-4 border-amber-600 text-xs">
                <strong className="text-amber-900 dark:text-amber-300 block mb-1.5 font-bold">
                  بنیادی ہدایات و نکات:
                </strong>
                <ul className="list-disc list-inside space-y-1 font-urdu">
                  {surah.tafheemUlQuran.coreTeachings.map((teaching, i) => (
                    <li key={i}>{teaching}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Ayat Section with Arabic, Urdu Translation, and Commentary */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>آیاتِ مبارکہ مع ترجمہ و تفسیری نوٹس:</span>
              <span className="text-xs text-stone-500 font-normal">
                {surah.ayahs.length} منتخب آیات
              </span>
            </h3>

            {surah.ayahs.map((ayah) => {
              const tafseerNote = activeTafseer === 'bayan' ? ayah.bayanNote : ayah.tafheemNote;

              return (
                <div
                  key={ayah.numberInSurah}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
                >
                  {/* Ayah Header */}
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100 dark:border-stone-800">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center font-sans">
                      {ayah.numberInSurah}
                    </span>

                    <button
                      onClick={() => handleCopyAyah(ayah.arabic, ayah.urdu, ayah.numberInSurah)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition text-[11px]"
                      title="آیت کاپی کریں"
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">کاپی ہو گئی</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>کاپی</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Arabic Text */}
                  <p 
                    className="font-arabic text-emerald-950 dark:text-emerald-300 text-right leading-loose"
                    style={{ fontSize: `${22 + fontSizeOffset * 2}px` }}
                  >
                    {ayah.arabic}
                  </p>

                  {/* Urdu Translation */}
                  <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200/60 dark:border-stone-800">
                    <p 
                      className="font-urdu text-stone-800 dark:text-stone-200 leading-relaxed"
                      style={{ fontSize: `${15 + fontSizeOffset}px` }}
                    >
                      <strong className="text-emerald-800 dark:text-emerald-400">ترجمہ: </strong>
                      {ayah.urdu}
                    </p>
                  </div>

                  {/* Tafseer Note */}
                  {tafseerNote && (
                    <div className="p-3.5 bg-amber-50/50 dark:bg-stone-800/50 rounded-xl border-r-3 border-amber-500 text-xs text-stone-700 dark:text-stone-300">
                      <strong className="text-amber-800 dark:text-amber-400 block mb-1">
                        {activeTafseer === 'bayan' ? 'نوٹ تفسیر بیان القرآن:' : 'نوٹ تفسیر تفہیم القرآن:'}
                      </strong>
                      <p className="font-urdu leading-relaxed">{tafseerNote}</p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between flex-shrink-0">
          <div className="text-xs text-stone-500">
            سورت {surah.number} از 114
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold"
          >
            بند کریں
          </button>
        </div>

      </div>
    </div>
  );
};
