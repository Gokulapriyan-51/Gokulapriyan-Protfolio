import banner from '@/data/banner.json';
import HomepageTextCard from './TextCard';

export default function RightBanner({ className }: { className?: string }) {
  return (
    <div className={`flex w-full flex-col items-center md:items-end ${className}`}>
      <div className="flex w-full flex-col gap-4 md:max-w-sm"> {/* Reduced from gap-6 */}
        {banner.map((card, index) => (
          <HomepageTextCard
            key={index}
            label={card.label}
            text={card.text}
          />
        ))}
      </div>
    </div>
  );
}