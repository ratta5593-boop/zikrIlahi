import React, { useState, useRef } from 'react';
import { PDFBook } from '../../types';
import { StorageService } from '../../services/storage';
import { X, Upload, FileText, CheckCircle2, ShieldCheck, Lock, Sparkles } from 'lucide-react';

interface AdminUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAdded: (book: PDFBook) => void;
}

export const AdminUploadModal: React.FC<AdminUploadModalProps> = ({
  isOpen,
  onClose,
  onBookAdded
}) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(StorageService.isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  // Book form fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<PDFBook['category']>('تفسیر');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState<number>(100);
  const [fileUrl, setFileUrl] = useState('');
  const [textContent, setTextContent] = useState('');
  const [fileSizeStr, setFileSizeStr] = useState('2.5 MB');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcode or master code
    if (passcode === '1234' || passcode === 'admin' || passcode === 'silsila') {
      StorageService.setAdminAuthenticated(true);
      setIsAdminLoggedIn(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    setFileSizeStr(`${sizeInMb} MB`);

    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFileUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('براہ کرم کتاب کا نام درج کریں۔');
      return;
    }

    setIsUploading(true);

    try {
      const newBook = StorageService.addBook({
        title: title.trim(),
        author: author.trim() || 'اہلِ علم و قلم',
        category,
        description: description.trim() || 'کتب خانہ روحانی سلسلہ سے حاصل کردہ قیمتی کتاب۔',
        pages: Number(pages) || 50,
        fileUrl: fileUrl || 'https://archive.org/download/Bayan-Ul-Quran-Dr-Israr-Ahmed/Bayan-Ul-Quran.pdf',
        isEmbeddedContent: true,
        textContent: textContent.trim() || `${title}\n\nیہ کتاب ایڈمن پینل کے ذریعے کتب خانے میں شامل کی گئی ہے۔ تمام صارفین کی ڈیوائسز پر خودکار سنک ہو کر آف لائن پڑھنے کے لیے تیار ہے۔`,
        fileSize: fileSizeStr,
        isPreloaded: false
      });

      onBookAdded(newBook);
      setIsUploading(false);
      onClose();
    } catch {
      alert('کتاب شامل کرنے میں مسئلہ پیش آیا۔');
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans-ur">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden text-right max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 p-5 text-white flex items-center justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-urdu">ایڈمن پینل: نئی PDF کتاب اپلوڈ کریں</h2>
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
        </div>

        {/* Content: Auth Screen or Upload Form */}
        <div className="p-6 overflow-y-auto flex-grow text-stone-800 dark:text-stone-200">
          {!isAdminLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto text-center py-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 mx-auto flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-2">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="font-urdu text-lg font-bold text-stone-900 dark:text-stone-100">
                ایڈمن لاگ ان
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                کتب خانے میں نئی کتابیں شامل کرنے کے لیے پاس کوڈ درج فرمائیں۔ (آسانی کے لیے ڈیفالٹ کوڈ <strong>1234</strong> ہے)
              </p>

              <div>
                <input
                  type="password"
                  placeholder="ایڈمن پاس کوڈ"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-center font-sans tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {passError && (
                  <p className="text-red-500 text-xs mt-1">پاس کوڈ درست نہیں ہے۔ دوبارہ کوشش کریں۔</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
              >
                داخل ہوں (Enter)
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* File Upload Box */}
              <div>
                <label className="block font-bold mb-1.5 text-stone-700 dark:text-stone-300">
                  پی ڈی ایف فائل منتخب کریں (PDF File Upload):
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-500/50 hover:border-emerald-600 rounded-2xl p-4 text-center cursor-pointer bg-emerald-50/50 dark:bg-emerald-950/20 transition-colors"
                >
                  <Upload className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                  <p className="font-bold text-stone-800 dark:text-stone-200 text-xs">
                    {fileName ? `منتخب فائل: ${fileName} (${fileSizeStr})` : 'موبائل یا کمپیوٹر سے PDF فائل منتخب کرنے کے لیے یہاں کلک کریں'}
                  </p>
                  <p className="text-[10px] text-stone-500 mt-1">
                    (فائل خودکار طریقے سے موبائل اسٹوریج میں آف لائن محفوظ ہو جائے گی)
                  </p>
                </div>
              </div>

              {/* Or external web URL */}
              <div>
                <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                  یا آن لائن PDF لنک (Web URL) درج کریں:
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/book.pdf"
                  value={fileUrl.startsWith('data:') ? '' : fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-left font-sans text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                    کتاب کا نام <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: تفسیر بیان القرآن، دلائل الخیرات"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right font-urdu"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                    مصنف کا نام:
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً: ڈاکٹر اسرار احمدؒ"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right font-urdu"
                  />
                </div>
              </div>

              {/* Category & Pages */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                    کیٹیگری:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PDFBook['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right"
                  >
                    <option value="تفسیر">تفسیر قرآن</option>
                    <option value="سلسلہ و تصوف">سلسلہ و تصوف</option>
                    <option value="احادیث و سنن">احادیث و سنن</option>
                    <option value="ادعیہ و وظائف">ادعیہ و وظائف</option>
                    <option value="سیرت النبیﷺ">سیرت النبیﷺ</option>
                    <option value="دیگر کتب">دیگر کتب</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                    کل صفحات کی تعداد:
                  </label>
                  <input
                    type="number"
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-center font-sans"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                  مختصر تعارف و خصوصیات:
                </label>
                <textarea
                  rows={2}
                  placeholder="کتاب کے اہم مباحث اور قاری کے لیے رہنمائی"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right font-urdu"
                />
              </div>

              {/* Chapter summary text for Reader */}
              <div>
                <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                  اہم ابواب کا متن یا اقتباس (Reader Mode Content):
                </label>
                <textarea
                  rows={3}
                  placeholder="کتاب کا مقدمہ یا پہلا باب یہاں لکھ سکتے ہیں تاکہ بغیر پی ڈی ایف لوڈ کیے قاری پڑھ سکے"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-right font-urdu"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>{isUploading ? 'اپلوڈ جاری ہے...' : 'کتب خانہ میں شامل کریں'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
