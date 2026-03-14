import { memo } from 'react';
import { Scissors, Sparkles } from 'lucide-react';
import { useGender } from '@/contexts/GenderContext';

type Variant = 'pill' | 'segmented';

interface GenderToggleProps {
  variant?: Variant;
  className?: string;
}

/**
 * Unified gender toggle used across Home, SalonDetail, and AtHome pages.
 * - "pill": rounded-pill style (Home, AtHome)
 * - "segmented": segmented control with icons (SalonDetail services tab)
 */
const GenderToggle = memo(({ variant = 'pill', className = '' }: GenderToggleProps) => {
  const { gender, setGender } = useGender();

  if (variant === 'segmented') {
    return (
      <div className={`flex bg-secondary rounded-xl p-1 border border-border ${className}`}>
        <button
          onClick={() => setGender('male')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-heading font-semibold transition-colors duration-300 min-h-[44px] ${
            gender === 'male' ? 'btn-themed shadow-sm' : 'text-muted-foreground'
          }`}
          aria-pressed={gender === 'male'}
          aria-label="Men's services"
        >
          <Scissors size={14} />
          Men
        </button>
        <button
          onClick={() => setGender('female')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-heading font-semibold transition-colors duration-300 min-h-[44px] ${
            gender === 'female' ? 'btn-themed shadow-sm' : 'text-muted-foreground'
          }`}
          aria-pressed={gender === 'female'}
          aria-label="Women's services"
        >
          <Sparkles size={14} />
          Women
        </button>
      </div>
    );
  }

  // Default: pill toggle
  return (
    <div className={`inline-flex bg-card border border-border rounded-xl p-0.5 relative ${className}`}>
      <div
        className="absolute top-0.5 bottom-0.5 rounded-[10px] bg-primary transition-transform duration-300 ease-out"
        style={{
          width: 'calc(50% - 2px)',
          transform: gender === 'male' ? 'translateX(2px)' : 'translateX(calc(100% + 2px))',
        }}
        aria-hidden="true"
      />
      <button
        onClick={() => setGender('male')}
        className={`relative z-10 px-7 py-2 text-[13px] font-heading font-semibold rounded-[10px] transition-colors duration-200 min-h-[44px] ${
          gender === 'male' ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
        aria-pressed={gender === 'male'}
        aria-label="Men"
      >
        Men
      </button>
      <button
        onClick={() => setGender('female')}
        className={`relative z-10 px-7 py-2 text-[13px] font-heading font-semibold rounded-[10px] transition-colors duration-200 min-h-[44px] ${
          gender === 'female' ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
        aria-pressed={gender === 'female'}
        aria-label="Women"
      >
        Women
      </button>
    </div>
  );
});
GenderToggle.displayName = 'GenderToggle';

export default GenderToggle;
