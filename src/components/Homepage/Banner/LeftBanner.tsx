import OrderNowButton from '@/components/buttons/OrderNowButton';

export default function LeftBanner({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center text-center md:items-start md:text-left ${className}`}
    >
      <h1 className="text-4xl font-bold text-white drop-shadow-lg lg:text-7xl">
        Building Scalable
      </h1>

      <h2 className="mt-1 text-3xl font-bold text-primary drop-shadow-lg lg:text-6xl"> {/* Reduced from mt-2 */}
        Web & Backend Systems
      </h2>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-200 lg:text-xl"> {/* Reduced from mt-6 */}
        Full Stack Developer specializing in Node.js, React, REST APIs, IoT systems,
        and enterprise automation with Microsoft Dynamics 365.
      </p>

      <OrderNowButton className="mt-6 w-48 transition-transform duration-300 hover:scale-105" /> {/* Reduced from mt-10 */}
    </div>
  );
}