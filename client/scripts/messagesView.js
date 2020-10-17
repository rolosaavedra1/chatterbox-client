var MessagesView = {


  $chats: $('#chats'),

  initialize: function (messages) {
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].username && messages[i].text) {
        var msg = MessagesView.renderMessage(messages[i]);
        $("#chats").prepend(msg);
      }
    }
    Messages.lastDate = Date.parse(messages[0].createdAt);
  },

  renderMessage: function (message) {
    var msg = MessageView.render(message);
    $("#chats").prepend(msg);
  }
};


