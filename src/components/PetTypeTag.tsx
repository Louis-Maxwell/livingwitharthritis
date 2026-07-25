import React from 'react';

interface PetTypeTagProps {
  type: 'dog' | 'cat' | 'equine' | 'rabbit' | 'other';
  size?: 'sm' | 'md' | 'lg';
}

const PET_ICONS: Record<string, string> = {
  dog: '🐕',
  cat: '🐱',
  equine: '🐴',
  rabbit: '🐰',
  other: '🐾',
};

const PET_LABELS: Record<string, string> = {
  dog: 'Dogs',
  cat: 'Cats',
  equine: 'Horses & Equines',
  rabbit: 'Rabbits',
  other: 'Other Pets',
};

const PET_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  dog: {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-200',
  },
  cat: {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    border: 'border-orange-200',
  },
  equine: {
    bg: 'bg-rose-50',
    text: 'text-rose-900',
    border: 'border-rose-200',
  },
  rabbit: {
    bg: 'bg-pink-50',
    text: 'text-pink-900',
    border: 'border-pink-200',
  },
  other: {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    border: 'border-gray-200',
  },
};

const SIZE_STYLES = {
  sm: 'px-2 py-1 text-xs gap-1',
  md: 'px-3 py-2 text-sm gap-1.5',
  lg: 'px-4 py-2.5 text-base gap-2',
};

export const PetTypeTag: React.FC<PetTypeTagProps> = ({
  type,
  size = 'md',
}) => {
  const colors = PET_COLORS[type];
  const icon = PET_ICONS[type];
  const label = PET_LABELS[type];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold transition-all ${
        SIZE_STYLES[size]
      } ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </span>
  );
};

export default PetTypeTag;
