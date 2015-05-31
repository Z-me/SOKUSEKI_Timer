$(function () {
  console.log("jqueryの呼び出し成功");
  var sec = 0;
  var min = 20;
  var start_time = "20:00"; //デフォルトのstart時間
  var first, second, last;
  var timer;


  //タイマーセット
  $('#M_Plus').click(function(){
    if(min > 99){
      min = 99;
    }else  min += 1;
    view();
  });

  $('#M_Minus').click(function(){
    if(min <= 0){
      min = 0;
    }else min -= 1;
    view();
  });

  $('#S_Plus').click(function(){
    if(sec >= 59 && min < 99){
      min += 1;
      sec = 0;
    }else sec += 1;
    view();
  });

  $('#S_Minus').click(function(){
    if(sec <= 0){
      sec = 0;
      if(min >=1){
        sec = 59;
        min -= 1;
      }
    }else  sec -= 1;
    view();
  });

  // スタート
  $('#start').click(function() {

    //タイマーセット
    getTime();

    timer = setInterval(countdown, 1000);

    $(this).attr('disabled', 'disabled');
    $('#stop,#reset').removeAttr('disabled');
  });

  // ストップ
  $('#stop').click(function() {
    // 一時停止
    clearInterval(timer);

    $(this).attr('disabled', 'disabled');
    $('#restart').removeAttr('disabled');
  });

  // リスタート
  $('#restart').click(function() {
    getTime();
    // 一時停止から再開
    timer = setInterval(countdown, 1000);

    $(this).attr('disabled', 'disabled');
    $('#stop').removeAttr('disabled');
  });

  // リセット
  $('#reset').click(function() {
    // 初期状態
    sec = 0;
    min = 20;
    $('#clock').html(start_time);
    clearInterval(timer);

    $('#stop,#restart,#reset').attr('disabled', 'disabled');
    $('#start').removeAttr('disabled');
  });
  
  /**
  * 表示時間から時間を取得する
  */
  function getTime(){
    //タイマー設定
    var bell_m = parseInt($('#first_bell').val().slice(3,5), 10);
    var bell_s = parseInt($('#first_bell').val().slice(6,8), 10);
    first = bell_s + (bell_m * 60);
    console.log(first + 1);
    console.log(first);

    bell_m = parseInt($('#second_bell').val().slice(3,5), 10);
    bell_s = parseInt($('#second_bell').val().slice(6,8), 10);
    second = bell_s + (bell_m * 60);

    bell_m = parseInt($('#last_bell').val().slice(3,5), 10);
    bell_s = parseInt($('#last_bell').val().slice(6,8), 10);
    last = bell_s + (bell_m * 60);
  }

 /**
  * カウントダウン
  */
  function countdown() {
    sec -= 1;

    if (sec < 0){
      sec = 0;
      if(min >= 1){
        sec = 59;
        min -= 1;
      }else
        clearInterval(timer);
    }

    if (min < 0) {
      min = 0;
    }
    view(); //カウント表示
    bellCheck();  //ベルのチェック
  }

  /**
  * 表示変更
  */
  function view(){
    if (sec < 10) {
      sec_number = '0' + sec.toString();
    } else {
      sec_number = sec;
    }

    if (min < 10) {
      min_number = '0' + min.toString();
    } else {
      min_number = min;
    }
    $('#clock').html(min_number + ':' + sec_number);
  }

  /**
  * タイマー
  */
  function bellCheck(){
    var time = sec + (min * 60);
    console.log("Time = "+ time);
    console.log(last);

    if(first == time && first >= 0){
      console.log("ここ見た1");
      console.log("first = "+ first + " time = " + time);
      $('#first').html("<audio src=sound/bell1.mp3 preload='auto' id='bell1' controls>");
      first = -1;
      document.getElementById("bell1").play();
    }
    if(second == time  && second >= 0){
      console.log("ここ見た2");
      console.log("second = " + second + " time = " + time);
      $('#second').html("<audio src=sound/bell2.mp3 preload='auto' id='bell2' controls>");
      second = -1;
      document.getElementById("bell2").play();
    }
    if(last == time && last >= 0){
      console.log("ここ見た3");
      console.log("last = " + last + " time = " + time);
      $('#last').html("<audio src=sound/bell3.mp3 preload='auto' id='bell3' controls>");
      last = -1;
      document.getElementById("bell3").play();
    }
  }
});