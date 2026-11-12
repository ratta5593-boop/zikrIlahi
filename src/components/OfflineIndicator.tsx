import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-14 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-16 z-40 max-w-sm animate-bounce">
      <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-600/95 text-white shadow-2xl backdrop-blur-md border border-amber-400/50 text-xs font-sans-ur">
        <WifiOff className="w-4 h-4 flex-shrink-0 animate-pulse" />
        <p className="leading-snug">
          <strong>آف لائن موڈ:</strong> انٹرنیٹ دستیاب نہیں ہے، مگر آپ کا تمام ڈیٹا، اذکار اور کتب بلا تعطل محفوظ اور فعال ہیں۔
        </p>
      </div>
    </div>
  );
};
