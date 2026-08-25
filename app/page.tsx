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

const characters = [
  {
    id: '紅梅',
    className: 'character-page--hongmei',
    number: '01',
    romanized: 'LI HONGMEI',
    name: '李 紅梅',
    facts: ['46歳', '高速鉄道駅の清掃員', '忍耐強く、草のようにしなやかで頑固'],
    lead: '冬の葦原で、楠の湯桶に入れられた赤ん坊として拾われた紅梅。血のつながりよりも深い愛情に育てられながら、幼い頃から「自分が家族に負担をかけたのではないか」という罪悪感を抱えてきた。',
    paragraphs: [
      '冬のある日、李岱維は凍りついた葦原で水鳥を追っている途中、楠の湯桶の中に赤ん坊を見つけた。包まれていたのは灰色の古い布団で、そばには半分溶けた麦芽糖と、赤い紙が一枚だけ残されていた。その紙から「梅」の字を取り、岱維と妻の繍娘は彼女を紅梅と名づけた。血のつながりのない二人は、実の娘と変わらぬ愛情を注いで彼女を育てた。',
      '紅梅の幼年期は、塩気を含んだ葦原と湿地のそばにあった。彼女は葦の茎を空中へ向けて吹き、泡が塩の干潟の上で氷の粒に変わるのを眺めるのが好きだった。養父・岱維は山奥の希少金属鉱山で働き、一、二か月も家を空けることがあった。帰るたびに彼は、アルミの水筒や木の独楽、木彫りの象など、鉱山で余った材料から小さな贈り物を作ってくれた。',
      '父から届いた最後の贈り物は、紅梅が拾われた湯桶を改造した小さな氷橇だった。けれど六歳の冬、父は鉱山事故で亡くなる。知らせを持ってきた人々の言葉を聞いても、紅梅には死の意味がすぐには理解できなかった。ただ、家から父の笑い声が消え、母が夜通し眠れなくなったことで、暮らしが二度と元には戻らないことを知った。',
      '家計と家事は繍娘の肩にのしかかった。母は村人のために布を織り、服を縫い、わずかな収入を得た。紅梅も早くから針仕事を学び、炊事や掃除を引き受けた。母が苦しむ姿を見るたび、自分が養女であること、自分が来たために父が外へ働きに出なければならなかったこと、家に男の子を残せなかったことまで、すべてを自分の責任のように感じた。その罪悪感は、彼女の中で責任感と頑固さへ変わっていった。',
      '十六歳になる頃、母の体は目に見えて弱っていた。紅梅は家を支えるため、都市へ働きに出ることを決める。出発前、彼女は父が働いていた閉山後の鉱山を訪ねた。錆びた機械と崩れた坑道の前で、粗い石を撫でながら、父に別れと決意を告げた。「お父さん、私は行く。必ず家を守る」。そこで初めて、彼女は声を上げずに泣き、長く抱えてきた悔恨を少しだけ手放した。',
      '一九九〇年代の大都市で、紅梅が最初に得た仕事は、ベルトやキーホルダーに金具を取り付ける小さな工房だった。油と埃で手は真っ黒になり、爪の間には汚れが入り、掌のまめは何度も破れた。賃金は出来高制で、速く作れば作るほど収入が増えた。彼女は誰よりも手を止めず、店主の補充が追いつかないほど働いた。少ない給料でも、母へ仕送りができることが彼女にとっての安心だった。',
      '工房の近くでは、同じように故郷を離れた女工たちと古い家を借りた。壁は剝がれ、床は軋み、窓にはひびが入っていた。夜、隙間から変わっていく空を見ながら、故郷の土地、働き続ける母、忙しかった父を思い出した。都市の喧騒の中にいても、外から来た労働者としての隔たりと孤独は消えなかった。それでも、彼女は立ち止まることを自分に許さなかった。',
      '一年後、十八歳の紅梅はすでに家の大黒柱になっていた。昼は朝八時から金具工房で働き、夜八時から翌午前一時まで別の縫製工場で検品をした。その二重生活を三年間続ける。金具工房が閉じると、検品先で縫製の仕事を得た。女工寮には空調と湯があり、何より自分だけのベッドがあった。恐れと不安が少しずつ薄れ、そこは初めて都市の中で得た小さな居場所になった。',
      '故郷を出てからの八年間、紅梅は正月にも一度も帰らなかった。休暇よりも割増賃金を選び、母に携帯電話を買い、ほぼ毎日声を聞いた。二人は互いに唯一の家族であり、精神的な支えだった。工場では縫製だけでなく管理にも関わり、空き時間に職業訓練へ通った。やがて現場の中心となり、広い部屋を借り、貯金で故郷の家を直すまでになった。',
      '王剛との出会いは、暑い午後に扇風機を買いに入った電器店から始まった。農村から出てきた彼もまた、紅梅とよく似た温かさと粘り強さを持っていた。派手な恋ではなく、食事や散歩を重ね、互いの故郷と夢を語るうちに信頼を育てた。簡素な結婚式を挙げ、やがて娘・小満を授かる。その後二人は故郷へ戻り、新しい家を建てた。紅梅は町の縫製工場で班長となり、王剛はトラックで配送をし、繍娘も家事と育児を助けた。小満は学校でいつも一番の成績を取り、その頃が紅梅の人生でもっとも幸福な時間だった。',
      '転機は、息子が生まれて七日目に訪れた。新生児検査でフェニルケトン尿症と診断され、毎月少なくとも二千元の薬代が必要だと告げられた。紅梅は治療費を集めるため必死に方法を探したが、夫は現実を受け止められず、親戚の無責任な言葉にも煽られ、家族と紅梅への恨みを募らせていった。「もう耐えられない。出ていく」。やがて彼は家だけを残して去り、二人が再び会うことはなかった。',
      '離婚後、紅梅は仕事と息子の治療にすべてを注いだ。四十歳になった彼女は子どもたちを繍娘へ託し、十六歳の時と同じように、もう一度大都市へ向かう。年齢の壁に阻まれながら、紹介を頼りに高速鉄道駅の清掃員となった。ガラスを磨く時は体を低く沈め、温水と洗剤で三度拭き、古新聞で艶を出す。六年かけて身につけた技術で、待合室の窓は靴の影まで映すほど透明になった。',
      '紅梅が苦手なのは、綿菓子を持った子どもがガラスへ近づく瞬間だった。糖の糸が窓に蜘蛛の巣のように残ると、八年前、産院の外で幼い小満が背伸びをして押しつけた手の跡が、寒波に凍りついた氷の花のように思い出される。それは本来、人生でもっとも幸福な記憶だったはずなのに、息子の病と家族の崩壊の始まりにもなってしまった。紅梅の強さは傷つかないことではない。傷を抱えたまま、働き、家族を支え、愛することをやめないところにある。',
    ],
  },
  {
    id: '小満',
    className: 'character-page--xiaoman',
    number: '02',
    romanized: 'LI XIAOMAN',
    name: '李 小満',
    facts: ['14歳', '中学生', '内向的で敏感、寂しさを隠すように強がる'],
    lead: '父は家を去り、母は遠い都市で働く。祖母と弟と暮らす小満は、母を待つ時間のなかで、甘えるより先に自分を守る方法を覚えた。冷たさも反抗も、ほんとうは見捨てられたくないという願いの裏返しである。',
    paragraphs: [
      '十四歳の小満は、内向的で敏感、そして頑固な少女である。外からは強く見えても、心の中には深い孤独と不安が沈んでいる。感情を言葉にするのが得意ではなく、たまに起こす反抗的な行動だけが、押し込めた思いの出口になっている。家族や愛情を描いた本を好み、日記を書き、母と過ごした幼い頃の記憶を絵にする。そこに描かれる母は、いつも笑っている。',
      '小満は貧しい家庭で育った。母・紅梅は一年のほとんどを都市で働き、父は幼い頃に家を出た。祖母の繍娘に育てられ、弟と暮らしている。母が家計と息子の治療を支えるために遠くで働いていることは理解していた。母は家族のために苦労している。だから寂しいと言ってはいけない。小満は幼い頃からそう自分に言い聞かせてきた。',
      '風が吹く日、母は小満を玄関へ連れ出し、空を指して言った。「この雲が見えるかぎり、私たちは同じ空の下にいる」。その頃の小満にとって、母は世界のすべてだった。母が弟のために出稼ぎへ行ったあとも、その言葉を信じれば何とか耐えられると思っていた。しかし母と話せるのは、忙しさの合間の短い電話だけだった。学校の成績や祖母の体調を尋ねると、母はすぐに仕事へ戻ってしまう。',
      '学校では、ほかの子どもたちが両親の話をするたびに小満は目を伏せた。「親のいない子」「孤児」と笑われても、反論する言葉を見つけられず、涙を飲み込んだ。家へ戻れば、弟の前では笑顔を見せ、頼れる姉でいようとした。その背中には、誰にも見せられない孤独と喪失感が積み重なっていった。',
      '成長するにつれて、小満の性格は急に反抗的になった。感情を閉じ込める代わりに、誰かと衝突することで存在を確かめようとした。授業中に教師へ言い返し、忠告を無視し、わざと対立する。派手な服や濃い口紅を選ぶことも、周囲へ「自分はあなたたちとは違う」と示すための鎧だった。',
      '母から電話が来ても、小満は「まあまあ」と冷たく答えるようになった。以前のように学校の出来事を話すことはなく、母の仕事の話にも興味を示さない。母の声が慌ただしくなると、電話を脇へ置き、そのまま切れるまで聞かないふりをする。母が仕事ばかりで、自分の内側を見ようとしないことに腹を立てていた。同時に、母の関心を失うことを何よりも恐れていた。',
      '春節が近づくたび、母は電話で「厚着をして、祖母の言うことを聞きなさい」と繰り返した。その言葉には心配があっても、離れた場所からでは埋められない距離があった。六年間帰ってこない母は、小満の心の中でしだいに遠い人になっていく。今年こそ帰ってくるかもしれないという期待と、また失望するかもしれないという恐れが、春節を苦しい時間へ変えた。',
      'その年、母がまた帰れないと告げると、小満はついに耐えられなくなった。「お母さんは私のことを考えたことがある？　六年だよ。六年間、一度も帰ってこなかった。仕事とお金のことばかりで、私が学校でどれだけ孤独だったか、一人でどう過ごしてきたか、聞いたことがある？」。電話の向こうで母は黙り、「小満、私は……」と低い声で答えることしかできなかった。',
      '小満は泣きながら言葉を重ねた。「もう聞きたくない。どうして私のところへ帰れないの？　私は必要じゃないの？」。そして最後に、「帰ってこないなら、もうお母さんと呼ばない」と叫んで電話を切った。長年積もった寂しさ、怒り、委屈が一度にあふれた瞬間だった。',
      '枕元には、幼い小満が母の腕の中で笑っている古い写真がある。その笑顔を見つめながら、かつて母が語った同じ空の約束を思い出す。けれど今、彼女に見えるのは薄い隔たりだけだった。母の帰りを待ち、抱きしめられる日を待ち、笑顔を待ってきた。そのすべてが触れれば壊れる泡のように思えた。小満は強くなったのではない。母の愛を失う怖さに耐えるため、強く見える殻を身につけただけなのである。',
    ],
  },
];

