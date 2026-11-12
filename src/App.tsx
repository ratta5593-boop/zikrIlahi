/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, Wazifa, PDFBook, QuranSurah } from './types';
import { StorageService } from './services/storage';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { usePWAInstall } from './hooks/usePWAInstall';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallModal } from './components/PWAInstallModal';
import { BackupSyncModal } from './components/BackupSyncModal';

// Azkar & Wazaif Components
import { AzkarList } from './components/AzkarTracker/AzkarList';
import { WazifaDetailModal } from './components/AzkarTracker/WazifaDetailModal';
import { DigitalTasbeehModal } from './components/AzkarTracker/DigitalTasbeehModal';
import { AddWazifaModal } from './components/AzkarTracker/AddWazifaModal';

// Quran & Tafseer Components
import { QuranExplorer } from './components/QuranTafseer/QuranExplorer';
import { TafseerReaderModal } from './components/QuranTafseer/TafseerReaderModal';

// Books Library Components
import { BooksCatalog } from './components/BooksLibrary/BooksCatalog';
import { PDFReaderModal } from './components/BooksLibrary/PDFReaderModal';
import { AdminUploadModal } from './components/BooksLibrary/AdminUploadModal';

// Standalone Tasbeeh View
import { TasbeehView } from './components/TasbeehView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('azkar');
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('silsila_dark_mode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const isOnline = useOnlineStatus();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // State data
  const [wazaif, setWazaif] = useState<Wazifa[]>(() => StorageService.getWazaif());
  const [books, setBooks] = useState<PDFBook[]>(() => StorageService.getBooks());
  const [bookmarks, setBookmarks] = useState<number[]>(() => StorageService.getBookmarks());

  // Modals state
  const [activeDetailWazifa, setActiveDetailWazifa] = useState<Wazifa | null>(null);
  const [activeTasbeehWazifa, setActiveTasbeehWazifa] = useState<Wazifa | null>(null);
  const [isAddWazifaOpen, setIsAddWazifaOpen] = useState(false);

  const [selectedSurah, setSelectedSurah] = useState<QuranSurah | null>(null);
  const [selectedBook, setSelectedBook] = useState<PDFBook | null>(null);
  const [isAdminUploadOpen, setIsAdminUploadOpen] = useState(false);

  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  // Sync Dark Mode with document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('silsila_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('silsila_dark_mode', 'false');
    }
  }, [isDark]);

  // Reload data from storage
  const reloadData = () => {
    setWazaif(StorageService.getWazaif());
    setBooks(StorageService.getBooks());
    setBookmarks(StorageService.getBookmarks());
  };

  // Wazifa handlers
  const handleToggleDay = (wazifaId: string, dayNumber: number) => {
    const updated = StorageService.toggleDayCompletion(wazifaId, dayNumber);
    if (updated) {
      setWazaif(StorageService.getWazaif());
      if (activeDetailWazifa && activeDetailWazifa.id === wazifaId) {
        setActiveDetailWazifa({ ...updated });
      }
    }
  };

  const handleIncrementWazifaCounter = (wazifaId: string, step = 1) => {
    const result = StorageService.incrementCounter(wazifaId, step);
    if (result) {
      setWazaif(StorageService.getWazaif());
      if (activeTasbeehWazifa && activeTasbeehWazifa.id === wazifaId) {
        setActiveTasbeehWazifa({ ...result.wazifa });
      }
      if (activeDetailWazifa && activeDetailWazifa.id === wazifaId) {
        setActiveDetailWazifa({ ...result.wazifa });
      }
    }
  };

  const handleResetWazifaToday = (wazifaId: string) => {
    const updated = StorageService.resetCounterToday(wazifaId);
    if (updated) {
      setWazaif(StorageService.getWazaif());
      if (activeTasbeehWazifa && activeTasbeehWazifa.id === wazifaId) {
        setActiveTasbeehWazifa({ ...updated });
      }
    }
  };

  const handleResetWazifaProgress = (wazifaId: string) => {
    const updated = StorageService.resetWazifaProgress(wazifaId);
    if (updated) {
      setWazaif(StorageService.getWazaif());
      if (activeDetailWazifa && activeDetailWazifa.id === wazifaId) {
        setActiveDetailWazifa({ ...updated });
      }
    }
  };

  const handleAddWazifa = (newWazifa: Omit<Wazifa, 'id' | 'completedDays' | 'currentCountToday' | 'startDate'>) => {
    StorageService.addWazifa(newWazifa);
    setWazaif(StorageService.getWazaif());
  };

  const handleDeleteWazifa = (id: string) => {
    StorageService.deleteWazifa(id);
    setWazaif(StorageService.getWazaif());
  };

  // Book handlers
  const handleBookAdded = (newBook: PDFBook) => {
    setBooks(StorageService.getBooks());
  };

  const handleDeleteBook = (id: string) => {
    StorageService.deleteBook(id);
    setBooks(StorageService.getBooks());
  };

  // Bookmark handlers
  const handleToggleBookmark = (surahNumber: number) => {
    const updated = StorageService.toggleBookmark(surahNumber);
    setBookmarks(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 dark:bg-stone-950 text-stone-900 dark:text-stone-100 bg-islamic-pattern transition-colors duration-300">
      
      {/* Navbar with tabs and controls */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        isOnline={isOnline}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'azkar' && (
          <AzkarList
            wazaif={wazaif}
            onOpenDetail={(w) => setActiveDetailWazifa(w)}
            onOpenTasbeeh={(w) => setActiveTasbeehWazifa(w)}
            onOpenAddModal={() => setIsAddWazifaOpen(true)}
            onToggleDay={handleToggleDay}
            onDeleteWazifa={handleDeleteWazifa}
          />
        )}

        {activeTab === 'quran' && (
          <QuranExplorer
            onSelectSurah={(s) => setSelectedSurah(s)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'library' && (
          <BooksCatalog
            books={books}
            onOpenBook={(b) => setSelectedBook(b)}
            onOpenAdminUpload={() => setIsAdminUploadOpen(true)}
            onDeleteBook={handleDeleteBook}
          />
        )}

        {activeTab === 'tasbeeh' && (
          <TasbeehView />
        )}
      </main>

      {/* Modals */}
      <WazifaDetailModal
        wazifa={activeDetailWazifa}
        isOpen={!!activeDetailWazifa}
        onClose={() => setActiveDetailWazifa(null)}
        onToggleDay={handleToggleDay}
        onResetProgress={handleResetWazifaProgress}
        onOpenTasbeeh={(w) => setActiveTasbeehWazifa(w)}
      />

      <DigitalTasbeehModal
        wazifa={activeTasbeehWazifa}
        isOpen={!!activeTasbeehWazifa}
        onClose={() => setActiveTasbeehWazifa(null)}
        onIncrement={handleIncrementWazifaCounter}
        onResetToday={handleResetWazifaToday}
      />

      <AddWazifaModal
        isOpen={isAddWazifaOpen}
        onClose={() => setIsAddWazifaOpen(false)}
        onAdd={handleAddWazifa}
      />

      <TafseerReaderModal
        surah={selectedSurah}
        isOpen={!!selectedSurah}
        onClose={() => setSelectedSurah(null)}
        isBookmarked={selectedSurah ? bookmarks.includes(selectedSurah.number) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <PDFReaderModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <AdminUploadModal
        isOpen={isAdminUploadOpen}
        onClose={() => setIsAdminUploadOpen(false)}
        onBookAdded={handleBookAdded}
      />

      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onInstall={install}
        isInstallable={isInstallable}
        isIOS={isIOS}
      />

      <BackupSyncModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onDataReload={reloadData}
      />

      {/* Offline Toast */}
      <OfflineIndicator />

      {/* Required Exact Footer */}
      <Footer />

    </div>
  );
}
