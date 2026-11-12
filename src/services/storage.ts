import { Wazifa, PDFBook } from '../types';
import { defaultAzkarList } from '../data/defaultAzkar';
import { defaultBooksList } from '../data/defaultBooks';

const WAZAIF_STORAGE_KEY = 'silsila_wazaif_data_v1';
const BOOKS_STORAGE_KEY = 'silsila_books_data_v1';
const QURAN_BOOKMARKS_KEY = 'silsila_quran_bookmarks_v1';
const ADMIN_PASSCODE_KEY = 'silsila_admin_auth_v1';

export const StorageService = {
  // --- WAZAIF MANAGEMENT ---
  getWazaif(): Wazifa[] {
    try {
      if (typeof localStorage === 'undefined') return defaultAzkarList;
      const data = localStorage.getItem(WAZAIF_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(WAZAIF_STORAGE_KEY, JSON.stringify(defaultAzkarList));
        return defaultAzkarList;
      }
      return JSON.parse(data);
    } catch {
      return defaultAzkarList;
    }
  },

  saveWazaif(wazaif: Wazifa[]): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(WAZAIF_STORAGE_KEY, JSON.stringify(wazaif));
    } catch (e) {
      console.error('Error saving wazaif', e);
    }
  },

  addWazifa(newWazifa: Omit<Wazifa, 'id' | 'completedDays' | 'currentCountToday' | 'startDate'>): Wazifa {
    const list = this.getWazaif();
    const created: Wazifa = {
      ...newWazifa,
      id: 'wazifa-custom-' + Date.now(),
      currentCountToday: 0,
      completedDays: [],
      startDate: new Date().toISOString().split('T')[0],
      isCustom: true,
      currentDay: 1
    };
    list.unshift(created);
    this.saveWazaif(list);
    return created;
  },

  updateWazifa(updated: Wazifa): void {
    const list = this.getWazaif().map(w => w.id === updated.id ? updated : w);
    this.saveWazaif(list);
  },

  deleteWazifa(id: string): void {
    const list = this.getWazaif().filter(w => w.id !== id);
    this.saveWazaif(list);
  },

  toggleDayCompletion(wazifaId: string, dayNumber: number): Wazifa | null {
    const list = this.getWazaif();
    const target = list.find(w => w.id === wazifaId);
    if (!target) return null;

    const dayKey = `Day-${dayNumber}`;
    const exists = target.completedDays.includes(dayKey);

    if (exists) {
      target.completedDays = target.completedDays.filter(d => d !== dayKey);
    } else {
      target.completedDays.push(dayKey);
    }

    // Auto update current count if today is checked
    if (!exists && target.currentCountToday < target.targetCount) {
      target.currentCountToday = target.targetCount;
    }

    this.saveWazaif(list);
    return target;
  },

  incrementCounter(wazifaId: string, incrementBy = 1): { wazifa: Wazifa; isTargetReached: boolean } | null {
    const list = this.getWazaif();
    const target = list.find(w => w.id === wazifaId);
    if (!target) return null;

    target.currentCountToday = (target.currentCountToday || 0) + incrementBy;
    const isTargetReached = target.currentCountToday >= target.targetCount;

    // If target reached today, automatically mark current day as completed if not yet marked
    const currentDayKey = `Day-${target.completedDays.length + 1}`;
    if (isTargetReached && !target.completedDays.includes(currentDayKey) && target.completedDays.length < target.totalDays) {
      target.completedDays.push(currentDayKey);
    }

    this.saveWazaif(list);
    return { wazifa: target, isTargetReached };
  },

  resetCounterToday(wazifaId: string): Wazifa | null {
    const list = this.getWazaif();
    const target = list.find(w => w.id === wazifaId);
    if (!target) return null;
    target.currentCountToday = 0;
    this.saveWazaif(list);
    return target;
  },

  resetWazifaProgress(wazifaId: string): Wazifa | null {
    const list = this.getWazaif();
    const target = list.find(w => w.id === wazifaId);
    if (!target) return null;
    target.completedDays = [];
    target.currentCountToday = 0;
    target.currentDay = 1;
    this.saveWazaif(list);
    return target;
  },

  // --- BOOKS LIBRARY MANAGEMENT ---
  getBooks(): PDFBook[] {
    try {
      if (typeof localStorage === 'undefined') return defaultBooksList;
      const data = localStorage.getItem(BOOKS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(defaultBooksList));
        return defaultBooksList;
      }
      return JSON.parse(data);
    } catch {
      return defaultBooksList;
    }
  },

  saveBooks(books: PDFBook[]): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    } catch (e) {
      console.error('Error saving books', e);
    }
  },

  addBook(newBook: Omit<PDFBook, 'id' | 'uploadedAt'>): PDFBook {
    const books = this.getBooks();
    const created: PDFBook = {
      ...newBook,
      id: 'book-custom-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    books.unshift(created);
    this.saveBooks(books);
    return created;
  },

  deleteBook(bookId: string): void {
    const books = this.getBooks().filter(b => b.id !== bookId);
    this.saveBooks(books);
  },

  // --- BOOKMARKS ---
  getBookmarks(): number[] {
    try {
      const data = localStorage.getItem(QURAN_BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [1, 36, 67];
    } catch {
      return [1, 36, 67];
    }
  },

  toggleBookmark(surahNumber: number): number[] {
    const bookmarks = this.getBookmarks();
    const exists = bookmarks.includes(surahNumber);
    const updated = exists 
      ? bookmarks.filter(n => n !== surahNumber) 
      : [...bookmarks, surahNumber];
    localStorage.setItem(QURAN_BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  },

  // --- ADMIN AUTHENTICATION ---
  isAdminAuthenticated(): boolean {
    return localStorage.getItem(ADMIN_PASSCODE_KEY) === 'true';
  },

  setAdminAuthenticated(status: boolean): void {
    if (status) {
      localStorage.setItem(ADMIN_PASSCODE_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_PASSCODE_KEY);
    }
  },

  // --- EXPORT & IMPORT BACKUP ---
  exportDatabaseJSON(): string {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      wazaif: this.getWazaif(),
      books: this.getBooks(),
      bookmarks: this.getBookmarks()
    };
    return JSON.stringify(backup, null, 2);
  },

  importDatabaseJSON(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (data.wazaif && Array.isArray(data.wazaif)) {
        this.saveWazaif(data.wazaif);
      }
      if (data.books && Array.isArray(data.books)) {
        this.saveBooks(data.books);
      }
      if (data.bookmarks && Array.isArray(data.bookmarks)) {
        localStorage.setItem(QURAN_BOOKMARKS_KEY, JSON.stringify(data.bookmarks));
      }
      return true;
    } catch (e) {
      console.error('Failed to parse import JSON', e);
      return false;
    }
  }
};
