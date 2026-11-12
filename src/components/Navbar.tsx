import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  Library, 
  CircleDot, 
  Download, 
  Moon, 
  Sun, 
  Wifi, 
  WifiOff, 
  Database,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isOnline: boolean;
  onOpenInstallModal: () => void;
  onOpenBackupModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  isOnline,
  onOpenInstallModal,
  onOpenBackupModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'azkar', label: 'اذکار و وظائف', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'quran', label: 'قرآن و تفاسیر', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'library', label: 'کتب خانہ (PDFs)', icon: <Library className="w-4 h-4" /> },
    { id: 'tasbeeh', label: 'ڈیجیٹل تسبیح', icon: <CircleDot className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-emerald-950/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-emerald-800/50 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Right side: App Brand & Icon (In RTL this is first) */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('azkar')}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl md:text-2xl text-amber-400 font-arabic select-none">ﷲ</span>
              </div>
            </div>
            <div>
              <h1 className="font-urdu text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>روحانی سلسلہ و اذکار</span>
                <span className="hidden sm:inline-block text-[11px] font-sans px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  سلسلہ ایپ
                </span>
              </h1>
              <p className="text-[10px] md:text-xs text-emerald-200/80 font-sans-ur">
                وظائف ٹریکر، بیان القرآن، تفہیم القرآن اور کتب خانہ
              </p>
            </div>
          </div>

          {/* Center: Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-emerald-900/60 dark:bg-stone-900/60 p-1.5 rounded-2xl border border-emerald-700/40">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md'
                      : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Left side: Controls (Install APK, Theme, Sync, Mobile Menu) */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Offline File Download Button */}
            <button
              onClick={onOpenInstallModal}
              className="flex items-center gap-1.5 py-1.5 px-3 md:py-2 md:px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs md:text-sm shadow-md transition-all cursor-pointer border border-emerald-400/40"
              title="آف لائن ڈاؤنلوڈ ایبل فائل (.html / .zip)"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">آف لائن فائل ڈاؤنلوڈ</span>
              <span className="sm:hidden text-[11px]">آف لائن فائل</span>
            </button>

            {/* Backup & Sync */}
            <button
              onClick={onOpenBackupModal}
              className="p-2 md:p-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-100 border border-emerald-700/40 transition-colors"
              title="ڈیٹا سنک اور بیک اپ (Sync & Backup)"
            >
              <Database className="w-4 h-4 md:w-4.5 md:h-4.5" />
            </button>

            {/* Offline / Online status indicator */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-center text-xs ${
                isOnline
                  ? 'bg-emerald-900/40 border-emerald-700/50 text-emerald-300'
                  : 'bg-amber-950/60 border-amber-700/70 text-amber-300 animate-pulse'
              }`}
              title={isOnline ? 'آن لائن — ڈیٹا خودکار سنک ہو رہا ہے' : 'آف لائن — کیش شدہ ڈیٹا محفوظ ہے'}
            >
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 md:p-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-amber-300 border border-emerald-700/40 transition-colors"
              title={isDark ? 'لائٹ موڈ آن کریں' : 'ڈارک موڈ آن کریں'}
            >
              {isDark ? <Sun className="w-4 h-4 md:w-4.5 md:h-4.5" /> : <Moon className="w-4 h-4 md:w-4.5 md:h-4.5" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-white border border-emerald-700/40"
              title="مینیو"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 px-2 border-t border-emerald-800/60 animate-fade-in space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-emerald-100 hover:bg-emerald-800/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};
