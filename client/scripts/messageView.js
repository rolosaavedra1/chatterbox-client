var MessageView = {

  render: _.template(`
      <div class="chat">
        <div class="username"> <%- username %> </div>
        <div> <%- text %> </div>
      </div>
    `)

/*
  var compiled = _.template("hello: <%- name %>");
  compiled({name: 'moe'});
  => "hello: moe"
*/
};