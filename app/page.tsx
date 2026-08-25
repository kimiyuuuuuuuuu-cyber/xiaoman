'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const stills = Array.from(
  { length: 12 },
  (_, index) => `/stills-real/${String(index + 1).padStart(2, '0')}.jpg`,
);

const gallery = [
  { src: stills[7], ratio: '4 / 5', position: '54% center' },
  { src: stills[8], ratio: '16 / 9', position: 'center' },
  { src: stills[9], ratio: '16 / 10', position: '38% center' },
  { src: stills[0], ratio: '16 / 10', position: 'center' },
  { src: stills[3], ratio: '3 / 4', position: '52% center' },
  { src: stills[5], ratio: '16 / 11', position: 'center' },
  { src: stills[4], ratio: '4 / 5', position: '60% center' },
  { src: stills[6], ratio: '16 / 11', position: 'center' },
  { src: stills[1], ratio: '4 / 5', position: '42% center' },
  { src: stills[2], ratio: '5 / 4', position: 'center' },
  { src: stills[10], ratio: '3 / 4', position: '42% center' },
  { src: stills[11], ratio: '16 / 9', position: 'center' },
];
const scriptPages = Array.from(
  { length: 19 },
  (_, index) => `/documents/script-pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
);

type Stamp = { id: number; src: string; x: number; y: number; angle: number };

export default function Home() {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [activeImage, setActiveImage] = useState<number | null>(null);
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

  const showPrevious = useCallback(() => {
    setActiveImage((current) =>
      current === null ? null : (current - 1 + gallery.length) % gallery.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveImage((current) =>
      current === null ? null : (current + 1) % gallery.length,
    );
  }, []);

  useEffect(() => {
    const reset = () => { lastPoint.current = { x: -200, y: -200 }; };
    window.addEventListener('blur', reset);
    return () => window.removeEventListener('blur', reset);
  }, []);

  useEffect(() => {
    if (activeImage === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage, showNext, showPrevious]);

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
          <a href="#top" className="wordmark" aria-label="小満・先頭へ">小満</a>
          <nav aria-label="主要ナビゲーション">
            <a href="#作品">作品</a>
            <a href="#クレジット">クレジット</a>
            <a href="#脚本">脚本</a>
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
          <h1 id="film-title"><img src="/brand/shoman-title-user-en.png" alt="小満 — Whose Summer Was It" /></h1>
          <div className="synopsis" id="物語">
            <p>六年ぶりに母・紅梅と再会した高校生の小満。ぎこちない距離を抱えた母娘は、花火の夜と閉館後のプールをともに駆け抜ける。</p>
            <p>泳ぎを教える時間、幼い水着、稲穂を揺らす風。離れていた六年を埋めるように近づき、また別れる二人の短い帰郷を描く。</p>
          </div>
        </div>

        <a className="film-link" href="#映像" aria-label="本編映像の入口へ">
          <span>本編を見る</span><span aria-hidden="true">↘</span>
        </a>
        <p className="hero-note">カーソルを動かすと、記憶の断片が現れます。</p>
        <a className="scroll-cue" href="#作品" aria-label="作品を見る">
          <span>作品スチル</span><span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="works" id="作品" aria-labelledby="works-title">
        <div className="works-intro" id="映像">
          <p className="section-index">〇一</p>
          <div>
            <p className="kicker">FILM STILLS</p>
            <h2 id="works-title">作品スチル</h2>
          </div>
          <div className="works-description">
            <p>母と娘が過ごす、短い三日間。</p>
            <p className="film-placeholder">本編リンク準備中</p>
          </div>
        </div>

        <div className="masonry">
          {gallery.map((item, index) => (
            <figure key={item.src} className="still">
              <button
                type="button"
                className="still-button"
                onClick={() => setActiveImage(index)}
                aria-label={`作品スチル ${String(index + 1).padStart(2, '0')} を拡大`}
              >
                <img
                  src={item.src}
                  alt={`映画「小満」の作品スチル ${String(index + 1).padStart(2, '0')}`}
                  style={{ aspectRatio: item.ratio, objectPosition: item.position }}
                />
                <span className="still-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="still-open">拡大 ↗</span>
              </button>
            </figure>
          ))}
        </div>
      </section>

      <section className="credits" id="クレジット" aria-labelledby="credits-title">
        <div className="section-meta">
          <p className="section-index">〇二</p><p>クレジット</p><p>短編映画「小満」</p>
        </div>
        <div className="credits-compact">
          <div>
            <p className="kicker">DIRECTOR</p>
            <h2 id="credits-title">虞 礼鋒</h2>
            <p className="credit-name-en">Kimi Yu</p>
          </div>
          <p className="credit-roles">監督・脚本・撮影監督・編集・カラーグレーディング・<strong>音楽デザイン</strong></p>
        </div>
      </section>

      <section className="documents" id="脚本" aria-labelledby="documents-title">
        <div className="section-meta">
          <p className="section-index">〇三</p><p>制作資料</p><p>日本語版・19頁</p>
        </div>
        <div className="documents-heading">
          <p className="kicker">SCREENPLAY</p>
          <h2 id="documents-title">日本語版脚本</h2>
        </div>

        <div className="script-pages" aria-label="『小満』日本語版脚本・全19頁">
          {scriptPages.map((page, index) => (
            <figure className="script-page" key={page}>
              <figcaption>{String(index + 1).padStart(2, '0')} / 19</figcaption>
              <img src={page} alt={`『小満』日本語版脚本 ${index + 1}頁`} loading={index === 0 ? 'eager' : 'lazy'} />
            </figure>
          ))}
        </div>

        <a className="storyboard-link" href="/documents/shoman-storyboard-ja.pdf" target="_blank" rel="noreferrer">
          <div>
            <p className="kicker">STORYBOARD</p>
            <h3>日本語版絵コンテ</h3>
            <span>全41頁のPDFを見る</span>
          </div>
          <img src="/documents/storyboard-cover.png" alt="『小満』日本語版絵コンテの表紙" />
          <span className="storyboard-arrow" aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <p>小満</p><p>監督・虞 礼鋒</p><a href="#top">先頭へ戻る ↑</a>
      </footer>

      {activeImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="作品スチル拡大表示">
          <button className="lightbox-backdrop" type="button" onClick={() => setActiveImage(null)} aria-label="閉じる" />
          <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="閉じる">閉じる ×</button>
          <button className="lightbox-nav lightbox-nav--prev" type="button" onClick={showPrevious} aria-label="前の画像">←</button>
          <figure className="lightbox-figure">
            <img src={gallery[activeImage].src} alt={`作品スチル ${activeImage + 1}`} />
            <figcaption><span>小満</span><span>{String(activeImage + 1).padStart(2, '0')} / {gallery.length}</span></figcaption>
          </figure>
          <button className="lightbox-nav lightbox-nav--next" type="button" onClick={showNext} aria-label="次の画像">→</button>
        </div>
      )}
    </main>
  );
}
