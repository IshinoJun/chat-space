$(function(){
  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();

    a.ajax({
      type: 'GET',
      url: '/users/index'
      data: { keyword: input },
      dataType: 'json'
    })
  });
});
