type Props = {
  items: string[];
  reverse?: boolean;
};

export function Marquee({ items, reverse = false }: Props) {
  const loop = [...items, ...items];
  return (
    <div
      className={`ld-marquee ${reverse ? "ld-marquee--reverse" : ""}`}
      aria-hidden="true"
    >
      <div className="ld-marquee-track">
        {loop.map((item, i) => (
          <span className="ld-marquee-item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
