"use client";

import { useEffect, useRef, useState } from "react";
import { KEIGO_GROUPS, KEIGO_GROUP_BY_ID, KEIGO_BY_ID, KEIGO_TYPES, VERB_TABLE } from "../lib/data/keigo";
import { speakJa } from "../lib/speech";
import { useDrill, TimerBox, MicBox } from "./drill";
import { shuffle, DrillHeader, NavRow, DoneCard, FavStar, PracticeSettings } from "./Practice";

function idsFor(gid, state) {
  if (gid === "fav") return state.favorites.ids.filter((id) => KEIGO_BY_ID[id]);
  if (gid === "mix") return KEIGO_GROUPS.flatMap((g) => g.items.map((it) => it.id));
  return KEIGO_GROUP_BY_ID[gid].items.map((it) => it.id);
}

function titleFor(gid) {
  if (gid === "fav") return "⭐ Kính ngữ yêu thích";
  if (gid === "mix") return "🎲 Trộn tất cả";
  const g = KEIGO_GROUP_BY_ID[gid];
  return `${g.icon} ${g.name}`;
}

export default function Keigo({ state, onPracticed, onToggleFav, onSettings, request, onRequestHandled }) {
  const [groupId, setGroupId] = useState(null);
  const [order, setOrder] = useState([]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0);
  const counted = useRef(new Set());
  const { settings } = state;

  function start(gid) {
    const ids = idsFor(gid, state);
    if (!ids.length) return;
    setOrder(gid === "mix" || settings.shuffle ? shuffle(ids) : ids);
    setGroupId(gid);
    setIdx(0);
    setDone(false);
    setRound((r) => r + 1);
    counted.current = new Set();
  }

  useEffect(() => {
    if (request) {
      start(request.groupId);
      onRequestHandled();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  const onEngaged = (id) => {
    if (counted.current.has(id)) return;
    counted.current.add(id);
    onPracticed();
  };

  if (!groupId) return <KeigoHome state={state} onStart={start} settings={settings} onSettings={onSettings} />;

  if (done) {
    return <DoneCard total={order.length} practiced={counted.current.size} onAgain={() => start(groupId)} onBack={() => setGroupId(null)} backLabel="Chọn nhóm khác" />;
  }

  const it = KEIGO_BY_ID[order[idx]];

  return (
    <div>
      <DrillHeader title={titleFor(groupId)} idx={idx} total={order.length} onBack={() => setGroupId(null)} backLabel="← Kính ngữ" />
      <KeigoCard
        key={`${round}-${it.id}-${idx}`}
        it={it}
        settings={settings}
        onSettings={onSettings}
        isFav={state.favorites.ids.includes(it.id)}
        onToggleFav={() => onToggleFav(it.id)}
        onEngaged={() => onEngaged(it.id)}
        groupLabel={groupId === "fav" || groupId === "mix" ? KEIGO_GROUP_BY_ID[it.groupId].name : null}
      />
      <NavRow idx={idx} total={order.length} onPrev={() => setIdx(idx - 1)} onNext={() => setIdx(idx + 1)} onDone={() => setDone(true)} />
    </div>
  );
}

function KeigoHome({ state, onStart, settings, onSettings }) {
  const favCount = state.favorites.ids.filter((id) => KEIGO_BY_ID[id]).length;
  return (
    <div>
      <h2 className="section-title">Luyện kính ngữ 敬語</h2>
      <p className="group-desc">Đọc tình huống và câu thường → nói lại bằng kính ngữ → xem đáp án và giải thích.</p>

      <div className="topic-grid">
        {KEIGO_GROUPS.map((g) => (
          <button key={g.id} className="topic" onClick={() => onStart(g.id)}>
            <span className="t-icon">{g.icon}</span>
            <span className="t-name">{g.name}</span>
            <span className="t-jp">{g.items.length} câu</span>
          </button>
        ))}
        <button className="topic alt" onClick={() => onStart("mix")}>
          <span className="t-icon">🎲</span>
          <span className="t-name">Trộn tất cả</span>
          <span className="t-jp">ランダム</span>
        </button>
        <button className="topic alt" disabled={!favCount} onClick={() => onStart("fav")}>
          <span className="t-icon">⭐</span>
          <span className="t-name">Yêu thích</span>
          <span className="t-jp">{favCount ? `${favCount} câu` : "Chưa có"}</span>
        </button>
      </div>

      <div className="card">
        <div className="card-title">3 loại kính ngữ</div>
        {KEIGO_TYPES.map((t) => (
          <div key={t.name} className="ktype">
            <span className="ktype-name" lang="ja">{t.name}</span> <b>{t.vi}</b>: {t.desc}
          </div>
        ))}
      </div>

      <details className="card verb-table">
        <summary className="card-title">📖 Bảng động từ kính ngữ đặc biệt</summary>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Thường</th><th>尊敬語 (người khác)</th><th>謙譲語 (mình)</th></tr>
            </thead>
            <tbody>
              {VERB_TABLE.map((r) => (
                <tr key={r[0]} lang="ja"><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small">Động từ không có trong bảng: 尊敬語 = お＋Vます＋になる (お待ちになる), 謙譲語 = お＋Vます＋する／いたす (お待ちする). Với danh động từ: ご確認になる / ご確認いたします.</p>
      </details>

      <PracticeSettings settings={settings} onSettings={onSettings} />
    </div>
  );
}

function KeigoCard({ it, settings, onSettings, isFav, onToggleFav, onEngaged, groupLabel }) {
  const drill = useDrill({ text: it.plain, seconds: settings.seconds || 10, autoSpeak: settings.autoSpeak, onEngaged });
  const [showAns, setShowAns] = useState(false);

  function reveal() {
    setShowAns((v) => !v);
    drill.pause();
    onEngaged();
  }

  return (
    <div className="card qcard">
      <div className="qtop">
        {groupLabel ? <span className="chip">{groupLabel}</span> : <span />}
        <FavStar on={isFav} onClick={onToggleFav} />
      </div>

      <div className="k-sit">📌 {it.sit}</div>
      <div className="k-label">Câu thường:</div>
      <div className="question k-plain" lang="ja">{it.plain}</div>
      <div className="k-task">→ Nói lại bằng <b>kính ngữ</b></div>

      <div className="row qtools">
        <button className="btn small" onClick={drill.read} disabled={drill.speaking}>{drill.speaking ? "🔊 Đang đọc…" : "🔊 Nghe câu thường"}</button>
      </div>

      <TimerBox drill={drill} onSeconds={(v) => onSettings({ seconds: v })} readingLabel="🔊 Đang đọc câu thường…" />
      <MicBox drill={drill} />

      <button className="btn sample-btn" onClick={reveal}>{showAns ? "Ẩn đáp án" : "💡 Xem đáp án"}</button>

      {showAns && (
        <div className="samples">
          {it.ans.map((a, i) => (
            <div key={i} className={`k-ans ${i === 0 ? "main" : ""}`}>
              <span lang="ja">{a}</span>
              <button className="btn ghost small" onClick={() => speakJa(a)}>🔊</button>
            </div>
          ))}
          <div className="k-note">💡 {it.note}</div>
        </div>
      )}
    </div>
  );
}
