import React, { useState } from 'react';
import { Wazifa, TimeSlot, WazifaCategory } from '../../types';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Clock, 
  CheckSquare, 
  Square, 
  CircleDot, 
  ChevronLeft, 
  Trash2, 
  Award, 
  Flame, 
  CheckCircle2,
  Download,
  FileCode,
  FolderArchive
} from 'lucide-react';
import { OfflineDownloader } from '../../services/offlineDownloader';

interface AzkarListProps {
  wazaif: Wazifa[];
  onOpenDetail: (wazifa: Wazifa) => void;
  onOpenTasbeeh: (wazifa: Wazifa) => void;
  onOpenAddModal: () => void;
  onToggleDay: (wazifaId: string, dayNumber: number) => void;
  onDeleteWazifa: (wazifaId: string) => void;
}

export const AzkarList: React.FC<AzkarListProps> = ({
  wazaif,
  onOpenDetail,
  onOpenTasbeeh,
  onOpenAddModal,
  onToggleDay,
  onDeleteWazifa,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Computed metrics
  const totalWazaif = wazaif.length;
  const completedTodayCount = wazaif.filter(w => {
    const isTodayCountDone = (w.currentCountToday || 0) >= w.targetCount;
    const isLastDayChecked = w.completedDays.length > 0;
    return isTodayCountDone || isLastDayChecked;
  }).length;

  const totalBeadsRecitedToday = wazaif.reduce((sum, w) => sum + (w.currentCountToday || 0), 0);
  
  const avgProgress = totalWazaif > 0 
    ? Math.round(wazaif.reduce((sum, w) => sum + (w.completedDays.length / (w.totalDays || 40)) * 100, 0) / totalWazaif)
    : 0;

  // Filtered list
  const filteredWazaif = wazaif.filter(w => {
    const matchesSearch = 
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.arabicText.includes(searchQuery) ||
      w.urduTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.benefits.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTime = selectedTimeSlot === 'all' || w.timeSlot === selectedTimeSlot;
    const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;

    return matchesSearch && matchesTime && matchesCategory;
  });

  const timeFilterOptions = [
    { id: 'all', label: 'تمام اوقات' },
    { id: 'بعد نماز فجر', label: 'بعد نماز فجر' },
    { id: 'بعد نماز مغرب', label: 'بعد نماز مغرب' },
    { id: 'بعد نماز عشاء', label: 'بعد نماز عشاء' },
    { id: 'صبح و شام', label: 'صبح و شام' },
    { id: 'تہجد کے وقت', label: 'تہجد' },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans-ur">
      
      {/* Top Spiritual Banner & Stats Cards */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 md:p-8 text-white shadow-xl border border-emerald-700/40">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>اذکار اور وظائف کا مینجمنٹ سسٹم</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-urdu text-white tracking-wide">
                روزانہ کے وظائف و اوراد ٹریکر
              </h2>
              <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl mt-1 leading-relaxed">
                ہر ذکر کے مخصوص اوقات، فضائل و فوائد، روزانہ کی تعداد اور چالیس روزہ چلے کی روزانہ چیک لسٹ و پروگریس بار۔
              </p>
            </div>

            <button
              onClick={onOpenAddModal}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs md:text-sm shadow-lg transition-all cursor-pointer self-start md:self-auto"
            >
              <Plus className="w-5 h-5" />
              <span>نیا ذکر یا وظیفہ شامل کریں</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/60">
            <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-700/40 text-center">
              <span className="text-[11px] text-emerald-200">کل مقررہ وظائف</span>
              <div className="text-xl md:text-2xl font-bold text-white mt-0.5">{totalWazaif}</div>
            </div>

            <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-700/40 text-center">
              <span className="text-[11px] text-emerald-200">آج پڑھے گئے</span>
              <div className="text-xl md:text-2xl font-bold text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                <span>{completedTodayCount}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-700/40 text-center">
              <span className="text-[11px] text-emerald-200">آج کی کل تسبیحات</span>
              <div className="text-xl md:text-2xl font-bold text-white mt-0.5">{totalBeadsRecitedToday.toLocaleString()}</div>
            </div>

            <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-700/40 text-center">
              <span className="text-[11px] text-emerald-200">اوسط چلے کی تکمیل</span>
              <div className="text-xl md:text-2xl font-bold text-emerald-400 mt-0.5">{avgProgress}%</div>
            </div>
          </div>

          {/* Quick Offline Download Bar */}
          <div className="mt-5 pt-4 border-t border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-600/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <p className="text-emerald-100 text-[11px] sm:text-xs">
                <strong>آف لائن فائل ڈاؤنلوڈ:</strong> اس پوری ایپ کو سنگل آف لائن فائل کے طور پر ڈاؤنلوڈ کریں اور بنا انٹرنیٹ کے موبائل میں چلائیں:
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={async () => {
                  const ok = await OfflineDownloader.downloadSingleHtmlFile();
                  if (ok) {
                    alert('آف لائن سنگل فائل (.html) ڈاؤنلوڈ ہو چکی ہے! آپ اسے اپنے موبائل کے Downloads فولڈر سے کسی بھی وقت بغیر انٹرنیٹ کے کھول سکتے ہیں۔');
                  }
                }}
                className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                title="سنگل آف لائن فائل (.html) ڈاؤنلوڈ کریں"
              >
                <FileCode className="w-3.5 h-3.5 text-stone-950" />
                <span>سنگل فائل (.html)</span>
              </button>

              <button
                onClick={async () => {
                  const ok = await OfflineDownloader.downloadOfflineZipPackage();
                  if (ok) {
                    alert('مکمل آف لائن زپ پیکج (.zip) ڈاؤنلوڈ ہو چکا ہے!');
                  }
                }}
                className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer border border-emerald-500/40"
                title="مکمل آف لائن پیکج (.zip) ڈاؤنلوڈ کریں"
              >
                <FolderArchive className="w-3.5 h-3.5 text-amber-300" />
                <span>مکمل زپ پیکج (.zip)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="ذکر، عربی الفاظ، فوائد یا اوقات تلاش کریں..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <Search className="absolute right-3 top-3 w-4 h-4 text-stone-400" />
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {timeFilterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedTimeSlot(option.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedTimeSlot === option.id
                  ? 'bg-emerald-700 text-white font-bold shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wazaif Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredWazaif.length === 0 ? (
          <div className="col-span-full py-12 text-center text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
            <p className="text-base font-bold">کوئی وظیفہ نہیں ملا۔</p>
            <p className="text-xs mt-1">تلاش کے الفاظ بدل کر دیکھیں یا نیا وظیفہ شامل کریں۔</p>
          </div>
        ) : (
          filteredWazaif.map((wazifa) => {
            const totalDays = wazifa.totalDays || 40;
            const completedDaysCount = wazifa.completedDays.length;
            const progressPercent = Math.min(100, Math.round((completedDaysCount / totalDays) * 100));
            const nextDayNumber = Math.min(totalDays, completedDaysCount + 1);
            const isTodayChecked = wazifa.completedDays.includes(`Day-${completedDaysCount}`) && (wazifa.currentCountToday || 0) >= wazifa.targetCount;
            const isCurrentDayDone = (wazifa.currentCountToday || 0) >= wazifa.targetCount;

            return (
              <div
                key={wazifa.id}
                className="group relative flex flex-col justify-between bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 p-5 overflow-hidden"
              >
                {/* Top Row: Category, Time slot, and Delete for custom */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {wazifa.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{wazifa.timeSlot}</span>
                      </span>
                    </div>

                    {wazifa.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`کیا آپ واقعی "${wazifa.title}" کو حذف کرنا چاہتے ہیں؟`)) {
                            onDeleteWazifa(wazifa.id);
                          }
                        }}
                        className="p-1 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="وظیفہ حذف کریں"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onOpenDetail(wazifa)}
                    className="font-urdu text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer mb-2"
                  >
                    {wazifa.title}
                  </h3>

                  {/* Arabic Text Display */}
                  <div 
                    onClick={() => onOpenDetail(wazifa)}
                    className="p-4 rounded-2xl bg-amber-50/50 dark:bg-emerald-950/20 border border-amber-200/50 dark:border-emerald-900/40 mb-3 text-center cursor-pointer"
                  >
                    <p className="font-arabic text-xl text-emerald-950 dark:text-emerald-300 leading-loose line-clamp-2">
                      {wazifa.arabicText}
                    </p>
                  </div>

                  {/* Benefits Preview */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mb-4 font-urdu">
                    <strong className="text-amber-700 dark:text-amber-400">فضیلت: </strong>
                    {wazifa.benefits}
                  </p>
                </div>

                {/* Progress Bar & Tracking Area */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3">
                  
                  {/* Progress Bar with Percentage */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                        <span>چلے کی تکمیل:</span>
                        <strong className="text-emerald-700 dark:text-emerald-400 font-sans">
                          {completedDaysCount} / {totalDays} دن
                        </strong>
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold font-sans">
                        {progressPercent}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Daily Tracking Checkbox Row (آج کا وظیفہ مکمل کرنے کا چیک باکس) */}
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleDay(wazifa.id, nextDayNumber)}
                        className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none"
                      >
                        {wazifa.completedDays.includes(`Day-${nextDayNumber}`) ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Square className="w-5 h-5 text-stone-400 hover:text-emerald-600" />
                        )}
                        <span className="text-stone-800 dark:text-stone-200">
                          دن {nextDayNumber} مکمل ٹک کریں
                        </span>
                      </button>
                    </div>

                    <div className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                      آج: <strong className="text-stone-800 dark:text-stone-200">{wazifa.currentCountToday || 0}</strong> / {wazifa.targetCount}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenTasbeeh(wazifa)}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                    >
                      <CircleDot className="w-3.5 h-3.5 text-amber-300" />
                      <span>تسبیح کاؤنٹر</span>
                    </button>

                    <button
                      onClick={() => onOpenDetail(wazifa)}
                      className="py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <span>40 دن گرڈ و فوائد</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
