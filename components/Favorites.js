"use client";

import { QUESTION_BY_ID, TOPIC_BY_ID } from "../lib/data/questions";
import { speakJa } from "../lib/speech";

export default function Favorites({ state, onToggleFav, onPractice }) {
  const list = state.favorites.ids.map((id) => QUESTION_BY_ID[id]).filter(Boolean);

  return (
    <div>
      <h2 className="section-title">Câu yêu thích</h2>
      {list.length === 0 ? (
        <div className="card empty">
          <div className="big-emoji">☆</div>
          <p>Chưa có câu nào. Khi luyện, bấm ☆ trên thẻ câu hỏi để lưu lại những câu bạn muốn ôn thêm.</p>
        </div>
      ) : (
        <>
          <button className="btn primary wide" onClick={onPractice}>🗣️ Luyện {list.length} câu này</button>
          <div className="fav-list">
            {list.map((q) => (
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
          </div>
        </>
      )}
    </div>
  );
}
