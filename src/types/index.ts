export type TimeSlot = 
  | 'بعد نماز فجر' 
  | 'بعد نماز ظہر' 
  | 'بعد نماز عصر' 
  | 'بعد نماز مغرب' 
  | 'بعد نماز عشاء' 
  | 'تہجد کے وقت' 
  | 'صبح و شام' 
  | 'کسی بھی وقت';

export type WazifaCategory = 
  | 'سلسلہ عالیہ' 
  | 'درود و سلام' 
  | 'استغفار و توبہ' 
  | 'رزق و برکت' 
  | 'حفاظت و شفاء' 
  | 'قرآنی دعائیں' 
  | 'دیگر';

export interface Wazifa {
  id: string;
  title: string;
  arabicText: string;
  transliteration?: string;
  urduTranslation: string;
  benefits: string; // فضیلت اور فوائد
  timeSlot: TimeSlot; // مخصوص اوقات
  targetCount: number; // روزانہ کی مطلوبہ تعداد
  totalDays: number; // مقررہ کل دن (مثلاً 40 دن کا چلہ، 21 دن، 11 دن)
  currentDay: number; // موجودہ دن
  completedDays: string[]; // تاریخوں کی فہرست (YYYY-MM-DD) یا دن کے انڈیکس
  currentCountToday: number; // آج کی موجودہ گنتی
  startDate: string; // آغاز کی تاریخ
  category: WazifaCategory;
  isCustom?: boolean;
  notes?: string;
  completedAt?: string;
}

export interface Ayah {
  numberInSurah: number;
  arabic: string;
  urdu: string;
  bayanNote?: string;
  tafheemNote?: string;
}

export interface QuranSurah {
  number: number;
  name: string;
  urduName: string;
  englishName: string;
  englishTranslation: string;
  revelationType: 'مکی' | 'مدنی';
  numberOfAyahs: number;
  paraNumber: number | string;
  bayanUlQuran: {
    summary: string;
    shanENuzul: string;
    virtues: string;
    keyThemes: string[];
    scholarlyNote: string;
  };
  tafheemUlQuran: {
    introduction: string;
    historicalBackground: string;
    coreTeachings: string[];
    socialImpact: string;
  };
  ayahs: Ayah[];
}

export interface PDFBook {
  id: string;
  title: string;
  author: string;
  category: 'تفسیر' | 'سلسلہ و تصوف' | 'احادیث و سنن' | 'ادعیہ و وظائف' | 'درود و سلام' | 'سیرت النبیﷺ' | 'دیگر کتب';
  description: string;
  pages: number;
  fileUrl: string; // Blob, DataURL or web URL
  isEmbeddedContent?: boolean;
  textContent?: string;
  coverImage?: string;
  uploadedAt: string;
  fileSize?: string;
  isPreloaded?: boolean;
  lastReadPage?: number;
}

export type ActiveTab = 'azkar' | 'quran' | 'library' | 'tasbeeh' | 'about';
