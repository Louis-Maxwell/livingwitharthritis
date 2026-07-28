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
    bg: 'bg-primary/5',
    text: 'text-primary',
    border: 'border-primary/20',
  },
  cat: {
    bg: 'bg-secondary/5',
    text: 'text-secondary',
    border: 'border-secondary/20',
  },
  equine: {
    bg: 'bg-primary/10',
    text: 'text-secondary',
    border: 'border-primary/25',
  },
  rabbit: {
    bg: 'bg-black/5',
    text: 'text-black',
    border: 'border-black/15',
  },
  other: {
    bg: 'bg-gray-50',
    text: 'text-black',
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
