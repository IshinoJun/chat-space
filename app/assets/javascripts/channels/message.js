$(function(){
  function buildHTML(message){
    if(message.image){
      var imagePresent = `<img class="lower-message__image" src=${message.image}>`
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
    return html
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  });
});