type Stamp = { id: number; src: string; x: number; y: number; angle: number };

export default function Home() {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [activeScriptPage, setActiveScriptPage] = useState<number | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<number | null>(null);
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
    if (activeImage === null && activeScriptPage === null && activeCharacter === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
        setActiveScriptPage(null);
        setActiveCharacter(null);
      }
      if (activeImage !== null && event.key === 'ArrowLeft') showPrevious();
      if (activeImage !== null && event.key === 'ArrowRight') showNext();
      if (activeScriptPage !== null && event.key === 'ArrowLeft') showPreviousScriptPage();
      if (activeScriptPage !== null && event.key === 'ArrowRight') showNextScriptPage();
      if (activeCharacter !== null && event.key === 'ArrowLeft') {
        setActiveCharacter((activeCharacter - 1 + characters.length) % characters.length);
      }
      if (activeCharacter !== null && event.key === 'ArrowRight') {
        setActiveCharacter((activeCharacter + 1) % characters.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCharacter, activeImage, activeScriptPage, showNext, showNextScriptPage, showPrevious, showPreviousScriptPage]);

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
            <a
              className="film-link"
              href="https://youtu.be/2rvIpCJllzY"
              target="_blank"
              rel="noreferrer"
              aria-label="短編映画『小満』本編をYouTubeで見る"
            >
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

      <section className="characters" id="人物" aria-labelledby="characters-title">
        <header className="characters-heading">
          <p className="kicker">CHARACTER PORTRAITS</p>
          <h2 id="characters-title">人物小伝</h2>
        </header>

        <div className="characters-grid">
          {characters.map((character, index) => (
            <article
              className="character-card"
              id={character.id}
              key={character.id}
              aria-labelledby={`${character.id}-title`}
            >
              <div className="character-copy">
              <div className="character-label">
                <span>{character.number}</span>
                <span>{character.romanized}</span>
              </div>
              <h3 id={`${character.id}-title`}>{character.name}</h3>
              <ul className="character-facts" aria-label={`${character.id}の基本情報`}>
                {character.facts.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>
              <p className="character-lead">{character.lead}</p>
                <button className="character-more" type="button" onClick={() => setActiveCharacter(index)}>
                  <span>続きを読む</span><span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
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

      {activeCharacter !== null && (
        <div className="lightbox character-modal" role="dialog" aria-modal="true" aria-labelledby="character-modal-title">
          <button className="lightbox-backdrop" type="button" onClick={() => setActiveCharacter(null)} aria-label="閉じる" />
          <button className="lightbox-close" type="button" onClick={() => setActiveCharacter(null)} aria-label="閉じる">閉じる ×</button>
          <button
            className="lightbox-nav lightbox-nav--prev"
            type="button"
            onClick={() => setActiveCharacter((activeCharacter - 1 + characters.length) % characters.length)}
            aria-label="前の人物"
          >←</button>
          <article className="character-modal-panel">
            <div className="character-label">
              <span>{characters[activeCharacter].number}</span>
              <span>{characters[activeCharacter].romanized}</span>
            </div>
            <h3 id="character-modal-title">{characters[activeCharacter].name}</h3>
            <ul className="character-facts" aria-label={`${characters[activeCharacter].id}の基本情報`}>
              {characters[activeCharacter].facts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
            <div className="character-details-copy">
              <p>{characters[activeCharacter].lead}</p>
              {characters[activeCharacter].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <button
            className="lightbox-nav lightbox-nav--next"
            type="button"
            onClick={() => setActiveCharacter((activeCharacter + 1) % characters.length)}
            aria-label="次の人物"
          >→</button>
        </div>
      )}
    </main>
  );
}
