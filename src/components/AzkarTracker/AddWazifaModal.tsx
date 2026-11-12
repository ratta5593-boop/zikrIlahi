import React, { useState } from 'react';
import { TimeSlot, WazifaCategory, Wazifa } from '../../types';
import { X, PlusCircle, Sparkles, BookMarked } from 'lucide-react';

interface AddWazifaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newWazifa: Omit<Wazifa, 'id' | 'completedDays' | 'currentCountToday' | 'startDate'>) => void;
}

export const AddWazifaModal: React.FC<AddWazifaModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [title, setTitle] = useState('');
  const [arabicText, setArabicText] = useState('');
  const [urduTranslation, setUrduTranslation] = useState('');
  const [benefits, setBenefits] = useState('');
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('بعد نماز فجر');
  const [targetCount, setTargetCount] = useState<number>(100);
  const [totalDays, setTotalDays] = useState<number>(40);
  const [category, setCategory] = useState<WazifaCategory>('سلسلہ عالیہ');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !arabicText.trim()) {
      alert('براہ کرم ذکر کا عنوان اور عربی متن درج فرمائیں۔');
      return;
    }

    onAdd({
      title: title.trim(),
      arabicText: arabicText.trim(),
      urduTranslation: urduTranslation.trim() || 'اللہ کے ذکر سے دلوں کو سکون ملتا ہے۔',
      benefits: benefits.trim() || 'روحانی ترقی، برکت اور خیر و عافیت کے لیے مفید ہے۔',
      timeSlot,
      targetCount: Number(targetCount) || 100,
      totalDays: Number(totalDays) || 40,
      currentDay: 1,
      category,
      notes: notes.trim(),
      isCustom: true
    });

    // Reset fields
    setTitle('');
    setArabicText('');
    setUrduTranslation('');
    setBenefits('');
    setNotes('');
    onClose();
  };

  const timeSlots: TimeSlot[] = [
    'بعد نماز فجر',
    'بعد نماز ظہر',
    'بعد نماز عصر',
    'بعد نماز مغرب',
    'بعد نماز عشاء',
    'تہجد کے وقت',
    'صبح و شام',
    'کسی بھی وقت'
  ];

  const categories: WazifaCategory[] = [
    'سلسلہ عالیہ',
    'درود و سلام',
    'استغفار و توبہ',
    'رزق و برکت',
    'حفاظت و شفاء',
    'قرآنی دعائیں',
    'دیگر'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans-ur">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden text-right max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-5 text-white flex items-center justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-urdu">نیا ذکر یا وظیفہ شامل کریں</h2>
            <PlusCircle className="w-5 h-5 text-amber-300" />
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-grow text-stone-800 dark:text-stone-200 text-xs">
          
          {/* Title */}
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5">
              ذکر یا وظیفے کا عنوان <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              required
              placeholder="مثلاً: وظیفہ کشائشِ رزق، درودِ تاج، اسمِ اعظم"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right"
            />
          </div>

          {/* Arabic Text */}
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5">
              عربی متن / دعا / ورد <span className="text-red-500">*</span>:
            </label>
            <textarea
              required
              rows={3}
              placeholder="عربی کلمات درج کریں (مثلاً: حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ)"
              value={arabicText}
              onChange={(e) => setArabicText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right font-arabic text-lg"
            />
          </div>

          {/* Urdu Translation */}
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5">
              اردو ترجمہ و مفہوم:
            </label>
            <textarea
              rows={2}
              placeholder="اردو مفہوم درج کریں"
              value={urduTranslation}
              onChange={(e) => setUrduTranslation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right font-urdu"
            />
          </div>

          {/* Benefits (فضیلت اور فوائد) */}
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>فضیلت اور برکات / فوائد (Benefits):</span>
            </label>
            <textarea
              rows={2}
              placeholder="اس ذکر کی برکات، احادیث سے ثبوت یا بزرگانِ دین کے بتائے ہوئے فوائد درج کریں"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right font-urdu"
            />
          </div>

          {/* Target Count & Total Days */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5">
                روزانہ کی تعداد (Daily Target):
              </label>
              <select
                value={targetCount}
                onChange={(e) => setTargetCount(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right"
              >
                <option value={33}>33 بار</option>
                <option value={41}>41 بار</option>
                <option value={100}>100 بار (1 تسبیح)</option>
                <option value={313}>313 بار (اہلِ بدر کی تعداد)</option>
                <option value={500}>500 بار</option>
                <option value={1000}>1,000 بار</option>
                <option value={1100}>1,100 بار</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5">
                مقررہ دن (Total Days):
              </label>
              <select
                value={totalDays}
                onChange={(e) => setTotalDays(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right"
              >
                <option value={7}>7 دن (ایک ہفتہ)</option>
                <option value={11}>11 دن کا وظیفہ</option>
                <option value={21}>21 دن کا عمل</option>
                <option value={40}>40 دن کا چلہ (مستحب)</option>
                <option value={60}>60 دن</option>
                <option value={90}>90 دن</option>
              </select>
            </div>
          </div>

          {/* Time Slot & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5">
                مخصوص اوقات (Time Slot):
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value as TimeSlot)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right"
              >
                {timeSlots.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5">
                کیٹیگری (Category):
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WazifaCategory)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Special instructions / notes */}
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-bold mb-1.5">
              خصوصی شرائط یا نوٹ:
            </label>
            <input
              type="text"
              placeholder="مثلاً: باوضو قبلہ رخ بیٹھ کر، اول و آخر 3 بار درود شریف"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
            >
              منسوخ کریں
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-md hover:from-emerald-700 hover:to-teal-700 transition cursor-pointer"
            >
              محفوظ کریں
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
