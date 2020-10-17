var Parse = {

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function(message, successCB, errorCB = null) {
    // todo: save a message to the server
    //Ajax jquery method, used to FETCH information from server
    $.ajax({
      // relative location
      url: Parse.server,
      //type of request
      type: 'POST',
      // GUESS: how to organize data fetched
      data: JSON.stringify(message),
      // GUESS: retrieving a json file?
      contentType: 'application/json',
      //if success, execute successCallback
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });

  },

  readAll: function(successCB, errorCB = null) {
    //Ajax jquery method, used to FETCH information from server
    $.ajax({
      // relative location
      url: Parse.server,
      //type of request
      type: 'GET',
      // GUESS: how to organize data fetched
      data: { order: '-createdAt' },
      // GUESS: retrieving a json file?
      contentType: 'application/json',
      //if success, execute successCallback
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};