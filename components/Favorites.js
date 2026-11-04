"use client";

import { QUESTION_BY_ID, TOPIC_BY_ID } from "../lib/data/questions";
import { KEIGO_BY_ID, KEIGO_GROUP_BY_ID } from "../lib/data/keigo";
import { speakJa } from "../lib/speech";

export default function Favorites({ state, onToggleFav, onPractice, onPracticeKeigo }) {
  const questions = state.favorites.ids.map((id) => QUESTION_BY_ID[id]).filter(Boolean);
  const keigo = state.favorites.ids.map((id) => KEIGO_BY_ID[id]).filter(Boolean);

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
          {questions.map((q) => (
            <div className="card fav" key={q.id}>
              <div className="fav-main">
                <span className="chip">{TOPIC_BY_ID[q.topicId].icon} {TOPIC_BY_ID[q.topicId].name}</span>
                <div className="fav-ja" lang="ja">{q.ja}</div>
                <div className="fav-vi">{q.vi}</div>
                <details>
                  <summary>Câu mẫu</summary>
                  {q.samples.map((s, i) => (
                    <div key={i} className="fav-sample" lang="ja">
                      {s.r}{s.a}<b>{s.q}</b>
                      <div className="sample-vi">{s.vi}</div>
                    </div>
                  ))}
                </details>
              </div>
              <div className="fav-actions">
                <button className="btn ghost small" onClick={() => speakJa(q.ja)}>🔊</button>
                <button className="star on" onClick={() => onToggleFav(q.id)} title="Bỏ yêu thích">★</button>
              </div>
            </div>
          ))}
        </section>
      )}

      {keigo.length > 0 && (
        <section>
          <h3 className="sub-title">🙇 Kính ngữ ({keigo.length})</h3>
          <button className="btn primary wide" onClick={onPracticeKeigo}>Luyện {keigo.length} câu kính ngữ này</button>
          {keigo.map((it) => (
            <div className="card fav" key={it.id}>
              <div className="fav-main">
                <span className="chip">{KEIGO_GROUP_BY_ID[it.groupId].icon} {KEIGO_GROUP_BY_ID[it.groupId].name}</span>
                <div className="fav-vi">{it.sit}</div>
                <div className="fav-ja" lang="ja">{it.plain}</div>
                <details>
                  <summary>Đáp án</summary>
                  {it.ans.map((a, i) => <div key={i} className="fav-sample" lang="ja">→ {a}</div>)}
                  <div className="sample-vi">💡 {it.note}</div>
                </details>
              </div>
              <div className="fav-actions">
                <button className="btn ghost small" onClick={() => speakJa(it.ans[0])}>🔊</button>
                <button className="star on" onClick={() => onToggleFav(it.id)} title="Bỏ yêu thích">★</button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
