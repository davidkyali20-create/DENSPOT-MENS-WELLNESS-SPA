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
        className="w-full h-full min-h-[200px] bg-gradient-to-br from-[#191714] via-[#101012] to-[#1D1912] border border-[#2B261E] flex flex-col items-center justify-center p-6 text-center"
      >
        <Sparkles className="w-6 h-6 text-[#C8A253]/70 mb-2" strokeWidth={1.5} />
        <p className="font-display text-lg text-[#F4F1EA]">
          {fallbackTitle || 'Denspot Room 801'}
        </p>
        <p className="text-xs text-[#9E978B] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
