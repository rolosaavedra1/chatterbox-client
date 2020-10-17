var App = {

  $spinner: $('.spinner img'),
  //create a messages object

  username: 'anonymous',
  //Adding a Jquery object variable

  initialize: function () {
    App.username = window.location.search.substr(10);
    /* Working on Room Filtering
    App.currentRoom = FormView.$room.children()[0];
    console.log(App.currentRoom);
    */
    FormView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    App.fetch(App.loadMessages);
    //App.fetch(App.updater);

  },

  fetch: function (callback = () => { }) {
    Parse.readAll((data) => {
      // examine the response from the server request
      callback(data);
    });
  },

  startSpinner: function () {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function () {
    //makes the spinner disappear
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

  loadMessages: function (data, roomSelection) {
    //create messages object, populate it with server data
    Messages.storage = data.results;

    //Change messages so that it only contains messages with 'room' property that matches roomselection

    //HELPER FUNCTION
    var filterMessagesByRoom = function (roomName) {
      var filtMsgs = [];
      for (var i = 0; i < Messages.storage.length; i++) {
        if (Messages.storage[i].roomname === roomName) {
          filtMsgs.push(Messages.storage[i]);
        }
      }
      return filtMsgs;
    };

    if (roomSelection) {
      /* var filteredMessages = filterMessagesByRoom(roomSelection);
       MessagesView.initialize(filteredMessages);
       RoomsView.initialize(filteredMessages);
       */
    } else {
      MessagesView.initialize(Messages.storage);
      RoomsView.initialize(Messages.storage);
    }
  },

  //define an "updater function"
  updater: function (data) {
    /*
    setTimeout(function () {
      var messagesToAdd = [];
      for (var i = 0; i < data.results.length; i++) {
        var currentMessage = data.results[i];
        if (Date.parse(currentMessage.createdAt) > Messages.lastDate) {
          messagesToAdd.push(currentMessage);
        }
      }
      MessagesView.initialize(messagesToAdd);
    }, 3000);
    //run it using a set timeout for N seconds
    */
  }
  //have set timeout call itself again (to recursively call it every N seconds)
  //Use Parse.readAll to get all messages
  //Check date of the last message added to DOM
  //Only grab messages with date AFTER that date
  //Pass that array to the MessagesView.initialize (which should add them all to the DOM?)
};
