import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, RotateCw, ZoomIn, ZoomOut, Check } from 'lucide-react';
import type { Language } from '../App';

interface ImageCropModalProps {
  image: string;
  onClose: () => void;
  onSave: (croppedImage: string) => void;
  language: Language;
  aspectRatio?: number;
  title?: string;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ImageCropModal({ 
  image, 
  onClose, 
  onSave, 
  language, 
  aspectRatio = 1,
  title 
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const t = {
    ar: {
      cropImage: 'قص الصورة',
      zoom: 'تكبير',
      rotation: 'تدوير',
      cancel: 'إلغاء',
      save: 'حفظ',
      processing: 'جاري المعالجة...'
    },
    en: {
      cropImage: 'Crop Image',
      zoom: 'Zoom',
      rotation: 'Rotation',
      cancel: 'Cancel',
      save: 'Save',
      processing: 'Processing...'
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0
  ): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return canvas.toDataURL('image/jpeg', 0.95);
  };

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      onSave(croppedImage);
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex flex-col"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <h2 className="text-white text-lg">
          {title || t[language].cropImage}
        </h2>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Check className="w-4 h-4" />
          <span>{t[language].save}</span>
        </button>
      </div>

      {/* Crop Area */}
      <div className="flex-1 relative">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
        />
      </div>

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-md border-t border-white/20 px-4 py-4 space-y-4">
        {/* Zoom Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white text-sm flex items-center gap-2">
              <ZoomIn className="w-4 h-4" />
              {t[language].zoom}
            </label>
            <span className="text-white text-sm">{Math.round(zoom * 100)}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #3b82f6 ${((zoom - 1) / 2) * 100}%, rgba(255,255,255,0.2) ${((zoom - 1) / 2) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>

        {/* Rotation Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white text-sm flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              {t[language].rotation}
            </label>
            <span className="text-white text-sm">{rotation}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #3b82f6 ${(rotation / 360) * 100}%, rgba(255,255,255,0.2) ${(rotation / 360) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
