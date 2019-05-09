$(function(){
  function buildHTML(message){
        var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
        var html = `<div class=message>
                        <div class="upper-message">
                          <div class="upper-message__user-name">
                            ${message.user_name}
                          </div>
                          <div class="upper-message__date">
                            ${message.created_at}
                          </div>
                        </div>
                        <div class="lower-message">
                          <p class="lower-message__content">
                          ${message.content}
                          </p>
                          ${imagehtml}
                        </div>
                    </div> `
        return html;
  }
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

      var reloadMessages = function() {
        last_message_id = "@message.id"
        $.ajax({
          url: href,
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          console.log('success');
        })
        .fail(function() {
          console.log('error');
        });
      };
    
      
    

  })
});
