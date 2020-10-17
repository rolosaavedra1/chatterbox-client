var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  renderTemplate: _.template(`
      <option ID= <%- room %>> <%- room %> </option>
    `),

  initialize: function (messages) {
    var existingRooms = {};
    //Append the text option room
    //go through messages retreieved from server, add any rooms described in mesages
    for (var i = 0; i < messages.length; i++) {
      var room = messages[i].roomname;
      if (room) {
        if (!existingRooms[room]) {
          existingRooms[room] = room;
          var msg = RoomsView.renderRoom(room);
          $('#rooms select').append(msg);
        }
      }
    }
  },

  renderRoom: function (room) {
    // Format the input room parameter using a template
    var newRoom = RoomsView.renderTemplate({ room: room });
    // Append the room to the select options
    $('#rooms select').append(newRoom);

  },



  /*
  <div id="rooms">
      Room:
      <select></select>
      <button>Add Room</button>
    </div>
  */

};
//choose room
//add room