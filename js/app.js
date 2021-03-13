$(function () {
  // 回答結果
  let result = [];
  // 回答した問題数
  let count = 0;
  // 問題文とその回答の配列を用意しておく
  const questions = [
    {
      text: "「ぺんぎん」はだれかな？",
      answer: "img/pengin.png",
    },
    {
      text: "「ぱんだ」はだれかな？",
      answer: "img/panda.png",
    },
    {
      text: "「うま」はだれかな？",
      answer: "img/uma.png",
    },
    {
      text: "「たぬき」はだれかな？",
      answer: "img/tanuki.png",
    },
    {
      text: "「りす」はだれかな？",
      answer: "img/risu.png",
    },
  ];
  // 最初の問題文を表示
  $("#js-question").text(questions[0].text);
  // 画像が押下された時のクリックイベント
  $("button").click(function () {
    if (questions[count].answer === $(this).children("img").attr("src")) {
      // 回答結果に「正解」を追記
      result.push("正解");
      alert("すごい！あたりだよ！");
    } else {
      // 回答結果に「不正解」を追記
      result.push("不正解");
      alert("あれれ…まちがえちゃった！");
    }
    // 回答した数を足していく
    count++;
    // 最終結果発表
    if (questions.length === count) {
      // 問題文の差し替え
      $("#js-question").text(
        "おつかれさま！！おしまい！！よくがんばったね！！"
      );
      let seikai = 0;
      for (let i = 0; i < result.length; i++) {
        if (result[i] === "正解") {
          seikai++;
        }
      }
      alert(
        `ぜんぶで${questions.length}つありました。きみのせいかいりつは${
          (seikai / questions.length) * 100
        }%でした。`
      );
    } else {
      // 問題文の差し替え
      $("#js-question").text(questions[count].text);
    }
  });
  //モーダルウィンドウを出現させるクリックイベント
  $("#modal-open").click(function () {
    //キーボード操作などにより、オーバーレイが多重起動するのを防止する
    $(this).blur(); //ボタンからフォーカスを外す
    if ($("#modal-overlay")[0]) return false; //新しくモーダルウィンドウを起動しない (防止策1)
    //if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)
    //オーバーレイを出現させる
    $("body").append('<div id="modal-overlay"></div>');
    $("#modal-overlay").fadeIn("slow");
    //コンテンツをセンタリングする
    centeringModalSyncer();
    //コンテンツをフェードインする
    $("#modal-content").fadeIn("slow");
    //[#modal-overlay]、または[#modal-close]をクリックしたら…
    $("#modal-overlay,#modal-close")
      .unbind()
      .click(function () {
        //[#modal-content]と[#modal-overlay]をフェードアウトした後に…
        $("#modal-content,#modal-overlay").fadeOut("slow", function () {
          //[#modal-overlay]を削除する
          $("#modal-overlay").remove();
        });
      });
  });
  //リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
  $(window).resize(centeringModalSyncer);
  //センタリングを実行する関数
  function centeringModalSyncer() {
    //画面(ウィンドウ)の幅、高さを取得
    var w = $(window).width();
    var h = $(window).height();
    // コンテンツ(#modal-content)の幅、高さを取得
    // jQueryのバージョンによっては、引数[{margin:true}]を指定した時、不具合を起こします。
    //		var cw = $( "#modal-content" ).outerWidth( {margin:true} );
    //		var ch = $( "#modal-content" ).outerHeight( {margin:true} );
    var cw = $("#modal-content").outerWidth();
    var ch = $("#modal-content").outerHeight();
    //センタリングを実行する
    $("#modal-content").css({
      left: (w - cw) / 2 + "px",
      top: (h - ch) / 2 + "px",
    });
  }
});
