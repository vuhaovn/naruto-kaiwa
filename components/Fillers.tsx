"use client";

import { useState } from "react";
import { FILLER_GROUPS } from "../lib/data/fillers";
import { speakJa } from "../lib/speech";

export default function Fillers() {
  const [groupId, setGroupId] = useState(FILLER_GROUPS[0]?.id ?? "");
  const [quiz, setQuiz] = useState(false);
  const [opened, setOpened] = useState<Record<number, boolean>>({});
  const g = FILLER_GROUPS.find((x) => x.id === groupId) ?? FILLER_GROUPS[0];
  if (!g) return null;

  return (
    <div>
      <h2 className="section-title">Câu câu giờ & Aizuchi</h2>

      <div className="pills">
        {FILLER_GROUPS.map((x) => (
          <button
            key={x.id}
            className={x.id === g.id ? "on" : ""}
            onClick={() => {
              setGroupId(x.id);
              setOpened({});
            }}
          >
            {x.icon} {x.title}
          </button>
        ))}
      </div>

      <div className="card tip">{g.desc}</div>

      <label className="quiz-toggle">
        <input
          type="checkbox"
          checked={quiz}
          onChange={(e) => {
            setQuiz(e.target.checked);
            setOpened({});
          }}
        />
        Chế độ tự kiểm tra: ẩn giải thích, chạm vào thẻ để xem
      </label>

      <div className="filler-list">
        {g.items.map((it, i) => {
          const hidden = quiz && !opened[i];
          return (
            <div
              key={i}
              className={`card filler ${hidden ? "hidden" : ""}`}
              onClick={() => quiz && setOpened({ ...opened, [i]: !opened[i] })}
            >
              <div className="f-head">
                <div>
                  <div className="f-ja" lang="ja">{it.ja}</div>
                  <div className="f-romaji">{it.romaji}</div>
                </div>
                <button
                  className="btn ghost small"
                  onClick={(e) => {
                    e.stopPropagation();
                    void speakJa((it.ja.split("／")[0] ?? it.ja).replace(/〜/g, ""));
                  }}
                >
                  🔊
                </button>
              </div>
              {hidden ? (
                <div className="f-hiddenhint">Nghĩa là gì? Dùng khi nào? (chạm để xem)</div>
              ) : (
                <>
                  <div className="f-vi">{it.vi}</div>
                  <div className="f-when"><b>Khi nào dùng:</b> {it.when}</div>
                  <div className="f-ex">
                    <div className="f-ex-ja" lang="ja">
                      {it.ex}
                      <button
                        className="btn ghost small"
                        onClick={(e) => {
                          e.stopPropagation();
                          void speakJa(it.ex);
                        }}
                      >
                        🔊
                      </button>
                    </div>
                    <div className="f-ex-vi">{it.exVi}</div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
