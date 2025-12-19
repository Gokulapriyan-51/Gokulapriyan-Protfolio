import ImageBanner from './ImageBanner';
import LeftBanner from './LeftBanner';
import RightBanner from './RightBanner';

export default function HomepageBanner({ className }: { className?: string }) {
  return (
    <section
      id="banner"
      className={`relative w-full overflow-hidden bg-black py-10 md:py-14 ${className}`}
    >
      {/* Background Image */}
      <ImageBanner className="absolute inset-0 z-0 opacity-30" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      {/* Content - Reduced gap and changed alignment */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 md:flex-row md:items-start md:gap-12 md:px-10">
        <LeftBanner className="md:w-1/2" />
        <RightBanner className="md:w-1/2" />
      </div>
    </section>
  );
}