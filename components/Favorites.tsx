"use client";

import { QUESTION_BY_ID, TOPIC_BY_ID } from "../lib/data/questions";
import { KEIGO_BY_ID, KEIGO_GROUP_BY_ID } from "../lib/data/keigo";
import { speakJa } from "../lib/speech";
import type { AppState, KeigoItem, Question } from "../lib/types";

interface FavoritesProps {
  state: AppState;
  onToggleFav: (id: string) => void;
  onPractice: () => void;
  onPracticeKeigo: () => void;
}

export default function Favorites({ state, onToggleFav, onPractice, onPracticeKeigo }: FavoritesProps) {
  const questions = state.favorites.ids.map((id) => QUESTION_BY_ID[id]).filter((q): q is Question => !!q);
  const keigo = state.favorites.ids.map((id) => KEIGO_BY_ID[id]).filter((k): k is KeigoItem => !!k);

  return (
    <div>
      <h2 className="section-title">Câu yêu thích</h2>
      {questions.length === 0 && keigo.length === 0 && (
        <div className="card empty">
          <div className="big-emoji">☆</div>
          <p>Chưa có câu nào. Khi luyện, bấm ☆ trên thẻ để lưu lại những câu bạn muốn ôn thêm.</p>
        </div>
      )}

      {questions.length > 0 && (
        <section>
          <h3 className="sub-title">🗣️ Hội thoại ({questions.length})</h3>
          <button className="btn primary wide" onClick={onPractice}>Luyện {questions.length} câu này</button>
          {questions.map((q) => {
            const topic = TOPIC_BY_ID[q.topicId];
            return (
              <div className="card fav" key={q.id}>
                <div className="fav-main">
                  {topic && <span className="chip">{topic.icon} {topic.name}</span>}
                  <div className="fav-ja" lang="ja">{q.ja}</div>
                  <div className="fav-vi">{q.vi}</div>
                  <details>
                    <summary>Câu mẫu</summary>
                    {q.samples.map((s, i) => (
                      <div key={i} className="fav-sample" lang="ja">
                        {s.r}
                        {s.a}
                        <b>{s.q}</b>
                        <div className="sample-vi">{s.vi}</div>
                      </div>
                    ))}
                  </details>
                </div>
                <div className="fav-actions">
                  <button className="btn ghost small" onClick={() => void speakJa(q.ja)}>🔊</button>
                  <button className="star on" onClick={() => onToggleFav(q.id)} title="Bỏ yêu thích">★</button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {keigo.length > 0 && (
        <section>
          <h3 className="sub-title">🙇 Kính ngữ ({keigo.length})</h3>
          <button className="btn primary wide" onClick={onPracticeKeigo}>Luyện {keigo.length} câu kính ngữ này</button>
          {keigo.map((it) => {
            const group = KEIGO_GROUP_BY_ID[it.groupId];
            return (
              <div className="card fav" key={it.id}>
                <div className="fav-main">
                  {group && <span className="chip">{group.icon} {group.name}</span>}
                  <div className="fav-vi">{it.sit}</div>
                  <div className="fav-ja" lang="ja">{it.plain}</div>
                  <details>
                    <summary>Đáp án</summary>
                    {it.ans.map((a, i) => (
                      <div key={i} className="fav-sample" lang="ja">→ {a}</div>
                    ))}
                    <div className="sample-vi">💡 {it.note}</div>
                  </details>
                </div>
                <div className="fav-actions">
                  <button className="btn ghost small" onClick={() => void speakJa(it.ans[0])}>🔊</button>
                  <button className="star on" onClick={() => onToggleFav(it.id)} title="Bỏ yêu thích">★</button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
