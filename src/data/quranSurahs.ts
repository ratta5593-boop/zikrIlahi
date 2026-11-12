import { QuranSurah } from '../types';

export const all114SurahsMetadata = [
  { number: 1, urduName: 'سورۃ الفاتحہ', arabicName: 'الفاتحة', englishName: 'Al-Fatihah', englishTranslation: 'The Opening', verses: 7, type: 'مکی', para: 1 },
  { number: 2, urduName: 'سورۃ البقرہ', arabicName: 'البقرة', englishName: 'Al-Baqarah', englishTranslation: 'The Cow', verses: 286, type: 'مدنی', para: 1 },
  { number: 3, urduName: 'سورۃ آل عمران', arabicName: 'آل عمران', englishName: 'Ali \'Imran', englishTranslation: 'Family of Imran', verses: 200, type: 'مدنی', para: 3 },
  { number: 4, urduName: 'سورۃ النساء', arabicName: 'النساء', englishName: 'An-Nisa', englishTranslation: 'The Women', verses: 176, type: 'مدنی', para: 4 },
  { number: 5, urduName: 'سورۃ المائدہ', arabicName: 'المائدة', englishName: 'Al-Ma\'idah', englishTranslation: 'The Table Spread', verses: 120, type: 'مدنی', para: 6 },
  { number: 6, urduName: 'سورۃ الانعام', arabicName: 'الأنعام', englishName: 'Al-An\'am', englishTranslation: 'The Cattle', verses: 165, type: 'مکی', para: 7 },
  { number: 7, urduName: 'سورۃ الاعراف', arabicName: 'الأعراف', englishName: 'Al-A\'raf', englishTranslation: 'The Heights', verses: 206, type: 'مکی', para: 8 },
  { number: 8, urduName: 'سورۃ الانفال', arabicName: 'الأنفال', englishName: 'Al-Anfal', englishTranslation: 'The Spoils of War', verses: 75, type: 'مدنی', para: 9 },
  { number: 9, urduName: 'سورۃ التوبہ', arabicName: 'التوبة', englishName: 'At-Tawbah', englishTranslation: 'The Repentance', verses: 129, type: 'مدنی', para: 10 },
  { number: 10, urduName: 'سورۃ یونس', arabicName: 'يونس', englishName: 'Yunus', englishTranslation: 'Jonah', verses: 109, type: 'مکی', para: 11 },
  { number: 11, urduName: 'سورۃ ہود', arabicName: 'هود', englishName: 'Hud', englishTranslation: 'Hud', verses: 123, type: 'مکی', para: 11 },
  { number: 12, urduName: 'سورۃ یوسف', arabicName: 'يوسف', englishName: 'Yusuf', englishTranslation: 'Joseph', verses: 111, type: 'مکی', para: 12 },
  { number: 13, urduName: 'سورۃ الرعد', arabicName: 'الرعد', englishName: 'Ar-Ra\'d', englishTranslation: 'The Thunder', verses: 43, type: 'مدنی', para: 13 },
  { number: 14, urduName: 'سورۃ ابراہیم', arabicName: 'إبراهيم', englishName: 'Ibrahim', englishTranslation: 'Abraham', verses: 52, type: 'مکی', para: 13 },
  { number: 15, urduName: 'سورۃ الحجر', arabicName: 'الحجر', englishName: 'Al-Hijr', englishTranslation: 'The Rocky Tract', verses: 99, type: 'مکی', para: 14 },
  { number: 16, urduName: 'سورۃ النحل', arabicName: 'النحل', englishName: 'An-Nahl', englishTranslation: 'The Bee', verses: 128, type: 'مکی', para: 14 },
  { number: 17, urduName: 'سورۃ الاسراء (بنی اسرائیل)', arabicName: 'الإسراء', englishName: 'Al-Isra', englishTranslation: 'The Night Journey', verses: 111, type: 'مکی', para: 15 },
  { number: 18, urduName: 'سورۃ الکہف', arabicName: 'الكهف', englishName: 'Al-Kahf', englishTranslation: 'The Cave', verses: 110, type: 'مکی', para: 15 },
  { number: 19, urduName: 'سورۃ مریم', arabicName: 'مريم', englishName: 'Maryam', englishTranslation: 'Mary', verses: 98, type: 'مکی', para: 16 },
  { number: 20, urduName: 'سورۃ طٰہٰ', arabicName: 'طه', englishName: 'Taha', englishTranslation: 'Ta-Ha', verses: 135, type: 'مکی', para: 16 },
  { number: 21, urduName: 'سورۃ الانبیاء', arabicName: 'الأنبياء', englishName: 'Al-Anbiya', englishTranslation: 'The Prophets', verses: 112, type: 'مکی', para: 17 },
  { number: 22, urduName: 'سورۃ الحج', arabicName: 'الحج', englishName: 'Al-Hajj', englishTranslation: 'The Pilgrimage', verses: 78, type: 'مدنی', para: 17 },
  { number: 23, urduName: 'سورۃ المؤمنون', arabicName: 'المؤمنون', englishName: 'Al-Mu\'minun', englishTranslation: 'The Believers', verses: 118, type: 'مکی', para: 18 },
  { number: 24, urduName: 'سورۃ النور', arabicName: 'النور', englishName: 'An-Nur', englishTranslation: 'The Light', verses: 64, type: 'مدنی', para: 18 },
  { number: 25, urduName: 'سورۃ الفرقان', arabicName: 'الفرقان', englishName: 'Al-Furqan', englishTranslation: 'The Criterion', verses: 77, type: 'مکی', para: 18 },
  { number: 26, urduName: 'سورۃ الشعراء', arabicName: 'الشعراء', englishName: 'Ash-Shu\'ara', englishTranslation: 'The Poets', verses: 227, type: 'مکی', para: 19 },
  { number: 27, urduName: 'سورۃ النمل', arabicName: 'النمل', englishName: 'An-Naml', englishTranslation: 'The Ant', verses: 93, type: 'مکی', para: 19 },
  { number: 28, urduName: 'سورۃ القصص', arabicName: 'القصص', englishName: 'Al-Qasas', englishTranslation: 'The Stories', verses: 88, type: 'مکی', para: 20 },
  { number: 29, urduName: 'سورۃ العنکبوت', arabicName: 'العنكبوت', englishName: 'Al-\'Ankabut', englishTranslation: 'The Spider', verses: 69, type: 'مکی', para: 20 },
  { number: 30, urduName: 'سورۃ الروم', arabicName: 'الروم', englishName: 'Ar-Rum', englishTranslation: 'The Romans', verses: 60, type: 'مکی', para: 21 },
  { number: 31, urduName: 'سورۃ لقمان', arabicName: 'لقمان', englishName: 'Luqman', englishTranslation: 'Luqman', verses: 34, type: 'مکی', para: 21 },
  { number: 32, urduName: 'سورۃ السجدہ', arabicName: 'السجدة', englishName: 'As-Sajdah', englishTranslation: 'The Prostration', verses: 30, type: 'مکی', para: 21 },
  { number: 33, urduName: 'سورۃ الاحزاب', arabicName: 'الأحزاب', englishName: 'Al-Ahzab', englishTranslation: 'The Combined Forces', verses: 73, type: 'مدنی', para: 21 },
  { number: 34, urduName: 'سورۃ سبا', arabicName: 'سبأ', englishName: 'Saba', englishTranslation: 'Sheba', verses: 54, type: 'مکی', para: 22 },
  { number: 35, urduName: 'سورۃ فاطر', arabicName: 'فاطر', englishName: 'Fatir', englishTranslation: 'Originator', verses: 45, type: 'مکی', para: 22 },
  { number: 36, urduName: 'سورۃ یٰس', arabicName: 'يس', englishName: 'Ya-Sin', englishTranslation: 'Ya Sin', verses: 83, type: 'مکی', para: 22 },
  { number: 37, urduName: 'سورۃ الصافات', arabicName: 'الصافات', englishName: 'As-Saffat', englishTranslation: 'Those who set the Ranks', verses: 182, type: 'مکی', para: 23 },
  { number: 38, urduName: 'سورۃ ص', arabicName: 'ص', englishName: 'Sad', englishTranslation: 'The Letter Sad', verses: 88, type: 'مکی', para: 23 },
  { number: 39, urduName: 'سورۃ الزمر', arabicName: 'الزمر', englishName: 'Az-Zumar', englishTranslation: 'The Troops', verses: 75, type: 'مکی', para: 23 },
  { number: 40, urduName: 'سورۃ غافر (المؤمن)', arabicName: 'غافر', englishName: 'Ghafir', englishTranslation: 'The Forgiver', verses: 85, type: 'مکی', para: 24 },
  { number: 41, urduName: 'سورۃ فصلت', arabicName: 'فصلت', englishName: 'Fussilat', englishTranslation: 'Explained in Detail', verses: 54, type: 'مکی', para: 24 },
  { number: 42, urduName: 'سورۃ الشوریٰ', arabicName: 'الشورى', englishName: 'Ash-Shura', englishTranslation: 'The Consultation', verses: 53, type: 'مکی', para: 25 },
  { number: 43, urduName: 'سورۃ الزخرف', arabicName: 'الزخرف', englishName: 'Az-Zukhruf', englishTranslation: 'The Ornaments of Gold', verses: 89, type: 'مکی', para: 25 },
  { number: 44, urduName: 'سورۃ الدخان', arabicName: 'الدخان', englishName: 'Ad-Dukhan', englishTranslation: 'The Smoke', verses: 59, type: 'مکی', para: 25 },
  { number: 45, urduName: 'سورۃ الجاثیہ', arabicName: 'الجاثية', englishName: 'Al-Jathiyah', englishTranslation: 'The Crouching', verses: 37, type: 'مکی', para: 25 },
  { number: 46, urduName: 'سورۃ الاحقاف', arabicName: 'الأحقاف', englishName: 'Al-Ahqaf', englishTranslation: 'The Wind-Curved Sandhills', verses: 35, type: 'مکی', para: 26 },
  { number: 47, urduName: 'سورۃ محمد', arabicName: 'محمد', englishName: 'Muhammad', englishTranslation: 'Muhammad', verses: 38, type: 'مدنی', para: 26 },
  { number: 48, urduName: 'سورۃ الفتح', arabicName: 'الفتح', englishName: 'Al-Fath', englishTranslation: 'The Victory', verses: 29, type: 'مدنی', para: 26 },
  { number: 49, urduName: 'سورۃ الحجرات', arabicName: 'الحجرات', englishName: 'Al-Hujurat', englishTranslation: 'The Rooms', verses: 18, type: 'مدنی', para: 26 },
  { number: 50, urduName: 'سورۃ ق', arabicName: 'ق', englishName: 'Qaf', englishTranslation: 'The Letter Qaf', verses: 45, type: 'مکی', para: 26 },
  { number: 51, urduName: 'سورۃ الذاریات', arabicName: 'الذاريات', englishName: 'Adh-Dhariyat', englishTranslation: 'The Winnowing Winds', verses: 60, type: 'مکی', para: 26 },
  { number: 52, urduName: 'سورۃ الطور', arabicName: 'الطور', englishName: 'At-Tur', englishTranslation: 'The Mount', verses: 49, type: 'مکی', para: 27 },
  { number: 53, urduName: 'سورۃ النجم', arabicName: 'النجم', englishName: 'An-Najm', englishTranslation: 'The Star', verses: 62, type: 'مکی', para: 27 },
  { number: 54, urduName: 'سورۃ القمر', arabicName: 'القمر', englishName: 'Al-Qamar', englishTranslation: 'The Moon', verses: 55, type: 'مکی', para: 27 },
  { number: 55, urduName: 'سورۃ الرحمٰن', arabicName: 'الرحمن', englishName: 'Ar-Rahman', englishTranslation: 'The Beneficent', verses: 78, type: 'مدنی', para: 27 },
  { number: 56, urduName: 'سورۃ الواقعہ', arabicName: 'الواقعة', englishName: 'Al-Waqi\'ah', englishTranslation: 'The Inevitable', verses: 96, type: 'مکی', para: 27 },
  { number: 57, urduName: 'سورۃ الحدید', arabicName: 'الحديد', englishName: 'Al-Hadid', englishTranslation: 'The Iron', verses: 29, type: 'مدنی', para: 27 },
  { number: 58, urduName: 'سورۃ المجادلہ', arabicName: 'المجادلة', englishName: 'Al-Mujadila', englishTranslation: 'The Pleading Woman', verses: 22, type: 'مدنی', para: 28 },
  { number: 59, urduName: 'سورۃ الحشر', arabicName: 'الحشر', englishName: 'Al-Hashr', englishTranslation: 'The Exile', verses: 24, type: 'مدنی', para: 28 },
  { number: 60, urduName: 'سورۃ الممتحنہ', arabicName: 'الممتحنة', englishName: 'Al-Mumtahanah', englishTranslation: 'She that is to be examined', verses: 13, type: 'مدنی', para: 28 },
  { number: 61, urduName: 'سورۃ الصف', arabicName: 'الصف', englishName: 'As-Saf', englishTranslation: 'The Ranks', verses: 14, type: 'مدنی', para: 28 },
  { number: 62, urduName: 'سورۃ الجمعہ', arabicName: 'الجمعة', englishName: 'Al-Jumu\'ah', englishTranslation: 'The Congregation', verses: 11, type: 'مدنی', para: 28 },
  { number: 63, urduName: 'سورۃ المنافقون', arabicName: 'المنافقون', englishName: 'Al-Munafiqun', englishTranslation: 'The Hypocrites', verses: 11, type: 'مدنی', para: 28 },
  { number: 64, urduName: 'سورۃ التغابن', arabicName: 'التغابن', englishName: 'At-Taghabun', englishTranslation: 'The Mutual Disillusion', verses: 18, type: 'مدنی', para: 28 },
  { number: 65, urduName: 'سورۃ الطلاق', arabicName: 'الطلاق', englishName: 'At-Talaq', englishTranslation: 'The Divorce', verses: 12, type: 'مدنی', para: 28 },
  { number: 66, urduName: 'سورۃ التحریم', arabicName: 'التحريم', englishName: 'At-Tahrim', englishTranslation: 'The Prohibition', verses: 12, type: 'مدنی', para: 28 },
  { number: 67, urduName: 'سورۃ الملک', arabicName: 'الملك', englishName: 'Al-Mulk', englishTranslation: 'The Sovereignty', verses: 30, type: 'مکی', para: 29 },
  { number: 68, urduName: 'سورۃ القلم', arabicName: 'القلم', englishName: 'Al-Qalam', englishTranslation: 'The Pen', verses: 52, type: 'مکی', para: 29 },
  { number: 69, urduName: 'سورۃ الحاقہ', arabicName: 'الحاقة', englishName: 'Al-Haqqah', englishTranslation: 'The Reality', verses: 52, type: 'مکی', para: 29 },
  { number: 70, urduName: 'سورۃ المعارج', arabicName: 'المعارج', englishName: 'Al-Ma\'arij', englishTranslation: 'The Ascending Stairways', verses: 44, type: 'مکی', para: 29 },
  { number: 71, urduName: 'سورۃ نوح', arabicName: 'نوح', englishName: 'Nuh', englishTranslation: 'Noah', verses: 28, type: 'مکی', para: 29 },
  { number: 72, urduName: 'سورۃ الجن', arabicName: 'الجن', englishName: 'Al-Jinn', englishTranslation: 'The Jinn', verses: 28, type: 'مکی', para: 29 },
  { number: 73, urduName: 'سورۃ المزمل', arabicName: 'المزمل', englishName: 'Al-Muzzammil', englishTranslation: 'The Enshrouded One', verses: 20, type: 'مکی', para: 29 },
  { number: 74, urduName: 'سورۃ المدثر', arabicName: 'المدثر', englishName: 'Al-Muddaththir', englishTranslation: 'The Cloaked One', verses: 56, type: 'مکی', para: 29 },
  { number: 75, urduName: 'سورۃ القیامہ', arabicName: 'القيامة', englishName: 'Al-Qiyamah', englishTranslation: 'The Resurrection', verses: 40, type: 'مکی', para: 29 },
  { number: 76, urduName: 'سورۃ الانسان (الدہر)', arabicName: 'الإنسان', englishName: 'Al-Insan', englishTranslation: 'The Man', verses: 31, type: 'مدنی', para: 29 },
  { number: 77, urduName: 'سورۃ المرسلات', arabicName: 'المرسلات', englishName: 'Al-Mursalat', englishTranslation: 'The Emissaries', verses: 50, type: 'مکی', para: 29 },
  { number: 78, urduName: 'سورۃ النبا', arabicName: 'النبأ', englishName: 'An-Naba', englishTranslation: 'The Tidings', verses: 40, type: 'مکی', para: 30 },
  { number: 79, urduName: 'سورۃ النازعات', arabicName: 'النازعات', englishName: 'An-Nazi\'at', englishTranslation: 'Those who drag forth', verses: 46, type: 'مکی', para: 30 },
  { number: 80, urduName: 'سورۃ عبس', arabicName: 'عبس', englishName: '\'Abasa', englishTranslation: 'He Frowned', verses: 42, type: 'مکی', para: 30 },
  { number: 81, urduName: 'سورۃ التکویر', arabicName: 'التكوير', englishName: 'At-Takwir', englishTranslation: 'The Overthrowing', verses: 29, type: 'مکی', para: 30 },
  { number: 82, urduName: 'سورۃ الانفطار', arabicName: 'الانفطار', englishName: 'Al-Infitar', englishTranslation: 'The Cleaving', verses: 19, type: 'مکی', para: 30 },
  { number: 83, urduName: 'سورۃ المطففین', arabicName: 'المطففين', englishName: 'Al-Mutaffifin', englishTranslation: 'The Defrauding', verses: 36, type: 'مکی', para: 30 },
  { number: 84, urduName: 'سورۃ الانشقاق', arabicName: 'الانشقاق', englishName: 'Al-Inshiqaq', englishTranslation: 'The Splitting Asunder', verses: 25, type: 'مکی', para: 30 },
  { number: 85, urduName: 'سورۃ البروج', arabicName: 'البروج', englishName: 'Al-Buruj', englishTranslation: 'The Mansions of the Stars', verses: 22, type: 'مکی', para: 30 },
  { number: 86, urduName: 'سورۃ الطارق', arabicName: 'الطارق', englishName: 'At-Tariq', englishTranslation: 'The Morning Star', verses: 17, type: 'مکی', para: 30 },
  { number: 87, urduName: 'سورۃ الاعلیٰ', arabicName: 'الأعلى', englishName: 'Al-A\'la', englishTranslation: 'The Most High', verses: 19, type: 'مکی', para: 30 },
  { number: 88, urduName: 'سورۃ الغاشیہ', arabicName: 'الغاشية', englishName: 'Al-Ghashiyah', englishTranslation: 'The Overwhelming Event', verses: 26, type: 'مکی', para: 30 },
  { number: 89, urduName: 'سورۃ الفجر', arabicName: 'الفجر', englishName: 'Al-Fajr', englishTranslation: 'The Dawn', verses: 30, type: 'مکی', para: 30 },
  { number: 90, urduName: 'سورۃ البلد', arabicName: 'البلد', englishName: 'Al-Balad', englishTranslation: 'The City', verses: 20, type: 'مکی', para: 30 },
  { number: 91, urduName: 'سورۃ الشمس', arabicName: 'الشمس', englishName: 'Ash-Shams', englishTranslation: 'The Sun', verses: 15, type: 'مکی', para: 30 },
  { number: 92, urduName: 'سورۃ اللیل', arabicName: 'الليل', englishName: 'Al-Layl', englishTranslation: 'The Night', verses: 21, type: 'مکی', para: 30 },
  { number: 93, urduName: 'سورۃ الضحیٰ', arabicName: 'الضحى', englishName: 'Ad-Duha', englishTranslation: 'The Morning Hours', verses: 11, type: 'مکی', para: 30 },
  { number: 94, urduName: 'سورۃ الشرح (الانشراح)', arabicName: 'الشرح', englishName: 'Ash-Sharh', englishTranslation: 'The Relief', verses: 8, type: 'مکی', para: 30 },
  { number: 95, urduName: 'سورۃ التین', arabicName: 'التين', englishName: 'At-Tin', englishTranslation: 'The Fig', verses: 8, type: 'مکی', para: 30 },
  { number: 96, urduName: 'سورۃ العلق', arabicName: 'العلق', englishName: 'Al-\'Alaq', englishTranslation: 'The Clot', verses: 19, type: 'مکی', para: 30 },
  { number: 97, urduName: 'سورۃ القدر', arabicName: 'القدر', englishName: 'Al-Qadr', englishTranslation: 'The Power', verses: 5, type: 'مکی', para: 30 },
  { number: 98, urduName: 'سورۃ البینہ', arabicName: 'البينة', englishName: 'Al-Bayyinah', englishTranslation: 'The Clear Proof', verses: 8, type: 'مدنی', para: 30 },
  { number: 99, urduName: 'سورۃ الزلزال', arabicName: 'الزلزلة', englishName: 'Az-Zalzalah', englishTranslation: 'The Earthquake', verses: 8, type: 'مدنی', para: 30 },
  { number: 100, urduName: 'سورۃ العادیات', arabicName: 'العاديات', englishName: 'Al-\'Adiyat', englishTranslation: 'The Courser', verses: 11, type: 'مکی', para: 30 },
  { number: 101, urduName: 'سورۃ القارعہ', arabicName: 'القارعة', englishName: 'Al-Qari\'ah', englishTranslation: 'The Calamity', verses: 11, type: 'مکی', para: 30 },
  { number: 102, urduName: 'سورۃ التکاثر', arabicName: 'التكاثر', englishName: 'At-Takathur', englishTranslation: 'The Rivalry in world increase', verses: 8, type: 'مکی', para: 30 },
  { number: 103, urduName: 'سورۃ العصر', arabicName: 'العصر', englishName: 'Al-\'Asr', englishTranslation: 'The Declining Day', verses: 3, type: 'مکی', para: 30 },
  { number: 104, urduName: 'سورۃ الہمزہ', arabicName: 'الهمزة', englishName: 'Al-Humazah', englishTranslation: 'The Traducer', verses: 9, type: 'مکی', para: 30 },
  { number: 105, urduName: 'سورۃ الفیل', arabicName: 'الفيل', englishName: 'Al-Fil', englishTranslation: 'The Elephant', verses: 5, type: 'مکی', para: 30 },
  { number: 106, urduName: 'سورۃ قریش', arabicName: 'قريش', englishName: 'Quraysh', englishTranslation: 'Quraysh', verses: 4, type: 'مکی', para: 30 },
  { number: 107, urduName: 'سورۃ الماعون', arabicName: 'الماعون', englishName: 'Al-Ma\'un', englishTranslation: 'The Small Kindness', verses: 7, type: 'مکی', para: 30 },
  { number: 108, urduName: 'سورۃ الکوثر', arabicName: 'الكوثر', englishName: 'Al-Kawthar', englishTranslation: 'The Abundance', verses: 3, type: 'مکی', para: 30 },
  { number: 109, urduName: 'سورۃ الکافرون', arabicName: 'الكافرون', englishName: 'Al-Kafirun', englishTranslation: 'The Disbelievers', verses: 6, type: 'مکی', para: 30 },
  { number: 110, urduName: 'سورۃ النصر', arabicName: 'النصر', englishName: 'An-Nasr', englishTranslation: 'The Divine Support', verses: 3, type: 'مدنی', para: 30 },
  { number: 111, urduName: 'سورۃ المسد (لہب)', arabicName: 'المسد', englishName: 'Al-Masad', englishTranslation: 'The Palm Fiber', verses: 5, type: 'مکی', para: 30 },
  { number: 112, urduName: 'سورۃ الاخلاص', arabicName: 'الإخلاص', englishName: 'Al-Ikhlas', englishTranslation: 'The Sincerity', verses: 4, type: 'مکی', para: 30 },
  { number: 113, urduName: 'سورۃ الفلق', arabicName: 'الفلق', englishName: 'Al-Falaq', englishTranslation: 'The Daybreak', verses: 5, type: 'مکی', para: 30 },
  { number: 114, urduName: 'سورۃ الناس', arabicName: 'الناس', englishName: 'An-Nas', englishTranslation: 'The Mankind', verses: 6, type: 'مکی', para: 30 },
];

