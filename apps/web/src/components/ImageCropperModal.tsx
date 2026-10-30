'use client';

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { Check, X, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedBlob: Blob) => void;
  aspectRatio?: number; // width / height (default 1: 1:1 square)
}

export function ImageCropperModal({
  imageSrc,
  isOpen,
  onClose,
  onCropComplete,
  aspectRatio = 1,
}: ImageCropperModalProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  const handleMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    // Create target high-res canvas (600x600)
    const outWidth = 600;
    const outHeight = Math.round(outWidth / aspectRatio);
    const canvas = document.createElement('canvas');
    canvas.width = outWidth;
    canvas.height = outHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const boxRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    // Natural scale ratio between original image and rendered element
    const scale = img.naturalWidth / imgRect.width;

    const cropX = (boxRect.left - imgRect.left) * scale;
    const cropY = (boxRect.top - imgRect.top) * scale;
    const cropW = boxRect.width * scale;
    const cropH = boxRect.height * scale;

    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropW,
      cropH,
      0,
      0,
      outWidth,
      outHeight
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCropComplete(blob);
          onClose();
        }
      },
      'image/webp',
      0.92
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Adjust & Crop Picture</h3>
            <p className="text-[11px] text-gray-400">
              Drag photo to adjust position and prevent head/face cutoff.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cropper Viewport */}
        <div className="p-6 flex flex-col items-center justify-center bg-[#07070B] select-none">
          <div
            ref={containerRef}
            className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-[#8059E3] shadow-lg shadow-[#8059E3]/20 cursor-grab active:cursor-grabbing bg-black flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Rule of thirds grid */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-10 opacity-30 border border-white/20">
              <div className="border-r border-b border-white/40" />
              <div className="border-r border-b border-white/40" />
              <div className="border-b border-white/40" />
              <div className="border-r border-b border-white/40" />
              <div className="border-r border-b border-white/40" />
              <div className="border-b border-white/40" />
              <div className="border-r border-b border-white/40" />
              <div className="border-r border-b border-white/40" />
              <div />
            </div>

            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              draggable={false}
              crossOrigin="anonymous"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                maxWidth: 'none',
                maxHeight: 'none',
                height: '100%',
                objectFit: 'contain',
              }}
              className="pointer-events-none transition-transform duration-75"
            />
          </div>

          {/* Controls */}
          <div className="w-64 mt-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1"><ZoomOut className="w-3 h-3" /> Zoom</span>
              <span className="flex items-center gap-1">{Math.round(zoom * 100)}% <ZoomIn className="w-3 h-3" /></span>
            </div>
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-[#8059E3] cursor-pointer"
            />

            <div className="flex justify-between items-center pt-1">
              <span className="text-[10px] text-gray-500 font-mono">Drag inside frame to center</span>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setOffset({ x: 0, y: 0 });
                }}
                className="text-[11px] text-[#A855F7] hover:text-[#C084FC] flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-white/10 flex items-center justify-end gap-3 bg-[#0A0A10]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCrop}
            className="purple-pill-btn px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply & Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
}
