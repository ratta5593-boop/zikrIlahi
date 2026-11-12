import React, { useState } from 'react';
import { useSoundVibration } from '../hooks/useSoundVibration';
import confetti from 'canvas-confetti';
import { 
  CircleDot, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Sparkles, 
  CheckCircle,
  Plus
} from 'lucide-react';

export const TasbeehView: React.FC = () => {
  const {
    isSoundEnabled,
    setIsSoundEnabled,
    isVibrationEnabled,
    setIsVibrationEnabled,
    playClickSound,
    playMilestoneSound,
    triggerVibrate,
  } = useSoundVibration();

  const presets = [
    { title: 'سبحان الله', urdu: 'اللہ پاک ہے', target: 33 },
    { title: 'الحمد لله', urdu: 'تمام تعریفیں اللہ کے لیے ہیں', target: 33 },
    { title: 'الله أكبر', urdu: 'اللہ سب سے بڑا ہے', target: 34 },
    { title: 'لا إله إلا الله', urdu: 'اللہ کے سوا کوئی معبود نہیں', target: 100 },
    { title: 'أستغفر الله ربي وأتوب إليه', urdu: 'میں اللہ سے بخشش مانگتا ہوں', target: 100 },
    { title: 'اللهم صل على محمد وعلى آل محمد', urdu: 'درودِ پاک', target: 100 },
    { title: 'يا حي يا قيوم برحمتك أستغيث', urdu: 'اسمِ اعظم', target: 100 },
  ];

  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [totalRecited, setTotalRecited] = useState(0);
  const [target, setTarget] = useState(33);

  const activePreset = presets[activePresetIndex];
  const progressPct = target > 0 ? Math.min(100, Math.round((count / target) * 100)) : 0;

  const handleBeadClick = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setTotalRecited(prev => prev + 1);
    playClickSound();
    triggerVibrate(25);

    if (nextCount === target) {
      playMilestoneSound();
      triggerVibrate([50, 100, 50, 100, 150]);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#059669', '#d97706', '#10b981', '#f59e0b']
        });
      } catch {
        // ignore
      }
    }
  };

  const handleSelectPreset = (idx: number) => {
    setActivePresetIndex(idx);
    setTarget(presets[idx].target);
    setCount(0);
  };

  const handleReset = () => {
    if (window.confirm('کیا آپ موجودہ گنتی صفر (Reset) کرنا چاہتے ہیں؟')) {
      setCount(0);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in font-sans-ur">
      
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-3xl text-white shadow-xl border border-emerald-700/40 text-center">
        <h2 className="font-urdu text-2xl font-bold text-amber-300">
          ڈیجیٹل تسبیح کاؤنٹر
        </h2>
        <p className="text-xs text-emerald-200 mt-1">
          عام اذکار، تسبیحاتِ فاطمہؓ اور ورد کے لیے آواز و ارتعاش (Vibration) سے لیس کاؤنٹر
        </p>

        {/* Audio / Vibration Toggles */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isSoundEnabled ? 'bg-emerald-800/80 border-emerald-500 text-amber-300' : 'bg-stone-800 border-stone-700 text-stone-400'
            }`}
          >
            {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isSoundEnabled ? 'آواز آن' : 'آواز بند'}</span>
          </button>

          <button
            onClick={() => setIsVibrationEnabled(!isVibrationEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isVibrationEnabled ? 'bg-emerald-800/80 border-emerald-500 text-amber-300' : 'bg-stone-800 border-stone-700 text-stone-400'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isVibrationEnabled ? 'وائبریشن آن' : 'وائبریشن بند'}</span>
          </button>
        </div>
      </div>

      {/* Preset Azkar Selector */}
      <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <span className="text-xs text-stone-500 dark:text-stone-400 block mb-2 font-medium">
          منتخب ورد (Presets):
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                activePresetIndex === idx
                  ? 'bg-emerald-700 text-white font-bold shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Big Tasbeeh Ring Card */}
      <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-lg text-center flex flex-col items-center">
        
        {/* Active Title and Translation */}
        <h3 className="font-arabic text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-300 mb-1">
          {activePreset.title}
        </h3>
        <p className="font-urdu text-xs text-stone-500 dark:text-stone-400 mb-6">
          {activePreset.urdu}
        </p>

        {/* Circular Click Button */}
        <button
          onClick={handleBeadClick}
          className="group relative w-64 h-64 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-2xl focus:outline-none select-none"
          style={{
            background: 'radial-gradient(circle, #064e3b 0%, #022c22 80%, #000 100%)',
            boxShadow: '0 0 35px rgba(16, 185, 129, 0.25), inset 0 0 25px rgba(217, 119, 6, 0.3)'
          }}
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="118"
              className="stroke-stone-800"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="118"
              className="stroke-amber-400 transition-all duration-200"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 118}
              strokeDashoffset={2 * Math.PI * 118 * (1 - progressPct / 100)}
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Large Digit */}
          <span className="text-6xl font-extrabold text-white tracking-tight drop-shadow font-sans">
            {count}
          </span>
          <span className="text-xs text-emerald-300 mt-2 font-medium">
            ہدف: {target}
          </span>
          <span className="text-[11px] text-amber-300 mt-1 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 font-sans">
            {progressPct}% مکمل
          </span>
          <span className="text-[10px] text-stone-400 mt-2 font-sans-ur">
            (پڑھنے کے لیے دائرے پر ٹیپ کریں)
          </span>
        </button>

        {/* Goal celebration message */}
        {count >= target && (
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-700 font-bold animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>ماشاءاللہ! مطلوبہ تسبیح مکمل ہو گئی۔</span>
          </div>
        )}

        {/* Quick controls: Reset, Target Change, +10 */}
        <div className="w-full grid grid-cols-3 gap-2 mt-8 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs">
          <button
            onClick={handleReset}
            className="py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ری سیٹ (0)</span>
          </button>

          <button
            onClick={() => {
              const newTarget = target === 33 ? 100 : target === 100 ? 313 : target === 313 ? 1000 : 33;
              setTarget(newTarget);
            }}
            className="py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-semibold transition"
          >
            ہدف: {target}
          </button>

          <button
            onClick={() => {
              setCount(prev => prev + 10);
              setTotalRecited(prev => prev + 10);
              playClickSound();
            }}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition"
          >
            +10 اضافہ
          </button>
        </div>

        {/* Total counted in this session */}
        <p className="text-[11px] text-stone-400 mt-4">
          اس سیشن میں کل تسبیحات: <strong className="text-emerald-600 dark:text-emerald-400">{totalRecited}</strong>
        </p>

      </div>

    </div>
  );
};
