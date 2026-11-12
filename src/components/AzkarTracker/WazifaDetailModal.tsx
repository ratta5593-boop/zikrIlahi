import React from 'react';
import { Wazifa } from '../../types';
import { 
  X, 
  Calendar, 
  Clock, 
  Target, 
  Sparkles, 
  CheckSquare, 
  Square, 
  RotateCcw, 
  CircleDot,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface WazifaDetailModalProps {
  wazifa: Wazifa | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleDay: (wazifaId: string, dayNumber: number) => void;
  onResetProgress: (wazifaId: string) => void;
  onOpenTasbeeh: (wazifa: Wazifa) => void;
}

export const WazifaDetailModal: React.FC<WazifaDetailModalProps> = ({
  wazifa,
  isOpen,
  onClose,
  onToggleDay,
  onResetProgress,
  onOpenTasbeeh
}) => {
  if (!isOpen || !wazifa) return null;

  const totalDays = wazifa.totalDays || 40;
  const completedCount = wazifa.completedDays.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalDays) * 100));
  const isChillaComplete = completedCount >= totalDays;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: wazifa.title,
        text: `${wazifa.title}\n\n${wazifa.arabicText}\n\nترجمہ: ${wazifa.urduTranslation}\n\nفضیلت و فوائد:\n${wazifa.benefits}\n\nروزانہ کی تعداد: ${wazifa.targetCount} بار (${wazifa.timeSlot})`,
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans-ur">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden text-right max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white flex-shrink-0">
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
                onClick={handleShare}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-amber-300"
                title="شیئر کریں"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-stone-950">
                {wazifa.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-emerald-950/70 text-emerald-200 border border-emerald-700/60 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{wazifa.timeSlot}</span>
              </span>
            </div>
          </div>

          <h2 className="font-urdu text-xl md:text-2xl font-bold text-amber-300">
            {wazifa.title}
          </h2>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-grow text-stone-800 dark:text-stone-200">
          
          {/* Arabic Text Card */}
          <div className="p-6 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 text-center">
            <p className="font-arabic text-2xl md:text-3xl text-emerald-900 dark:text-emerald-300 leading-loose">
              {wazifa.arabicText}
            </p>
            {wazifa.transliteration && (
              <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-2 font-sans">
                {wazifa.transliteration}
              </p>
            )}
            <div className="mt-4 pt-4 border-t border-emerald-200/80 dark:border-emerald-800/50">
              <p className="font-urdu text-sm md:text-base text-stone-700 dark:text-stone-300">
                <strong className="text-emerald-800 dark:text-emerald-400">ترجمہ: </strong>
                {wazifa.urduTranslation}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-800">
              <Target className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-xs text-stone-500 dark:text-stone-400">روزانہ کی تعداد</div>
              <div className="text-lg font-bold text-stone-900 dark:text-white mt-0.5">
                {wazifa.targetCount} بار
              </div>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-800">
              <Calendar className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <div className="text-xs text-stone-500 dark:text-stone-400">مقررہ کل ایام</div>
              <div className="text-lg font-bold text-stone-900 dark:text-white mt-0.5">
                {wazifa.totalDays} دن
              </div>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-800">
              <CheckCircle2 className="w-5 h-5 text-teal-600 mx-auto mb-1" />
              <div className="text-xs text-stone-500 dark:text-stone-400">مکمل شدہ دن</div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {completedCount} دن
              </div>
            </div>
          </div>

          {/* Progress Bar & Percentage Visual */}
          <div className="p-4 bg-amber-50/60 dark:bg-stone-800/80 rounded-2xl border border-amber-200/80 dark:border-stone-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                وظیفے کی مجموعی پروگریس (Progress):
              </span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400 font-sans">
                {completedCount} / {totalDays} دن ({progressPercent}%)
              </span>
            </div>
            
            <div className="w-full h-3.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {isChillaComplete && (
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mt-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                مبارک ہو! اس وظیفے کی مقررہ مدت مکمل ہو چکی ہے۔ اللہ تعالیٰ قبول فرمائے۔
              </p>
            )}
          </div>

          {/* Benefits and Virtues (فضیلت اور فوائد) */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>فضیلت، برکات اور روحانی فوائد (Benefits):</span>
            </h3>
            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-800 text-sm leading-relaxed text-stone-700 dark:text-stone-300 font-urdu">
              {wazifa.benefits}
            </div>
          </div>

          {/* Notes if present */}
          {wazifa.notes && (
            <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-stone-600 dark:text-stone-300">
              <strong className="text-emerald-800 dark:text-emerald-300">ہدایات و طریقہ کار: </strong>
              {wazifa.notes}
            </div>
          )}

          {/* 40-Day / Total Days Tracking Grid (ہر دن کا چیک باکس جو ہمیشہ محفوظ رہے) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>روزانہ ٹریکنگ گرڈ (Daily Checkboxes):</span>
              </h3>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                (ہر دن مکمل کر کے چیک باکس پر ٹک لگائیں)
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2">
              {Array.from({ length: totalDays }, (_, idx) => {
                const dayNum = idx + 1;
                const dayKey = `Day-${dayNum}`;
                const isChecked = wazifa.completedDays.includes(dayKey);

                return (
                  <button
                    key={dayKey}
                    onClick={() => onToggleDay(wazifa.id, dayNum)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-emerald-500'
                    }`}
                  >
                    <span className="text-[10px] font-medium opacity-80">دن</span>
                    <span className="text-sm font-bold font-sans">{dayNum}</span>
                    <div className="mt-1">
                      {isChecked ? (
                        <CheckSquare className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-stone-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions: Digital Tasbeeh, Reset, Close */}
        <div className="p-4 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => {
              if (window.confirm('کیا آپ اس وظیفے کے تمام دنوں کی پروگریس ختم (Reset) کرنا چاہتے ہیں؟')) {
                onResetProgress(wazifa.id);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-600 dark:text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>پروگریس ری سیٹ کریں</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenTasbeeh(wazifa);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition"
            >
              <CircleDot className="w-4 h-4 text-amber-300" />
              <span>ابھی پڑھیں (ڈیجیٹل تسبیح)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold"
            >
              بند کریں
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
