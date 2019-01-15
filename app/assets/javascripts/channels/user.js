$(function(){
  var search_result = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_result.append(html);
  }

  function appendNoUser(message) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${message}</p>
                </div>`
    search_result.append(html);
  }

  $("#user-search-field").on("keyup",function(){
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
         users.forEach(function(user){
           appendUser(user);
         })
       }
       else {
         appendNoUser("一致するユーザーは見つかりませんでした");
       }
      })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on("click",".user-search-add",function(){

  })


});
