'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const stills = Array.from(
  { length: 12 },
  (_, index) => `/stills-real/${String(index + 1).padStart(2, '0')}.jpg`,
);

const gallery = [
  { src: stills[7], ratio: '4 / 5', position: '54% center' },
  { src: stills[0], ratio: '16 / 10', position: 'center' },
  { src: stills[3], ratio: '3 / 4', position: '52% center' },
  { src: stills[5], ratio: '16 / 11', position: 'center' },
  { src: stills[1], ratio: '4 / 5', position: '42% center' },
  { src: stills[8], ratio: '16 / 9', position: 'center' },
  { src: stills[10], ratio: '3 / 4', position: '42% center' },
  { src: stills[6], ratio: '16 / 11', position: 'center' },
  { src: stills[4], ratio: '4 / 5', position: '60% center' },
  { src: stills[9], ratio: '16 / 10', position: '38% center' },
  { src: stills[2], ratio: '5 / 4', position: 'center' },
  { src: stills[11], ratio: '16 / 9', position: 'center' },
];

type Stamp = {
  id: number;
  src: string;
  x: number;
  y: number;
  angle: number;
};

export default function Home() {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const nextId = useRef(0);
  const lastPoint = useRef({ x: -200, y: -200 });
  const heroRef = useRef<HTMLElement>(null);

  const leaveStamp = useCallback((x: number, y: number) => {
    const id = nextId.current++;
    const stamp: Stamp = {
      id,
      src: stills[id % stills.length],
      x,
      y,
      angle: ((id % 5) - 2) * 0.7,
    };

    setStamps((current) => [...current.slice(-7), stamp]);
    window.setTimeout(() => {
      setStamps((current) => current.filter((item) => item.id !== id));
    }, 1550);
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const distance = Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y);

    if (distance > 88) {
      lastPoint.current = { x, y };
      leaveStamp(x, y);
    }
  };

  useEffect(() => {
    const reset = () => {
      lastPoint.current = { x: -200, y: -200 };
    };
    window.addEventListener('blur', reset);
    return () => window.removeEventListener('blur', reset);
  }, []);

  return (
    <main>
      <section
        ref={heroRef}
        className="hero"
        aria-labelledby="film-title"
        onPointerMove={handlePointerMove}
        onPointerDown={(event) => {
          const rect = heroRef.current?.getBoundingClientRect();
          if (rect) leaveStamp(event.clientX - rect.left, event.clientY - rect.top);
        }}
      >
        <header className="site-header">
          <a href="#top" className="wordmark" aria-label="小満・先頭へ">
            小満
          </a>
          <nav aria-label="主要ナビゲーション">
            <a href="#作品">作品</a>
            <a href="#物語">あらすじ</a>
          </nav>
          <p>短編映画</p>
        </header>

        <div className="trail" aria-hidden="true">
          {stamps.map((stamp, index) => (
            <img
              key={stamp.id}
              src={stamp.src}
              alt=""
              className="trail-image"
              style={{
                left: stamp.x,
                top: stamp.y,
                zIndex: 10 + index,
                transform: `translate(-50%, -50%) rotate(${stamp.angle}deg)`,
              }}
            />
          ))}
        </div>

        <div className="hero-copy" id="top">
          <p className="eyebrow">短編映画</p>
          <h1 id="film-title">
            <img src="/brand/shoman-title.png" alt="小満" />
          </h1>
          <div className="synopsis" id="物語">
            <p>
              六年ぶりに母・紅梅と再会した高校生の小満。ぎこちない距離を抱えた母娘は、花火の夜と閉館後のプールをともに駆け抜ける。
            </p>
            <p>
              泳ぎを教える時間、幼い水着、稲穂を揺らす風。離れていた六年を埋めるように近づき、また別れる二人の短い帰郷を描く。
            </p>
          </div>
        </div>

        <p className="hero-note">カーソルをゆっくり動かすと、記憶の断片が現れます。</p>
        <a className="scroll-cue" href="#作品" aria-label="作品を見る">
          <span>下へ</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="works" id="作品" aria-labelledby="works-title">
        <div className="works-intro">
          <p className="section-index">〇一</p>
          <div>
            <p className="kicker">映画「小満」</p>
            <h2 id="works-title">作品スチル</h2>
          </div>
          <p className="works-description">
            母と娘が過ごす、短い二日間。食卓、雑貨店、稲田、泳ぎ、そして別れの朝。
          </p>
        </div>

        <div className="masonry">
          {gallery.map((item, index) => (
            <figure key={item.src} className="still">
              <img
                src={item.src}
                alt={`映画「小満」の作品スチル ${String(index + 1).padStart(2, '0')}`}
                style={{ aspectRatio: item.ratio, objectPosition: item.position }}
              />
              <figcaption>
                <span>場面 {String(index + 1).padStart(2, '0')}</span>
                <span>小満</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer>
        <p>小満</p>
        <p>短編映画</p>
        <a href="#top">先頭へ戻る ↑</a>
      </footer>
    </main>
  );
}
