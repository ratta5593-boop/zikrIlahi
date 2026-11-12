import React, { useState } from 'react';
import { PDFBook } from '../../types';
import { 
  X, 
  Download, 
  BookOpen, 
  Maximize2, 
  Minimize2, 
  Sun, 
  Moon, 
  Type, 
  Share2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface PDFReaderModalProps {
  book: PDFBook | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PDFReaderModal: React.FC<PDFReaderModalProps> = ({
  book,
  isOpen,
  onClose
}) => {
  const [isNightMode, setIsNightMode] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'text' | 'pdf'>('text');

  if (!isOpen || !book) return null;

  const totalPages = book.pages || 50;

  const handleDownload = () => {
    if (book.fileUrl) {
      const a = document.createElement('a');
      a.href = book.fileUrl;
      a.download = `${book.title}.pdf`;
      a.target = '_blank';
      a.click();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `کتاب: ${book.title}\nمصنف: ${book.author}\n\nروحانی سلسلہ و اذکار کتب خانہ سے مطالعہ فرمائیں۔`,
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans-ur">
      <div className={`relative w-full max-w-4xl rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden text-right max-h-[94vh] flex flex-col ${
        isNightMode ? 'bg-stone-950 text-stone-100 border-stone-800' : 'bg-white text-stone-900'
      }`}>
        
        {/* Top Navigation */}
        <div className="bg-emerald-950 p-4 sm:p-5 text-white flex-shrink-0 border-b border-emerald-800">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="بند کریں"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-amber-300"
                title={isNightMode ? 'دن کا موڈ' : 'نائٹ ریڈنگ موڈ'}
              >
                {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={handleShare}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200"
                title="شیئر کریں"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center flex-grow">
              <h2 className="font-urdu text-base sm:text-lg font-bold text-amber-300 truncate max-w-md mx-auto">
                {book.title}
              </h2>
              <p className="text-[11px] text-emerald-200/80 truncate">
                {book.author} • {book.category}
              </p>
            </div>

            {/* View Mode & Download */}
            <div className="flex items-center gap-2">
              {book.fileUrl && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold transition shadow-sm"
                  title="PDF فائل ڈاؤنلوڈ کریں"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ڈاؤنلوڈ</span>
                </button>
              )}
            </div>
          </div>

          {/* Sub Toolbar */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-emerald-800/60 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('text')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  viewMode === 'text' ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-emerald-900/60 text-emerald-200'
                }`}
              >
                خلاصہ و ابواب (Reader)
              </button>
              {book.fileUrl && (
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    viewMode === 'pdf' ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-emerald-900/60 text-emerald-200'
                  }`}
                >
                  مکمل پی ڈی ایف ویور
                </button>
              )}
            </div>

            {/* Font Zoom for Reader */}
            {viewMode === 'text' && (
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-emerald-200">فونٹ:</span>
                <button
                  onClick={() => setFontSizeOffset(p => Math.max(-2, p - 1))}
                  className="w-5 h-5 rounded bg-emerald-900 text-xs flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={() => setFontSizeOffset(p => Math.min(6, p + 1))}
                  className="w-5 h-5 rounded bg-emerald-900 text-xs flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reader Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-8">
          {viewMode === 'text' ? (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Book Info Card */}
              <div className={`p-5 rounded-2xl border ${
                isNightMode ? 'bg-stone-900 border-stone-800' : 'bg-emerald-50/60 border-emerald-200'
              }`}>
                <h3 className="font-urdu text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-2">
                  کتاب کا اجمالی جائزہ
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-urdu leading-relaxed">
                  {book.description}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
                  <span>کل صفحات: {book.pages}</span>
                  {book.fileSize && <span>سائز: {book.fileSize}</span>}
                  <span>تاریخ اندراج: {book.uploadedAt}</span>
                </div>
              </div>

              {/* Book Content / Chapter text */}
              <div className={`p-6 sm:p-8 rounded-2xl border font-urdu leading-loose whitespace-pre-line shadow-sm ${
                isNightMode ? 'bg-stone-900 border-stone-800 text-stone-200' : 'bg-white border-stone-200 text-stone-800'
              }`}
              style={{ fontSize: `${16 + fontSizeOffset}px` }}
              >
                {book.textContent || `باب اول: مطالعہ کتب و افادہ عام
یہ کتاب اسلامی کتب خانے میں محفوظ ہے اور صارفین کی آسانی کے لیے آف لائن پڑھنے کے لیے فراہم کی گئی ہے۔ آپ اس کتاب کا مکمل پی ڈی ایف اوپر موجود "مکمل پی ڈی ایف ویور" یا "ڈاؤنلوڈ" بٹن پر کلک کر کے بھی کھول سکتے ہیں۔`}
              </div>

            </div>
          ) : (
            <div className="w-full h-[65vh] rounded-2xl overflow-hidden border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 flex flex-col items-center justify-center">
              {book.fileUrl?.startsWith('data:application/pdf') || book.fileUrl?.endsWith('.pdf') ? (
                <iframe
                  src={book.fileUrl}
                  title={book.title}
                  className="w-full h-full border-none"
                />
              ) : (
                <div className="text-center p-6 space-y-3">
                  <BookOpen className="w-12 h-12 text-emerald-600 mx-auto" />
                  <p className="font-urdu text-base font-bold text-stone-800 dark:text-stone-200">
                    پی ڈی ایف فائل محفوظ ہے
                  </p>
                  <p className="text-xs text-stone-500 max-w-sm">
                    براہِ کرم اس کتاب کو براہ راست اپنے موبائل میں اوپن کرنے کے لیے نیچے بٹن دبائیں۔
                  </p>
                  <a
                    href={book.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
                  >
                    <span>براؤزر / پی ڈی ایف ریڈر میں کھولیں</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Page Navigator */}
        <div className={`p-3 border-t text-xs flex items-center justify-between flex-shrink-0 ${
          isNightMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'
        }`}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="font-sans">صفحہ {currentPage} از {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold"
          >
            بند کریں
          </button>
        </div>

      </div>
    </div>
  );
};
