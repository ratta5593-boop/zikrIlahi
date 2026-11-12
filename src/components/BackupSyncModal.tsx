import React, { useState, useRef } from 'react';
import { StorageService } from '../services/storage';
import { Database, Download, Upload, RefreshCw, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface BackupSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReload: () => void;
}

export const BackupSyncModal: React.FC<BackupSyncModalProps> = ({
  isOpen,
  onClose,
  onDataReload
}) => {
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const dataStr = StorageService.exportDatabaseJSON();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `silsila-azkar-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage({ text: 'بیک اپ فائل کامیابی سے ڈاؤنلوڈ ہو گئی!', type: 'success' });
    } catch {
      setMessage({ text: 'بیک اپ بنانے میں خرابی پیش آئی۔', type: 'error' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const success = StorageService.importDatabaseJSON(content);
        if (success) {
          setMessage({ text: 'ڈیٹا کامیابی سے بحال (Restore) ہو گیا!', type: 'success' });
          onDataReload();
        } else {
          setMessage({ text: 'فائل کا فارمیٹ درست نہیں تھا۔', type: 'error' });
        }
      } catch {
        setMessage({ text: 'فائل پڑھنے میں غلطی ہوئی۔', type: 'error' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden text-right font-sans-ur">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-5 text-white flex items-center justify-between">
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-urdu">ڈیٹا سنک اور بیک اپ</h2>
            <Database className="w-5 h-5 text-amber-300" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            آپ کے تمام اذکار، روزانہ کے ٹکس (Checkmarks)، تسبیح کی گنتی اور اپلوڈ شدہ کتب آپ کے موبائل کی میموری میں آف لائن محفوظ ہیں۔ اگر آپ موبائل بدل رہے ہیں یا محفوظ ریکارڈ رکھنا چاہتے ہیں تو بیک اپ محفوظ کر سکتے ہیں۔
          </p>

          {message && (
            <div className={`p-3 rounded-xl flex items-center gap-2 text-xs ${
              message.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-300' 
                : 'bg-red-50 text-red-800 border border-red-300'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
              <span>{message.text}</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            {/* Export Backup */}
            <button
              onClick={handleExport}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              <span>تمام ڈیٹا کا بیک اپ ڈاؤنلوڈ کریں (Export Backup)</span>
            </button>

            {/* Import Backup */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-300 dark:border-stone-700 transition"
              >
                <Upload className="w-4 h-4 text-amber-500" />
                <span>پرانا بیک اپ بحال کریں (Restore Backup JSON)</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900 text-[11px] text-amber-800 dark:text-amber-200">
            <strong>خودکار کلاؤڈ سنک:</strong> انٹرنیٹ دستیاب ہونے پر نئے اذکار اور اپڈیٹس خودکار طور پر مطابقت پذیر ہو جاتے ہیں۔
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-850 border-t border-stone-200 dark:border-stone-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold"
          >
            بند کریں
          </button>
        </div>

      </div>
    </div>
  );
};
