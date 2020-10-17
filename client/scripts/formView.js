var FormView = {
  //define a jquery node $form
  $form: $('form'),
  $room: $('#rooms'),
  //*************** ADDING CODE HERE
  $newroombutton: $('#addroom'),
  $select: $('#rooms select'),

  initialize: function () {
    FormView.$form.on('submit', FormView.handleSubmit);
    FormView.$newroombutton.on('submit', FormView.addNewRoom);
    /*
    FormView.$newroombutton.on('change', App.loadMessages.bind(null, Messages.storage, FormView.$room.children()[0].value));
    */
  },

  handleSubmit: function (event) {

    //HELPER FUNCTION: ID string generator
    var randomString = function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    };

    // Stop the browser from submitting the form
    event.preventDefault();
    // Store the current room we are in when the user clicks Submit
    var currentRoom = FormView.$room.children()[0].value;
    // Store the current message object in a variable when the user clicks Submit
    var $messageObj = $('form').children('#message');
    // Construct the message Object to pass to parse
    var newMessage = {
      objectId: randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      roomname: currentRoom,
      username: App.username,
      text: $messageObj[0].value,
      createdAt: JSON.stringify(new Date()),
      updatedAt: JSON.stringify(new Date())
    };
    //Parse the message and send it to the server -> if successful, render the new message to our screen
    Parse.create(newMessage, MessagesView.renderMessage(newMessage));
  },

  setStatus: function (active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },
  //************ ADDING CODE HERE
  addNewRoom: function () {
    event.preventDefault();
    //Find user text
    var newRoomName = FormView.$newroombutton.children()[1].value;
    //Append to rooms select options
    debugger;
    RoomsView.renderRoom(newRoomName);

  }

};