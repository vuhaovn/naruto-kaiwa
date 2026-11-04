// Chủ đề tiếng Nhật IT cho BrSE: phía Nhật (PM / khách hàng / người phỏng vấn) hỏi, bạn trả lời.
// Bước ③ trong công việc thường là "xác nhận lại" hoặc "hỏi lại" để tránh hiểu sai.
import { Q } from "./q";

export const BRSE_TOPICS = [
  {
    id: "brse-progress",
    icon: "📈",
    name: "Báo cáo tiến độ",
    jp: "進捗報告",
    questions: [
      Q("進捗はいかがですか。", "Tiến độ thế nào rồi?", [
        ["はい、ご報告いたします。", "現在、画面開発は80%ほど完了しておりまして、予定通り金曜日にはテストに入れる見込みです。", "何か気になる点はございますか。",
          "Vâng, tôi xin báo cáo. Hiện phần phát triển màn hình đã xong khoảng 80%, dự kiến thứ sáu sẽ bắt đầu test đúng kế hoạch. Anh/chị có điểm nào băn khoăn không ạ?"],
      ]),
      Q("予定通り終わりそうですか。", "Có kịp xong đúng kế hoạch không?", [
        ["正直に申し上げますと、少し厳しい状況です。", "API連携の部分で想定外の調査が発生しておりまして、2日ほど遅れる可能性がございます。", "リリース日への影響を避けるために、優先順位をご相談させていただけますでしょうか。",
          "Nói thật thì tình hình hơi căng. Phần kết nối API phát sinh việc điều tra ngoài dự kiến nên có thể chậm khoảng 2 ngày. Để tránh ảnh hưởng ngày release, tôi xin bàn với anh/chị về thứ tự ưu tiên được không ạ?"],
      ]),
      Q("遅れている原因は何ですか。", "Nguyên nhân chậm là gì?", [
        ["申し訳ございません。", "主な原因は仕様の認識違いで、一部の画面を作り直すことになりました。今後は着手前に確認会を設けるようにいたします。", "この対策で問題ないでしょうか。",
          "Tôi rất xin lỗi. Nguyên nhân chính là hiểu sai đặc tả nên phải làm lại một số màn hình. Từ giờ chúng tôi sẽ tổ chức buổi xác nhận trước khi bắt tay làm. Biện pháp này đã ổn chưa ạ?"],
      ]),
      Q("今週は何を進める予定ですか。", "Tuần này dự định làm gì?", [
        ["はい、今週は主に2点です。", "ログイン機能の単体テストと、検索画面の実装を進める予定です。", "優先してほしい作業はございますか。",
          "Vâng, tuần này chủ yếu 2 việc. Unit test chức năng đăng nhập và implement màn hình tìm kiếm. Có việc nào anh/chị muốn ưu tiên không ạ?"],
      ]),
      Q("何かリスクはありますか。", "Có rủi ro gì không?", [
        ["はい、一点ございます。", "テスト環境の準備がまだできていないため、結合テストの開始が遅れるおそれがあります。", "環境の準備状況について、インフラチームにご確認いただくことは可能でしょうか。",
          "Vâng, có một điểm. Môi trường test chưa chuẩn bị xong nên có nguy cơ chậm bắt đầu integration test. Anh/chị có thể xác nhận giúp với team hạ tầng về tình hình chuẩn bị môi trường được không ạ?"],
      ]),
      Q("オフショアチームの状況はどうですか。", "Tình hình team offshore thế nào?", [
        ["おかげさまで、順調に進んでおります。", "新しく2名が参加しましたが、もう基本的な作業には慣れてきました。", "チームについて何かご要望はございますか。",
          "Nhờ anh/chị, mọi việc đang suôn sẻ. Có 2 người mới tham gia nhưng đã quen với các việc cơ bản. Anh/chị có yêu cầu gì về team không ạ?"],
      ]),
      Q("残りの作業はどのくらいですか。", "Còn lại bao nhiêu việc?", [
        ["はい、確認いたしました。", "残りは約30人日で、内訳は実装が20人日、テストが10人日です。", "詳細なWBSをお送りしましょうか。",
          "Vâng, tôi đã kiểm tra. Còn khoảng 30 man-day, trong đó implement 20 man-day, test 10 man-day. Tôi gửi WBS chi tiết cho anh/chị nhé?"],
      ]),
      Q("テストの結果はどうでしたか。", "Kết quả test thế nào?", [
        ["はい、昨日完了いたしました。", "テストケース200件のうち195件がOKで、5件の不具合が見つかりました。いずれも今週中に修正予定です。", "不具合の一覧をお送りしてもよろしいでしょうか。",
          "Vâng, hôm qua đã xong. Trong 200 test case có 195 OK, phát hiện 5 bug. Tất cả dự kiến sửa trong tuần này. Tôi gửi danh sách bug cho anh/chị được không ạ?"],
      ]),
      Q("週次報告の資料はできていますか。", "Tài liệu báo cáo tuần xong chưa?", [
        ["はい、先ほど共有フォルダにアップいたしました。", "今回から課題の一覧も追加しましたので、ご確認いただければと思います。", "資料の形式について、何かご要望はございますか。",
          "Vâng, tôi vừa upload lên thư mục chung. Từ lần này tôi thêm cả danh sách issue, mong anh/chị xem qua. Anh/chị có yêu cầu gì về format tài liệu không ạ?"],
      ]),
      Q("来週のリリースは大丈夫ですか。", "Release tuần sau ổn chứ?", [
        ["はい、今のところ問題ございません。", "最終確認として、本番環境の手順書のレビューを明日までに完了させる予定です。", "リリース当日の立ち会いは、どなたにお願いすればよろしいでしょうか。",
          "Vâng, hiện tại không có vấn đề gì. Để kiểm tra lần cuối, chúng tôi sẽ review xong tài liệu thủ tục môi trường production trước ngày mai. Hôm release, tôi nên nhờ ai có mặt cùng ạ?"],
      ]),
      Q("何か困っていることはありますか。", "Có gì đang gặp khó khăn không?", [
        ["ありがとうございます。実は一点ございまして…", "画面デザインの最新版がまだ届いていないため、一部の作業が止まっております。", "いつごろいただけるか、ご確認いただけますでしょうか。",
          "Cảm ơn anh/chị. Thật ra có một việc… Bản thiết kế màn hình mới nhất chưa đến nên một phần công việc đang bị dừng. Anh/chị xác nhận giúp khoảng khi nào có được không ạ?"],
      ]),
      Q("その作業、いつ終わりますか。", "Việc đó khi nào xong?", [
        ["確認いたします。", "今の見込みでは、水曜日の午後には完了する予定です。終わり次第ご連絡いたします。", "水曜日で間に合いますでしょうか。",
          "Để tôi kiểm tra. Theo dự kiến hiện tại thì chiều thứ tư sẽ xong. Xong là tôi liên lạc ngay. Thứ tư thì có kịp không ạ?"],
      ]),
      Q("品質は大丈夫ですか。", "Chất lượng có ổn không?", [
        ["はい、品質面も重視しております。", "すべてのソースコードは、レビューを通してから提出するようにしております。", "特に重点的に確認すべき部分はございますか。",
          "Vâng, chúng tôi rất coi trọng chất lượng. Toàn bộ source code đều qua review rồi mới nộp. Có phần nào cần kiểm tra đặc biệt kỹ không ạ?"],
      ]),
      Q("遅れを取り戻す方法はありますか。", "Có cách nào lấy lại tiến độ không?", [
        ["はい、いくつか案を考えております。", "一つは要員を1名追加すること、もう一つは優先度の低い機能を次のフェーズに回すことです。", "どちらの案がよろしいでしょうか。",
          "Vâng, tôi đã nghĩ vài phương án. Một là thêm 1 người, hai là chuyển chức năng ưu tiên thấp sang phase sau. Anh/chị thấy phương án nào tốt hơn ạ?"],
      ]),
      Q("前回の課題はどうなりましたか。", "Các issue lần trước thế nào rồi?", [
        ["はい、ご報告いたします。", "3件のうち2件は解決済みで、残り1件はお客様の回答待ちとなっております。", "その件について、ご回答の見込みはいかがでしょうか。",
          "Vâng, tôi xin báo cáo. 3 issue thì 2 đã giải quyết, còn 1 đang chờ khách hàng trả lời. Về việc đó, dự kiến khi nào có câu trả lời ạ?"],
      ]),
    ],
  },
  {
    id: "brse-spec",
    icon: "📋",
    name: "Xác nhận đặc tả",
    jp: "仕様確認",
    questions: [
      Q("仕様書は読みましたか。", "Bạn đã đọc tài liệu đặc tả chưa?", [
        ["はい、拝見いたしました。", "全体的に理解できましたが、エラー処理の部分でいくつか確認したい点がございます。", "今お時間よろしいでしょうか。",
          "Vâng, tôi đã xem. Tổng thể tôi đã hiểu, nhưng phần xử lý lỗi có vài điểm muốn xác nhận. Bây giờ anh/chị có thời gian không ạ?"],
      ]),
      Q("この仕様で何か不明点はありますか。", "Đặc tả này có điểm nào chưa rõ không?", [
        ["はい、2点ほどございます。", "1点目は検索結果が0件の場合の表示、2点目はCSV出力の文字コードについてです。", "1点目から確認させていただいてもよろしいでしょうか。",
          "Vâng, có khoảng 2 điểm. Một là hiển thị khi kết quả tìm kiếm 0 bản ghi, hai là mã ký tự khi xuất CSV. Tôi xin xác nhận điểm thứ nhất trước được không ạ?"],
      ]),
      Q("この機能、実装できますか。", "Chức năng này implement được không?", [
        ["はい、技術的には可能です。", "ただ、外部APIの制限があるため、処理に少し時間がかかる可能性がございます。", "応答時間の目標値はございますか。",
          "Vâng, về kỹ thuật thì được. Nhưng do giới hạn của API bên ngoài nên xử lý có thể hơi lâu. Có mục tiêu về thời gian phản hồi không ạ?"],
      ]),
      Q("仕様を少し変更したいんですが。", "Tôi muốn thay đổi đặc tả một chút.", [
        ["承知いたしました。", "変更内容によっては、スケジュールと見積もりに影響が出る可能性がございます。", "まず、変更の内容を詳しく伺ってもよろしいでしょうか。",
          "Tôi hiểu rồi. Tùy nội dung thay đổi mà có thể ảnh hưởng đến lịch và báo giá. Trước hết, cho tôi hỏi chi tiết nội dung thay đổi được không ạ?"],
      ]),
      Q("この画面の動きはわかりますか。", "Bạn có hiểu cách hoạt động của màn hình này không?", [
        ["はい、おおむね理解しております。", "保存ボタンを押したら確認ダイアログを出して、その後一覧画面に戻る流れですよね。", "この認識で合っていますでしょうか。",
          "Vâng, tôi hiểu đại khái. Bấm nút lưu thì hiện dialog xác nhận, sau đó quay về màn hình danh sách đúng không ạ. Tôi hiểu như vậy có đúng không ạ?"],
      ]),
      Q("ここはお任せします。", "Phần này giao cho bạn quyết định.", [
        ["承知いたしました。", "他の画面と統一感を持たせるように、既存のデザインに合わせて実装いたします。", "実装後に一度、画面をご確認いただけますでしょうか。",
          "Tôi hiểu rồi. Tôi sẽ implement theo thiết kế hiện có để đồng bộ với các màn hình khác. Sau khi làm xong, anh/chị xem lại màn hình một lần giúp tôi được không ạ?"],
      ]),
      Q("前に話した内容と違いませんか。", "Cái này khác với nội dung đã nói trước đó phải không?", [
        ["大変失礼いたしました。", "確認したところ、私の方で古い版の仕様書を見ておりました。すぐに修正いたします。", "最新版は先週の版で間違いないでしょうか。",
          "Tôi thật thất lễ. Kiểm tra lại thì tôi đã xem bản đặc tả cũ. Tôi sẽ sửa ngay. Bản mới nhất là bản tuần trước phải không ạ?"],
      ]),
      Q("このエラーメッセージはどうしますか。", "Message lỗi này xử lý thế nào?", [
        ["確認させていただきます。", "仕様書に記載がなかったので、既存画面と同じ文言を仮で入れております。", "正式な文言をご指定いただけますでしょうか。",
          "Cho tôi xác nhận. Đặc tả không ghi nên tôi tạm để câu giống màn hình hiện có. Anh/chị chỉ định câu chính thức giúp tôi được không ạ?"],
      ]),
      Q("例外ケースは考えていますか。", "Bạn đã tính các trường hợp ngoại lệ chưa?", [
        ["はい、いくつか洗い出しております。", "例えば、通信エラーや二重送信の場合の動きを整理いたしました。", "一覧をお送りしますので、ご確認いただけますでしょうか。",
          "Vâng, tôi đã liệt kê một số. Ví dụ như cách hoạt động khi lỗi kết nối hay gửi trùng hai lần. Tôi sẽ gửi danh sách, anh/chị xem giúp được không ạ?"],
      ]),
      Q("ベトナムのチームに伝わっていますか。", "Team Việt Nam đã nắm được chưa?", [
        ["はい、昨日の朝会で共有いたしました。", "細かい部分は誤解がないように、翻訳した資料も用意しております。", "ほかに伝えておくべき点はございますか。",
          "Vâng, tôi đã chia sẻ trong buổi họp sáng hôm qua. Để không hiểu nhầm chi tiết, tôi cũng đã chuẩn bị tài liệu dịch. Còn điểm nào cần truyền đạt nữa không ạ?"],
      ]),
      Q("この要件の背景はわかりますか。", "Bạn có hiểu bối cảnh của yêu cầu này không?", [
        ["いえ、そこまでは把握しておりませんでした。", "背景がわかると、チームもより良い実装を提案できると思います。", "差し支えなければ、教えていただけますでしょうか。",
          "Không, tôi chưa nắm đến mức đó. Nếu hiểu bối cảnh, team cũng có thể đề xuất cách implement tốt hơn. Nếu không phiền, anh/chị cho tôi biết được không ạ?"],
      ]),
      Q("優先度はどう考えていますか。", "Bạn nghĩ thứ tự ưu tiên thế nào?", [
        ["はい、私の考えとしては…", "まず決済機能を最優先にして、レポート機能は後回しでもいいかと考えております。", "この方針でよろしいでしょうか。",
          "Vâng, theo tôi thì… Ưu tiên cao nhất cho chức năng thanh toán, chức năng báo cáo có thể để sau. Theo hướng này có được không ạ?"],
      ]),
      Q("設計書のレビューはいつできますか。", "Khi nào review được tài liệu thiết kế?", [
        ["はい、確認いたします。", "基本設計書は明日中に完成する予定ですので、木曜日からレビュー可能です。", "ご都合のいい時間を教えていただけますでしょうか。",
          "Vâng, để tôi kiểm tra. Tài liệu thiết kế cơ bản dự kiến xong trong ngày mai, nên từ thứ năm có thể review. Anh/chị cho tôi biết thời gian thuận tiện được không ạ?"],
      ]),
      Q("その方法だと、性能は問題ないですか。", "Làm cách đó thì hiệu năng có vấn đề gì không?", [
        ["ご指摘ありがとうございます。", "データが10万件を超えると遅くなる可能性があるので、インデックスを追加する予定です。", "想定しているデータ件数を教えていただけますか。",
          "Cảm ơn anh/chị đã chỉ ra. Dữ liệu vượt 100 nghìn bản ghi thì có thể chậm nên tôi định thêm index. Anh/chị cho tôi biết số lượng dữ liệu dự kiến được không ạ?"],
      ]),
      Q("仕様の確認は誰にすればいいかわかりますか。", "Bạn biết cần xác nhận đặc tả với ai không?", [
        ["はい、伺っております。", "業務の内容は鈴木様に、画面のデザインは田中様に確認するようにしております。", "それ以外に窓口になる方はいらっしゃいますか。",
          "Vâng, tôi đã được cho biết. Nội dung nghiệp vụ thì hỏi anh Suzuki, thiết kế màn hình thì hỏi anh Tanaka. Ngoài ra còn ai là đầu mối nữa không ạ?"],
      ]),
    ],
  },
  {
    id: "brse-bug",
    icon: "🐞",
    name: "Bug & sự cố",
    jp: "不具合・障害対応",
    questions: [
      Q("本番で不具合が出ています。", "Đang có lỗi trên production.", [
        ["大変申し訳ございません。", "すぐに調査を開始いたします。まずは影響範囲を確認し、30分以内に第一報をお送りいたします。", "エラーが発生した画面と時間を教えていただけますでしょうか。",
          "Tôi vô cùng xin lỗi. Chúng tôi sẽ bắt đầu điều tra ngay. Trước tiên xác nhận phạm vi ảnh hưởng, trong vòng 30 phút sẽ gửi báo cáo đầu tiên. Anh/chị cho tôi biết màn hình và thời điểm xảy ra lỗi được không ạ?"],
      ]),
      Q("原因はわかりましたか。", "Đã tìm ra nguyên nhân chưa?", [
        ["はい、特定できました。", "日付の処理でタイムゾーンを考慮していなかったことが原因です。", "修正方針をご説明してもよろしいでしょうか。",
          "Vâng, đã xác định được. Nguyên nhân là phần xử lý ngày tháng không tính đến múi giờ. Tôi xin giải thích hướng sửa được không ạ?"],
      ]),
      Q("いつ直りますか。", "Khi nào sửa xong?", [
        ["確認いたします。", "修正自体は本日中に完了し、テストを含めて明日の午前中にはリリースできる見込みです。", "明日の午前中で問題ございませんでしょうか。",
          "Để tôi kiểm tra. Bản thân việc sửa sẽ xong trong hôm nay, tính cả test thì dự kiến sáng mai release được. Sáng mai có được không ạ?"],
      ]),
      Q("同じミスが多いですね。", "Lỗi giống nhau lặp lại nhiều nhỉ.", [
        ["ご迷惑をおかけし、申し訳ございません。", "チェックリストを見直し、レビューの観点に今回のケースを追加いたしました。", "ほかにお気づきの点があれば、教えていただけますでしょうか。",
          "Xin lỗi vì đã gây phiền phức. Chúng tôi đã xem lại checklist và thêm trường hợp lần này vào tiêu chí review. Nếu anh/chị còn nhận thấy điểm nào khác, xin cho tôi biết được không ạ?"],
      ]),
      Q("これはバグですか、仕様ですか。", "Đây là bug hay là đặc tả?", [
        ["確認させていただきます。", "仕様書の3.2節を見る限りでは、仕様通りの動きだと考えております。", "ただ、ご期待の動きと違うようでしたら、変更をご検討いただけますでしょうか。",
          "Cho tôi kiểm tra. Theo mục 3.2 của đặc tả thì tôi cho rằng đây là hoạt động đúng đặc tả. Tuy nhiên nếu khác với mong đợi của anh/chị, xin anh/chị cân nhắc việc thay đổi được không ạ?"],
      ]),
      Q("再発防止策を出してください。", "Hãy đưa ra biện pháp phòng tái phát.", [
        ["承知いたしました。", "原因分析と対策をまとめて、明後日までに報告書をお送りいたします。", "報告書の形式に指定はございますか。",
          "Tôi đã hiểu. Tôi sẽ tổng hợp phân tích nguyên nhân và biện pháp, gửi báo cáo trước ngày kia. Có quy định gì về format báo cáo không ạ?"],
      ]),
      Q("影響範囲はどのくらいですか。", "Phạm vi ảnh hưởng đến đâu?", [
        ["はい、現時点でわかっている範囲でご報告いたします。", "影響があったのは昨日の10時から12時までの注文で、約50件です。", "お客様への連絡は、どのように進めればよろしいでしょうか。",
          "Vâng, tôi xin báo cáo trong phạm vi đã biết đến thời điểm này. Bị ảnh hưởng là các đơn hàng từ 10 đến 12 giờ hôm qua, khoảng 50 đơn. Việc liên lạc với khách hàng nên tiến hành thế nào ạ?"],
      ]),
      Q("再現できましたか。", "Đã tái hiện được lỗi chưa?", [
        ["いえ、まだ再現できておりません。", "開発環境では正常に動いているので、本番特有のデータが原因かもしれません。", "本番のログを確認させていただくことは可能でしょうか。",
          "Chưa, vẫn chưa tái hiện được. Môi trường dev chạy bình thường nên có thể nguyên nhân là dữ liệu đặc thù của production. Tôi có thể xem log production được không ạ?"],
      ]),
      Q("テストで見つけられなかったんですか。", "Test mà không phát hiện ra à?", [
        ["おっしゃる通りです。申し訳ございません。", "テストケースに大量データのパターンが含まれていませんでした。今後は必ず追加いたします。", "本番に近いテストデータをご提供いただくことは可能でしょうか。",
          "Đúng như anh/chị nói. Tôi xin lỗi. Test case không có trường hợp dữ liệu lớn. Từ giờ chúng tôi nhất định sẽ bổ sung. Anh/chị có thể cung cấp dữ liệu test gần với production được không ạ?"],
      ]),
      Q("修正したら、どう確認しますか。", "Sửa xong thì kiểm tra thế nào?", [
        ["はい、ご説明いたします。", "修正箇所の単体テストに加えて、関連する画面の回帰テストも実施いたします。", "確認結果はエビデンス付きでお送りしてもよろしいでしょうか。",
          "Vâng, tôi xin giải thích. Ngoài unit test chỗ sửa, chúng tôi còn chạy regression test các màn hình liên quan. Tôi gửi kết quả kèm evidence được không ạ?"],
      ]),
      Q("暫定対応はできますか。", "Có xử lý tạm thời được không?", [
        ["はい、可能です。", "一時的に該当の機能を止めて、手動で処理する方法がございます。", "この暫定対応で進めてもよろしいでしょうか。",
          "Vâng, được ạ. Có cách tạm dừng chức năng đó và xử lý thủ công. Tiến hành theo cách tạm thời này có được không ạ?"],
      ]),
      Q("お客様に何と説明すればいいですか。", "Tôi nên giải thích với khách hàng thế nào?", [
        ["ご迷惑をおかけしております。", "説明用に、原因と対応状況を簡単にまとめた資料を本日中にお送りいたします。", "技術的な内容は、どの程度まで記載すればよろしいでしょうか。",
          "Xin lỗi vì đang gây phiền phức. Trong hôm nay tôi sẽ gửi tài liệu tóm tắt ngắn gọn nguyên nhân và tình hình xử lý để giải thích. Nội dung kỹ thuật nên ghi đến mức nào ạ?"],
      ]),
      Q("ログを確認してもらえますか。", "Bạn kiểm tra log giúp được không?", [
        ["承知いたしました。", "今からサーバーのログを調べて、1時間後に結果をご報告いたします。", "対象の期間は、いつからいつまででしょうか。",
          "Tôi đã hiểu. Tôi sẽ kiểm tra log server ngay bây giờ và báo kết quả sau 1 tiếng. Khoảng thời gian cần kiểm tra là từ khi nào đến khi nào ạ?"],
      ]),
      Q("ベトナム側で対応できますか。", "Phía Việt Nam xử lý được không?", [
        ["はい、対応可能です。", "ただ、時差の関係で、ベトナムの夜間はすぐに対応できない場合がございます。", "緊急時の連絡ルールを一緒に決めさせていただけますでしょうか。",
          "Vâng, xử lý được. Nhưng do chênh lệch múi giờ, ban đêm ở Việt Nam có khi không phản hồi ngay được. Chúng ta cùng thống nhất quy tắc liên lạc khi khẩn cấp được không ạ?"],
      ]),
      Q("今回の件、どう思っていますか。", "Về vụ lần này, bạn nghĩ thế nào?", [
        ["今回は本当に申し訳ございませんでした。", "私自身、確認が不十分だったと反省しております。リリース前のチェックを徹底いたします。", "今後の進め方について、何かご要望はございますか。",
          "Lần này tôi thật sự xin lỗi. Bản thân tôi tự nhận thấy đã kiểm tra chưa kỹ. Chúng tôi sẽ kiểm tra triệt để trước khi release. Về cách làm việc sắp tới, anh/chị có yêu cầu gì không ạ?"],
      ]),
    ],
  },
  {
    id: "brse-meeting",
    icon: "🤝",
    name: "Họp & ước lượng",
    jp: "会議・見積もり",
    questions: [
      Q("見積もりはいつ出せますか。", "Khi nào gửi được báo giá/ước lượng?", [
        ["はい、確認いたします。", "要件をチームと精査したうえで、来週の火曜日までにお出しできる予定です。", "概算でよろしければ、先に今週中にお送りしましょうか。",
          "Vâng, để tôi kiểm tra. Sau khi xem kỹ yêu cầu cùng team, dự kiến gửi được trước thứ ba tuần sau. Nếu bản ước tính sơ bộ cũng được, tôi gửi trước trong tuần này nhé?"],
      ]),
      Q("この見積もり、高くないですか。", "Báo giá này có cao quá không?", [
        ["ご指摘ありがとうございます。", "テスト工数を多めに見ておりますが、自動テストを導入すれば2割ほど削減できます。", "その方向で再見積もりいたしましょうか。",
          "Cảm ơn anh/chị đã góp ý. Chúng tôi tính công test hơi nhiều, nhưng nếu áp dụng test tự động thì giảm được khoảng 20%. Tôi ước lượng lại theo hướng đó nhé?"],
      ]),
      Q("もう少し早くできませんか。", "Không làm nhanh hơn một chút được à?", [
        ["ご要望は承知いたしました。", "要員を追加すれば1週間ほど短縮できますが、その分の費用が発生いたします。", "費用とスケジュール、どちらを優先されますか。",
          "Tôi đã hiểu mong muốn của anh/chị. Nếu thêm người thì rút ngắn được khoảng 1 tuần, nhưng sẽ phát sinh chi phí tương ứng. Anh/chị ưu tiên chi phí hay tiến độ ạ?"],
      ]),
      Q("次の打ち合わせはいつにしますか。", "Buổi họp tới để khi nào?", [
        ["そうですね…", "来週の水曜日の午後はいかがでしょうか。その頃には設計書も完成しております。", "ご都合の悪い時間帯はございますか。",
          "Để xem… Chiều thứ tư tuần sau thì thế nào ạ? Lúc đó tài liệu thiết kế cũng đã xong. Có khung giờ nào anh/chị không tiện không ạ?"],
      ]),
      Q("今日の会議のまとめをお願いできますか。", "Bạn tóm tắt buổi họp hôm nay giúp được không?", [
        ["はい、承知いたしました。", "決定事項と宿題事項を整理して、本日中に議事録をお送りいたします。", "ほかの参加者の方にもお送りしてよろしいでしょうか。",
          "Vâng, tôi đã hiểu. Tôi sẽ sắp xếp các điều đã quyết định và việc cần làm, gửi biên bản họp trong hôm nay. Tôi gửi cho cả những người tham dự khác được không ạ?"],
      ]),
      Q("何か質問はありますか。", "Có câu hỏi gì không?", [
        ["はい、一点だけよろしいでしょうか。", "先ほどのデータ移行の件ですが、移行はリリース前に行うという理解で合っていますか。", "もし違っていましたら、ご指摘いただけますでしょうか。",
          "Vâng, cho tôi hỏi một điểm được không ạ. Về việc chuyển dữ liệu lúc nãy, tôi hiểu là sẽ chuyển trước khi release, có đúng không ạ? Nếu sai, xin anh/chị chỉ giúp."],
      ]),
      Q("この追加要件、対応できますか。", "Yêu cầu bổ sung này có làm được không?", [
        ["ご相談ありがとうございます。", "対応は可能ですが、今のスケジュールに入れると、ほかの機能が遅れてしまいます。", "次のフェーズで対応する形でもよろしいでしょうか。",
          "Cảm ơn anh/chị đã trao đổi. Làm thì được, nhưng nếu đưa vào lịch hiện tại thì các chức năng khác sẽ bị chậm. Làm ở phase tiếp theo có được không ạ?"],
      ]),
      Q("意見を聞かせてください。", "Cho tôi nghe ý kiến của bạn.", [
        ["ありがとうございます。", "個人的には、まず最小限の機能でリリースして、ユーザーの反応を見てから拡張するのがいいと思います。", "この考え方について、いかがでしょうか。",
          "Cảm ơn anh/chị. Cá nhân tôi nghĩ nên release với chức năng tối thiểu trước, xem phản hồi người dùng rồi mới mở rộng. Anh/chị thấy cách nghĩ này thế nào ạ?"],
      ]),
      Q("ベトナム側の体制を教えてください。", "Cho tôi biết cơ cấu team phía Việt Nam.", [
        ["はい、ご説明いたします。", "現在、PM1名、開発者5名、テスター2名の合計8名の体制です。", "体制について、ご懸念の点はございますか。",
          "Vâng, tôi xin giải thích. Hiện tại gồm 1 PM, 5 developer, 2 tester, tổng cộng 8 người. Về cơ cấu này anh/chị có lo ngại gì không ạ?"],
      ]),
      Q("来月から新しい案件が始まります。", "Từ tháng sau sẽ bắt đầu dự án mới.", [
        ["そうなんですね。ありがとうございます。", "ちょうど今の案件が来月で落ち着くので、メンバーを確保しやすいタイミングです。", "どのような案件か、概要を伺ってもよろしいでしょうか。",
          "Vậy ạ. Cảm ơn anh/chị. Đúng lúc dự án hiện tại tháng sau sẽ ổn định nên dễ bố trí người. Cho tôi hỏi sơ qua dự án đó là gì được không ạ?"],
      ]),
      Q("先週のメール、見てもらえましたか。", "Bạn đã xem mail tuần trước chưa?", [
        ["失礼いたしました、まだ確認できておりません。", "本日中に必ず拝見して、ご返信いたします。", "特にお急ぎの件があれば、今お伺いしてもよろしいでしょうか。",
          "Tôi thật thất lễ, tôi vẫn chưa kiểm tra được. Trong hôm nay tôi nhất định sẽ xem và trả lời. Nếu có việc gì gấp, tôi xin hỏi luôn bây giờ được không ạ?"],
      ]),
      Q("この方針で進めてもいいですか。", "Tiến hành theo hướng này được chứ?", [
        ["はい、基本的には賛成です。", "ただ一点だけ、テスト期間が短いのが少し心配です。", "テスト期間を3日延ばすことは可能でしょうか。",
          "Vâng, về cơ bản tôi tán thành. Chỉ có một điểm là thời gian test hơi ngắn nên tôi hơi lo. Có thể kéo dài thời gian test thêm 3 ngày được không ạ?"],
      ]),
      Q("会議の時間を変更してもいいですか。", "Đổi giờ họp được không?", [
        ["はい、もちろんです。", "明日でしたら、午前中は空いております。", "何時ごろがよろしいでしょうか。",
          "Vâng, tất nhiên rồi. Nếu là ngày mai thì buổi sáng tôi rảnh. Khoảng mấy giờ thì tiện cho anh/chị ạ?"],
      ]),
      Q("言っていることがよくわからないんですが。", "Tôi không hiểu rõ bạn đang nói gì.", [
        ["わかりにくくて申し訳ございません。", "要するに、今のままだとリリースが1週間遅れるので、対応方法を決めていただきたいということです。", "改めて資料にまとめてお送りしましょうか。",
          "Xin lỗi vì tôi nói khó hiểu. Tóm lại là nếu cứ thế này thì release sẽ chậm 1 tuần, nên tôi mong anh/chị quyết định cách xử lý. Tôi tổng hợp lại thành tài liệu rồi gửi nhé?"],
      ]),
      Q("今日はありがとうございました。", "Hôm nay cảm ơn bạn.", [
        ["こちらこそ、お忙しいところありがとうございました。", "いただいたご意見は、チームと共有して早速対応いたします。", "来週もどうぞよろしくお願いいたします。",
          "Chính tôi mới phải cảm ơn anh/chị đã dành thời gian dù bận rộn. Những ý kiến nhận được, tôi sẽ chia sẻ với team và xử lý ngay. Tuần sau cũng mong anh/chị giúp đỡ. (Bước ③ ở đây là câu chào kết)"],
      ]),
    ],
  },
  {
    id: "brse-interview",
    icon: "🎤",
    name: "Phỏng vấn BrSE",
    jp: "面接",
    questions: [
      Q("自己紹介をお願いします。", "Hãy giới thiệu bản thân.", [
        ["はい、よろしくお願いいたします。", "ベトナム出身のグエンと申します。Webエンジニアとして4年の経験があり、現在はブリッジSEを目指しております。", "詳しくお聞きになりたい点はございますか。",
          "Vâng, rất mong được giúp đỡ. Tôi là Nguyễn, đến từ Việt Nam. Tôi có 4 năm kinh nghiệm làm Web engineer, hiện đang hướng tới vị trí BrSE. Anh/chị có điểm nào muốn hỏi chi tiết không ạ?"],
      ]),
      Q("どうしてブリッジSEになりたいんですか。", "Sao bạn muốn trở thành BrSE?", [
        ["はい、理由は二つございます。", "開発の経験と日本語の両方を生かせること、そして日本とベトナムのチームをつなぐ役割にやりがいを感じるからです。", "御社のブリッジSEの方は、どのような業務が多いのでしょうか。",
          "Vâng, có hai lý do. Tận dụng được cả kinh nghiệm phát triển lẫn tiếng Nhật, và tôi thấy ý nghĩa ở vai trò kết nối team Nhật với team Việt. BrSE ở quý công ty thường làm những việc gì nhiều ạ?"],
      ]),
      Q("ブリッジSEに一番大切なことは何だと思いますか。", "Bạn nghĩ điều quan trọng nhất với BrSE là gì?", [
        ["そうですね…", "私は「認識のずれを早く見つけること」だと思います。小さな誤解が大きな手戻りにつながるので。", "実際の現場では、どのような点を重視されていますか。",
          "Để xem… Tôi nghĩ đó là \"phát hiện sớm sự lệch nhau trong cách hiểu\". Vì hiểu lầm nhỏ dẫn tới làm lại lớn. Ở thực tế công việc, quý công ty coi trọng điểm nào ạ?"],
      ]),
      Q("これまでどんな開発をしてきましたか。", "Từ trước đến nay bạn đã làm những dự án gì?", [
        ["はい、主にWebシステムの開発です。", "ECサイトの開発で、バックエンドをJava、フロントエンドをReactで担当しました。", "御社では、どのような技術を使われていますか。",
          "Vâng, chủ yếu là phát triển hệ thống Web. Dự án trang thương mại điện tử, tôi phụ trách backend bằng Java và frontend bằng React. Quý công ty đang dùng công nghệ gì ạ?"],
      ]),
      Q("日本語でのコミュニケーションに自信はありますか。", "Bạn có tự tin giao tiếp bằng tiếng Nhật không?", [
        ["はい、ある程度は自信がございます。", "N2を持っていて、日常の会議には問題なく参加できます。ただ、ビジネス敬語はまだ勉強中です。", "業務で必要な日本語のレベルは、どのくらいでしょうか。",
          "Vâng, ở mức độ nào đó thì tôi tự tin. Tôi có N2, tham gia họp hằng ngày không có vấn đề. Nhưng kính ngữ thương mại thì tôi vẫn đang học. Trình độ tiếng Nhật cần cho công việc khoảng mức nào ạ?"],
      ]),
      Q("あなたの強みは何ですか。", "Điểm mạnh của bạn là gì?", [
        ["はい、強みは「確認を怠らないこと」です。", "前の職場では、仕様の不明点を早めにまとめて確認することで、手戻りを大きく減らすことができました。", "このような経験は、御社の業務でも生かせますでしょうか。",
          "Vâng, điểm mạnh của tôi là \"không lơ là việc xác nhận\". Ở chỗ làm trước, nhờ tổng hợp và xác nhận sớm những điểm chưa rõ trong đặc tả, tôi đã giảm đáng kể việc làm lại. Kinh nghiệm như vậy có phát huy được trong công việc ở quý công ty không ạ?"],
      ]),
      Q("弱みは何ですか。", "Điểm yếu của bạn là gì?", [
        ["正直に申し上げますと…", "以前は一人で抱え込んでしまうところがありました。今は早めに相談することを意識しております。", "御社のチームでは、どのように相談し合っていますか。",
          "Nói thật thì… Trước đây tôi hay ôm việc một mình. Giờ tôi luôn chú ý trao đổi sớm. Team ở quý công ty thường trao đổi với nhau thế nào ạ?"],
      ]),
      Q("失敗した経験を教えてください。", "Hãy kể về một lần thất bại.", [
        ["はい、一つございます。", "以前、仕様を確認せずに実装を進めてしまい、作り直しになったことがあります。それ以来、必ず確認してから着手しております。", "御社では、レビューの体制はどのようになっていますか。",
          "Vâng, có một lần. Trước đây tôi implement mà không xác nhận đặc tả nên phải làm lại. Từ đó, tôi luôn xác nhận rồi mới bắt tay làm. Quy trình review ở quý công ty như thế nào ạ?"],
      ]),
      Q("チームで意見が合わないとき、どうしますか。", "Khi team bất đồng ý kiến, bạn làm thế nào?", [
        ["難しい場面ですね。", "まずは双方の意見の背景を聞いて、データや事実をもとに話し合うようにしております。", "御社のチームは、どのような雰囲気でしょうか。",
          "Tình huống khó nhỉ. Trước tiên tôi lắng nghe lý do đằng sau ý kiến của cả hai bên, rồi thảo luận dựa trên dữ liệu và sự thật. Team ở quý công ty có không khí thế nào ạ?"],
      ]),
      Q("日本の働き方についてどう思いますか。", "Bạn nghĩ gì về cách làm việc của Nhật?", [
        ["いい質問ですね。", "品質や報連相を大切にするところは、とても勉強になると思っております。", "最近は、リモートワークも多いのでしょうか。",
          "Câu hỏi hay ạ. Việc coi trọng chất lượng và Báo cáo–Liên lạc–Thảo luận, tôi thấy học được rất nhiều. Gần đây làm việc từ xa có nhiều không ạ?"],
      ]),
      Q("5年後、どうなっていたいですか。", "5 năm nữa bạn muốn mình thế nào?", [
        ["そうですね、", "5年後にはブリッジSEとして、プロジェクト全体を任されるようになりたいです。", "そのために、どのような経験を積むべきだと思われますか。",
          "Để xem, 5 năm nữa tôi muốn được giao phụ trách toàn bộ dự án với vai trò BrSE. Theo anh/chị, để làm được vậy tôi nên tích lũy kinh nghiệm gì ạ?"],
      ]),
      Q("残業や出張は大丈夫ですか。", "Làm thêm giờ và đi công tác có được không?", [
        ["はい、必要な場合は対応可能です。", "特にベトナムへの出張は、現地のチームと直接話せるいい機会だと思っております。", "出張は、どのくらいの頻度でございますか。",
          "Vâng, khi cần thì tôi đáp ứng được. Đặc biệt đi công tác Việt Nam là cơ hội tốt để nói chuyện trực tiếp với team ở đó. Tần suất đi công tác khoảng bao nhiêu ạ?"],
      ]),
      Q("どうして転職を考えているんですか。", "Sao bạn lại tính chuyển việc?", [
        ["はい、ご説明いたします。", "今の職場では開発が中心で、日本のお客様と直接やりとりする機会が少ないためです。", "御社では、入社後すぐにお客様との窓口を担当することもございますか。",
          "Vâng, tôi xin giải thích. Chỗ làm hiện tại chủ yếu là phát triển, ít cơ hội trao đổi trực tiếp với khách hàng Nhật. Ở quý công ty, có khi nào vừa vào đã phụ trách làm đầu mối với khách không ạ?"],
      ]),
      Q("何か質問はありますか。", "Bạn có câu hỏi gì không?", [
        ["はい、ございます。", "入社後、最初の3か月はどのような業務を担当することになりますか。", "また、研修の制度などはございますか。",
          "Vâng, có ạ. Sau khi vào công ty, 3 tháng đầu tôi sẽ phụ trách công việc gì ạ? Ngoài ra, công ty có chế độ đào tạo không ạ?"],
      ]),
      Q("希望の年収はありますか。", "Bạn có mức lương mong muốn không?", [
        ["はい、恐れ入りますが…", "現在の年収と経験を踏まえて、450万円程度を希望しております。", "御社の評価制度について伺ってもよろしいでしょうか。",
          "Vâng, xin phép ạ… Dựa trên thu nhập hiện tại và kinh nghiệm, tôi mong muốn khoảng 4,5 triệu yên/năm. Cho tôi hỏi về chế độ đánh giá của quý công ty được không ạ?"],
      ]),
    ],
  },
];
