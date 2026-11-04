// Mỗi câu hỏi: { ja, vi, samples: [{ r, a, q, vi }] }
//   r = Phản ứng, a = Trả lời + thêm 1 ý, q = Hỏi lại, vi = nghĩa cả câu mẫu
import { Q } from "./q";
import { BRSE_TOPICS } from "./brse";

export const TOPIC_GROUPS = [
  { id: "daily", title: "Hội thoại đời thường" },
  { id: "brse", title: "💼 Tiếng Nhật IT · BrSE", desc: "Phía Nhật (PM, khách hàng, người phỏng vấn) hỏi, bạn trả lời. Bước ③ trong công việc: xác nhận lại hoặc hỏi lại để tránh hiểu sai." },
];

const DAILY_TOPICS = [
  {
    id: "intro",
    icon: "🙋",
    name: "Tự giới thiệu",
    jp: "自己紹介",
    questions: [
      Q("お名前は何ですか。", "Bạn tên là gì?", [
        ["はい、グエン・ヴァン・ナムです。", "ナムと呼んでください。ベトナムでは名前の最後の部分で呼ぶんですよ。", "お名前を伺ってもいいですか。",
          "Vâng, tôi là Nguyễn Văn Nam. Cứ gọi tôi là Nam nhé. Ở Việt Nam người ta gọi bằng phần cuối của tên đấy. Cho tôi hỏi tên anh/chị được không?"],
      ]),
      Q("どちらから来ましたか。", "Bạn đến từ đâu?", [
        ["ベトナムから来ました。", "ハノイ出身で、日本に来て3年になります。", "ベトナムに行ったことはありますか。",
          "Tôi đến từ Việt Nam. Tôi quê Hà Nội, sang Nhật được 3 năm rồi. Anh/chị đã từng đến Việt Nam chưa?"],
      ]),
      Q("日本に来てどのくらいですか。", "Bạn sang Nhật được bao lâu rồi?", [
        ["そうですね、もう3年ぐらいになります。", "最初は大変でしたが、今はだいぶ慣れました。", "こちらのご出身なんですか。",
          "Để xem, cũng được khoảng 3 năm rồi. Lúc đầu vất vả lắm, nhưng giờ quen nhiều rồi. Anh/chị là người ở đây luôn ạ?"],
      ]),
      Q("どうして日本に来たんですか。", "Sao bạn lại sang Nhật?", [
        ["いい質問ですね。", "日本の会社で働いてみたくて来ました。アニメもきっかけの一つです。", "逆に、外国に住んでみたいと思ったことはありますか。",
          "Câu hỏi hay đấy. Tôi muốn thử làm việc ở công ty Nhật nên sang. Anime cũng là một lý do. Ngược lại, anh/chị đã bao giờ muốn sống ở nước ngoài chưa?"],
      ]),
      Q("日本語が上手ですね。", "Tiếng Nhật của bạn giỏi quá.", [
        ["いえいえ、まだまだです。", "毎日勉強していますが、敬語はまだ難しいです。", "何か外国語は勉強されていますか。",
          "Không đâu, tôi còn kém lắm. Ngày nào tôi cũng học nhưng kính ngữ vẫn khó. Anh/chị có học ngoại ngữ nào không?"],
        ["ありがとうございます。そう言ってもらえるとうれしいです。", "でも、話すのはまだ苦手で、とっさに言葉が出てこないんです。", "私の日本語、変なところがあったら教えてもらえますか。",
          "Cảm ơn anh/chị. Được nói vậy tôi vui lắm. Nhưng tôi vẫn kém nói, nhiều lúc không bật ra được từ. Nếu tiếng Nhật của tôi có chỗ nào lạ, anh/chị chỉ giúp tôi được không?"],
      ]),
      Q("日本語はどこで勉強したんですか。", "Bạn học tiếng Nhật ở đâu?", [
        ["最初はベトナムの日本語学校で勉強しました。", "そのあと日本に来て、仕事をしながら独学で続けています。", "外国語を勉強したことはありますか。",
          "Ban đầu tôi học ở trường tiếng Nhật tại Việt Nam. Sau đó sang Nhật, vừa đi làm vừa tự học tiếp. Anh/chị đã từng học ngoại ngữ chưa?"],
      ]),
      Q("ご家族は何人ですか。", "Gia đình bạn có mấy người?", [
        ["4人家族です。", "両親と妹がベトナムにいて、時々ビデオ電話で話しています。", "ご家族は近くに住んでいらっしゃるんですか。",
          "Nhà tôi 4 người. Bố mẹ và em gái ở Việt Nam, thỉnh thoảng tôi gọi video nói chuyện. Gia đình anh/chị có sống gần không?"],
      ]),
      Q("結婚していますか。", "Bạn đã kết hôn chưa?", [
        ["いえ、まだ独身です。", "親にはよく「早く結婚しなさい」と言われますけど(笑)。", "日本でも親にそういうこと言われますか。",
          "Chưa, tôi vẫn độc thân. Bố mẹ hay bảo \"lấy vợ/chồng nhanh lên\" (cười). Ở Nhật bố mẹ có hay nói vậy không?"],
      ]),
      Q("今どこに住んでいますか。", "Hiện giờ bạn sống ở đâu?", [
        ["今は横浜に住んでいます。", "海が近くて、休みの日によく散歩します。", "お住まいはどちらですか。",
          "Giờ tôi sống ở Yokohama. Gần biển nên ngày nghỉ tôi hay đi dạo. Anh/chị sống ở đâu ạ?"],
      ]),
      Q("日本の生活はどうですか。", "Cuộc sống ở Nhật thế nào?", [
        ["すごく楽しいです。", "電車が時間通りに来るのが本当に便利ですね。ただ、家賃は高いですけど。", "日本の生活で、外国の人によく驚かれることって何だと思いますか。",
          "Vui lắm. Tàu đến đúng giờ thật sự tiện. Có điều tiền nhà hơi đắt. Anh/chị nghĩ điều gì ở cuộc sống Nhật hay làm người nước ngoài ngạc nhiên?"],
      ]),
      Q("どんな性格ですか。", "Bạn là người có tính cách thế nào?", [
        ["うーん、難しいですね。", "よく「のんびりしている」と言われます。でも仕事のときは結構まじめですよ。", "ご自分ではどんな性格だと思いますか。",
          "Ừm, khó nhỉ. Tôi hay bị nói là \"thong thả\". Nhưng lúc làm việc thì khá nghiêm túc đấy. Anh/chị tự thấy mình tính cách thế nào?"],
      ]),
      Q("日本で一番びっくりしたことは何ですか。", "Điều gì ở Nhật làm bạn ngạc nhiên nhất?", [
        ["たくさんありますけど…", "一番はコンビニですね。何でも売っていて、24時間開いているのに驚きました。", "海外に行って驚いたことってありますか。",
          "Nhiều lắm, nhưng… Nhất là combini. Cái gì cũng bán mà mở 24/24, tôi bất ngờ lắm. Anh/chị đi nước ngoài có gì làm mình ngạc nhiên không?"],
      ]),
      Q("将来の夢は何ですか。", "Ước mơ tương lai của bạn là gì?", [
        ["夢ですか…そうですね。", "いつか日本とベトナムをつなぐ仕事がしたいです。", "何か夢ってありますか。",
          "Ước mơ à… để xem. Một ngày nào đó tôi muốn làm công việc kết nối Nhật và Việt Nam. Anh/chị có ước mơ gì không?"],
      ]),
      Q("いつまで日本にいる予定ですか。", "Bạn định ở Nhật đến bao giờ?", [
        ["まだはっきり決めていないんです。", "少なくともあと5年はいたいと思っています。", "ずっとこの町に住むおつもりですか。",
          "Tôi vẫn chưa quyết định rõ. Ít nhất tôi muốn ở thêm 5 năm nữa. Anh/chị định sống ở thành phố này mãi chứ?"],
      ]),
      Q("お名前にはどんな意味がありますか。", "Tên bạn có ý nghĩa gì?", [
        ["あ、面白い質問ですね。", "私の名前の「ナム」は漢字で書くと「南」という意味なんです。", "お名前の漢字にはどんな意味があるんですか。",
          "À, câu hỏi thú vị đấy. Chữ \"Nam\" trong tên tôi viết bằng chữ Hán là \"南\" (phương Nam). Chữ Hán trong tên anh/chị có ý nghĩa gì vậy?"],
      ]),
    ],
  },
  {
    id: "work",
    icon: "💼",
    name: "Công việc",
    jp: "仕事",
    questions: [
      Q("お仕事は何をされていますか。", "Bạn làm nghề gì?", [
        ["IT関係の仕事をしています。", "システム開発で、主にベトナムのチームとのやり取りを担当しています。", "どんなお仕事をされているんですか。",
          "Tôi làm trong ngành IT. Mảng phát triển hệ thống, chủ yếu phụ trách liên lạc với team Việt Nam. Anh/chị làm công việc gì ạ?"],
      ]),
      Q("会社はどこにありますか。", "Công ty bạn ở đâu?", [
        ["品川にあります。", "駅から近いので通勤は楽ですが、朝の電車は本当に混みますね。", "毎日電車で通っていますか。",
          "Ở Shinagawa. Gần ga nên đi làm cũng tiện, nhưng tàu buổi sáng đông thật. Anh/chị ngày nào cũng đi tàu à?"],
      ]),
      Q("通勤時間はどのくらいですか。", "Bạn đi làm mất bao lâu?", [
        ["だいたい40分ぐらいです。", "電車の中でよく日本語のポッドキャストを聞いています。", "通勤中は何をしていますか。",
          "Khoảng 40 phút. Trên tàu tôi hay nghe podcast tiếng Nhật. Anh/chị làm gì trong lúc đi làm?"],
      ]),
      Q("お仕事は忙しいですか。", "Công việc có bận không?", [
        ["そうですね、最近はちょっと忙しいです。", "来月新しいプロジェクトが始まるので、準備でバタバタしています。", "今の時期はお忙しいですか。",
          "Ừm, dạo này hơi bận. Tháng sau bắt đầu dự án mới nên đang tất bật chuẩn bị. Thời điểm này anh/chị có bận không?"],
      ]),
      Q("今の仕事は楽しいですか。", "Công việc hiện tại có vui không?", [
        ["はい、楽しいです。", "大変なこともありますが、新しい技術を学べるのがうれしいです。", "お仕事で一番楽しいのはどんなときですか。",
          "Có, vui lắm. Cũng có lúc vất vả nhưng được học công nghệ mới nên tôi vui. Trong công việc, lúc nào anh/chị thấy vui nhất?"],
      ]),
      Q("残業は多いですか。", "Bạn có hay làm thêm giờ không?", [
        ["うーん、日によりますね。", "締め切り前は遅くなりますが、普段は7時ぐらいには帰れます。", "残業は多い方ですか。",
          "Ừm, tùy ngày. Trước deadline thì về muộn, còn bình thường khoảng 7 giờ là về được. Anh/chị có hay làm thêm không?"],
      ]),
      Q("どうして今の仕事を選んだんですか。", "Sao bạn chọn công việc hiện tại?", [
        ["そうですね…", "大学でITを勉強していて、日本語も生かせる仕事がしたかったんです。", "今のお仕事を選んだきっかけは何ですか。",
          "Để xem… Tôi học IT ở đại học và muốn làm việc tận dụng được cả tiếng Nhật. Lý do anh/chị chọn công việc hiện tại là gì?"],
      ]),
      Q("職場の雰囲気はどうですか。", "Không khí nơi làm việc thế nào?", [
        ["すごくいいですよ。", "みんな優しくて、分からないことがあってもすぐ教えてくれます。", "職場はどんな雰囲気ですか。",
          "Tốt lắm. Mọi người hiền, có gì không hiểu là chỉ ngay. Chỗ làm của anh/chị không khí thế nào?"],
      ]),
      Q("日本の会社とベトナムの会社は何が違いますか。", "Công ty Nhật và công ty Việt khác nhau thế nào?", [
        ["いい質問ですね。", "日本は報連相をすごく大事にしますね。ベトナムはもう少し自由な感じです。", "外国の会社で働いたことはありますか。",
          "Câu hỏi hay đấy. Ở Nhật rất coi trọng Báo cáo–Liên lạc–Thảo luận. Việt Nam thì tự do hơn một chút. Anh/chị từng làm ở công ty nước ngoài chưa?"],
      ]),
      Q("今の会社に入って何年ですか。", "Bạn vào công ty hiện tại được mấy năm rồi?", [
        ["もう2年になります。", "あっという間でしたけど、仕事にもだいぶ慣れてきました。", "今の会社は長いんですか。",
          "Được 2 năm rồi. Trôi qua nhanh thật, nhưng tôi cũng quen việc nhiều rồi. Anh/chị làm ở công ty hiện tại lâu chưa?"],
      ]),
      Q("仕事で大変なことは何ですか。", "Điều gì vất vả trong công việc?", [
        ["やっぱり敬語ですね。", "お客さんへのメールで、正しい表現を選ぶのにいつも時間がかかります。", "何かいいコツってありますか。",
          "Đúng là kính ngữ. Viết mail cho khách, tôi luôn mất thời gian chọn cách diễn đạt đúng. Anh/chị có mẹo gì hay không?"],
      ]),
      Q("休みは取りやすいですか。", "Có dễ xin nghỉ không?", [
        ["わりと取りやすいです。", "テトの時期にはまとめて休みを取って、ベトナムに帰ります。", "長い休みが取れたら、どこに行きたいですか。",
          "Khá dễ. Dịp Tết tôi xin nghỉ dài để về Việt Nam. Nếu được nghỉ dài, anh/chị muốn đi đâu?"],
      ]),
      Q("将来はどんな仕事がしたいですか。", "Sau này bạn muốn làm công việc gì?", [
        ["まだ考え中ですが…", "いつかはチームをまとめるリーダーになりたいです。", "将来やってみたいことってありますか。",
          "Tôi vẫn đang suy nghĩ, nhưng… Một ngày nào đó tôi muốn làm leader quản lý team. Anh/chị có điều gì muốn thử làm trong tương lai không?"],
      ]),
      Q("転職を考えたことはありますか。", "Bạn đã từng nghĩ đến chuyện chuyển việc chưa?", [
        ["正直に言うと、ちょっとだけあります(笑)。", "でも今の仕事で学べることがまだ多いので、しばらくは続けるつもりです。", "日本では転職って一般的になってきましたか。",
          "Nói thật là có một chút (cười). Nhưng công việc hiện tại còn nhiều thứ để học nên tôi định làm tiếp một thời gian. Ở Nhật chuyển việc giờ đã phổ biến chưa?"],
      ]),
      Q("仕事の後は何をしていますか。", "Sau giờ làm bạn thường làm gì?", [
        ["だいたいジムに行きます。", "体を動かすとストレスが解消できるんです。", "仕事の後はまっすぐ帰る派ですか。",
          "Tôi thường đi gym. Vận động là giải tỏa được căng thẳng. Anh/chị thuộc kiểu tan làm về thẳng nhà à?"],
      ]),
    ],
  },
  {
    id: "hobby",
    icon: "🎸",
    name: "Sở thích",
    jp: "趣味",
    questions: [
      Q("趣味は何ですか。", "Sở thích của bạn là gì?", [
        ["趣味ですか…いろいろありますけど、", "一番は写真を撮ることです。休みの日はカメラを持って出かけます。", "何か趣味はありますか。",
          "Sở thích à… cũng nhiều, nhưng nhất là chụp ảnh. Ngày nghỉ tôi mang máy ảnh ra ngoài. Anh/chị có sở thích gì không?"],
      ]),
      Q("最近ハマっていることはありますか。", "Dạo này bạn có mê cái gì không?", [
        ["あります！", "最近はキャンプにハマっていて、先月初めて一人で行きました。", "最近何かハマっていることってありますか。",
          "Có chứ! Dạo này tôi mê cắm trại, tháng trước lần đầu đi một mình. Dạo này anh/chị có mê gì không?"],
      ]),
      Q("スポーツはしますか。", "Bạn có chơi thể thao không?", [
        ["はい、サッカーが好きです。", "ベトナムではサッカーがすごく人気で、会社の仲間と毎週やっています。", "スポーツは何かされますか。",
          "Có, tôi thích bóng đá. Ở Việt Nam bóng đá rất được ưa chuộng, tuần nào tôi cũng đá với đồng nghiệp. Anh/chị có chơi môn gì không?"],
      ]),
      Q("どんな音楽を聞きますか。", "Bạn nghe nhạc gì?", [
        ["いろいろ聞きますけど、", "最近はJ-POPをよく聞いています。特にYOASOBIが好きです。", "どんな音楽を聞きますか。",
          "Tôi nghe đủ thứ, nhưng dạo này hay nghe J-POP. Đặc biệt thích YOASOBI. Anh/chị nghe nhạc gì?"],
      ]),
      Q("映画は好きですか。", "Bạn có thích phim không?", [
        ["はい、大好きです。", "特にジブリ映画が好きで、「千と千尋の神隠し」は何回も見ました。", "最近何か面白い映画を見ましたか。",
          "Có, rất thích. Đặc biệt là phim Ghibli, \"Vùng đất linh hồn\" tôi xem mấy lần rồi. Gần đây anh/chị có xem phim gì hay không?"],
      ]),
      Q("アニメは見ますか。", "Bạn có xem anime không?", [
        ["見ます見ます！", "日本語の勉強も兼ねて、字幕なしで見るようにしています。", "おすすめのアニメはありますか。",
          "Có, có chứ! Tôi cố xem không phụ đề để kết hợp học tiếng Nhật luôn. Anh/chị có anime nào giới thiệu không?"],
      ]),
      Q("本を読むのは好きですか。", "Bạn có thích đọc sách không?", [
        ["そうですね、時々読みます。", "日本語の小説はまだ時間がかかりますが、村上春樹は読みました。", "最近読んだ本で面白かったものはありますか。",
          "Ừm, thỉnh thoảng tôi đọc. Tiểu thuyết tiếng Nhật thì vẫn đọc chậm, nhưng tôi đã đọc Murakami Haruki. Gần đây anh/chị có đọc cuốn nào hay không?"],
      ]),
      Q("料理はしますか。", "Bạn có nấu ăn không?", [
        ["はい、ほぼ毎日自炊しています。", "外食は高いので、週末にまとめて作り置きしています。", "料理はよくされますか。",
          "Có, gần như ngày nào tôi cũng tự nấu. Ăn ngoài đắt nên cuối tuần tôi nấu sẵn một thể. Anh/chị có hay nấu ăn không?"],
      ]),
      Q("いつからその趣味を始めたんですか。", "Bạn bắt đầu sở thích đó từ khi nào?", [
        ["えっと、たしか大学生の頃です。", "友達に誘われて始めたら、すっかりハマってしまいました。", "何か長く続けている趣味はありますか。",
          "Ừm, hình như từ hồi đại học. Bạn rủ nên bắt đầu, rồi mê luôn. Anh/chị có sở thích nào theo đuổi lâu không?"],
      ]),
      Q("子供のころ、何をして遊んでいましたか。", "Hồi nhỏ bạn hay chơi gì?", [
        ["懐かしいですね。", "近所の子と外でサッカーをしたり、凧揚げをしたりしていました。", "子供のころはどんな遊びをしていましたか。",
          "Hoài niệm quá. Tôi hay đá bóng, thả diều ngoài trời với lũ trẻ hàng xóm. Hồi nhỏ anh/chị hay chơi gì?"],
      ]),
      Q("カラオケは好きですか。", "Bạn có thích karaoke không?", [
        ["好きですけど、あまり上手じゃないです(笑)。", "ベトナムでもカラオケはすごく人気で、家にカラオケセットがある人も多いんですよ。", "カラオケではどんな曲を歌いますか。",
          "Thích nhưng hát không hay lắm (cười). Ở Việt Nam karaoke cũng rất phổ biến, nhiều nhà có cả dàn karaoke đấy. Đi karaoke anh/chị hay hát bài gì?"],
      ]),
      Q("ゲームはしますか。", "Bạn có chơi game không?", [
        ["たまにします。", "スマホゲームが多いですね。通勤中にちょっとだけ。", "ゲームはされますか。",
          "Thỉnh thoảng. Chủ yếu là game điện thoại, chơi một chút trên đường đi làm. Anh/chị có chơi game không?"],
      ]),
      Q("何か新しく始めたいことはありますか。", "Bạn có muốn bắt đầu điều gì mới không?", [
        ["そうですね、いくつかあります。", "特にギターをやってみたいです。昔から憧れていたので。", "何か挑戦してみたいことはありますか。",
          "Có, vài thứ. Đặc biệt tôi muốn thử chơi guitar, vì từ lâu đã ao ước rồi. Anh/chị có muốn thử thách điều gì không?"],
      ]),
      Q("SNSはよく使いますか。", "Bạn có hay dùng mạng xã hội không?", [
        ["はい、毎日見ちゃいます。", "インスタで日本の景色の写真を見るのが好きです。", "SNSは何を使っていますか。",
          "Có, ngày nào cũng lướt. Tôi thích xem ảnh phong cảnh Nhật trên Instagram. Anh/chị dùng mạng xã hội nào?"],
      ]),
      Q("好きな有名人はいますか。", "Bạn có thích người nổi tiếng nào không?", [
        ["うーん、そうですね…", "大谷翔平選手が好きです。実力もすごいし、人柄もいいですよね。", "好きな有名人はいますか。",
          "Ừm, để xem… Tôi thích Ohtani Shohei. Vừa giỏi vừa có nhân cách tốt nhỉ. Anh/chị có thích người nổi tiếng nào không?"],
      ]),
    ],
  },
  {
    id: "vietnam",
    icon: "🇻🇳",
    name: "Việt Nam",
    jp: "ベトナム",
    questions: [
      Q("ベトナムはどんな国ですか。", "Việt Nam là đất nước thế nào?", [
        ["一言で言うのは難しいですけど、", "活気があって、人がとても明るい国です。食べ物もおいしいですよ。", "ベトナムについて何かイメージはありますか。",
          "Khó nói trong một câu, nhưng đó là đất nước sôi động, con người rất vui vẻ. Đồ ăn cũng ngon nữa. Anh/chị có hình dung gì về Việt Nam không?"],
      ]),
      Q("ベトナムのどちらの出身ですか。", "Bạn quê ở đâu tại Việt Nam?", [
        ["ハノイです。", "ベトナムの首都で、古い町並みと新しいビルが混ざっている面白い町です。", "ハノイって聞いたことありますか。",
          "Hà Nội. Là thủ đô Việt Nam, một thành phố thú vị nơi phố cổ và nhà cao tầng đan xen. Anh/chị đã nghe về Hà Nội chưa?"],
      ]),
      Q("ベトナムでおすすめの場所はどこですか。", "Ở Việt Nam có chỗ nào nên đi không?", [
        ["ぜひ行ってください！", "ハロン湾がおすすめです。海に岩の島がたくさんあって、本当にきれいですよ。", "海と山だったら、どちらが好きですか。",
          "Nhất định nên đi! Tôi giới thiệu vịnh Hạ Long. Biển có rất nhiều đảo đá, đẹp lắm. Giữa biển và núi, anh/chị thích bên nào hơn?"],
      ]),
      Q("ベトナムの天気はどうですか。", "Thời tiết Việt Nam thế nào?", [
        ["地域によって全然違うんです。", "北は四季がありますが、南は一年中暑いです。", "暑いのと寒いの、どちらが苦手ですか。",
          "Mỗi vùng khác hẳn nhau. Miền Bắc có bốn mùa, còn miền Nam nóng quanh năm. Anh/chị chịu nóng hay chịu lạnh kém hơn?"],
      ]),
      Q("ベトナム語は日本語と似ていますか。", "Tiếng Việt có giống tiếng Nhật không?", [
        ["実は、ちょっと似ているところがあるんです。", "漢字由来の言葉が多くて、例えば「注意」はベトナム語で「チューイー」なんですよ。", "何か外国語を話せますか。",
          "Thật ra có chỗ hơi giống. Nhiều từ gốc Hán, ví dụ \"注意\" tiếng Việt là \"chú ý\" đấy. Anh/chị nói được ngoại ngữ nào không?"],
      ]),
      Q("テトって何ですか。", "Tết là gì?", [
        ["あ、テトはベトナムのお正月です。", "旧暦なので毎年日付が変わって、だいたい1月か2月です。家族みんなで集まります。", "日本のお正月はどうやって過ごしますか。",
          "À, Tết là năm mới của Việt Nam. Theo âm lịch nên ngày thay đổi mỗi năm, thường vào tháng 1 hoặc 2. Cả gia đình quây quần. Tết ở Nhật anh/chị đón thế nào?"],
      ]),
      Q("ベトナムは物価が安いですか。", "Giá cả ở Việt Nam có rẻ không?", [
        ["そうですね、日本と比べると安いです。", "でもハノイやホーチミンは最近かなり上がってきました。", "海外旅行では物価って気にしますか。",
          "Ừ, so với Nhật thì rẻ. Nhưng Hà Nội, TP.HCM dạo này tăng khá nhiều. Đi du lịch nước ngoài anh/chị có để ý giá cả không?"],
      ]),
      Q("バイクが多いって本当ですか。", "Nghe nói xe máy nhiều lắm, thật không?", [
        ["本当です(笑)。", "道路がバイクで埋まるので、初めての人は道を渡るのが怖いと思います。", "日本ではバイクに乗る人は多いですか。",
          "Thật đấy (cười). Đường kín xe máy nên người mới đến chắc sợ sang đường lắm. Ở Nhật có nhiều người đi xe máy không?"],
      ]),
      Q("ベトナムと日本、どちらが好きですか。", "Bạn thích Việt Nam hay Nhật hơn?", [
        ["難しい質問ですね(笑)。", "どちらも好きですけど、食べ物はベトナム、生活の便利さは日本ですね。", "住むならどこの国がいいと思いますか。",
          "Câu hỏi khó đấy (cười). Tôi thích cả hai, nhưng đồ ăn thì Việt Nam, còn tiện lợi trong cuộc sống thì Nhật. Nếu được sống, anh/chị muốn sống ở nước nào?"],
      ]),
      Q("ベトナムに帰りたいと思いますか。", "Bạn có muốn về Việt Nam không?", [
        ["時々思いますね。", "特に家族に会いたくなったときや、ベトナム料理が恋しくなったときです。", "地元が恋しくなることってありますか。",
          "Thỉnh thoảng có. Nhất là khi nhớ gia đình hay thèm đồ ăn Việt. Anh/chị có khi nào nhớ quê không?"],
      ]),
      Q("ベトナム人はどんな性格の人が多いですか。", "Người Việt thường có tính cách thế nào?", [
        ["人によりますけど、", "明るくてフレンドリーな人が多いと思います。初対面でも年齢を聞いたりしますよ。", "日本人はどんな性格の人が多いと思いますか。",
          "Tùy người, nhưng tôi nghĩ nhiều người vui vẻ, thân thiện. Mới gặp lần đầu cũng hỏi tuổi đấy. Anh/chị nghĩ người Nhật thường có tính cách thế nào?"],
      ]),
      Q("ベトナムはコーヒーが有名だと聞きました。", "Nghe nói cà phê Việt Nam nổi tiếng.", [
        ["そうなんです！", "練乳を入れた甘いコーヒーが定番で、最近は卵コーヒーも人気です。", "コーヒーはよく飲みますか。",
          "Đúng vậy! Cà phê sữa đặc ngọt là kiểu quen thuộc, gần đây cà phê trứng cũng được ưa chuộng. Anh/chị có hay uống cà phê không?"],
      ]),
      Q("ベトナムで日本は人気がありますか。", "Nhật có được yêu thích ở Việt Nam không?", [
        ["すごく人気がありますよ。", "日本の製品は質がいいと言われていて、日本語を勉強する人も多いです。", "ベトナムの製品で何か知っているものはありますか。",
          "Rất được yêu thích. Hàng Nhật được cho là chất lượng tốt, người học tiếng Nhật cũng nhiều. Anh/chị có biết sản phẩm nào của Việt Nam không?"],
      ]),
      Q("アオザイって何ですか。", "Áo dài là gì?", [
        ["ベトナムの民族衣装です。", "長いワンピースの下にズボンをはくスタイルで、高校の制服になっているところもあります。", "着物は着たことがありますか。",
          "Là trang phục truyền thống của Việt Nam. Kiểu áo dài thướt tha mặc với quần, có trường cấp 3 dùng làm đồng phục. Anh/chị đã mặc kimono bao giờ chưa?"],
      ]),
      Q("ベトナムの若い人の間で何が流行っていますか。", "Giới trẻ Việt đang chuộng gì?", [
        ["そうですね、最近だと…", "TikTokとかカフェ巡りが人気です。おしゃれなカフェがどんどん増えています。", "日本の若い人の間では何が流行っていますか。",
          "Để xem, gần đây thì… TikTok với đi cà phê đang thịnh. Quán cà phê đẹp mọc lên ngày càng nhiều. Giới trẻ Nhật đang chuộng gì?"],
      ]),
    ],
  },
  {
    id: "food",
    icon: "🍜",
    name: "Đồ ăn",
    jp: "食べ物",
    questions: [
      Q("日本料理で何が好きですか。", "Bạn thích món Nhật nào?", [
        ["どれもおいしいですけど、", "一番はラーメンですね。特に豚骨が好きです。", "好きなラーメン屋さんはありますか。",
          "Món nào cũng ngon, nhưng nhất là ramen. Đặc biệt thích tonkotsu. Anh/chị có quán ramen ruột không?"],
      ]),
      Q("納豆は食べられますか。", "Bạn ăn được natto không?", [
        ["はい、実は大好きなんです。", "最初はにおいがダメでしたが、今は毎朝食べています。", "苦手な食べ物はありますか。",
          "Có, thật ra tôi rất thích. Lúc đầu không chịu được mùi, nhưng giờ sáng nào cũng ăn. Anh/chị có món nào không ăn được không?"],
      ]),
      Q("苦手な食べ物はありますか。", "Có món nào bạn không ăn được không?", [
        ["うーん、あまりないんですけど、", "生の魚卵はちょっと苦手です。食感に慣れなくて。", "何か苦手なものはありますか。",
          "Ừm, cũng không nhiều, nhưng trứng cá sống thì hơi ngại. Chưa quen được độ dai. Anh/chị có món nào không thích không?"],
      ]),
      Q("ベトナム料理で何がおすすめですか。", "Món Việt nào bạn giới thiệu?", [
        ["たくさんありますよ！", "フォーはもちろんですが、ブンチャーもぜひ食べてほしいです。焼いた豚肉と麺をタレにつけて食べるんです。", "ベトナム料理は食べたことがありますか。",
          "Nhiều lắm! Phở thì đương nhiên rồi, nhưng tôi rất muốn anh/chị thử bún chả. Ăn thịt lợn nướng với bún chấm nước chấm. Anh/chị đã ăn món Việt bao giờ chưa?"],
      ]),
      Q("辛い物は大丈夫ですか。", "Bạn ăn cay được không?", [
        ["はい、辛いのは大好きです。", "ベトナムでは料理に生の唐辛子を入れて食べることが多いんです。", "辛い物は得意ですか。",
          "Được, tôi rất thích cay. Ở Việt Nam hay cho ớt tươi vào món ăn. Anh/chị ăn cay giỏi không?"],
      ]),
      Q("朝ご飯は何を食べますか。", "Bữa sáng bạn ăn gì?", [
        ["だいたいパンとコーヒーです。", "時間がないので、簡単に済ませちゃうことが多いですね。", "朝はご飯派ですか、パン派ですか。",
          "Thường là bánh mì với cà phê. Không có thời gian nên hay ăn qua loa. Buổi sáng anh/chị thuộc phe ăn cơm hay bánh mì?"],
      ]),
      Q("おすすめのお店はありますか。", "Bạn có quán nào giới thiệu không?", [
        ["ありますよ。", "新大久保に本格的なベトナム料理の店があって、よく行きます。", "今度一緒に行きませんか。",
          "Có chứ. Ở Shin-Okubo có quán món Việt chuẩn vị, tôi hay đến. Lần tới mình đi cùng nhé?"],
      ]),
      Q("お酒は飲みますか。", "Bạn có uống rượu bia không?", [
        ["はい、少しだけ。", "ビールが好きです。ベトナムではビールに氷を入れて飲むんですよ。", "お酒はお好きですか。",
          "Có, một chút. Tôi thích bia. Ở Việt Nam người ta uống bia với đá đấy. Anh/chị có thích uống không?"],
      ]),
      Q("日本の食べ物で驚いたものはありますか。", "Có món Nhật nào làm bạn bất ngờ không?", [
        ["ありますね。", "生卵をご飯にかけて食べるのにびっくりしました。ベトナムではしないので。", "外国の料理で驚いたことはありますか。",
          "Có đấy. Tôi bất ngờ khi thấy ăn trứng sống trộn cơm. Ở Việt Nam không ăn vậy. Anh/chị có bất ngờ với món nước ngoài nào không?"],
      ]),
      Q("一番好きな食べ物は何ですか。", "Món bạn thích nhất là gì?", [
        ["難しいですね…", "やっぱり母が作る揚げ春巻きです。どこのお店よりおいしいです。", "思い出の料理ってありますか。",
          "Khó nhỉ… Chắc là nem rán mẹ làm. Ngon hơn bất cứ quán nào. Anh/chị có món ăn nào gắn với kỷ niệm không?"],
      ]),
      Q("和食と洋食、どちらが好きですか。", "Bạn thích món Nhật hay món Âu hơn?", [
        ["どちらかと言えば和食ですね。", "味があっさりしていて、体にいい感じがします。", "普段は和食が多いですか。",
          "Nếu phải chọn thì món Nhật. Vị thanh nhẹ, cảm giác tốt cho sức khỏe. Bình thường anh/chị hay ăn món Nhật à?"],
      ]),
      Q("外食が多いですか、自炊が多いですか。", "Bạn hay ăn ngoài hay tự nấu?", [
        ["平日は自炊が多いです。", "外食は週末だけにして、節約しています。", "自炊はされますか。",
          "Ngày thường tôi chủ yếu tự nấu. Chỉ ăn ngoài cuối tuần để tiết kiệm. Anh/chị có tự nấu không?"],
      ]),
      Q("ベトナム料理は辛いですか。", "Món Việt có cay không?", [
        ["料理によりますね。", "基本的にはそんなに辛くないですが、自分で唐辛子やライムを足して好みの味にします。", "エスニック料理は好きですか。",
          "Tùy món. Về cơ bản không cay lắm, mỗi người tự thêm ớt, chanh cho vừa khẩu vị. Anh/chị có thích món Đông Nam Á không?"],
      ]),
      Q("日本に来て太りましたか。", "Sang Nhật bạn có tăng cân không?", [
        ["実はちょっと太りました(笑)。", "コンビニのお菓子がおいしすぎるんです。", "おすすめのコンビニスイーツはありますか。",
          "Thật ra có tăng chút (cười). Bánh kẹo ở combini ngon quá mà. Anh/chị có món tráng miệng combini nào giới thiệu không?"],
      ]),
      Q("甘い物は好きですか。", "Bạn có thích đồ ngọt không?", [
        ["はい、大好きです。", "特に抹茶味のお菓子に目がないです。", "甘い物はお好きですか。",
          "Có, rất thích. Đặc biệt mê bánh kẹo vị matcha. Anh/chị có thích đồ ngọt không?"],
      ]),
    ],
  },
  {
    id: "travel",
    icon: "✈️",
    name: "Du lịch",
    jp: "旅行",
    questions: [
      Q("日本でどこに行ったことがありますか。", "Ở Nhật bạn đã đi những đâu?", [
        ["けっこういろいろ行きました。", "京都、大阪、北海道…一番よかったのは冬の北海道です。", "北海道に行ったことはありますか。",
          "Tôi đi khá nhiều nơi rồi. Kyoto, Osaka, Hokkaido… Thích nhất là Hokkaido mùa đông. Anh/chị đi Hokkaido bao giờ chưa?"],
      ]),
      Q("旅行は好きですか。", "Bạn có thích du lịch không?", [
        ["はい、大好きです。", "年に2回ぐらいは、どこか新しい場所に行くようにしています。", "最近どこか旅行に行きましたか。",
          "Có, rất thích. Mỗi năm tôi cố đi chỗ mới khoảng 2 lần. Gần đây anh/chị có đi du lịch đâu không?"],
      ]),
      Q("一番好きな観光地はどこですか。", "Địa điểm du lịch bạn thích nhất là đâu?", [
        ["迷いますけど、", "京都の伏見稲荷です。朝早く行ったら人が少なくて、すごく神秘的でした。", "おすすめの観光地はありますか。",
          "Phân vân quá, nhưng chắc là Fushimi Inari ở Kyoto. Đi sáng sớm vắng người, rất huyền bí. Anh/chị có địa điểm nào giới thiệu không?"],
      ]),
      Q("次はどこに行きたいですか。", "Lần tới bạn muốn đi đâu?", [
        ["沖縄に行ってみたいです。", "海がきれいだと聞いて、ずっと気になっているんです。", "沖縄に行ったことはありますか。",
          "Tôi muốn thử đi Okinawa. Nghe nói biển đẹp nên tôi để ý mãi. Anh/chị đã đến Okinawa chưa?"],
      ]),
      Q("一人旅をしたことがありますか。", "Bạn đã từng đi du lịch một mình chưa?", [
        ["はい、何回かあります。", "自分のペースで回れるのがいいですね。ただ、ご飯のときはちょっと寂しいです(笑)。", "一人旅と友達との旅行、どちらが好きですか。",
          "Có, vài lần rồi. Được đi theo nhịp của mình nên thích. Có điều lúc ăn thì hơi cô đơn (cười). Anh/chị thích đi một mình hay đi với bạn bè?"],
      ]),
      Q("温泉に行ったことがありますか。", "Bạn đã đi onsen chưa?", [
        ["あります。", "最初は人前で裸になるのが恥ずかしかったですが、今は大好きです。", "おすすめの温泉はありますか。",
          "Có rồi. Lúc đầu ngại cởi đồ trước mặt người khác, nhưng giờ thì mê luôn. Anh/chị có onsen nào giới thiệu không?"],
      ]),
      Q("旅行のとき、何を一番楽しみにしていますか。", "Khi du lịch bạn mong chờ điều gì nhất?", [
        ["やっぱり食べ物ですね。", "その土地でしか食べられないものを探すのが楽しいです。", "旅行ではどこにお金をかけますか。",
          "Đúng là đồ ăn. Tìm món chỉ nơi đó mới có thật vui. Đi du lịch anh/chị hay chi tiền vào khoản gì?"],
      ]),
      Q("海外旅行に行ったことはありますか。", "Bạn đã đi du lịch nước ngoài chưa?", [
        ["はい、タイと韓国に行きました。", "韓国は冬に行ったので、すごく寒かったです。", "海外で一番よかった国はどこですか。",
          "Có, tôi đi Thái và Hàn rồi. Đi Hàn mùa đông nên lạnh kinh khủng. Ở nước ngoài anh/chị thích nước nào nhất?"],
      ]),
      Q("旅行の計画はしっかり立てるタイプですか。", "Bạn có kiểu lên kế hoạch du lịch kỹ càng không?", [
        ["いえ、けっこう適当です(笑)。", "泊まるところだけ決めて、あとは現地で考えます。", "計画はしっかり立てる方ですか。",
          "Không, tôi khá tùy hứng (cười). Chỉ đặt chỗ ở thôi, còn lại đến nơi tính. Anh/chị thuộc kiểu lên kế hoạch kỹ à?"],
      ]),
      Q("旅行で失敗したことはありますか。", "Bạn có từng gặp sự cố khi du lịch không?", [
        ["あります(笑)。", "新幹線を間違えて、反対方向に乗ってしまったことがあります。", "旅行中に何かハプニングってありましたか。",
          "Có (cười). Tôi từng lên nhầm Shinkansen đi ngược chiều. Anh/chị có gặp sự cố gì khi đi du lịch không?"],
      ]),
      Q("日本の季節で、どれが一番好きですか。", "Bạn thích mùa nào ở Nhật nhất?", [
        ["秋が一番好きです。", "紅葉がきれいだし、涼しくて過ごしやすいので。", "どの季節が好きですか。",
          "Tôi thích mùa thu nhất. Lá đỏ đẹp, lại mát mẻ dễ chịu. Anh/chị thích mùa nào?"],
      ]),
      Q("お土産はよく買いますか。", "Bạn có hay mua quà không?", [
        ["はい、つい買っちゃいます。", "ベトナムの家族には日本のお菓子を買うと、すごく喜ばれます。", "定番のお土産って何がいいですか。",
          "Có, cứ thế là mua. Mua bánh kẹo Nhật về cho gia đình ở Việt Nam là mọi người vui lắm. Quà kinh điển thì nên mua gì nhỉ?"],
      ]),
      Q("ゴールデンウィークはどこか行きましたか。", "Golden Week bạn có đi đâu không?", [
        ["いえ、今年は近場で過ごしました。", "どこも混んでいるので、家の近くの公園でバーベキューをしました。", "ゴールデンウィークはどうでしたか。",
          "Không, năm nay tôi chơi gần nhà thôi. Chỗ nào cũng đông nên tôi nướng BBQ ở công viên gần nhà. Golden Week của anh/chị thế nào?"],
      ]),
      Q("山と海、どちらが好きですか。", "Bạn thích núi hay biển?", [
        ["どちらかと言えば海ですね。", "ベトナムの中部にはきれいなビーチがたくさんあって、子供の頃からよく行っていました。", "山登りはされますか。",
          "Nếu chọn thì biển. Miền Trung Việt Nam có nhiều bãi biển đẹp, từ nhỏ tôi đã hay đi. Anh/chị có leo núi không?"],
      ]),
      Q("旅行するなら、電車と車どちらが好きですか。", "Đi du lịch bạn thích tàu hay ô tô?", [
        ["電車ですね。", "窓から景色を見るのが好きで、駅弁を食べるのも楽しみです。", "好きな駅弁はありますか。",
          "Tàu chứ. Tôi thích ngắm cảnh qua cửa sổ, ăn ekiben cũng là niềm vui. Anh/chị có món ekiben yêu thích không?"],
      ]),
    ],
  },
  {
    id: "weekend",
    icon: "🌤️",
    name: "Cuối tuần",
    jp: "週末",
    questions: [
      Q("週末は何をしましたか。", "Cuối tuần bạn đã làm gì?", [
        ["土曜日は友達とバーベキューに行きました。", "天気がよくて、すごく楽しかったです。", "週末はどうでしたか。",
          "Thứ bảy tôi đi BBQ với bạn. Trời đẹp, vui lắm. Cuối tuần của anh/chị thế nào?"],
      ]),
      Q("休みの日は何をしていますか。", "Ngày nghỉ bạn thường làm gì?", [
        ["だいたい家でのんびりしています。", "たまったドラマを一気に見るのが楽しみなんです。", "休みの日はどう過ごしていますか。",
          "Thường thì tôi thong thả ở nhà. Cày một mạch phim tồn đọng là niềm vui. Ngày nghỉ anh/chị hay làm gì?"],
      ]),
      Q("今週末は何か予定がありますか。", "Cuối tuần này bạn có kế hoạch gì không?", [
        ["はい、ちょっと出かけます。", "友達と鎌倉に行って、お寺を見る予定です。", "何か予定はありますか。",
          "Có, tôi đi chơi chút. Định đi Kamakura với bạn xem chùa. Anh/chị có kế hoạch gì không?"],
      ]),
      Q("昨日は何をしましたか。", "Hôm qua bạn làm gì?", [
        ["昨日は特に何も…", "家の掃除をして、夜はちょっと日本語の勉強をしました。", "昨日はどこか行きましたか。",
          "Hôm qua cũng không có gì đặc biệt… Dọn nhà, buổi tối học tiếng Nhật một chút. Hôm qua anh/chị có đi đâu không?"],
      ]),
      Q("連休は何をしますか。", "Kỳ nghỉ dài bạn sẽ làm gì?", [
        ["まだ決めていないんです。", "せっかくなので、どこか近くに一泊旅行でもしようかなと思っています。", "連休はどこか行かれますか。",
          "Tôi chưa quyết. Nhân dịp này, tôi định đi đâu gần gần ngủ lại một đêm. Kỳ nghỉ anh/chị có đi đâu không?"],
      ]),
      Q("休みの日は何時ごろ起きますか。", "Ngày nghỉ bạn dậy lúc mấy giờ?", [
        ["けっこう遅いです(笑)。", "平日の疲れがたまっているので、10時ぐらいまで寝ちゃいます。", "休みの日も早起きしますか。",
          "Khá muộn (cười). Mệt cả tuần nên ngủ đến tận 10 giờ. Ngày nghỉ anh/chị vẫn dậy sớm à?"],
      ]),
      Q("週末はよく出かけますか。", "Cuối tuần bạn có hay ra ngoài không?", [
        ["そうですね、半々ぐらいです。", "天気がいい日は出かけて、雨の日は家でゆっくりします。", "インドア派ですか、アウトドア派ですか。",
          "Ừm, khoảng nửa nửa. Trời đẹp thì ra ngoài, mưa thì ở nhà nghỉ ngơi. Anh/chị thuộc kiểu ở nhà hay kiểu ra ngoài?"],
      ]),
      Q("最近どこか行きましたか。", "Gần đây bạn có đi đâu không?", [
        ["先週、初めて高尾山に登りました。", "思ったより簡単で、頂上からの景色がすごくきれいでした。", "山登りはしますか。",
          "Tuần trước lần đầu tôi leo núi Takao. Dễ hơn tôi nghĩ, cảnh từ đỉnh đẹp lắm. Anh/chị có leo núi không?"],
      ]),
      Q("一人で過ごすのと、誰かと過ごすのと、どちらが好きですか。", "Bạn thích ở một mình hay ở cùng người khác?", [
        ["どちらも好きですけど、", "平日は人と話すことが多いので、週末は一人の時間も大事にしています。", "どちらのタイプですか。",
          "Tôi thích cả hai, nhưng ngày thường nói chuyện với người khác nhiều nên cuối tuần tôi trân trọng thời gian một mình. Anh/chị thuộc kiểu nào?"],
      ]),
      Q("週末に勉強はしますか。", "Cuối tuần bạn có học không?", [
        ["はい、少しだけ。", "日曜日の午前中にカフェで1〜2時間勉強するのが習慣です。", "何か勉強していることはありますか。",
          "Có, một chút. Sáng chủ nhật học 1–2 tiếng ở quán cà phê là thói quen của tôi. Anh/chị có đang học gì không?"],
      ]),
      Q("金曜日の夜は何をしていますか。", "Tối thứ sáu bạn thường làm gì?", [
        ["だいたい同僚と飲みに行きます。", "一週間お疲れ様、という感じで、気軽に飲むのが楽しいです。", "金曜日の夜はどう過ごしますか。",
          "Thường đi nhậu với đồng nghiệp. Kiểu \"vất vả cả tuần rồi\", uống thoải mái vui lắm. Tối thứ sáu anh/chị làm gì?"],
      ]),
      Q("日曜日の夜はどんな気分ですか。", "Tối chủ nhật bạn thấy thế nào?", [
        ["正直、ちょっと憂鬱です(笑)。", "明日から仕事だと思うと、早く寝なきゃと思いつつ夜更かししちゃいます。", "日曜の夜って憂鬱になりませんか。",
          "Nói thật là hơi chán (cười). Nghĩ mai đi làm, biết phải ngủ sớm mà vẫn thức khuya. Tối chủ nhật anh/chị có thấy chán không?"],
      ]),
      Q("お気に入りの場所はありますか。", "Bạn có chỗ nào yêu thích không?", [
        ["あります。", "家の近くの川沿いが好きで、よく散歩しています。", "お気に入りの場所ってありますか。",
          "Có. Tôi thích bờ sông gần nhà, hay đi dạo ở đó. Anh/chị có chỗ nào yêu thích không?"],
      ]),
      Q("家事はいつしていますか。", "Bạn làm việc nhà lúc nào?", [
        ["だいたい土曜日の午前中にまとめてやります。", "洗濯と掃除を終わらせると、午後はすっきりした気分で過ごせます。", "家事は得意ですか。",
          "Thường dồn vào sáng thứ bảy. Giặt giũ, dọn dẹp xong là buổi chiều thấy thoải mái hẳn. Anh/chị có giỏi việc nhà không?"],
      ]),
      Q("今度一緒にご飯でもどうですか。", "Lần tới đi ăn cùng nhé?", [
        ["ぜひ！", "ちょうど行ってみたいお店があったんです。", "いつごろが都合がいいですか。",
          "Nhất định rồi! Đúng lúc tôi có quán muốn đi thử. Khoảng khi nào anh/chị tiện?"],
      ]),
    ],
  },
  {
    id: "nihongo",
    icon: "📚",
    name: "Học tiếng Nhật",
    jp: "日本語の勉強",
    questions: [
      Q("日本語の勉強はどのくらいしていますか。", "Bạn học tiếng Nhật bao lâu rồi?", [
        ["もう5年ぐらいになります。", "大学から始めて、去年N2に合格しました。", "何か外国語を勉強したことはありますか。",
          "Được khoảng 5 năm rồi. Bắt đầu từ đại học, năm ngoái đỗ N2. Anh/chị đã học ngoại ngữ nào chưa?"],
      ]),
      Q("どうやって日本語を勉強していますか。", "Bạn học tiếng Nhật thế nào?", [
        ["いろいろ試しています。", "最近はシャドーイングとアニメで、聞く力を伸ばしています。", "何かおすすめの勉強法はありますか。",
          "Tôi thử nhiều cách. Dạo này luyện shadowing và xem anime để nâng khả năng nghe. Anh/chị có phương pháp học nào hay không?"],
      ]),
      Q("日本語の何が一番難しいですか。", "Cái gì trong tiếng Nhật khó nhất?", [
        ["やっぱり敬語ですね。", "尊敬語と謙譲語を間違えないように、いつも気をつけています。", "日本人でも敬語って難しいと感じますか。",
          "Đúng là kính ngữ. Tôi luôn cẩn thận để không nhầm tôn kính ngữ với khiêm nhường ngữ. Người Nhật có thấy kính ngữ khó không?"],
      ]),
      Q("漢字は難しくないですか。", "Kanji không khó à?", [
        ["難しいですけど、", "ベトナム語には漢字由来の言葉が多いので、意味は想像しやすいんです。", "漢字は得意ですか。",
          "Khó chứ, nhưng tiếng Việt nhiều từ gốc Hán nên dễ đoán nghĩa. Anh/chị có giỏi kanji không?"],
      ]),
      Q("どうして日本語を勉強しようと思ったんですか。", "Sao bạn lại muốn học tiếng Nhật?", [
        ["きっかけはアニメです。", "字幕なしで見たいと思って始めたら、どんどん面白くなりました。", "子供のころ好きだったアニメはありますか。",
          "Lý do là anime. Muốn xem không cần phụ đề nên bắt đầu học, rồi càng học càng thấy hay. Hồi nhỏ anh/chị thích anime nào?"],
      ]),
      Q("日本語能力試験は受けましたか。", "Bạn đã thi năng lực tiếng Nhật chưa?", [
        ["はい、N2を持っています。", "次はN1に挑戦するつもりですが、読解がなかなか大変です。", "何か資格の勉強をしたことはありますか。",
          "Rồi, tôi có N2. Tiếp theo tôi định thử N1, nhưng đọc hiểu khó quá. Anh/chị đã từng ôn thi chứng chỉ gì chưa?"],
      ]),
      Q("日本語で話すのは緊張しますか。", "Nói tiếng Nhật bạn có hồi hộp không?", [
        ["はい、まだちょっと緊張します。", "聞くのは大丈夫なんですけど、とっさに言葉が出てこないことが多いんです。", "外国語を話すとき、緊張しますか。",
          "Có, vẫn hơi run. Nghe thì ổn nhưng hay không bật ra được từ ngay. Khi nói ngoại ngữ anh/chị có hồi hộp không?"],
      ]),
      Q("方言はわかりますか。", "Bạn có hiểu phương ngữ không?", [
        ["少しだけわかります。", "大阪の友達がいるので、「めっちゃ」とか「なんでやねん」は覚えました(笑)。", "ご出身はどちらの方言ですか。",
          "Hiểu một chút. Tôi có bạn người Osaka nên thuộc \"meccha\" với \"nande yanen\" (cười). Anh/chị nói phương ngữ vùng nào?"],
      ]),
      Q("好きな日本語の言葉はありますか。", "Bạn có từ tiếng Nhật yêu thích không?", [
        ["あります。", "「おかげさまで」が好きです。周りの人への感謝が込められている感じがして。", "好きな言葉ってありますか。",
          "Có. Tôi thích \"okagesama de\". Cảm giác như chứa đựng lòng biết ơn với mọi người xung quanh. Anh/chị có từ nào yêu thích không?"],
      ]),
      Q("日本語を使って何がしたいですか。", "Bạn muốn dùng tiếng Nhật để làm gì?", [
        ["そうですね…", "将来は日本人とベトナム人の橋渡しができたらいいなと思っています。", "何か目標にしていることはありますか。",
          "Để xem… Sau này tôi mong có thể làm cầu nối giữa người Nhật và người Việt. Anh/chị có mục tiêu gì không?"],
      ]),
      Q("日本人と話す機会はありますか。", "Bạn có cơ hội nói chuyện với người Nhật không?", [
        ["職場ではありますけど、", "雑談の機会はあまりないので、こうやって話せるのはうれしいです。", "よかったら、また話してもらえませんか。",
          "Ở chỗ làm thì có, nhưng ít khi được tán gẫu nên nói chuyện thế này tôi vui lắm. Nếu được, lần sau mình lại nói chuyện nhé?"],
      ]),
      Q("日本語でよく間違えることはありますか。", "Bạn hay sai gì trong tiếng Nhật?", [
        ["ありますね(笑)。", "「は」と「が」の使い分けは、今でもよく迷います。", "日本人でも迷う文法ってありますか。",
          "Có chứ (cười). Phân biệt \"wa\" và \"ga\" đến giờ tôi vẫn hay phân vân. Có ngữ pháp nào người Nhật cũng phân vân không?"],
      ]),
      Q("若者言葉はわかりますか。", "Bạn có hiểu từ lóng giới trẻ không?", [
        ["ちょっとだけ。", "「やばい」がいい意味でも悪い意味でも使えるのに驚きました。", "最近の若者言葉で何か面白いものはありますか。",
          "Một chút. Tôi bất ngờ khi \"yabai\" dùng được cả nghĩa tốt lẫn xấu. Gần đây có từ lóng nào thú vị không?"],
      ]),
      Q("日本語の勉強で何が一番役に立ちましたか。", "Điều gì giúp ích nhất cho việc học tiếng Nhật của bạn?", [
        ["一番はドラマですね。", "教科書には出てこない自然な会話が学べるので。", "おすすめのドラマはありますか。",
          "Nhất là phim truyền hình. Vì học được hội thoại tự nhiên không có trong sách. Anh/chị có phim nào giới thiệu không?"],
      ]),
      Q("ベトナム語を少し教えてくれませんか。", "Dạy tôi chút tiếng Việt được không?", [
        ["もちろんです！", "「こんにちは」は「シンチャオ」です。ベトナム語は声調が6つあるので、発音がちょっと難しいんですよ。", "他に何か知りたい言葉はありますか。",
          "Tất nhiên rồi! \"Konnichiwa\" là \"Xin chào\". Tiếng Việt có 6 thanh điệu nên phát âm hơi khó đấy. Anh/chị còn muốn biết từ nào nữa không?"],
      ]),
    ],
  },
];

export const TOPICS = [
  ...DAILY_TOPICS.map((t) => ({ ...t, group: "daily" })),
  ...BRSE_TOPICS.map((t) => ({ ...t, group: "brse" })),
];

// Gán id cố định cho từng câu: "<topic>-<số thứ tự>"
TOPICS.forEach((t) => t.questions.forEach((q, i) => { q.id = `${t.id}-${i + 1}`; q.topicId = t.id; }));

export const QUESTION_BY_ID = Object.fromEntries(TOPICS.flatMap((t) => t.questions.map((q) => [q.id, q])));
export const TOPIC_BY_ID = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
