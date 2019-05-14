$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
          var imagehtml = message.image == null ? "" : `<img src="${message.image}">`
          var contenthtml = message.content == null ? "" : `${message.content}`
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
                            ${contenthtml}
                            <p class="lower-message__content">
                            ${imagehtml}
                            </p>
                          </div>
                        </div>`
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
          var last_message_id = $('.message').last().attr("data-messageId");
          var groupId = $('.message').attr("data-groupId");
          $.ajax({
            url: '/groups/' + groupId + '/api/messages',
            type: 'get',
            dataType: 'json',
            data: {id: last_message_id}
          })
          .done(function(data) {
            data.forEach(function(message){
            var HTML = buildHTML(message);
              $('.messages').append(HTML);
              $("html,body").animate({scrollTop: $(".messages")[0].scrollHeight+150}, "fast");
            })
          })
          .fail(function() {
            console.log('error');
          });
          
        };
        setInterval(reloadMessages, 5000);
  })
});
