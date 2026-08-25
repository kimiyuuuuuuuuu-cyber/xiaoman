'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const stills = [
  '/stills/field.png',
  '/stills/room.png',
  '/stills/rain.png',
  '/stills/train.png',
];

const gallery = [
  { src: stills[0], ratio: '4 / 5', position: '44% center' },
  { src: stills[2], ratio: '16 / 10', position: 'center' },
  { src: stills[1], ratio: '3 / 4', position: 'center' },
  { src: stills[3], ratio: '4 / 3', position: '60% center' },
  { src: stills[2], ratio: '3 / 5', position: '35% center' },
  { src: stills[0], ratio: '16 / 9', position: 'center 72%' },
  { src: stills[1], ratio: '5 / 4', position: 'center 48%' },
  { src: stills[3], ratio: '3 / 4', position: '72% center' },
  { src: stills[0], ratio: '4 / 3', position: '24% center' },
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
      angle: ((id % 5) - 2) * 1.2,
    };

    setStamps((current) => [...current.slice(-6), stamp]);
    window.setTimeout(() => {
      setStamps((current) => current.filter((item) => item.id !== id));
    }, 1450);
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const distance = Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y);

    if (distance > 72) {
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
            <a href="#物語">物語</a>
            <a href="#制作">制作ノート</a>
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
          <p className="eyebrow">二〇二六年・短編映画</p>
          <h1 id="film-title">小満</h1>
          <div className="synopsis" id="物語">
            <p>
              初夏の雨が止むころ、故郷へ戻ったひとりの女性が、空き家に残された小さな気配をたどる物語。
            </p>
            <p>
              満ちきる直前の季節に惹かれ、田に水が入る数日間の光と風を記録したことから撮影が始まった。
            </p>
          </div>
        </div>

        <p className="hero-note">画面の上で、ゆっくりとカーソルを動かしてください。</p>
        <a className="scroll-cue" href="#作品" aria-label="作品を見る">
          <span>下へ</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="works" id="作品" aria-labelledby="works-title">
        <div className="works-intro">
          <p className="section-index">〇一</p>
          <div>
            <p className="kicker">場面と記憶</p>
            <h2 id="works-title">作品スチル</h2>
          </div>
          <p className="works-description">
            水、風、空き家、帰り道。物語を形づくる断片を、時間の順序から離して並べる。
          </p>
        </div>

        <div className="masonry">
          {gallery.map((item, index) => (
            <figure key={`${item.src}-${index}`} className="still">
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

      <section className="production" id="制作" aria-labelledby="production-title">
        <p className="section-index">〇二</p>
        <h2 id="production-title">制作について</h2>
        <dl>
          <div>
            <dt>監督・脚本</dt>
            <dd>氏名を入力</dd>
          </div>
          <div>
            <dt>撮影地</dt>
            <dd>日本・山間の町</dd>
          </div>
          <div>
            <dt>上映時間</dt>
            <dd>十八分</dd>
          </div>
          <div>
            <dt>完成年</dt>
            <dd>二〇二六</dd>
          </div>
        </dl>
      </section>

      <footer>
        <p>小満</p>
        <p>短編映画・二〇二六</p>
        <a href="#top">先頭へ戻る ↑</a>
      </footer>
    </main>
  );
}
