$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
      console.log(message);
          var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
      if(message.content && message.image) {
            var html = `<div class="message" data-messageId='${message.id}' data-groupId="${message.group_id}">
                          <div class="upper-message">
                            <div class="upper-message__user-name">
                              ${message.name}
                            </div>
                            <div class="upper-message__date">
                            ${message.time}
                            </div>
                          </div>
                          <div class="lower-message">
                            <p class="lower-message__content">
                            ${message.content}
                            </p>
                            ${imagehtml}
                          </div>
                        </div>`
      } else if(message.image) {
        var html =  `<div class="message" data-messageId='${message.id}' data-groupId="${message.group_id}">
                        <div class="upper-message">
                          <div class="upper-message__user-name">
                            ${message.name}
                          </div>
                          <div class="upper-message__date">
                            ${message.time}
                          </div>
                        </div>
                        <div class="lower-message">
                          <p class="lower-message__content">
                            ${imagehtml}
                          </p>
                        </div>  
                    </div>`
      } else if (message.content) {
        var html =  `<div class="message" data-messageId='${message.id}' data-groupId="${message.group_id}">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                        ${message.name}
                        </div>
                        <div class="upper-message__date">
                          ${message.time}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                      </div>
                    </div>`
      };
      return html;
    };
    
    $('#new_message').on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var href = window.location.href
        $.ajax({
          url: href,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(message){
          var html = buildHTML(message);
          $('.messages').append(html);
          $(".form__submit").prop( "disabled", false);
          $("html,body").animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          $("form")[0].reset();
        })
        .fail(function(){
          alert('error');
        })
    });
        var reloadMessages = function() {
          //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
          var last_message_id = $('.message').last().attr("data-messageId");
          var groupId = $('.message').attr("data-groupId");
          $.ajax({
            //ルーティングで設定した通りのURLを指定
            url: '/groups/' + groupId + '/api/messages',
            //ルーティングで設定した通りhttpメソッドをgetに指定
            type: 'get',
            dataType: 'json',
            //dataオプションでリクエストに値を含める
            data: {id: last_message_id}
          })
          .done(function(data) {
            console.log("done")
            data.forEach(function(message){
            var HTML = buildHTML(message);
              $('.messages').append(HTML);
              $("html,body").animate({scrollTop: $(".messages")[0].scrollHeight+150}, "fast");
              console.log("done2")
            })
          })
          .fail(function() {
            console.log('error');
          });
          
        };
        setInterval(reloadMessages, 5000);
  })
});
