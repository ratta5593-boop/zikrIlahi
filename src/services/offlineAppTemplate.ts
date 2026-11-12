import { StorageService } from './storage';
import { defaultAzkarList } from '../data/defaultAzkar';
import { all114SurahsMetadata, detailedSurahsList } from '../data/quranSurahs';
import { defaultBooksList } from '../data/defaultBooks';

export function generateStandaloneOfflineHtml(): string {
  const currentWazaif = StorageService.getWazaif() || defaultAzkarList;
  const currentBooks = StorageService.getBooks() || defaultBooksList;
  const currentBookmarks = StorageService.getBookmarks() || [1, 36, 67];

  const wazaifJson = JSON.stringify(currentWazaif).replace(/<\/script>/g, '<\\/script>');
  const surahsMetaJson = JSON.stringify(all114SurahsMetadata).replace(/<\/script>/g, '<\\/script>');
  const detailedSurahsJson = JSON.stringify(detailedSurahsList).replace(/<\/script>/g, '<\\/script>');
  const booksJson = JSON.stringify(currentBooks).replace(/<\/script>/g, '<\\/script>');
  const bookmarksJson = JSON.stringify(currentBookmarks).replace(/<\/script>/g, '<\\/script>');

  return `<!doctype html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>روحانی سلسلہ و اذکار - آف لائن ایپ</title>
  <meta name="theme-color" content="#064e3b">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #065f46;
      --primary-dark: #064e3b;
      --accent: #d97706;
      --bg: #fffbeb;
      --card-bg: #ffffff;
      --text: #1c1917;
      --text-muted: #57534e;
      --border: #e7e5e4;
    }
    .dark {
      --primary: #047857;
      --primary-dark: #022c22;
      --accent: #f59e0b;
      --bg: #0c0a09;
      --card-bg: #1c1917;
      --text: #f5f5f4;
      --text-muted: #a8a29e;
      --border: #292524;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body {
      font-family: 'Noto Nastaliq Urdu', 'Amiri', system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 2.2;
      transition: background 0.3s, color 0.3s;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .font-arabic { font-family: 'Amiri', 'Noto Sans Arabic', serif; line-height: 2.2; }
    .font-sans-ur { font-family: 'Noto Sans Arabic', system-ui, sans-serif; }
    .header {
      background: linear-gradient(135deg, #022c22, #064e3b 60%, #065f46);
      color: white;
      padding: 1rem;
      border-bottom: 2px solid #047857;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .brand { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
    .brand-logo {
      width: 44px; height: 44px; border-radius: 14px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      display: flex; align-items: center; justify-content: center;
      color: #022c22; font-size: 1.5rem; font-weight: bold;
      border: 2px solid #fef3c7;
    }
    .nav-tabs {
      display: flex; gap: 0.5rem; background: rgba(0,0,0,0.25);
      padding: 0.25rem; border-radius: 14px; overflow-x: auto;
    }
    .nav-btn {
      padding: 0.4rem 1rem; border-radius: 10px; border: none;
      background: transparent; color: #d1fae5; font-size: 0.85rem;
      cursor: pointer; font-family: inherit; font-weight: 600;
      transition: all 0.2s; white-space: nowrap;
    }
    .nav-btn.active { background: #d97706; color: #022c22; font-weight: bold; }
    .container { max-width: 1200px; margin: 1.5rem auto; padding: 0 1rem; flex-grow: 1; width: 100%; }
    .banner {
      background: linear-gradient(135deg, #064e3b, #047857);
      color: white; padding: 1.5rem; border-radius: 20px;
      margin-bottom: 1.5rem; border: 1px solid #10b981;
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
    }
    .stats-row {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 0.75rem; margin-top: 1rem; width: 100%;
    }
    .stat-box {
      background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 12px;
      text-align: center; border: 1px solid rgba(255,255,255,0.1);
    }
    .stat-val { font-size: 1.4rem; font-weight: bold; color: #fbbf24; font-family: sans-serif; }
    .stat-lbl { font-size: 0.75rem; color: #a7f3d0; }
    .cards-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.25rem;
    }
    .card {
      background: var(--card-bg); border: 1px solid var(--border);
      border-radius: 20px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;
    }
    .card-arabic {
      background: rgba(6, 95, 70, 0.08); padding: 1rem; border-radius: 14px;
      text-align: center; color: #065f46; font-size: 1.3rem; margin: 0.5rem 0;
      border: 1px solid rgba(6, 95, 70, 0.15);
    }
    .dark .card-arabic { color: #34d399; background: rgba(6, 95, 70, 0.25); }
    .progress-bar-wrap {
      width: 100%; height: 10px; background: rgba(0,0,0,0.1);
      border-radius: 999px; overflow: hidden; margin-top: 0.4rem;
    }
    .progress-bar {
      height: 100%; background: linear-gradient(90deg, #10b981, #d97706);
      border-radius: 999px; transition: width 0.3s;
    }
    .checkbox-row {
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(0,0,0,0.03); padding: 0.6rem 0.8rem; border-radius: 12px;
      border: 1px solid var(--border);
    }
    .chilla-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(42px, 1fr));
      gap: 0.4rem; margin-top: 1rem;
    }
    .day-badge {
      padding: 0.5rem 0.2rem; border-radius: 10px; border: 1px solid var(--border);
      text-align: center; font-size: 0.75rem; cursor: pointer; background: var(--card-bg);
      font-family: sans-serif; transition: all 0.2s;
    }
    .day-badge.checked { background: #059669; color: white; border-color: #059669; font-weight: bold; }
    .tasbeeh-ring {
      width: 230px; height: 230px; border-radius: 50%;
      background: radial-gradient(circle, #064e3b 0%, #022c22 80%, #000 100%);
      margin: 1.5rem auto; display: flex; flex-direction: column;
      align-items: center; justify-content: center; color: white;
      box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
      cursor: pointer; user-select: none; border: 6px solid #d97706;
      transition: transform 0.1s;
    }
    .tasbeeh-ring:active { transform: scale(0.96); }
    .btn {
      padding: 0.5rem 1rem; border-radius: 12px; border: none;
      cursor: pointer; font-family: inherit; font-size: 0.85rem; font-weight: bold;
      transition: all 0.2s;
    }
    .btn-primary { background: #059669; color: white; }
    .btn-primary:hover { background: #047857; }
    .btn-gold { background: #d97706; color: #022c22; }
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.7);
      backdrop-filter: blur(4px); display: none; align-items: center;
      justify-content: center; padding: 1rem; z-index: 100;
    }
    .modal-overlay.active { display: flex; }
    .modal-box {
      background: var(--card-bg); border-radius: 24px; width: 100%;
      max-width: 650px; max-height: 90vh; overflow-y: auto; padding: 1.5rem;
      border: 1px solid #10b981; box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    .badge {
      display: inline-block; padding: 0.2rem 0.6rem; border-radius: 999px;
      font-size: 0.75rem; font-weight: bold; background: rgba(16, 185, 129, 0.15);
      color: #059669;
    }
    .dark .badge { color: #34d399; background: rgba(16, 185, 129, 0.25); }
    footer {
      background: #022c22; color: #d1fae5; text-align: center;
      padding: 1rem; font-size: 0.95rem; border-top: 1px solid #064e3b;
      margin-top: auto;
    }
  </style>
</head>
<body>
  <noscript>
    <div style="background: #b45309; color: white; padding: 1rem; text-align: center; font-family: sans-serif; font-size: 1rem; font-weight: bold; border-bottom: 2px solid #78350f;">
      ⚠️ اہم رہنمائی: براہ کرم اس فائل کو ٹیکسٹ ویور کے بجائے Google Chrome (گوگل کروم) براؤزر میں کھولیں تاکہ ایپ مکمل طور پر کام کرے۔
    </div>
  </noscript>

  <!-- Header -->
  <header class="header">
    <div class="header-inner">
      <div class="brand" onclick="switchTab('azkar')">
        <div class="brand-logo">ﷲ</div>
        <div>
          <h1 style="font-size: 1.15rem; font-weight: bold; line-height: 1.2;">روحانی سلسلہ و اذکار</h1>
          <p style="font-size: 0.75rem; opacity: 0.85;">100% مکمل آف لائن ورژن</p>
        </div>
      </div>

      <nav class="nav-tabs">
        <button class="nav-btn active" id="tab-btn-azkar" onclick="switchTab('azkar')">اذکار و وظائف</button>
        <button class="nav-btn" id="tab-btn-quran" onclick="switchTab('quran')">قرآن و تفاسیر</button>
        <button class="nav-btn" id="tab-btn-library" onclick="switchTab('library')">کتب خانہ</button>
        <button class="nav-btn" id="tab-btn-tasbeeh" onclick="switchTab('tasbeeh')">تسبیح کاؤنٹر</button>
      </nav>

      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <button class="btn btn-gold" onclick="openAddModal()" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">+ نیا وظیفہ</button>
        <button class="btn" onclick="toggleDarkMode()" style="background: rgba(255,255,255,0.15); color: white; padding: 0.4rem 0.7rem;">🌓</button>
      </div>
    </div>
  </header>

  <!-- Main Content Container -->
  <main class="container">
    
    <!-- SECTION 1: AZKAR & WAZAIF -->
    <div id="section-azkar">
      <div class="banner">
        <div>
          <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24;">40 روزہ چلہ و وظائف ٹریکر</span>
          <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 0.3rem;">روزانہ کے وظائف و اوراد کا نظام</h2>
          <p style="font-size: 0.85rem; opacity: 0.9;">مخصوص اوقات، فضائل و فوائد، اور مستقل محفوظ رہنے والی چیک لسٹ</p>
        </div>
        <div class="stats-row" id="azkar-stats">
          <!-- Dynamically populated stats -->
        </div>
      </div>

      <div class="cards-grid" id="azkar-container">
        <!-- Azkar Cards populated by JS -->
      </div>
    </div>

    <!-- SECTION 2: QURAN & TAFSEER -->
    <div id="section-quran" style="display: none;">
      <div class="banner">
        <div>
          <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24;">تفسیر قرآن</span>
          <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 0.3rem;">تفسیر بیان القرآن اور تفہیم القرآن</h2>
          <p style="font-size: 0.85rem; opacity: 0.9;">114 سورتوں کی مکمل فہرست، شانِ نزول، اور تفسیری نکات</p>
        </div>
      </div>

      <div style="margin-bottom: 1rem;">
        <input type="text" id="quran-search" placeholder="سورت کا نام یا نمبر تلاش کریں..." 
          style="width: 100%; padding: 0.7rem 1rem; border-radius: 14px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text); font-family: inherit;"
          oninput="renderQuranList()" />
      </div>

      <div class="cards-grid" id="quran-container">
        <!-- Surahs populated by JS -->
      </div>
    </div>

    <!-- SECTION 3: BOOKS LIBRARY -->
    <div id="section-library" style="display: none;">
      <div class="banner">
        <div>
          <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24;">کتب خانہ</span>
          <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 0.3rem;">اسلامی کتب و روحانی تفاسیر</h2>
          <p style="font-size: 0.85rem; opacity: 0.9;">بیان القرآن، تفہیم القرآن، حصن المسلم اور دلائل الخیرات شریف</p>
        </div>
      </div>

      <div class="cards-grid" id="library-container">
        <!-- Books populated by JS -->
      </div>
    </div>

    <!-- SECTION 4: TASBEEH -->
    <div id="section-tasbeeh" style="display: none; text-align: center;">
      <div class="card" style="max-width: 500px; margin: 0 auto; padding: 2rem;">
        <h2 id="tasbeeh-title" class="font-arabic" style="font-size: 1.8rem; color: var(--primary);">سُبْحَانَ اللَّهِ</h2>
        <p id="tasbeeh-urdu" style="font-size: 0.85rem; color: var(--text-muted);">اللہ پاک ہے</p>

        <div class="tasbeeh-ring" onclick="incrementStandaloneTasbeeh()">
          <span id="tasbeeh-count" style="font-size: 4rem; font-weight: bold; font-family: sans-serif;">0</span>
          <span id="tasbeeh-target-lbl" style="font-size: 0.85rem; color: #a7f3d0;">ہدف: 33</span>
          <span style="font-size: 0.75rem; color: #fbbf24; margin-top: 0.4rem;">(پڑھنے کے لیے دائرے پر ٹیپ کریں)</span>
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
          <button class="btn btn-gold" onclick="resetStandaloneTasbeeh()">ری سیٹ (0)</button>
          <button class="btn btn-primary" onclick="changeTasbeehPreset()">اگلا ذکر منتخب کریں</button>
        </div>
      </div>
    </div>

  </main>

  <!-- Wazifa Detail Modal (40 Days Grid) -->
  <div class="modal-overlay" id="wazifa-modal">
    <div class="modal-box">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; margin-bottom: 1rem;">
        <h3 id="modal-wazifa-title" style="font-size: 1.25rem; font-weight: bold; color: var(--primary);"></h3>
        <button onclick="closeModal('wazifa-modal')" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text);">✕</button>
      </div>

      <div id="modal-wazifa-arabic" class="card-arabic"></div>
      <p id="modal-wazifa-translation" style="font-size: 0.95rem; margin: 0.75rem 0;"></p>
      
      <div style="background: rgba(217, 119, 6, 0.08); padding: 0.8rem; border-radius: 12px; margin: 0.75rem 0; font-size: 0.85rem; border: 1px solid rgba(217, 119, 6, 0.2);">
        <strong style="color: #b45309;">فضیلت و فوائد (Benefits):</strong>
        <p id="modal-wazifa-benefits"></p>
      </div>

      <h4 style="font-weight: bold; margin-top: 1rem; font-size: 0.95rem;">روزانہ کی 40 روزہ چیک لسٹ (روزانہ ایک دن ٹک کریں):</h4>
      <div class="chilla-grid" id="modal-wazifa-grid"></div>

      <div style="margin-top: 1.5rem; text-align: left;">
        <button class="btn btn-primary" onclick="closeModal('wazifa-modal')">بند کریں</button>
      </div>
    </div>
  </div>

  <!-- Surah Tafseer Reader Modal -->
  <div class="modal-overlay" id="quran-modal">
    <div class="modal-box">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; margin-bottom: 1rem;">
        <h3 id="modal-surah-title" style="font-size: 1.25rem; font-weight: bold; color: var(--primary);"></h3>
        <button onclick="closeModal('quran-modal')" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text);">✕</button>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
        <button class="btn btn-primary" id="btn-tafseer-bayan" onclick="switchTafseerMode('bayan')">تفسیر بیان القرآن</button>
        <button class="btn" id="btn-tafseer-tafheem" style="background: var(--border); color: var(--text);" onclick="switchTafseerMode('tafheem')">تفسیر تفہیم القرآن</button>
      </div>

      <div id="modal-tafseer-content" style="font-size: 0.9rem; line-height: 2.2; background: rgba(0,0,0,0.02); padding: 1rem; border-radius: 16px; border: 1px solid var(--border);"></div>

      <div style="margin-top: 1.5rem; text-align: left;">
        <button class="btn btn-primary" onclick="closeModal('quran-modal')">بند کریں</button>
      </div>
    </div>
  </div>

  <!-- Book Reader Modal -->
  <div class="modal-overlay" id="book-modal">
    <div class="modal-box">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; margin-bottom: 1rem;">
        <h3 id="modal-book-title" style="font-size: 1.25rem; font-weight: bold; color: var(--primary);"></h3>
        <button onclick="closeModal('book-modal')" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text);">✕</button>
      </div>
      <p id="modal-book-author" style="font-size: 0.85rem; color: var(--accent); margin-bottom: 0.75rem;"></p>
      <div id="modal-book-content" style="white-space: pre-line; font-size: 0.95rem; line-height: 2.3; background: rgba(0,0,0,0.02); padding: 1.2rem; border-radius: 16px; max-height: 55vh; overflow-y: auto;"></div>
      <div style="margin-top: 1.5rem; text-align: left;">
        <button class="btn btn-primary" onclick="closeModal('book-modal')">بند کریں</button>
      </div>
    </div>
  </div>

  <!-- Add Custom Wazifa Modal -->
  <div class="modal-overlay" id="add-modal">
    <div class="modal-box">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; margin-bottom: 1rem;">
        <h3 style="font-size: 1.25rem; font-weight: bold; color: var(--primary);">نیا ذکر یا وظیفہ شامل کریں</h3>
        <button onclick="closeModal('add-modal')" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text);">✕</button>
      </div>

      <form onsubmit="handleAddNewWazifa(event)" style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.85rem;">
        <div>
          <label style="font-weight: bold;">عنوان:</label>
          <input type="text" id="new-wazifa-title" required style="width: 100%; padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border); font-family: inherit;" />
        </div>
        <div>
          <label style="font-weight: bold;">عربی متن یا دعا:</label>
          <textarea id="new-wazifa-arabic" required rows="2" class="font-arabic" style="width: 100%; padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border); font-size: 1.2rem;"></textarea>
        </div>
        <div>
          <label style="font-weight: bold;">اردو ترجمہ:</label>
          <textarea id="new-wazifa-urdu" rows="2" style="width: 100%; padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border); font-family: inherit;"></textarea>
        </div>
        <div>
          <label style="font-weight: bold;">فضیلت اور فوائد:</label>
          <textarea id="new-wazifa-benefits" rows="2" style="width: 100%; padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border); font-family: inherit;"></textarea>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
          <div>
            <label style="font-weight: bold;">روزانہ تعداد:</label>
            <input type="number" id="new-wazifa-count" value="100" style="width: 100%; padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border);" />
          </div>
          <div>
            <label style="font-weight: bold;">کل دن (چلہ):</label>
            <input type="number" id="new-wazifa-days" value="40" style="width: 100%; padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border);" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; padding: 0.7rem;">محفوظ کریں</button>
      </form>
    </div>
  </div>

  <!-- Strict Required Footer -->
  <footer>
    دا آن لائن ایپ و آئیڈیا عطاء الرحمٰن عطاء نا تخلیق ءِ
  </footer>

  <script>
    // Embedded Data
    let wazaif = ${wazaifJson};
    let surahsMeta = ${surahsMetaJson};
    let detailedSurahs = ${detailedSurahsJson};
    let books = ${booksJson};
    let bookmarks = ${bookmarksJson};

    // Load from local storage if available
    try {
      const savedWazaif = localStorage.getItem('silsila_wazaif_data_v1');
      if (savedWazaif) wazaif = JSON.parse(savedWazaif);
    } catch(e) {}

    let currentSelectedSurah = null;
    let currentTafseerMode = 'bayan';

    const standalonePresets = [
      { arabic: 'سُبْحَانَ اللَّهِ', urdu: 'اللہ پاک ہے', target: 33 },
      { arabic: 'الْحَمْدُ لِلَّهِ', urdu: 'تمام تعریفیں اللہ کے لیے ہیں', target: 33 },
      { arabic: 'اللَّهُ أَكْبَرُ', urdu: 'اللہ سب سے بڑا ہے', target: 34 },
      { arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ', urdu: 'اللہ کے سوا کوئی معبود نہیں', target: 100 },
      { arabic: 'أَسْتَغْفِرُ اللَّهَ', urdu: 'میں اللہ سے بخشش مانگتا ہوں', target: 100 },
      { arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', urdu: 'درودِ پاک', target: 100 }
    ];
    let presetIdx = 0;
    let standaloneCount = 0;

    function saveWazaif() {
      try {
        localStorage.setItem('silsila_wazaif_data_v1', JSON.stringify(wazaif));
      } catch(e) {}
    }

    function switchTab(tab) {
      ['azkar', 'quran', 'library', 'tasbeeh'].forEach(t => {
        document.getElementById('section-' + t).style.display = (t === tab ? 'block' : 'none');
        document.getElementById('tab-btn-' + t).classList.toggle('active', t === tab);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleDarkMode() {
      document.body.classList.toggle('dark');
    }

    // Audio Click
    function playBeadSound() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch(e) {}
    }

    function triggerVibration(ms = 25) {
      if ('vibrate' in navigator) navigator.vibrate(ms);
    }

    // Azkar List Rendering
    function renderAzkar() {
      const container = document.getElementById('azkar-container');
      container.innerHTML = '';

      let totalDaysDone = 0;
      let totalWazaif = wazaif.length;

      wazaif.forEach((w) => {
        const total = w.totalDays || 40;
        const completed = (w.completedDays || []).length;
        const pct = Math.min(100, Math.round((completed / total) * 100));
        totalDaysDone += completed;

        const nextDay = Math.min(total, completed + 1);
        const isNextChecked = (w.completedDays || []).includes('Day-' + nextDay);

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = \`
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="badge">\${w.category || 'وظیفہ'}</span>
              <span style="font-size: 0.75rem; color: var(--accent);">\${w.timeSlot || 'بعد نماز فجر'}</span>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: bold; margin-top: 0.5rem; cursor: pointer;" onclick="openWazifaDetail('\${w.id}')">\${w.title}</h3>
            <div class="card-arabic font-arabic" onclick="openWazifaDetail('\${w.id}')" style="cursor: pointer;">\${w.arabicText}</div>
            <p style="font-size: 0.85rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              <strong>فضیلت: </strong>\${w.benefits}
            </p>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-top: 0.5rem;">
              <span>چلے کی تکمیل: \${completed} / \${total} دن</span>
              <span style="font-weight: bold; color: var(--accent);">\${pct}%</span>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-bar" style="width: \${pct}%;"></div>
            </div>
            <div class="checkbox-row" style="margin-top: 0.75rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                <input type="checkbox" \${isNextChecked ? 'checked' : ''} onchange="toggleDay('\${w.id}', \${nextDay})" style="width: 18px; height: 18px; accent-color: #059669;" />
                <span>دن \${nextDay} مکمل ٹک کریں</span>
              </label>
              <button class="btn btn-primary" onclick="openWazifaDetail('\${w.id}')" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;">تفصیل و 40 دن</button>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });

      // Update stats
      document.getElementById('azkar-stats').innerHTML = \`
        <div class="stat-box"><div class="stat-val">\${totalWazaif}</div><div class="stat-lbl">کل وظائف</div></div>
        <div class="stat-box"><div class="stat-val">\${totalDaysDone}</div><div class="stat-lbl">کل مکمل ایام</div></div>
        <div class="stat-box"><div class="stat-val">100%</div><div class="stat-lbl">آف لائن محفوظ</div></div>
      \`;
    }

    function toggleDay(wazifaId, dayNum) {
      const target = wazaif.find(w => w.id === wazifaId);
      if (!target) return;
      if (!target.completedDays) target.completedDays = [];
      const key = 'Day-' + dayNum;
      const idx = target.completedDays.indexOf(key);
      if (idx > -1) {
        target.completedDays.splice(idx, 1);
      } else {
        target.completedDays.push(key);
        playBeadSound();
        triggerVibration(40);
      }
      saveWazaif();
      renderAzkar();
      if (document.getElementById('wazifa-modal').classList.contains('active')) {
        openWazifaDetail(wazifaId);
      }
    }

    function openWazifaDetail(wazifaId) {
      const target = wazaif.find(w => w.id === wazifaId);
      if (!target) return;
      document.getElementById('modal-wazifa-title').innerText = target.title;
      document.getElementById('modal-wazifa-arabic').innerText = target.arabicText;
      document.getElementById('modal-wazifa-translation').innerText = 'ترجمہ: ' + target.urduTranslation;
      document.getElementById('modal-wazifa-benefits').innerText = target.benefits;

      const grid = document.getElementById('modal-wazifa-grid');
      grid.innerHTML = '';
      const total = target.totalDays || 40;
      for (let i = 1; i <= total; i++) {
        const isChecked = (target.completedDays || []).includes('Day-' + i);
        const badge = document.createElement('div');
        badge.className = 'day-badge' + (isChecked ? ' checked' : '');
        badge.innerText = i;
        badge.onclick = () => toggleDay(wazifaId, i);
        grid.appendChild(badge);
      }
      document.getElementById('wazifa-modal').classList.add('active');
    }

    // Quran list rendering
    function renderQuranList() {
      const q = (document.getElementById('quran-search').value || '').trim().toLowerCase();
      const container = document.getElementById('quran-container');
      container.innerHTML = '';

      surahsMeta.forEach(s => {
        if (q && !s.urduName.includes(q) && !s.arabicName.includes(q) && !s.englishName.toLowerCase().includes(q) && s.number.toString() !== q) {
          return;
        }

        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.onclick = () => openQuranSurah(s.number);
        card.innerHTML = \`
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="width: 32px; height: 32px; border-radius: 8px; background: rgba(6,95,70,0.15); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: sans-serif;">\${s.number}</span>
              <div>
                <h4 style="font-size: 1.05rem; font-weight: bold;">\${s.urduName}</h4>
                <p style="font-size: 0.75rem; color: var(--text-muted);">پارہ \${s.para} • \${s.verses} آیات • \${s.type}</p>
              </div>
            </div>
            <span class="font-arabic" style="font-size: 1.4rem; color: var(--primary);">\${s.arabicName}</span>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function openQuranSurah(surahNum) {
      const detailed = detailedSurahs.find(s => s.number === surahNum);
      const meta = surahsMeta.find(s => s.number === surahNum);
      if (!meta) return;

      currentSelectedSurah = detailed || {
        number: meta.number,
        urduName: meta.urduName,
        arabicName: meta.arabicName,
        bayanUlQuran: {
          summary: 'یہ سورت ' + meta.type + ' دور میں نازل ہوئی۔ اس میں ' + meta.verses + ' آیات ہیں۔ بنیادی موضوع توحید، اخلاص اور عمل صالح ہے۔',
          scholarlyNote: 'ڈاکٹر اسرار احمدؒ اس سورت کے مطالعے میں فہمِ دین اور عملی جدوجہد پر زور دیتے ہیں۔'
        },
        tafheemUlQuran: {
          introduction: 'تفہیم القرآن میں سید ابوالاعلیٰ مودودیؒ اس سورت کا فکری اور تاریخی پس منظر بیان فرماتے ہیں۔',
          socialImpact: 'یہ سورت انسان کے اندر خدا ترسی اور معاشرتی عدل کی طلب بیدار کرتی ہے۔'
        }
      };

      document.getElementById('modal-surah-title').innerText = meta.urduName + ' (' + meta.arabicName + ')';
      switchTafseerMode('bayan');
      document.getElementById('quran-modal').classList.add('active');
    }

    function switchTafseerMode(mode) {
      currentTafseerMode = mode;
      document.getElementById('btn-tafseer-bayan').style.background = mode === 'bayan' ? '#059669' : 'var(--border)';
      document.getElementById('btn-tafseer-bayan').style.color = mode === 'bayan' ? 'white' : 'var(--text)';
      document.getElementById('btn-tafseer-tafheem').style.background = mode === 'tafheem' ? '#d97706' : 'var(--border)';
      document.getElementById('btn-tafseer-tafheem').style.color = mode === 'tafheem' ? '#022c22' : 'var(--text)';

      if (!currentSelectedSurah) return;
      const content = document.getElementById('modal-tafseer-content');
      if (mode === 'bayan') {
        content.innerHTML = \`
          <h4 style="color: #059669; font-weight: bold; margin-bottom: 0.5rem;">تفسیر بیان القرآن (ڈاکٹر اسرار احمدؒ / مولانا اشرف علی تھانویؒ):</h4>
          <p>\${currentSelectedSurah.bayanUlQuran.summary}</p>
          <div style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(5,150,105,0.1); border-radius: 8px;">
            <strong>فکری نکتہ:</strong> \${currentSelectedSurah.bayanUlQuran.scholarlyNote || ''}
          </div>
        \`;
      } else {
        content.innerHTML = \`
          <h4 style="color: #d97706; font-weight: bold; margin-bottom: 0.5rem;">تفسیر تفہیم القرآن (سید ابوالاعلیٰ مودودیؒ):</h4>
          <p>\${currentSelectedSurah.tafheemUlQuran.introduction}</p>
          <div style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(217,119,6,0.1); border-radius: 8px;">
            <strong>معاشرتی اثرات:</strong> \${currentSelectedSurah.tafheemUlQuran.socialImpact || ''}
          </div>
        \`;
      }
    }

    // Books Library rendering
    function renderLibrary() {
      const container = document.getElementById('library-container');
      container.innerHTML = '';

      books.forEach((b, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = \`
          <div>
            <span class="badge">\${b.category}</span>
            <h3 style="font-size: 1.1rem; font-weight: bold; margin-top: 0.5rem;">\${b.title}</h3>
            <p style="font-size: 0.8rem; color: var(--accent);">مصنف: \${b.author}</p>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem; line-height: 1.8;">\${b.description}</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 0.75rem; margin-top: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted);">\${b.pages} صفحات • آف لائن</span>
            <button class="btn btn-primary" onclick="openBook('\${b.id}')" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">مطالعہ فرمائیں</button>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function openBook(bookId) {
      const b = books.find(item => item.id === bookId);
      if (!b) return;
      document.getElementById('modal-book-title').innerText = b.title;
      document.getElementById('modal-book-author').innerText = 'مصنف: ' + b.author;
      document.getElementById('modal-book-content').innerText = b.textContent || b.description;
      document.getElementById('book-modal').classList.add('active');
    }

    // Standalone Tasbeeh Logic
    function incrementStandaloneTasbeeh() {
      standaloneCount++;
      document.getElementById('tasbeeh-count').innerText = standaloneCount;
      playBeadSound();
      triggerVibration(25);
      const target = standalonePresets[presetIdx].target;
      if (standaloneCount === target) {
        triggerVibration([50, 100, 50, 100]);
      }
    }

    function resetStandaloneTasbeeh() {
      standaloneCount = 0;
      document.getElementById('tasbeeh-count').innerText = '0';
    }

    function changeTasbeehPreset() {
      presetIdx = (presetIdx + 1) % standalonePresets.length;
      const p = standalonePresets[presetIdx];
      document.getElementById('tasbeeh-title').innerText = p.arabic;
      document.getElementById('tasbeeh-urdu').innerText = p.urdu;
      document.getElementById('tasbeeh-target-lbl').innerText = 'ہدف: ' + p.target;
      resetStandaloneTasbeeh();
    }

    // Modal helpers
    function closeModal(id) {
      document.getElementById(id).classList.remove('active');
    }

    function openAddModal() {
      document.getElementById('add-modal').classList.add('active');
    }

    function handleAddNewWazifa(e) {
      e.preventDefault();
      const title = document.getElementById('new-wazifa-title').value.trim();
      const arabic = document.getElementById('new-wazifa-arabic').value.trim();
      const urdu = document.getElementById('new-wazifa-urdu').value.trim();
      const benefits = document.getElementById('new-wazifa-benefits').value.trim();
      const target = parseInt(document.getElementById('new-wazifa-count').value) || 100;
      const days = parseInt(document.getElementById('new-wazifa-days').value) || 40;

      if (!title || !arabic) return;

      const newW = {
        id: 'custom-' + Date.now(),
        title,
        arabicText: arabic,
        urduTranslation: urdu || 'اللہ کے ذکر میں دلی سکون ہے۔',
        benefits: benefits || 'روحانی برکت و خیر و عافیت کے لیے۔',
        targetCount: target,
        totalDays: days,
        completedDays: [],
        category: 'سلسلہ عالیہ',
        timeSlot: 'بعد نماز فجر'
      };

      wazaif.unshift(newW);
      saveWazaif();
      renderAzkar();
      closeModal('add-modal');
    }

    // Initial render
    renderAzkar();
    renderQuranList();
    renderLibrary();
  </script>
</body>
</html>`;
}
