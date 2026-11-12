import React, { useState, useEffect } from 'react';
import { Wazifa } from '../../types';
import { useSoundVibration } from '../../hooks/useSoundVibration';
import confetti from 'canvas-confetti';
import { X, Volume2, VolumeX, Smartphone, RotateCcw, CheckCircle, Sparkles } from 'lucide-react';

interface DigitalTasbeehModalProps {
  wazifa: Wazifa | null;
  isOpen: boolean;
  onClose: () => void;
  onIncrement: (wazifaId: string, step?: number) => void;
  onResetToday: (wazifaId: string) => void;
}

export const DigitalTasbeehModal: React.FC<DigitalTasbeehModalProps> = ({
  wazifa,
  isOpen,
  onClose,
  onIncrement,
  onResetToday,
}) => {
  const {
    isSoundEnabled,
    setIsSoundEnabled,
    isVibrationEnabled,
    setIsVibrationEnabled,
    playClickSound,
    playMilestoneSound,
    triggerVibrate,
  } = useSoundVibration();

  const [localCount, setLocalCount] = useState(0);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    if (wazifa) {
      setLocalCount(wazifa.currentCountToday || 0);
      setHasCelebrated((wazifa.currentCountToday || 0) >= wazifa.targetCount);
    }
  }, [wazifa, isOpen]);

  if (!isOpen || !wazifa) return null;

  const target = wazifa.targetCount || 100;
  const progressPct = Math.min(100, Math.round((localCount / target) * 100));

  const handleBeadClick = () => {
    const nextCount = localCount + 1;
    setLocalCount(nextCount);
    playClickSound();
    triggerVibrate(25);
    onIncrement(wazifa.id, 1);

    // Milestone reached
    if (nextCount === target && !hasCelebrated) {
      setHasCelebrated(true);
      playMilestoneSound();
      triggerVibrate([50, 100, 50, 100, 150]);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#059669', '#d97706', '#10b981', '#f59e0b']
        });
      } catch {
        // confetti fallback
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('کیا آپ آج کی گنتی صفر (Reset) کرنا چاہتے ہیں؟')) {
      setLocalCount(0);
      setHasCelebrated(false);
      onResetToday(wazifa.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans-ur">
      <div className="relative w-full max-w-md bg-stone-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden text-center text-white">
        
        {/* Top bar */}
        <div className="p-4 bg-emerald-950/80 border-b border-emerald-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              className={`p-2 rounded-xl border transition ${
                isSoundEnabled ? 'bg-emerald-800/60 border-emerald-600 text-amber-300' : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
              title={isSoundEnabled ? 'آواز بند کریں' : 'آواز کھولیں'}
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsVibrationEnabled(!isVibrationEnabled)}
              className={`p-2 rounded-xl border transition ${
                isVibrationEnabled ? 'bg-emerald-800/60 border-emerald-600 text-amber-300' : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
              title={isVibrationEnabled ? 'وائبریشن بند کریں' : 'وائبریشن کھولیں'}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-700/50">
            {wazifa.timeSlot}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wazifa text display */}
        <div className="p-5 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800">
          <h3 className="font-urdu text-base font-bold text-amber-400 mb-2">{wazifa.title}</h3>
          <p className="font-arabic text-xl md:text-2xl text-emerald-300 leading-loose px-2 py-1 max-h-36 overflow-y-auto">
            {wazifa.arabicText}
          </p>
          <p className="text-xs text-stone-300 mt-2 font-urdu line-clamp-2">
            {wazifa.urduTranslation}
          </p>
        </div>

        {/* Counter Ring & Tap Area */}
        <div className="p-8 flex flex-col items-center justify-center">
          
          <button
            onClick={handleBeadClick}
            className="group relative w-56 h-56 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-2xl focus:outline-none select-none"
            style={{
              background: 'radial-gradient(circle, #064e3b 0%, #022c22 80%, #000 100%)',
              boxShadow: '0 0 35px rgba(16, 185, 129, 0.25), inset 0 0 25px rgba(217, 119, 6, 0.3)'
            }}
          >
            {/* Circular Progress SVG Border */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="104"
                className="stroke-stone-800"
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="112"
                cy="112"
                r="104"
                className="stroke-amber-400 transition-all duration-300"
                strokeWidth="7"
                strokeDasharray={2 * Math.PI * 104}
                strokeDashoffset={2 * Math.PI * 104 * (1 - progressPct / 100)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Counter Number Display */}
            <span className="text-5xl font-extrabold tracking-tight text-white drop-shadow">
              {localCount}
            </span>
            <span className="text-xs text-emerald-300 mt-1 font-medium">
              ہدف: {target}
            </span>
            <span className="text-[11px] text-amber-400/90 mt-2 px-3 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-700/50">
              {progressPct}% مکمل
            </span>
            <span className="text-[10px] text-stone-400 mt-1">
              (پڑھنے کے لیے ٹیپ کریں)
            </span>
          </button>

          {/* Goal reached celebration message */}
          {localCount >= target && (
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-700/60 animate-bounce">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ماشاءاللہ! آج کا مطلوبہ ہدف مکمل ہو چکا ہے۔</span>
            </div>
          )}

        </div>

        {/* Footer controls: Reset, Quick +10, Done */}
        <div className="p-4 bg-stone-950 border-t border-stone-800/80 flex items-center justify-between text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ری سیٹ (Reset)</span>
          </button>

          <button
            onClick={() => {
              setLocalCount(prev => prev + 10);
              playClickSound();
              onIncrement(wazifa.id, 10);
            }}
            className="px-3 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/40 font-bold transition"
          >
            +10 فوری اضافہ
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold transition"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>محفوظ و بند</span>
          </button>
        </div>

      </div>
    </div>
  );
};
