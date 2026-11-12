import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  X, 
  FileCode, 
  FolderArchive, 
  ShieldCheck, 
  Zap,
  Globe
} from 'lucide-react';
import { OfflineDownloader } from '../services/offlineDownloader';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<boolean>;
  isInstallable: boolean;
  isIOS: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isInstallable,
  isIOS
}) => {
  const [downloadingHtml, setDownloadingHtml] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await onInstall();
    if (success) {
      onClose();
    }
  };

  const handleDownloadSingleFile = async () => {
    setDownloadingHtml(true);
    setDownloadSuccessMessage(null);
    const ok = await OfflineDownloader.downloadSingleHtmlFile();
    setDownloadingHtml(false);
    if (ok) {
      setDownloadSuccessMessage('آف لائن سنگل فائل (.html) کامیابی سے ڈاؤنلوڈ ہو گئی۔ اسے اپنے موبائل میں کسی بھی براؤزر سے بغیر انٹرنیٹ کے کھول سکتے ہیں!');
    } else {
      setDownloadSuccessMessage('فائل ڈاؤنلوڈ شروع ہو گئی ہے۔ براہ کرم ڈاؤنلوڈز فولڈر چیک کریں۔');
    }
  };

  const handleDownloadZipBundle = async () => {
    setDownloadingZip(true);
    setDownloadSuccessMessage(null);
    const ok = await OfflineDownloader.downloadOfflineZipPackage();
    setDownloadingZip(false);
    if (ok) {
      setDownloadSuccessMessage('مکمل آف لائن زپ پیکج (.zip) ڈاؤنلوڈ ہو چکا ہے!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-sans-ur">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden text-right max-h-[92vh] flex flex-col">
        
        {/* Header with Emerald Gradient */}
        <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white text-center flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="بند کریں"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center text-amber-300">
              <Download className="w-7 h-7" />
            </div>
          </div>

          <h2 className="text-xl font-bold font-urdu">آف لائن فائل ڈاؤنلوڈ و موبائل انسٹالیشن</h2>
          <p className="text-emerald-100 text-xs mt-1">
            ایپ کو سنگل آف لائن فائل کے طور پر ڈاؤنلوڈ کریں یا موبائل ہوم اسکرین پر انسٹال کریں
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-grow text-stone-800 dark:text-stone-200">
          
          {/* Success Banner */}
          {downloadSuccessMessage && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 rounded-2xl flex items-start gap-2 text-xs text-emerald-900 dark:text-emerald-200 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{downloadSuccessMessage}</span>
            </div>
          )}

          {/* Section 1: Direct Offline Downloadable Files */}
          <div className="p-5 bg-gradient-to-br from-amber-50 to-emerald-50/40 dark:from-stone-850 dark:to-stone-900 rounded-2xl border-2 border-emerald-500/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-300">
                1. آف لائن فائل اپنے موبائل یا کمپیوٹر میں ڈاؤنلوڈ کریں:
              </h3>
            </div>
            
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              یہ مکمل خود مختار فائل ہے جس میں تمام اذکار، تفاسیر، تسبیح کاؤنٹر اور کتب خانہ پیک ہے۔ ڈاؤنلوڈ کے بعد انٹرنیٹ کے بغیر بھی ہمیشہ کام کرے گی:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Option A: Single Standalone HTML File */}
              <button
                onClick={handleDownloadSingleFile}
                disabled={downloadingHtml}
                className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs shadow-md transition flex flex-col items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 text-center"
              >
                <div className="flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-amber-300" />
                  <span>{downloadingHtml ? 'ڈاؤنلوڈ جاری ہے...' : 'سنگل آف لائن فائل (.html)'}</span>
                </div>
                <span className="text-[10px] text-emerald-100 font-normal">
                  (موبائل میں ایک کلک پر کھلتی ہے)
                </span>
              </button>

              {/* Option B: Complete ZIP Package */}
              <button
                onClick={handleDownloadZipBundle}
                disabled={downloadingZip}
                className="p-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-md transition flex flex-col items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 text-center"
              >
                <div className="flex items-center gap-1.5">
                  <FolderArchive className="w-4 h-4 text-stone-950" />
                  <span>{downloadingZip ? 'زپ تیار ہو رہی ہے...' : 'مکمل آف لائن پیکج (.zip)'}</span>
                </div>
                <span className="text-[10px] text-amber-100 font-normal">
                  (مع اردو گائیڈ اور بیک اپ فائل)
                </span>
              </button>
            </div>
          </div>

          {/* Section 2: One-click Browser Install if Supported */}
          {isInstallable && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                2. اینڈرائڈ ایپ کے طور پر ہوم اسکرین پر انسٹال کریں:
              </p>
              <button
                onClick={handleInstallClick}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>موبائل میں باقاعدہ ایپ بنائیں (Install Web App)</span>
              </button>
            </div>
          )}

          {/* Section 3: Android Manual Step Guide */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              اینڈرائڈ موبائل پر چلانے کا طریقہ:
            </h3>

            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex items-start gap-2.5 p-2.5 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-800">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">۱</span>
                <p>اوپر موجود <strong>"سنگل آف لائن فائل (.html)"</strong> بٹن دبا کر فائل ڈاؤنلوڈ کریں۔</p>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-800">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">۲</span>
                <p>موبائل کے <strong>ڈاؤنلوڈز فولڈر (Downloads)</strong> میں جائیں، فائل پر ٹیپ کریں اور <strong>Open with Google Chrome (گوگل کروم)</strong> منتخب کریں۔</p>
              </div>

              {/* Crucial Note to prevent Android Text Viewer */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                <strong>اہم نکتہ:</strong> اگر آپ کے موبائل میں فائل کوڈ (Code) یا تحریر کی شکل میں کھلے، تو فائل کو ٹیکسٹ ویور کے بجائے <strong>Google Chrome</strong> میں کھولیں (فائل پر انگلی دبا کر رکھیں ➔ Open with ➔ Chrome)۔
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-800">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">۳</span>
                <p>کروم میں اوپر موجود <strong>تین نقطوں (⋮)</strong> پر ٹیپ کر کے <strong>"Add to Home screen"</strong> منتخب کریں تاکہ روزانہ موبائل ہوم اسکرین سے ایک کلک پر فل اسکرین چلے۔</p>
              </div>
            </div>
          </div>

          {/* Section 4: iOS Guide if applicable */}
          {isIOS && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 text-xs text-stone-700 dark:text-stone-300 space-y-1">
              <strong className="text-amber-800 dark:text-amber-300 block">آئی فون (iPhone / iPad) پر:</strong>
              <p>سفاری کے شیئر بٹن پر کلک کریں اور "Add to Home Screen" منتخب فرمائیں۔</p>
            </div>
          )}

          {/* Key Advantages Checklist */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 dark:text-stone-400 pt-1">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>100% آف لائن بغیر انٹرنیٹ</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20">
              <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span>واٹس ایپ پر شیئر کے قابل</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between flex-shrink-0">
          <button
            onClick={handleDownloadSingleFile}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>آف لائن فائل ڈاؤنلوڈ (.html)</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-800 dark:text-stone-200 text-xs font-semibold transition"
          >
            بند کریں
          </button>
        </div>

      </div>
    </div>
  );
};
