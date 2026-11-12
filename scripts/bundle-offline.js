import fs from 'fs';
import path from 'path';
import { generateStandaloneOfflineHtml } from '../src/services/offlineAppTemplate.ts';

function bundleOffline() {
  const distDir = path.resolve('dist');
  const publicDir = path.resolve('public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const html = generateStandaloneOfflineHtml();

  const outPublicPath = path.join(publicDir, 'silsila-azkar-offline-app.html');
  fs.writeFileSync(outPublicPath, html, 'utf-8');

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'silsila-azkar-offline-app.html'), html, 'utf-8');
  }

  console.log(`Generated standalone clean offline HTML file: ${outPublicPath} (${(html.length / 1024).toFixed(1)} KB)`);
}

bundleOffline();
