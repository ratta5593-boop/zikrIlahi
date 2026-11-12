import React, { useState } from 'react';
import { PDFBook } from '../../types';
import { 
  Library, 
  Search, 
  Plus, 
  BookOpen, 
  Download, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  FileText
} from 'lucide-react';

interface BooksCatalogProps {
  books: PDFBook[];
  onOpenBook: (book: PDFBook) => void;
  onOpenAdminUpload: () => void;
  onDeleteBook: (bookId: string) => void;
}

export const BooksCatalog: React.FC<BooksCatalogProps> = ({
  books,
  onOpenBook,
  onOpenAdminUpload,
  onDeleteBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'تمام کتب' },
    { id: 'تفسیر', label: 'تفاسیرِ قرآن' },
    { id: 'ادعیہ و وظائف', label: 'ادعیہ و وظائف' },
    { id: 'درود و سلام', label: 'درود و سلام' },
    { id: 'سلسلہ و تصوف', label: 'سلسلہ و تصوف' },
  ];

  const filteredBooks = books.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || b.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans-ur">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-emerald-950 to-teal-950 p-6 md:p-8 text-white shadow-xl border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-400/30">
              <Library className="w-3.5 h-3.5" />
              <span>پی ڈی ایف کتب خانہ و ڈیجیٹل لائبریری</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-urdu text-white tracking-wide">
              اسلامی کتب خانہ و تفاسیر کا ذخیرہ
            </h2>
            <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl mt-1 leading-relaxed">
              تفسیر بیان القرآن، تفہیم القرآن، حصن المسلم، دلائل الخیرات شریف اور سلسلہ عالیہ کے منتخب اوراد۔ ایڈمن پینل کے ذریعے نئی کتب بھی اپلوڈ کی جا سکتی ہیں۔
            </p>
          </div>

          <button
            onClick={onOpenAdminUpload}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs md:text-sm shadow-lg transition-all cursor-pointer self-start md:self-auto"
          >
            <ShieldCheck className="w-4 h-4 text-stone-950" />
            <span>ایڈمن پینل (نئی کتاب اپلوڈ کریں)</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="کتاب کا نام، مصنف یا موضوع تلاش کریں..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <Search className="absolute right-3 top-3 w-4 h-4 text-stone-400" />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white font-bold shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => {
          return (
            <div
              key={book.id}
              className="group relative flex flex-col justify-between bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 p-5 overflow-hidden"
            >
              <div>
                {/* Header: Category Badge and Delete for custom */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {book.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>آف لائن دستیاب</span>
                    </span>

                    {!book.isPreloaded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`کیا آپ واقعی "${book.title}" کو حذف کرنا چاہتے ہیں؟`)) {
                            onDeleteBook(book.id);
                          }
                        }}
                        className="p-1 rounded-lg text-stone-400 hover:text-red-500 transition-colors"
                        title="حذف کریں"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Book Title */}
                <h3
                  onClick={() => onOpenBook(book)}
                  className="font-urdu text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors cursor-pointer mb-1"
                >
                  {book.title}
                </h3>

                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-3">
                  مصنف: {book.author}
                </p>

                {/* Description snippet */}
                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 mb-4 font-urdu leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="text-[11px] text-stone-500">
                  <span>{book.pages} صفحات</span>
                  {book.fileSize && <span> • {book.fileSize}</span>}
                </div>

                <button
                  onClick={() => onOpenBook(book)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>مطالعہ فرمائیں</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
