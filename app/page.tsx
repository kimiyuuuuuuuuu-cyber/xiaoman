'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const stills = Array.from(
  { length: 20 },
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
  { src: stills[12], ratio: '16 / 9', position: '58% center' },
  { src: stills[13], ratio: '16 / 9', position: '64% center' },
  { src: stills[14], ratio: '16 / 9', position: 'center' },
  { src: stills[15], ratio: '16 / 9', position: 'center' },
  { src: stills[16], ratio: '16 / 9', position: 'center' },
  { src: stills[17], ratio: '16 / 9', position: 'center' },
  { src: stills[18], ratio: '16 / 9', position: '36% center' },
  { src: stills[19], ratio: '16 / 9', position: '50% center' },
];
const scriptPages = Array.from(
  { length: 18 },
  (_, index) => `/documents/script-pages/page-${String(index + 2).padStart(2, '0')}.jpg`,
);

type Stamp = { id: number; src: string; x: number; y: number; angle: number };

export default function Home() {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [activeScriptPage, setActiveScriptPage] = useState<number | null>(null);
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
    const target = event.target as Element;
    if (event.clientY <= 60 || target.closest('.site-header')) return;
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

  const showPreviousScriptPage = useCallback(() => {
    setActiveScriptPage((current) =>
      current === null ? null : (current - 1 + scriptPages.length) % scriptPages.length,
    );
  }, []);

  const showNextScriptPage = useCallback(() => {
    setActiveScriptPage((current) =>
      current === null ? null : (current + 1) % scriptPages.length,
    );
  }, []);

  useEffect(() => {
    const reset = () => { lastPoint.current = { x: -200, y: -200 }; };
    window.addEventListener('blur', reset);
    return () => window.removeEventListener('blur', reset);
  }, []);

  useEffect(() => {
    if (activeImage === null && activeScriptPage === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
        setActiveScriptPage(null);
      }
      if (activeImage !== null && event.key === 'ArrowLeft') showPrevious();
      if (activeImage !== null && event.key === 'ArrowRight') showNext();
      if (activeScriptPage !== null && event.key === 'ArrowLeft') showPreviousScriptPage();
      if (activeScriptPage !== null && event.key === 'ArrowRight') showNextScriptPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage, activeScriptPage, showNext, showNextScriptPage, showPrevious, showPreviousScriptPage]);

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
        <header className="site-header" onPointerEnter={() => setStamps([])}>
          <a href="#top" className="wordmark" aria-label="小満・先頭へ">小満</a>
          <nav aria-label="主要ナビゲーション">
            <a href="#作品">作品スチル</a>
            <a href="#監督">監督</a>
            <a href="#監督ノート">監督ノート</a>
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
          <div className="hero-title-group">
            <h1 id="film-title"><img src="/brand/shoman-title-user-en.png" alt="小満 — Whose Summer Was It" /></h1>
            <a className="film-link" href="#映像" aria-label="本編映像の入口へ">
              <span>本編を見る</span><span aria-hidden="true">↘</span>
            </a>
            <div className="synopsis" id="物語">
              <p>六年ぶりに母・紅梅と再会した高校生の小満。ぎこちない距離を抱えた母娘は、花火の夜と閉館後のプールをともに駆け抜ける。</p>
              <p>泳ぎを教える時間、幼い水着、稲穂を揺らす風。離れていた六年を埋めるように近づき、また別れる二人の短い帰郷を描く。</p>
            </div>
          </div>
        </div>

        <p className="hero-note">カーソルを動かすと、記憶の断片が現れます。</p>
        <a className="scroll-cue" href="#作品" aria-label="作品を見る">
          <span>作品スチル</span><span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="works" id="作品" aria-labelledby="works-title">
        <div className="works-intro" id="映像">
          <div>
            <p className="kicker">FILM STILLS</p>
            <h2 id="works-title">作品スチル</h2>
          </div>
          <div className="works-description">
            <p>母と娘が過ごす、短い三日間。</p>
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

      <section className="credits" id="監督" aria-labelledby="credits-title">
        <div className="credits-compact">
          <div className="credit-identity">
            <h2 id="credits-title">虞 礼鋒</h2>
            <p className="credit-name-kana">グ　レイホウ</p>
            <p className="credit-name-en">Kimi Yu</p>
          </div>
          <div className="credit-responsibilities">
            <p className="credit-responsibility-title">『小満』における主な担当</p>
            <p className="credit-roles">監督・脚本・撮影監督・編集・カラーグレーディング・<strong>音楽デザイン</strong></p>
          </div>
        </div>
      </section>

      <div className="director-transition" aria-hidden="true" />

      <section className="director-note" id="監督ノート" aria-labelledby="director-note-title">
        <div className="director-note-inner">
          <header className="director-note-heading">
            <p className="kicker">DIRECTOR&apos;S NOTE</p>
            <h2 id="director-note-title">監督ステートメント</h2>
          </header>
          <div className="director-note-copy">
            <p>『小満』は、「遅れて届いた寄り添い」と「声にならない愛」をめぐる物語です。ありふれた夏の三日間に、母と娘が六年間の空白を埋めようとする姿を描いています。私にとってこれは対立の物語ではなく、「近づくこと」の物語です。互いをよく知るはずでありながら、どこか他人のようになってしまった二人が、時間と沈黙の隙間で、少しずつ相手を理解し直していきます。</p>
            <p>私は「家に帰る」ということに、いつも複雑な感情を抱いてきました。人や場所がめまぐるしく移り変わる時代のなかで、「家」は目的地ではなく、一時的な停留所のようになっています。長く故郷を離れていた母・紅梅は、ようやく休暇を得て帰ってきます。しかし娘の小満は、もう母の記憶のなかで腕に抱かれていた幼い子どもではありません。長い待ち時間と失望を経た小満は、冷静に見えながら、内側では愛を求める少女へと成長していました。彼女はいたずらで母の本心を試し、犬の抜け穴をくぐるという可笑しくも意地のある行動によって、母のいなかった幼年期を母自身に突き返します。</p>
            <p>現代中国では、都市と農村のあいだの人口移動や家族構造の変化によって、「共にいること」は希少なものになりました。「母」と「娘」は家族のなかで見過ごされやすい存在でありながら、互いの感情をもっとも強く映し合います。一方は埋め合わせようとし、一方はそれを拒む。一方は近づこうとし、一方は境界を守ろうとする。だから私が撮りたかったのは、和解の瞬間ではなく、「一歩近づいて、また立ち止まる」ような気まずい距離です。それこそが、現実の親子関係にもっとも多く存在する、もっとも真実な姿だと考えています。</p>
            <p>この母娘関係を、重い嘆きではなく、軽やかで余白があり、ときに笑みのこぼれる語り口で描きたいと考えました。涙や叫びで何かを確かめ合う必要はありません。三日間をともに過ごしたあと、二人がただ気づけばよいのです。私たちは今も、母と娘になる方法を学び続けている。そして今も、互いに近づこうとしているのだと。</p>
          </div>
        </div>
      </section>

      <section className="documents" id="脚本" aria-labelledby="documents-title">
        <div className="section-meta documents-meta">
          <p>制作資料</p><p>日本語版・本文18頁</p>
        </div>
        <div className="documents-heading">
          <p className="kicker">SCREENPLAY</p>
          <h2 id="documents-title">日本語版脚本</h2>
        </div>

        <div className="script-pages" aria-label="『小満』日本語版脚本・本文全18頁">
          {scriptPages.map((page, index) => (
            <figure className="script-page" key={page}>
              <figcaption>{String(index + 1).padStart(2, '0')} / 18</figcaption>
              <button
                type="button"
                className="script-page-button"
                onClick={() => setActiveScriptPage(index)}
                aria-label={`『小満』日本語版脚本 ${index + 1}頁を拡大`}
              >
                <img src={page} alt={`『小満』日本語版脚本 ${index + 1}頁`} loading={index === 0 ? 'eager' : 'lazy'} />
                <span>拡大 ↗</span>
              </button>
            </figure>
          ))}
        </div>

        <a id="絵コンテ" className="storyboard-link" href="/documents/shoman-storyboard-ja.pdf" target="_blank" rel="noreferrer">
          <div>
            <p className="kicker">STORYBOARD</p>
            <h3>日本語版絵コンテ</h3>
            <span>全41頁のPDFを見る</span>
          </div>
          <img src="/documents/storyboard-cover-still.jpg" alt="木立の道を歩く母娘" />
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

      {activeScriptPage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="脚本拡大表示">
          <button className="lightbox-backdrop" type="button" onClick={() => setActiveScriptPage(null)} aria-label="閉じる" />
          <button className="lightbox-close" type="button" onClick={() => setActiveScriptPage(null)} aria-label="閉じる">閉じる ×</button>
          <button className="lightbox-nav lightbox-nav--prev" type="button" onClick={showPreviousScriptPage} aria-label="前の頁">←</button>
          <figure className="lightbox-figure lightbox-figure--script">
            <img src={scriptPages[activeScriptPage]} alt={`日本語版脚本 ${activeScriptPage + 1}頁`} />
            <figcaption><span>日本語版脚本</span><span>{String(activeScriptPage + 1).padStart(2, '0')} / {scriptPages.length}</span></figcaption>
          </figure>
          <button className="lightbox-nav lightbox-nav--next" type="button" onClick={showNextScriptPage} aria-label="次の頁">→</button>
        </div>
      )}
    </main>
  );
}
