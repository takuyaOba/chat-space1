$(function() {

  function appendUser(user) {
    var html = `
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>
               `
   return html;
  };

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var href = window.location.href
    console.log(input);
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
  
    .done(function(users) {
      $(".user-search-result").empty();
      if (input.length !== 0) {
        users.forEach(function(user){
          var html = appendUser(user);
          $(".user-search-result").append(html);
        });
      }
    })
    .fail(function(){
      alert('通信に失敗しました');
    });

  }); 

  function clickHTML(user){
    var userId = user.attr("data-user-id");
//Jqueryのattrメソッドの結果をuerIdに代入
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                  <input name='group[user_ids][]' type='hidden' value="${userId}">
                  <p class='chat-group-user__name'>${user.attr("data-user-name")}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    return html;
  };
//attrメソッドによって引数に指定した属性の値を取得することができる
//HTML5ではdata-*="value"の形式で属性名にプライベートな値を設定できるカスタムデータ属性の仕様と、そのカスタムデータ属性にJavaScriptからアクセスするAPIが定義された
  $(document).on("click",".user-search-add", function() {
//追加ボタンが押された時
    $input = $(this);
//jqueryオブジェクトを代入するのでわかりやすいようにinputという変数の前に$をつける
//inputにdocumentを代入する
    var add_user_html = clickHTML($input);
    $("#search-users").append(add_user_html);
//#search-usersの下にhtmlを追加
// console.log($input.parent())
      $input.parent()[0].remove();
//ここでremoveすることでチャットメンバーを追加のところから追加したuserを消す
//parentメソッド→引数を省略すると親要素すべてを選択する 省略しなければ引数に指定した親要素のセレクタを選択する
//セレクタとはスタイルを適用する対象のこと
//removeメソッドとは→Jqueryオブジェクトで指定した要素を削除する
  });
  
});

