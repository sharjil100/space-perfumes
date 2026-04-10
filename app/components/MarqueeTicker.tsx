const items = [
  "Arabian Line",
  "Designer Line",
  "Niche Line",
  "Authentic Decants",
  "Space Perfumes",
  "Oud · Amber · Musk",
  "Dior · Chanel · YSL",
  "MFK · Serge Lutens",
];

// Duplicated once so the loop is seamless
const track = [...items, ...items];

export default function MarqueeTicker() {
  return (
    <div className="overflow-hidden border-y border-[rgba(196,169,125,0.1)] py-4 th-bg-2">
      <div className="marquee-track flex gap-0 w-max">
        {track.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[9px] tracking-[0.55em] text-[#8a8076] uppercase whitespace-nowrap px-8">
              {item}
            </span>
            <span className="text-[#c4a97d] text-[10px]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
