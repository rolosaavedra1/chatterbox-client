var App = {

  $spinner: $('.spinner img'),
  //create a messages object

  username: 'anonymous',

  initialize: function () {
    App.username = window.location.search.substr(10);

    FormView.initialize();


    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    App.fetch(App.loadMessages);

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

  loadMessages: function (data) {
    //create messages object, populate it with server data
    Messages.storage = data.results;
    MessagesView.initialize(Messages.storage);
    RoomsView.initialize(Messages.storage);
  }
};
