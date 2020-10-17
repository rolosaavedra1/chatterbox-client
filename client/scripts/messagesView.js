var MessagesView = {


  $chats: $('#chats'),

  initialize: function (messages) {
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].username) {
        var msg = MessagesView.renderMessage(messages[i]);
        $("#chats").append(msg);
      }
    }
  },

  renderMessage: function (message) {
    var msg = MessageView.render(message);
    $("#chats").append(msg);
  }
};


