import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export function ImageViewer({ isOpen, onClose, imageUrl }: ImageViewerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 animate-fade-in"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 z-[10001] p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors border border-white/20"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      
      <div 
        className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt="Visualização ampliada" 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in select-none pointer-events-none"
        />
      </div>
    </div>,
    document.body
  );
}
