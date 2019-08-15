$(function(){
  function buildHTML(message){
    message.image ? image = ` <img class="lower-message__image" src="${message.image}"` : image = ""

    var html = `<div class="rightcontents__main__set">
                  <div class="rightcontents__main__set__name">
                  ${message.user_name}
                  </div>
                  <div class="rightcontents__main__set__time">
                    ${message.created_at}
                  </div>
                </div>
                <div class="rightcontents__main__coment">
                  <p class="rightcontents__main__coment">
                  ${message.content}
                  </p>
                  ${image}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
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
      $('.rightcontents__main').append(html)
      $('#new_message')[0].reset();
      $('.new_message__send').attr('disabled', false);
      $('.rightcontents__main').animate({scrollTop: $('.rightcontents__main')[0].scrollHeight}, 'fast');
    });
  });
  $(function() {
      var reloadMessages = function() {
      last_message_id = $('#comment_message:last-child').data('message_id');
      $.ajax({
        url: '/groups/group_id/messages/api/messages#index{format: "json"}',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.rightcontents__main').append(insertHTML);
          $('.rightcontents__main').animate({scrollTop: $('.rightcontents__main')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        console.log('error');
      });
    };
    setInterval(reloadMessages, 5000);
  });
})