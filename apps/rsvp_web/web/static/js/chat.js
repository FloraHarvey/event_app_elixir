import socket from './socket'

(function(){

  let channel = socket.channel("chat", {});    // create channel with event:id as title

  let message = $('#message')
  message.focus();
  message.on('keypress', event => {
   if (event.keyCode == 13) {
     channel.push('notify_server', {
       payload: message.val()
     })
     message.val("")
   }
  });

  channel.on("update_chat", payload => {
    $('.chat-box').append("<p>" + payload.message + "</p>");
  })

  channel.join()
    .receive("ok", resp => { console.log("Joined chat successfully", resp)
    })
    .receive("error", resp => { console.log("Unable to join", resp)
    })
})();
