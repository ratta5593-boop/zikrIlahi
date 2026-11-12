import JSZip from 'jszip';
import { StorageService } from './storage';
import { generateStandaloneOfflineHtml } from './offlineAppTemplate';

export const OfflineDownloader = {
  // Get offline HTML string safely without depending on network fetch
  async getOfflineHtmlContent(): Promise<string> {
    try {
      // First attempt to fetch the pre-built asset if reachable
      const response = await fetch('/silsila-azkar-offline-app.html');
      if (response.ok) {
        const text = await response.text();
        if (text && text.length > 500) {
          return text;
        }
      }
    } catch {
      // Network/iframe fetch failed (common in development iframes or offline),
      // we immediately proceed to the robust client-side generator.
    }

    // Generate 100% self-contained standalone offline HTML app in memory
    return generateStandaloneOfflineHtml();
  },

  // Download single standalone HTML file
  async downloadSingleHtmlFile(): Promise<boolean> {
    try {
      const htmlContent = await this.getOfflineHtmlContent();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Silsila-Azkar-Offline-App-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        try {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch {
          // ignore cleanup errors
        }
      }, 500);

      return true;
    } catch (e) {
      console.error('Error generating offline html download', e);
      return false;
    }
  },

  // Download complete offline ZIP bundle
  async downloadOfflineZipPackage(): Promise<boolean> {
    try {
      const zip = new JSZip();

      // Retrieve offline HTML
      const htmlContent = await this.getOfflineHtmlContent();

      // Add HTML app file to zip
      zip.file('Silsila-Azkar-Offline-App.html', htmlContent);

      // Add Urdu instruction readme file
      const instructions = `=====================================================
روحانی سلسلہ و اذکار - آف لائن استعمال کی مکمل گائیڈ
=====================================================

محترم صارف،
یہ فائل ایک خود مختار اور مکمل آف لائن اسلامی ایپلی کیشن ہے۔ اسے چلانے کے لیے کسی انٹرنیٹ یا سرور کی ضرورت نہیں۔

اینڈرائڈ موبائل (Android Mobile) میں چلانے کا طریقہ:
-----------------------------------------------------
1. اس ZIP فائل کو ان زپ (Extract) کریں یا "Silsila-Azkar-Offline-App.html" فائل کو اپنے موبائل اسٹوریج یا واٹس ایپ پر محفوظ کریں۔
2. فائل پر ٹیپ کریں اور "Open with Chrome" (گوگل کروم) یا Samsung Internet منتخب کریں۔
3. ایپ فوراً فل اسکرین آف لائن کھل جائے گی!
4. باقاعدہ استعمال کے لیے کروم کے مینیو (اوپر 3 نقطے ⋮) پر کلک کر کے "Add to Home screen" منتخب کریں تاکہ موبائل ہوم اسکرین پر اس کا آئیکن بن جائے!

کمپیوٹر / لیپ ٹاپ (PC / Laptop) میں چلانے کا طریقہ:
-----------------------------------------------------
"Silsila-Azkar-Offline-App.html" پر ڈبل کلک کریں، یہ کسی بھی براؤزر میں آف لائن چل پڑے گی۔

آپ کا تمام ریکارڈ، 40 روزہ چلے کے چیک باکسز اور تسبیحات آپ کے اپنے موبائل میں محفوظ رہیں گے۔
=====================================================`;

      zip.file('README-اردو-ہدایات.txt', instructions);

      // Add current database backup JSON to zip
      const backupJson = StorageService.exportDatabaseJSON();
      zip.file('silsila-azkar-data-backup.json', backupJson);

      // Generate zip blob
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Silsila-Azkar-Complete-Offline-Package-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        try {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch {
          // ignore cleanup
        }
      }, 500);

      return true;
    } catch (e) {
      console.error('Error generating offline zip package', e);
      return false;
    }
  }
};
