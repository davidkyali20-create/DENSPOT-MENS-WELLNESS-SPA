import {useState} from 'react';
import {Sparkles} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full min-h-[200px] bg-gradient-to-br from-[#16161A] via-[#0B0B0D] to-[#1D1A12] border border-[#2A2A32] flex flex-col items-center justify-center p-6 text-center"
      >
        <Sparkles className="w-6 h-6 text-[#D4AF37]/80 mb-2" strokeWidth={1.5} />
        <p className="font-display text-lg text-[#F5F5F7]">
          {fallbackTitle || 'Denspot Room 801'}
        </p>
        <p className="text-xs text-[#A1A1AA] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
