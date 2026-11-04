"use client";

import { useEffect, useRef, useState } from "react";
import { TOPICS, TOPIC_GROUPS, TOPIC_BY_ID, QUESTION_BY_ID } from "../lib/data/questions";
import { speakJa } from "../lib/speech";
import type { AppState, Question, Settings } from "../lib/types";
import { useDrill, TimerBox, MicBox, Seg, SECONDS } from "./drill";

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

export type OnSettings = (patch: Partial<Settings>) => void;

/** Id chủ đề, hoặc "fav" (yêu thích), hoặc "mix-<nhóm>" (trộn ngẫu nhiên) */
export type PracticeTarget = string;

export interface PracticeRequest {
  topicId: PracticeTarget;
  n: number;
}

function idsFor(tid: PracticeTarget, state: AppState): string[] {
  if (tid === "fav") return state.favorites.ids.filter((id) => QUESTION_BY_ID[id]);
  if (tid.startsWith("mix-")) {
    const g = tid.slice(4);
    return TOPICS.filter((t) => t.group === g).flatMap((t) => t.questions.map((q) => q.id));
  }
  return TOPIC_BY_ID[tid]?.questions.map((q) => q.id) ?? [];
}

function titleFor(tid: PracticeTarget): string {
  if (tid === "fav") return "⭐ Câu yêu thích";
  if (tid === "mix-daily") return "🎲 Trộn hội thoại đời thường";
  if (tid === "mix-brse") return "🎲 Trộn chủ đề BrSE";
  const t = TOPIC_BY_ID[tid];
  return t ? `${t.icon} ${t.name}` : "";
}

interface PracticeProps {
  state: AppState;
  onPracticed: () => void;
  onToggleFav: (id: string) => void;
  onSettings: OnSettings;
  request: PracticeRequest | null;
  onRequestHandled: () => void;
}

