$(function(){
  function buildHTML(message){
    var imagePresent = "";
    if(message.image){
      imagePresent = `<img class="lower-message__image" src=${message.image}>`
    }
    var html = `<div class="chat-main__message">
                  <div class="chat-main__message-name">
                    ${message.name}
                  </div>
                  <div class="chat-main__message-time">
                    ${message.created_at}
                  </div>
                  <div class="chat-main__message-body">
                    ${message.content}
                    ${imagePresent}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body--messages-list').append(html);
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
      $('.message').val('');
      $('.submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  });

  function autoreload(){
    $.ajax({
      type: 'GET',
      url:'./messages',
      dataType: 'json'
    })
    .done(function(data){
      $('.chat-main__body--messages-list').empty();
      $.each(data.messages, function(i, message){
        var html = buildHTML(message);
        $('.chat-main__body--messages-list').append(html);
      });
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    });
  }
  setInterval(autoreload,5000);
});
