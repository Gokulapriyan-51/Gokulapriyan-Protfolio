interface HomepageTextCardProps {
  label: string;
  text: string;
}

export default function HomepageTextCard({ label, text }: HomepageTextCardProps) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-md shadow-lg">
      <span className="block text-lg font-semibold text-primary">
        {label}
      </span>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-200">
        {text}
      </p>
    </div>
  );
}
