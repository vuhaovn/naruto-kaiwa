// Luyện kính ngữ: cho tình huống + câu thường → nói lại bằng kính ngữ.
// item: { sit (tình huống, tiếng Việt), plain (câu thường), ans: [đáp án chính, cách nói khác…], note (giải thích) }
import type { KeigoGroup, KeigoGroupInput, KeigoItem, KeigoType, VerbRow } from "../types";

export const KEIGO_TYPES: KeigoType[] = [
  { name: "丁寧語", vi: "Thể lịch sự", desc: "です・ます, ございます. Lịch sự chung, dùng với mọi người." },
  { name: "尊敬語", vi: "Tôn kính ngữ", desc: "NÂNG hành động của người khác (khách, cấp trên). VD: いらっしゃる, おっしゃる, ご覧になる." },
  { name: "謙譲語", vi: "Khiêm nhường ngữ", desc: "HẠ hành động của mình (và người công ty mình khi nói với người ngoài). VD: 伺う, 申す, 拝見する." },
];

// Bảng động từ đặc biệt: [thường, 尊敬語, 謙譲語]
export const VERB_TABLE: VerbRow[] = [
  ["いる", "いらっしゃる", "おる"],
  ["行く", "いらっしゃる", "伺う／参る"],
  ["来る", "いらっしゃる／お越しになる／お見えになる", "参る"],
  ["言う", "おっしゃる", "申す／申し上げる"],
  ["見る", "ご覧になる", "拝見する"],
  ["食べる・飲む", "召し上がる", "いただく"],
  ["する", "なさる", "いたす"],
  ["知っている", "ご存じだ", "存じている／存じ上げている"],
  ["もらう", "—", "いただく"],
  ["くれる", "くださる", "—"],
  ["あげる", "—", "差し上げる"],
  ["会う", "お会いになる", "お目にかかる"],
  ["聞く・訪ねる", "お聞きになる", "伺う"],
  ["わかる", "おわかりになる", "承知する／かしこまる"],
  ["見せる", "—", "お目にかける／ご覧に入れる"],
  ["思う", "お思いになる", "存じる"],
];