export const detailedSurahsList: QuranSurah[] = [
  {
    number: 1,
    name: 'الفاتحة',
    urduName: 'سورۃ الفاتحہ',
    englishName: 'Al-Fatihah',
    englishTranslation: 'The Opening',
    revelationType: 'مکی',
    numberOfAyahs: 7,
    paraNumber: 1,
    bayanUlQuran: {
      summary: 'سورۃ الفاتحہ قرآن مجید کا دیباچہ اور دل کا نچوڑ ہے۔ اس میں حمد، توحید، یومِ جزا پر ایمان، استعانت اور صراطِ مستقیم کی جامع ترین دعا سکھائی گئی ہے۔',
      shanENuzul: 'نزول کے اعتبار سے یہ پہلی مکمل سورت ہے جو مکہ مکرمہ کے ابتدائی دور میں نماز کی فرضیت کے ساتھ نازل ہوئی۔',
      virtues: 'حدیثِ قدسی کے مطابق اللہ تعالیٰ فرماتا ہے: "میں نے نماز کو اپنے اور اپنے بندے کے درمیان دو برابر حصوں میں بانٹ دیا ہے"۔ اسے ام الکتاب اور الشفاء بھی کہا جاتا ہے۔',
      keyThemes: ['اللہ تعالیٰ کی ربوبیت و رحمت', 'روزِ جزا کی حاکمیت مطلقہ', 'عبادت اور استعانت کا صرف اللہ کے ساتھ خاص ہونا', 'ہدایتِ صراطِ مستقیم کی التجا'],
      scholarlyNote: 'ڈاکٹر اسرار احمدؒ فرماتے ہیں: سورۃ الفاتحہ دراصل دعا ہے اور پورا قرآن اس کا عملی جواب ہے۔ بندہ جب سچے دل سے کہتا ہے "اهدنا الصراط المستقيم" تو پروردگار آگے پورا قرآن رکھ دیتا ہے کہ "ذٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ"۔'
    },
    tafheemUlQuran: {
      introduction: 'تفہیم القرآن کے مطابق یہ سورت قرآن مجید کا سرورق اور بنیادی مقدمہ ہے۔ یہ پڑھنے والے کے دل میں وہ طلب پیدا کرتی ہے جو ہدایت حاصل کرنے کے لیے ناگزیر ہے۔',
      historicalBackground: 'نبوت کے ابتدائی دور کی سورت ہے۔ اس سورت کے نازل ہونے سے قبل نماز میں کوئی باقاعدہ مکمل سورت نہیں پڑھی جاتی تھی۔ اس کے نزول سے نماز کو ایک مستقل نظم نصیب ہوا۔',
      coreTeachings: [
        'کائنات کا اصل نظام ربوبیت و رحمت پر قائم ہے، جبر و ظلم پر نہیں۔',
        'انسان اور خدا کا تعلق عاجز بندے اور رحیم مالک کا ہے۔',
        'صراطِ مستقیم ان لوگوں کی راہ ہے جن پر انعام ہوا، نہ کہ جن پر غضب ہوا یا جو بھٹک گئے۔'
      ],
      socialImpact: 'سید ابوالاعلیٰ مودودیؒ لکھتے ہیں کہ جب ایک سوسائٹی کا ہر فرد روزانہ کم از کم 17 بار سورۃ الفاتحہ پڑھتا ہے تو اس کے دل میں مسلسل اجتماعی عدل اور خدا کے حضور جواب دہی کا احساس تازہ رہتا ہے۔'
    },
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        urdu: 'شروع اللہ کے نام سے جو سب پر مہربان ہے، بہت رحم کرنے والا ہے۔',
        bayanNote: 'بیان القرآن: ہر نیک کام کے آغاز میں تسمیہ پڑھنا درحقیقت اس اعتراف کا اظہار ہے کہ انسان کا ہر عمل اللہ کی توفیق اور رحمت کا محتاج ہے۔',
        tafheemNote: 'تفہیم القرآن: تسمیہ دراصل مومن کے ذہن و فکر کو یہ سمت دیتا ہے کہ اس کی ہر دوڑ اور جستجو صرف اور صرف خدا کے نام سے اور اسی کے لیے ہو۔'
      },
      {
        numberInSurah: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        urdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پروردگار ہے۔',
        bayanNote: 'بیان القرآن: "الحمد" میں شکر اور ثناء دونوں اکٹھے ہیں۔ کائنات میں جہاں کہیں بھی حسن اور کمال ہے، اس کی اصل نسبت رب کائنات کی طرف ہے۔',
        tafheemNote: 'تفہیم القرآن: جب ساری خوبیوں اور احسانات کا مرکز اللہ ہے، تو پھر حمد و ستائش اور بندگی کا حقدار بھی تنہا وہی ہے۔'
      },
      {
        numberInSurah: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        urdu: 'نہایت مہربان، ہمیشہ رحم فرمانے والا ہے۔',
        bayanNote: 'بیان القرآن: رحمن وہ صفت ہے جس میں جوشِ رحمت کا پہلو غالب ہے، اور رحیم وہ صفت ہے جس میں دوام و تسلسل پایا جاتا ہے۔',
        tafheemNote: 'تفہیم القرآن: کائنات کا رب کوئی سنگدل یا ظالم بادشاہ نہیں بلکہ بے پایاں شفقت و کرم والا خالق ہے۔'
      },
      {
        numberInSurah: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        urdu: 'بدلے کے دن (روزِ جزا) کا مالک ہے۔',
        bayanNote: 'بیان القرآن: یہاں دین سے مراد جزا و سزا کا دن ہے۔ انسان کو یاد دلایا جا رہا ہے کہ تمہارے اعمال کا باقاعدہ حساب ہونا ہے۔',
        tafheemNote: 'تفہیم القرآن: انسان کو دنیا میں جو آزادی دی گئی ہے وہ عارضی ہے۔ انجام کار اسے اپنے مالک کے روبرو پائی پائی کا حساب دینا ہے۔'
      },
      {
        numberInSurah: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        urdu: 'ہم صرف تیری ہی عبادت کرتے ہیں اور صرف تجھ ہی سے مدد مانگتے ہیں۔',
        bayanNote: 'بیان القرآن: مفعول کی تقدیم حصر (انحصار) کا فائدہ دیتی ہے۔ یعنی نہ ہم تیرے سوا کسی کی بندگی کرتے ہیں اور نہ کسی اور سے مافوق الاسباب مدد مانگتے ہیں۔',
        tafheemNote: 'تفہیم القرآن: یہ انسان کی آزادی کا وہ تاریخی اعلان ہے جو اسے تمام جھوٹے معبودوں اور بندوں کی غلامی سے نکال کر خالص ایک اللہ کا تابع فرمان بناتا ہے۔'
      },
      {
        numberInSurah: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        urdu: 'ہمیں سیدھے راستے کی ہدایت فرما۔',
        bayanNote: 'بیان القرآن: انسان کی سب سے بڑی ضرورت روٹی یا مال نہیں بلکہ صراطِ مستقیم پر استقامت ہے۔ اس لیے سب سے پہلی مانگی گئی چیز ہدایت ہے۔',
        tafheemNote: 'تفہیم القرآن: صراط مستقیم وہ متوازن اور معتدل راستہ ہے جو افراط و تفریط سے پاک اور خالق کی رضا تک پہنچانے والا ہے۔'
      },
      {
        numberInSurah: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        urdu: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا راستہ جن پر غضب نازل ہوا اور نہ ہی گمراہوں کا۔',
        bayanNote: 'بیان القرآن: انعام یافتہ جماعت نبیین، صدیقین، شہداء اور صالحین کی ہے۔ اور مغضوب وہ ہیں جنہوں نے حق کو جان بوجھ کر ٹھکرایا، اور ضالین وہ ہیں جو جہالت کی وجہ سے بھٹک گئے۔',
        tafheemNote: 'تفہیم القرآن: یہاں تاریخ کے دو بڑے فکری انحرافات سے بچنے کی دعا مانگی گئی ہے: ہٹ دھرمی و سرکشی، اور بے بنیاد اوہام و تحریفات۔'
      }
    ]
  },
  {
    number: 36,
    name: 'يس',
    urduName: 'سورۃ یٰس',
    englishName: 'Ya-Sin',
    englishTranslation: 'Ya Sin',
    revelationType: 'مکی',
    numberOfAyahs: 83,
    paraNumber: '22-23',
    bayanUlQuran: {
      summary: 'سورۃ یٰس کو قلب القرآن (قرآن کا دل) قرار دیا گیا ہے۔ اس میں رسالت، توحید، اور آخرت کے بنیادی دلائل، حبیب نجار کا ایمان افروز واقعہ، اور کائنات کی نشانیوں کو نہایت دل نشین انداز میں بیان کیا گیا ہے۔',
      shanENuzul: 'مکہ مکرمہ کے وسطی دور میں نازل ہوئی۔ جب قریشِ مکہ نے رسول اللہﷺ کی نبوت اور قیامت کا شدید انکار کیا۔',
      virtues: 'نبی کریمﷺ کا ارشادِ گرامی ہے: "ہر چیز کا ایک دل ہوتا ہے اور قرآن کا دل سورۃ یٰس ہے"۔ نزع کے وقت اور فوت شدگان پر پڑھنے کی بھی تلقین کی گئی ہے۔',
      keyThemes: ['رسالتِ محمدیﷺ کی حقانیت', 'حبیب نجار کا تاریخی واقعہ اور حق کا دفاع', 'کائنات میں گردشِ شمس و قمر اور قدرتِ الٰہی', 'حشر و نشر اور اعضاء کی گواہی'],
      scholarlyNote: 'ڈاکٹر اسرار احمدؒ اس سورت کے اختتام پر فرماتے ہیں: آیت "فسبحان الذی بیدہ ملکوت کل شیء والیہ ترجعون" توحیدِ ربوبیت اور قیامت کے حتمی وقوع کا ایسا جاندار خلاصہ ہے جو قاری کی روح کو ہلا دیتا ہے۔'
    },
    tafheemUlQuran: {
      introduction: 'تفہیم القرآن میں اس سورت کا تجزیہ کرتے ہوئے مولانا مودودیؒ لکھتے ہیں کہ یہ سورت قریش کے جمود کو توڑنے کے لیے ایک شدید جھنجھوڑنے والا کلام ہے۔',
      historicalBackground: 'اس وقت کی سورت ہے جب مکہ کے سرداروں نے حق کے خلاف منظم محاذ بنا رکھا تھا۔ سورت نے انہیں خبردار کیا کہ تم سے پہلی قومیں بھی اسی غرور کی وجہ سے ہلاک ہوئیں۔',
      coreTeachings: [
        'قرآن مجید حکمت سے لبریز کتاب ہے، یہ کسی کا تخیل نہیں بلکہ پروردگار کا بھیجا ہوا کلام ہے۔',
        'مردہ زمین کو زندہ کرنا اس بات کا کھلا ثبوت ہے کہ اللہ انسانوں کو دوبارہ زندہ کرے گا۔',
        'قیامت کے دن زبانوں پر مہر لگ جائے گی اور ہاتھ پاؤں انسان کے اعمال کی گواہی دیں گے۔'
      ],
      socialImpact: 'یہ سورت معاشرے کے اندر احساسِ ذمہ داری اور مظلومین کے حق میں کھڑے ہونے کا حوصلہ پیدا کرتی ہے جیسا کہ اصحاب القریہ کے واقعے میں رجل صالح (حبیب نجار) نے اکیلے پوری قوم کا سامنا کیا۔'
    },
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'يس ۞ وَالْقُرْآنِ الْحَكِيمِ ۞ إِنَّكَ لَمِنَ الْمُرْسَلِينَ',
        urdu: 'یٰسٓ۔ حکمت سے بھرپور قرآن کی قسم! بے شک آپ یقیناً رسولوں میں سے ہیں۔',
        bayanNote: 'بیان القرآن: قرآن مجید کی حکمت خود اس کے منزل من اللہ ہونے اور لانے والے کی نبوت کی سب سے بڑی دلیل ہے۔',
        tafheemNote: 'تفہیم القرآن: اللہ تعالیٰ نے قرآن کی حکمت کو گواہ بنا کر رسول اللہﷺ کی رسالت پر مہر تصدیق ثبت فرمائی۔'
      },
      {
        numberInSurah: 2,
        arabic: 'وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ',
        urdu: 'اور ہم نے ان کے آگے ایک دیوار کھڑی کر دی اور ان کے پیچھے ایک دیوار، اور ان پر پردہ ڈال دیا سو وہ دیکھ نہیں پاتے۔',
        bayanNote: 'بیان القرآن: ہجرت کی رات جب رسول اللہﷺ نے مشرکین کے گھیرے سے نکلتے ہوئے خاک اڑائی تو یہی آیت تلاوت فرمائی۔ روحانی حفاظت کا لاجواب حصار ہے۔',
        tafheemNote: 'تفہیم القرآن: دل کی بصیرت چھن جانے کے بعد انسان آنکھیں رکھتے ہوئے بھی اندھا ہو جاتا ہے۔'
      },
      {
        numberInSurah: 3,
        arabic: 'إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ ۞ فَسُبْحَانَ الَّذِي بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ وَإِلَيْهِ تُرْجَعُونَ',
        urdu: 'اس کی شان تو یہ ہے کہ جب وہ کسی چیز کا ارادہ فرماتا ہے تو بس اتنا کہہ دیتا ہے "ہو جا" اور وہ ہو جاتی ہے۔ پس پاک ہے وہ ذات جس کے ہاتھ میں ہر چیز کی بادشاہی ہے اور اسی کی طرف تم سب لوٹائے جاؤ گے۔',
        bayanNote: 'بیان القرآن: کائنات کی پیدائش اور قیامت کی برپائی میں اللہ کو کوئی مشقت نہیں ہوتی۔ اس کا ایک امرِ "کن" ہر ناممکن کو ممکن بنا دیتا ہے۔',
        tafheemNote: 'تفہیم القرآن: جب ساری کائنات کا ریموٹ کنٹرول تنہا اسی مالک کے ہاتھ میں ہے، تو پھر انسان کا اس سے غافل رہنا سب سے بڑی نادانی ہے۔'
      }
    ]
  },
  {
    number: 67,
    name: 'الملك',
    urduName: 'سورۃ الملک (تبارک الذی)',
    englishName: 'Al-Mulk',
    englishTranslation: 'The Sovereignty',
    revelationType: 'مکی',
    numberOfAyahs: 30,
    paraNumber: 29,
    bayanUlQuran: {
      summary: 'سورۃ الملک انسان کو کائنات کی وسعتوں اور خامی سے پاک تخلیق پر غور و فکر کی دعوت دیتی ہے اور عذابِ قبر سے حفاظت کی ضامن ہے۔',
      shanENuzul: 'مکی دور کی ابتدائی سورت ہے جس میں شرک کے بطلان اور کائنات میں اللہ کے مکمل تسلط کو بیان کیا گیا ہے۔',
      virtues: 'حدیثِ نبویﷺ میں ارشاد ہے: "قرآن میں تیس آیتوں پر مشتمل ایک ایسی سورت ہے جو اپنے پڑھنے والے کی بخشش تک سفارش کرتی رہتی ہے، اور وہ سورۃ الملک ہے"۔ رات کو پڑھ کر سونا سنت ہے۔',
      keyThemes: ['زندگی اور موت کا مقصد: اچھے عمل کا امتحان', 'آسمانوں کی تخلیق میں کوئی خلل اور نقص نہ ہونا', 'جہنم کے داروغوں کا مکالمہ', 'خفیہ اور ظاہر ہر چیز سے باخبر رب'],
      scholarlyNote: 'ڈاکٹر اسرار احمدؒ بیان کرتے ہیں کہ جو شخص رات کو سونے سے قبل سورۃ الملک پڑھنے کا معمول بنا لے، وہ قبر کے فتنوں اور اندھیروں سے مامون ہو جاتا ہے۔'
    },
    tafheemUlQuran: {
      introduction: 'تفہیم القرآن میں اسے دعوتِ فکر کی سب سے مؤثر سورت قرار دیا گیا ہے۔ یہ بندے کو اپنے پاؤں کے نیچے اور سر کے اوپر پھیلی ہوئی نشانیوں کی طرف متوجہ کرتی ہے۔',
      historicalBackground: 'اس دور کی سورت ہے جب کفارِ مکہ رسول اللہﷺ کو نقصان پہنچانے کے خفیہ منصوبے بنایا کرتے تھے۔ اللہ نے فرمایا کہ تم خواہ بات چھپاؤ یا ببانگِ دہل کہو، وہ سینوں کے بھیدوں سے بھی واقف ہے۔',
      coreTeachings: [
        'خدا نے انسان کو اس لیے نہیں بنایا کہ وہ غفلت کی زندگی گزارے، بلکہ آزمائش کے لیے پیدا کیا۔',
        'پرندوں کا ہوا میں اڑنا اور پر سمیٹنا اللہ کے قانونِ رحمت کے تحت ہے۔',
        'اگر تمہارا پانی زمین کی گہرائیوں میں اتر جائے تو کون ہے جو تمہیں میٹھا چشمہ نکال کر دے گا؟'
      ],
      socialImpact: 'یہ سورت انسان کے دل میں توکل اور اپنی حدود کا ادراک پیدا کرتی ہے، غرور کا سر نیچا کرتی ہے اور خالق کے آگے سرتسلیم خم کرنے کا درس دیتی ہے۔'
    },
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        urdu: 'نہایت بابرکت ہے وہ ذات جس کے دستِ قدرت میں تمام کائنات کی بادشاہی ہے، اور وہ ہر چیز پر کامل قدرت رکھنے والا ہے۔',
        bayanNote: 'بیان القرآن: "تبارک" کا مطلب ہے خیر و بھلائی کا چشمہ، یعنی اس کی ذات ہر برکت کا منبع ہے۔',
        tafheemNote: 'تفہیم القرآن: اقتدارِ اعلیٰ صرف اسی کا ہے، باقی سب اس کے بندے اور ماتحت ہیں۔'
      },
      {
        numberInSurah: 2,
        arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ',
        urdu: 'جس نے موت اور زندگی کو پیدا فرمایا تاکہ تمہیں آزمائے کہ تم میں سے کس کے عمل اچھے ہیں، اور وہ زبردست، بڑا بخشنے والا ہے۔',
        bayanNote: 'بیان القرآن: موت محض خاتمہ نہیں بلکہ ایک تخلیق شدہ مرحلہ ہے، اور مقصدِ حیات اچھے اور مخلصانہ عمل کی آزمائش ہے۔',
        tafheemNote: 'تفہیم القرآن: یہ آیت زندگی کا فلسفہ طے کرتی ہے: انسان دنیا میں موج میلہ کرنے نہیں آیا بلکہ حسنِ عمل کا مقابلہ کرنے آیا ہے۔'
      },
      {
        numberInSurah: 3,
        arabic: 'قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ',
        urdu: 'آپ فرمائیے کہ بھلا دیکھو تو اگر تمہارا پانی زمین میں اتر کر غائب ہو جائے تو کون ہے جو تمہارے لیے شفاف اور پینے کا پانی لائے گا؟',
        bayanNote: 'بیان القرآن: پانی انسان کی حیات کی سب سے بنیادی ضرورت ہے، اس نعمت کے ذریعے اللہ کی شکر گزاری کی تلقین کی گئی ہے۔',
        tafheemNote: 'تفہیم القرآن: مادیت پرست انسان جب وسائل پر ناز کرتا ہے تو قرآن اس سے وہ سب سے بنیادی چیز یاد دلاتا ہے جس پر اس کا کوئی بس نہیں۔'
      }
    ]
  },
  {
    number: 112,
    name: 'الإخلاص',
    urduName: 'سورۃ الاخلاص',
    englishName: 'Al-Ikhlas',
    englishTranslation: 'The Sincerity',
    revelationType: 'مکی',
    numberOfAyahs: 4,
    paraNumber: 30,
    bayanUlQuran: {
      summary: 'سورۃ الاخلاص توحیدِ خالص کا منشورِ اعظم ہے۔ چار مختصر جملوں میں اللہ کی وحدانیت، بے نیازی، اور ہر قسم کے شرک سے پاکی کو بیان کیا گیا ہے۔',
      shanENuzul: 'مشرکینِ مکہ نے رسول اللہﷺ سے سوال کیا: "اے محمد! اپنے رب کا نسب نامہ بیان کیجیے"۔ اس پر یہ سورت نازل ہوئی۔',
      virtues: 'صحیح بخاری کے مطابق یہ سورت ایک تہائی قرآن کے برابر ہے۔ اسے بار بار پڑھنے والے سے اللہ محبت فرماتا ہے۔',
      keyThemes: ['توحیدِ ذات اور توحیدِ صفات', 'اللہ تعالیٰ کا صمد (بے نیاز) ہونا', 'اولاد اور والدین سے منزہ ہونا', 'کوئی ہستی اس کی ہمسر نہیں'],
      scholarlyNote: 'ڈاکٹر اسرار احمدؒ فرماتے ہیں: فلسفہ و کلام کی سینکڑوں جلدیں جو بات واضح نہ کر سکیں، سورۃ الاخلاص کے چار چھوٹے جملوں نے شرک کے ہر شائبے کو جڑ سے اکھاڑ پھینکا۔'
    },
    tafheemUlQuran: {
      introduction: 'تفہیم القرآن میں مودودیؒ لکھتے ہیں کہ یہ سورت اسلامی عقیدہ توحید کی سب سے جامع اور فیصلہ کن دستاویز ہے۔',
      historicalBackground: 'مکہ میں بت پرستی، عیسائیت میں تثلیث، اور یہود میں عزیر کو بیٹا قرار دینے کے باطل عقائد رائج تھے۔ اس سورت نے بیک وقت تمام شرکیہ عقائد کا خاتمہ کر دیا۔',
      coreTeachings: [
        'اللہ ایک ہے، نہ اس کی ذات میں کوئی شریک ہے اور نہ صفات میں۔',
        'الصمد: وہ خود سب سے بے نیاز ہے جبکہ ہر مخلوق اپنے وجود اور بقا کے لیے اسی کی محتاج ہے۔',
        'نہ اس کی کوئی اولاد ہے نہ وہ کسی کی اولاد ہے، اس لیے نسب و نسل کے تمام وہم غلط ہیں۔'
      ],
      socialImpact: 'یہ عقیدہ انسان کو توہم پرستی اور غیر اللہ کے خوف سے آزاد کرتا ہے اور انسان کو باوقار، نڈر اور صرف ایک در کا سائل بناتا ہے۔'
    },
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        urdu: 'آپ کہہ دیجیے کہ وہ اللہ ایک ہے۔',
        bayanNote: 'بیان القرآن: لفظ "احد" وحدانیتِ مطلقہ کو ظاہر کرتا ہے جس کا کوئی جز یا حصہ نہیں ہو سکتا۔',
        tafheemNote: 'تفہیم القرآن: یہ اعلان ہے کہ کائنات کا خدا تنہا ہے، کوئی اس کے اقتدار کا ساجھی نہیں۔'
      },
      {
        numberInSurah: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        urdu: 'اللہ بے نیاز ہے (سب اس کے محتاج ہیں)۔',
        bayanNote: 'بیان القرآن: صمد وہ عظیم ہستی ہے جس کی طرف ہر ضرورت میں رجوع کیا جائے اور جو خود کسی کی محتاج نہ ہو۔',
        tafheemNote: 'تفہیم القرآن: اس ایک لفظ نے دنیا کے تمام نذر و نیاز اور باطل معبودوں کی محتاجی کو بے نقاب کر دیا۔'
      },
      {
        numberInSurah: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        urdu: 'نہ اس نے کسی کو جنا اور نہ وہ کسی سے جنا گیا۔',
        bayanNote: 'بیان القرآن: اس آیت نے مشرکین کے اس عقیدے کو بھی رد کر دیا جو فرشتوں کو اللہ کی بیٹیاں کہتے تھے اور عیسائیوں و یہودیوں کے شرک کا بھی خاتمہ کر دیا۔',
        tafheemNote: 'تفہیم القرآن: نہ اس کا کوئی سلسلہ نسب ہے نہ جانشین، وہ ہمیشہ سے ہے اور ہمیشہ رہے گا۔'
      },
      {
        numberInSurah: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        urdu: 'اور نہ ہی کوئی اس کا ہمسر اور برابر کا ہے۔',
        bayanNote: 'بیان القرآن: کائنات میں دور دور تک کوئی ایسی ہستی نہیں جو قدرت، علم یا حکمت میں اس کے برابر ہو سکے۔',
        tafheemNote: 'تفہیم القرآن: کوئی اس کی مانند نہیں، اس لیے کسی مخلوق کو اس کے مقام پر بٹھانا سب سے بڑا ظلم ہے۔'
      }
    ]
  }
];
