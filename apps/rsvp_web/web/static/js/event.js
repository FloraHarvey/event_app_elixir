import socket from './socket'

(function(){
  let id = $('#id').data('id');   //fetch event id
  if (!id)
    return;

  let channel = socket.channel("event:" + id, {});    // create channel with event:id as title

  channel.on("update_quantity", payload => {
    console.log("Update", payload);
    $('h4 span').text(payload.quantity);
  })

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully event:" + id, resp)
    })
    .receive("error", resp => { console.log("Unable to join", resp)
    })
})();