const KEIGO_GROUP_DEFS: KeigoGroupInput[] = [
  {
    id: "verbs",
    icon: "🔤",
    name: "Động từ đặc biệt",
    desc: "Các động từ có dạng kính ngữ riêng: phải thuộc lòng.",
    items: [
      { sit: "Hỏi khách hàng: ngày mai anh/chị có ở văn phòng không?", plain: "明日、会社にいますか。", ans: ["明日、会社にいらっしゃいますか。"], note: "いる → いらっしゃる (尊敬語) vì là hành động của khách." },
      { sit: "Nói về bản thân: ngày mai tôi ở văn phòng.", plain: "明日は会社にいます。", ans: ["明日は会社におります。"], note: "いる → おる (謙譲語) khi nói về mình." },
      { sit: "Hỏi trưởng phòng đã ăn trưa chưa.", plain: "部長、もう昼ご飯を食べましたか。", ans: ["部長、もう昼食を召し上がりましたか。", "部長、もうお昼は召し上がりましたか。"], note: "食べる → 召し上がる (尊敬語). Không nói「お食べになる」." },
      { sit: "Báo với khách: ngày mai tôi sẽ đến công ty quý vị.", plain: "明日、あなたの会社に行きます。", ans: ["明日、御社に伺います。", "明日、御社に参ります。"], note: "行く → 伺う (đến chỗ đối phương) / 参る. Công ty đối phương nói「御社」(nói), viết「貴社」(văn bản)." },
      { sit: "Hỏi khách mấy giờ sẽ đến.", plain: "何時に来ますか。", ans: ["何時にいらっしゃいますか。", "何時ごろお越しになりますか。"], note: "来る → いらっしゃる / お越しになる / お見えになる." },
      { sit: "Hỏi khách đã xem tài liệu chưa.", plain: "資料を見ましたか。", ans: ["資料をご覧になりましたか。"], note: "見る → ご覧になる (尊敬語)." },
      { sit: "Báo: tôi đã xem tài liệu rồi.", plain: "資料を見ました。", ans: ["資料を拝見しました。", "資料を拝見いたしました。"], note: "見る → 拝見する (謙譲語)." },
      { sit: "Nói với KHÁCH: trưởng phòng Tanaka (công ty mình) đã nói vậy.", plain: "田中部長がそう言いました。", ans: ["部長の田中がそのように申しておりました。"], note: "Quy tắc trong–ngoài (ウチ・ソト): nói với người ngoài thì người công ty mình cũng dùng 謙譲語, bỏ さん và chức danh sau tên (部長の田中)." },
      { sit: "Hỏi lại: anh/chị vừa nói gì ạ?", plain: "今、何と言いましたか。", ans: ["今、何とおっしゃいましたか。", "恐れ入りますが、もう一度おっしゃっていただけますか。"], note: "言う → おっしゃる (尊敬語)." },
      { sit: "Hỏi khách có biết việc đó không.", plain: "その件を知っていますか。", ans: ["その件をご存じですか。", "その件はご存じでしょうか。"], note: "知っている → ご存じだ (尊敬語)." },
      { sit: "Trả lời: tôi không biết việc đó.", plain: "その件は知りません。", ans: ["その件は存じません。", "申し訳ございません、その件は存じておりません。"], note: "知る → 存じる (謙譲語). 「知りません」nghe cộc lốc với khách." },
      { sit: "Báo: tôi đã nhận được tài liệu từ khách.", plain: "資料をもらいました。", ans: ["資料をいただきました。", "資料を頂戴しました。"], note: "もらう → いただく / 頂戴する (謙譲語)." },
      { sit: "Kể: anh Tanaka (khách) đã cho tôi tài liệu.", plain: "田中さんが資料をくれました。", ans: ["田中様が資料をくださいました。"], note: "くれる → くださる (尊敬語)." },
      { sit: "Nói: ngày mai tôi sẽ gặp giám đốc (bên khách).", plain: "明日、社長に会います。", ans: ["明日、社長にお目にかかります。"], note: "会う → お目にかかる (謙譲語)." },
      { sit: "Mở lời: tôi muốn hỏi một chút.", plain: "ちょっと聞きたいんですが。", ans: ["少々お伺いしたいのですが。", "少しお聞きしてもよろしいでしょうか。"], note: "聞く → 伺う (謙譲語). ちょっと → 少々 trong công việc." },
    ],
  },
  {
    id: "office",
    icon: "☎️",
    name: "Công sở & điện thoại",
    desc: "Các câu cố định khi nghe điện thoại, viết mail, nói chuyện trong công ty.",
    items: [
      { sit: "Nhấc máy điện thoại công ty.", plain: "もしもし、ABC会社です。", ans: ["はい、ABC会社でございます。", "お電話ありがとうございます。ABC会社でございます。"], note: "Nhấc máy trong công việc không dùng「もしもし」. です → でございます." },
      { sit: "Hỏi tên người gọi.", plain: "誰ですか。", ans: ["失礼ですが、どちら様でしょうか。"], note: "誰 → どちら様. Thêm「失礼ですが」cho mềm." },
      { sit: "Nhờ đối phương chờ máy.", plain: "ちょっと待ってください。", ans: ["少々お待ちください。", "少々お待ちいただけますでしょうか。"], note: "ちょっと → 少々. Dạng hỏi「〜いただけますでしょうか」còn lịch sự hơn." },
      { sit: "Anh Tanaka (đồng nghiệp) đang không có ở chỗ ngồi.", plain: "田中さんは今いません。", ans: ["申し訳ございません、田中はただいま席を外しております。"], note: "Người công ty mình: bỏ さん. いません → 席を外しております (謙譲語 + cách nói khéo)." },
      { sit: "Hỏi khách có muốn để lại lời nhắn không.", plain: "伝言はありますか。", ans: ["よろしければ、ご伝言を承りましょうか。"], note: "引き受ける/聞く → 承る (謙譲語)." },
      { sit: "Hứa sẽ bảo đồng nghiệp gọi lại.", plain: "あとで電話させます。", ans: ["戻りましたら、折り返しお電話するよう申し伝えます。"], note: "折り返し = gọi lại. 伝える → 申し伝える (謙譲語, nói với người ngoài về người nhà)." },
      { sit: "Điện thoại nghe không rõ.", plain: "声が聞こえません。", ans: ["恐れ入りますが、お電話が少々遠いようです。"], note: "Cách nói khéo, không trách đối phương nói nhỏ." },
      { sit: "Nhờ khách nói lại lần nữa.", plain: "もう一回言ってください。", ans: ["恐れ入りますが、もう一度おっしゃっていただけますか。"], note: "言う → おっしゃる + 〜ていただけますか (nhờ vả lịch sự)." },
      { sit: "Trả lời cấp trên / khách: tôi hiểu rồi.", plain: "わかりました。", ans: ["承知いたしました。", "かしこまりました。"], note: "「了解しました」không nên dùng với cấp trên/khách." },
      { sit: "Câu mở đầu mail gửi khách.", plain: "いつもありがとう。", ans: ["いつもお世話になっております。"], note: "Câu chào cố định đầu mail/điện thoại công việc." },
      { sit: "Mail: gửi tài liệu đính kèm, nhờ xem.", plain: "ファイルを送ります。見てください。", ans: ["資料をお送りいたしますので、ご確認ください。", "資料を添付いたしますので、ご査収のほどよろしくお願いいたします。"], note: "送る → お送りする/いたす. ご査収 = xin kiểm tra và nhận (văn viết)." },
      { sit: "Mail: xin lỗi vì trả lời muộn.", plain: "返事が遅くなってごめんなさい。", ans: ["ご返信が遅くなり、申し訳ございません。"], note: "ごめんなさい → 申し訳ございません trong công việc." },
      { sit: "Về trước đồng nghiệp/cấp trên.", plain: "先に帰ります。", ans: ["お先に失礼いたします。", "お先に失礼します。"], note: "Câu cố định khi rời công ty trước." },
      { sit: "Nhờ cấp trên xem giúp tài liệu.", plain: "これを見てもらえますか。", ans: ["こちらをご確認いただけますでしょうか。", "お手すきの際に、こちらをご確認いただけますか。"], note: "これ → こちら. 見てもらう → ご確認いただく. お手すきの際に = khi anh/chị rảnh." },
      { sit: "Hỏi lịch rảnh của khách.", plain: "いつ暇ですか。", ans: ["ご都合のよろしい日時を教えていただけますでしょうか。"], note: "暇 nghe thất lễ → ご都合. いい → よろしい." },
    ],
  },
  {
    id: "brse",
    icon: "💼",
    name: "BrSE với khách hàng",
    desc: "Xin lỗi, nhờ vả, từ chối, xác nhận: những câu BrSE dùng hằng ngày.",
    items: [
      { sit: "Xin lỗi khách vì sự cố.", plain: "迷惑をかけてすみません。", ans: ["ご迷惑をおかけし、大変申し訳ございません。"], note: "すみません → 申し訳ございません. 迷惑 → ご迷惑. Thêm「大変」khi lỗi nghiêm trọng." },
      { sit: "Nhờ khách xác nhận đặc tả.", plain: "この仕様を確認してください。", ans: ["お手数ですが、こちらの仕様をご確認いただけますでしょうか。"], note: "Mở đầu bằng クッション言葉「お手数ですが」. 〜てください → 〜ていただけますでしょうか." },
      { sit: "Mở lời: tôi có một điểm muốn hỏi.", plain: "質問があります。", ans: ["一点、確認させていただきたいことがございます。"], note: "〜させていただく = xin phép làm. あります → ございます." },
      { sit: "Từ chối yêu cầu vì không kịp lịch.", plain: "それはできません。", ans: ["申し訳ございませんが、今回のスケジュールでは対応が難しい状況です。"], note: "Người Nhật tránh nói thẳng「できません」→ dùng「難しい」. Nên kèm phương án thay thế." },
      { sit: "Xin lùi hạn nộp khoảng 2 ngày.", plain: "締め切りを延ばしてください。", ans: ["大変恐縮ですが、納期を2日ほど延ばしていただくことは可能でしょうか。"], note: "Nhờ vả lớn → 恐縮ですが + 〜ていただくことは可能でしょうか." },
      { sit: "Báo đang điều tra, xin thêm thời gian.", plain: "今調べています。ちょっと待ってください。", ans: ["現在調査しておりますので、もう少々お時間をいただけますでしょうか。"], note: "〜ています → 〜ております. Thời gian → お時間をいただく." },
      { sit: "Cảm ơn khách đã chỉ ra lỗi.", plain: "指摘ありがとう。", ans: ["ご指摘いただき、ありがとうございます。"], note: "指摘する (khách) → ご指摘いただく." },
      { sit: "Hứa sẽ liên lạc lại sau khi kiểm tra.", plain: "わかったら連絡します。", ans: ["確認でき次第、改めてご連絡いたします。"], note: "〜次第 = ngay khi. 連絡する → ご連絡いたします." },
      { sit: "Hỏi khách đã cân nhắc/quyết định chưa.", plain: "もう決めましたか。", ans: ["ご検討いただけましたでしょうか。"], note: "Hỏi thẳng「決めましたか」dễ gây áp lực → dùng ご検討." },
      { sit: "Đề nghị một buổi họp.", plain: "会議をしたいです。", ans: ["一度お打ち合わせのお時間をいただけないでしょうか。"], note: "〜たいです (muốn) nghe trẻ con với khách → 〜いただけないでしょうか." },
      { sit: "Xác nhận: hạn nộp là thứ sáu đúng không?", plain: "金曜日に出せばいいですか。", ans: ["金曜日までに提出するという認識でよろしいでしょうか。"], note: "Mẫu xác nhận rất hay dùng của BrSE: 〜という認識でよろしいでしょうか." },
      { sit: "Gửi lại tài liệu đã sửa.", plain: "直した資料を送ります。", ans: ["修正した資料を再送いたしますので、ご確認のほどよろしくお願いいたします。"], note: "直す → 修正する. ご確認のほど = xin hãy xem giúp (mềm hơn)." },
      { sit: "Không nắm được việc khách hỏi.", plain: "わかりません。", ans: ["申し訳ございません、その件については把握しておりませんので、確認いたします。"], note: "Không chỉ nói「わかりません」: xin lỗi + hứa xác nhận." },
      { sit: "Xin ý kiến khách.", plain: "どう思いますか。", ans: ["ご意見をお聞かせいただけますでしょうか。", "いかがでしょうか。"], note: "どう → いかが. 聞かせてもらう → お聞かせいただく." },
      { sit: "Báo công việc đang bị chậm.", plain: "作業が遅れています。", ans: ["申し訳ございません、作業に遅れが生じております。"], note: "遅れが生じる = phát sinh chậm trễ (văn công việc). Báo sớm + kèm nguyên nhân, đối sách." },
    ],
  },
];

export const KEIGO_GROUPS: KeigoGroup[] = KEIGO_GROUP_DEFS.map((g) => ({
  ...g,
  items: g.items.map((it, i): KeigoItem => ({ ...it, id: `keigo-${g.id}-${i + 1}`, groupId: g.id })),
}));

export const KEIGO_BY_ID: Record<string, KeigoItem | undefined> = Object.fromEntries(
  KEIGO_GROUPS.flatMap((g) => g.items.map((it) => [it.id, it] as const)),
);
export const KEIGO_GROUP_BY_ID: Record<string, KeigoGroup | undefined> = Object.fromEntries(
  KEIGO_GROUPS.map((g) => [g.id, g] as const),
);
