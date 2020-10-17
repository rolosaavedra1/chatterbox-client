var App = {

  $spinner: $('.spinner img'),
  //create a messages object

  username: 'anonymous',
  //Adding a Jquery object variable
  getCurrentData: function () {
    Parse.readAll((data) => {
      return data;
    });
  },

  //Testing to find current room
  //currentRoom : FormView.$room.children()[0].value,

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
    //During initializing, store 'previousRoom'
    App.previousRoom = FormView.currentRoom();
    App.updater();
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
    if (Array.isArray(data)) {
      Messages.storage = data;
    } else {
      Messages.storage = data.results;
    }
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
      var filteredMessages = filterMessagesByRoom(roomSelection);
      $('#chats').empty();
      MessagesView.initialize(filteredMessages);
      RoomsView.initialize(filteredMessages);
    } else {
      MessagesView.initialize(Messages.storage);
      RoomsView.initialize(Messages.storage);
    }
  },

  //define an "updater function"
  updater: function () {
  //Set timeout (triggered during initializing)
    return setTimeout( () => {
      //if currentRoom() !== to 'previousROom'
      if (FormView.currentRoom() !== App.previousRoom) {
        //Remove or hide all current messages
        //trigger the process to render all messages using the currentRoom parameter
        App.loadMessages(Messages.storage, FormView.currentRoom());
        //change the value of previous room to currentRoom
        App.previousRoom = FormView.currentRoom();
      }
      return App.updater();
    }, 3000);
  //call Set Timeout again
  }

};