export default function Practice({ state, onPracticed, onToggleFav, onSettings, request, onRequestHandled }: PracticeProps) {
  const [topicId, setTopicId] = useState<PracticeTarget | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0);
  const counted = useRef(new Set<string>());
  const { settings } = state;

  function start(tid: PracticeTarget): void {
    const ids = idsFor(tid, state);
    if (!ids.length) return;
    const shouldShuffle = tid.startsWith("mix-") || settings.shuffle;
    setOrder(shouldShuffle ? shuffle(ids) : ids);
    setTopicId(tid);
    setIdx(0);
    setDone(false);
    setRound((r) => r + 1);
    counted.current = new Set();
  }

  useEffect(() => {
    if (request) {
      start(request.topicId);
      onRequestHandled();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  const onEngaged = (qid: string): void => {
    if (counted.current.has(qid)) return;
    counted.current.add(qid);
    onPracticed();
  };

  if (!topicId) {
    return <TopicPicker state={state} onStart={start} onSettings={onSettings} />;
  }

  if (done) {
    return (
      <DoneCard
        total={order.length}
        practiced={counted.current.size}
        onAgain={() => start(topicId)}
        onBack={() => setTopicId(null)}
        backLabel="Chọn chủ đề khác"
      />
    );
  }

  const qid = order[idx];
  const q: Question | undefined = qid ? QUESTION_BY_ID[qid] : undefined;
  if (!q) return null;
  const mixed = topicId === "fav" || topicId.startsWith("mix-");

  return (
    <div>
      <DrillHeader title={titleFor(topicId)} idx={idx} total={order.length} onBack={() => setTopicId(null)} backLabel="← Chủ đề" />

      <QuestionCard
        key={`${round}-${q.id}-${idx}`}
        q={q}
        settings={settings}
        onSettings={onSettings}
        isFav={state.favorites.ids.includes(q.id)}
        onToggleFav={() => onToggleFav(q.id)}
        onEngaged={() => onEngaged(q.id)}
        topicLabel={mixed ? (TOPIC_BY_ID[q.topicId]?.name ?? null) : null}
      />

      <NavRow idx={idx} total={order.length} onPrev={() => setIdx(idx - 1)} onNext={() => setIdx(idx + 1)} onDone={() => setDone(true)} />
    </div>
  );
}

// ---------- Các phần dùng chung với tab Kính ngữ ----------

interface DrillHeaderProps {
  title: string;
  idx: number;
  total: number;
  onBack: () => void;
  backLabel: string;
}

export function DrillHeader({ title, idx, total, onBack, backLabel }: DrillHeaderProps) {
  return (
    <>
      <div className="practice-head">
        <button className="btn ghost small" onClick={onBack}>{backLabel}</button>
        <div className="ph-title">{title}</div>
        <div className="ph-count">{idx + 1}/{total}</div>
      </div>
      <div className="progress">
        <div style={{ width: `${((idx + 1) / total) * 100}%` }} />
      </div>
    </>
  );
}

interface NavRowProps {
  idx: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDone: () => void;
}

export function NavRow({ idx, total, onPrev, onNext, onDone }: NavRowProps) {
  return (
    <div className="row nav-row">
      <button className="btn" disabled={idx === 0} onClick={onPrev}>← Câu trước</button>
      {idx < total - 1 ? (
        <button className="btn primary" onClick={onNext}>Câu tiếp →</button>
      ) : (
        <button className="btn primary" onClick={onDone}>Hoàn thành ✓</button>
      )}
    </div>
  );
}

interface DoneCardProps {
  total: number;
  practiced: number;
  onAgain: () => void;
  onBack: () => void;
  backLabel: string;
}

export function DoneCard({ total, practiced, onAgain, onBack, backLabel }: DoneCardProps) {
  return (
    <div className="card done">
      <div className="big-emoji">🎉</div>
      <h2>Xong {total} câu!</h2>
      <p>Bạn đã luyện {practiced} câu trong lượt này. お疲れ様でした！</p>
      <div className="row center">
        <button className="btn primary" onClick={onAgain}>Luyện lại</button>
        <button className="btn" onClick={onBack}>{backLabel}</button>
      </div>
    </div>
  );
}

export function PracticeSettings({ settings, onSettings }: { settings: Settings; onSettings: OnSettings }) {
  return (
    <div className="card settings">
      <div className="setting">
        <span>⏱️ Thời gian suy nghĩ</span>
        <Seg<number> value={settings.seconds} options={SECONDS} onChange={(v) => onSettings({ seconds: v })} suffix="s" />
      </div>
      <label className="setting">
        <span>🔀 Đảo thứ tự câu hỏi</span>
        <input type="checkbox" checked={settings.shuffle} onChange={(e) => onSettings({ shuffle: e.target.checked })} />
      </label>
      <label className="setting">
        <span>🔊 Tự đọc câu hỏi (đồng hồ chạy sau khi đọc xong)</span>
        <input type="checkbox" checked={settings.autoSpeak} onChange={(e) => onSettings({ autoSpeak: e.target.checked })} />
      </label>
      <label className="setting">
        <span>🇻🇳 Luôn hiện nghĩa tiếng Việt</span>
        <input type="checkbox" checked={settings.showVi} onChange={(e) => onSettings({ showVi: e.target.checked })} />
      </label>
    </div>
  );
}

export function FavStar({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button className={`star ${on ? "on" : ""}`} onClick={onClick} title={on ? "Bỏ yêu thích" : "Lưu vào yêu thích"}>
      {on ? "★" : "☆"}
    </button>
  );
}

// ---------- Chọn chủ đề ----------

interface TopicPickerProps {
  state: AppState;
  onStart: (tid: PracticeTarget) => void;
  onSettings: OnSettings;
}

function TopicPicker({ state, onStart, onSettings }: TopicPickerProps) {
  const favCount = state.favorites.ids.filter((id) => QUESTION_BY_ID[id]).length;
  return (
    <div>
      {TOPIC_GROUPS.map((g) => (
        <section key={g.id}>
          <h2 className="section-title">{g.title}</h2>
          {g.desc && <p className="group-desc">{g.desc}</p>}
          <div className="topic-grid">
            {TOPICS.filter((t) => t.group === g.id).map((t) => (
              <button key={t.id} className="topic" onClick={() => onStart(t.id)}>
                <span className="t-icon">{t.icon}</span>
                <span className="t-name">{t.name}</span>
                <span className="t-jp">{t.jp} · {t.questions.length} câu</span>
              </button>
            ))}
            <button className="topic alt" onClick={() => onStart(`mix-${g.id}`)}>
              <span className="t-icon">🎲</span>
              <span className="t-name">Trộn ngẫu nhiên</span>
              <span className="t-jp">ランダム</span>
            </button>
          </div>
        </section>
      ))}

      <div className="topic-grid">
        <button className="topic alt" disabled={!favCount} onClick={() => onStart("fav")}>
          <span className="t-icon">⭐</span>
          <span className="t-name">Câu yêu thích</span>
          <span className="t-jp">{favCount ? `${favCount} câu` : "Chưa có"}</span>
        </button>
      </div>

      <PracticeSettings settings={state.settings} onSettings={onSettings} />

      <div className="card tip">
        <b>Cách luyện:</b> Nghe câu hỏi → trong thời gian đếm ngược, nghĩ câu trả lời theo 3 bước → bấm 🎤 và nói thành tiếng →
        bấm <i>Xem câu mẫu</i> để so sánh. Đừng cố hoàn hảo: <b>nói ra được</b> mới là quan trọng nhất!
      </div>
    </div>
  );
}

// ---------- Thẻ câu hỏi ----------

interface QuestionCardProps {
  q: Question;
  settings: Settings;
  onSettings: OnSettings;
  isFav: boolean;
  onToggleFav: () => void;
  onEngaged: () => void;
  topicLabel: string | null;
}

function QuestionCard({ q, settings, onSettings, isFav, onToggleFav, onEngaged, topicLabel }: QuestionCardProps) {
  const drill = useDrill({ text: q.ja, seconds: settings.seconds, autoSpeak: settings.autoSpeak, onEngaged });
  const [showVi, setShowVi] = useState(settings.showVi);
  const [showSample, setShowSample] = useState(false);

  function revealSample(): void {
    setShowSample((v) => !v);
    drill.pause();
    onEngaged();
  }

  return (
    <div className="card qcard">
      <div className="qtop">
        {topicLabel ? <span className="chip">{topicLabel}</span> : <span />}
        <FavStar on={isFav} onClick={onToggleFav} />
      </div>

      <div className="question" lang="ja">{q.ja}</div>
      {showVi && <div className="question-vi">{q.vi}</div>}

      <div className="row qtools">
        <button className="btn small" onClick={() => void drill.read()} disabled={drill.speaking}>
          {drill.speaking ? "🔊 Đang đọc…" : "🔊 Nghe lại"}
        </button>
        <button className="btn small" onClick={() => setShowVi(!showVi)}>{showVi ? "🙈 Ẩn nghĩa" : "🇻🇳 Hiện nghĩa"}</button>
      </div>

      <TimerBox drill={drill} onSeconds={(v) => onSettings({ seconds: v })} />
      <MicBox drill={drill} />

      <button className="btn sample-btn" onClick={revealSample}>
        {showSample ? "Ẩn câu mẫu" : "💡 Xem câu mẫu"}
      </button>

      {showSample && (
        <div className="samples">
          {q.samples.map((s, i) => (
            <div className="sample" key={i}>
              <div className="sample-head">
                <span>Mẫu {q.samples.length > 1 ? i + 1 : ""}</span>
                <button className="btn ghost small" onClick={() => void speakJa(`${s.r}${s.a}${s.q}`)}>🔊 Nghe</button>
              </div>
              <div className="sline s1" lang="ja"><b>①</b> {s.r}</div>
              <div className="sline s2" lang="ja"><b>②</b> {s.a}</div>
              <div className="sline s3" lang="ja"><b>③</b> {s.q}</div>
              <div className="sample-vi">{s.vi}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
