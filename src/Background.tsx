import { useMemo } from "react";

const svgs = [
  "/icons/icon1.svg",
  "/icons/icon2.svg",
  "/icons/icon3.svg",
  "/icons/icon4.svg",
];

function Background({ count = 40 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        src: svgs[Math.floor(Math.random() * svgs.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        rotate: Math.random() * 360,
      })),
    [count],
  );

  return (
    <div className="fixed  inset-0 -z-10 pointer-events-none">
      {items.map((item) => (
        <img
          key={item.id}
          src={item.src}
          className="absolute icon opacity-15 w-8 h-8 "
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            transform: `rotate(${item.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default Background;
