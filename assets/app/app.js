import { loadEnv } from "./util/load-env.js";
import { AblyConnector } from './util/ably-connector.js';
import { JQueryForm } from "./util/jquery-form.js";
import { View } from "./view.js";

/**
 * MAIN APP
 */

// RealVideoChat
const RVC = {
  currentChannel : '',
  user : {
    uuid : "",
    name : "",
    color : ""
  },
  users : []
};

loadEnv(() => {
  console.log('*** REAL VIDEO CHAT v'+window.VERSION+' ***');
  console.log(!window.DEV ? 'Online mode'
    : 'Offline for developement');
    
  // ROOM NAME
  $("#modal-roomname-dialog").show();
  JQueryForm.init('roomname-card', [['roomname', /^\w+$/]], (data) => {
    RVC.currentChannel = data.roomname.toLowerCase();
    $("#modal-roomname-dialog").hide();
    if (window.DEV){
      launchApp();
    } else {
      AblyConnector.connect(window.API_KEY, RVC.currentChannel, launchApp);
    }
  });
});

function launchApp() {
  // toast
  View.toast(window.DEV ? 'OFFLINE MODE' : 'CONNECTED TO '+RVC.currentChannel.toUpperCase());

  AblyConnector.addListener("feat0", function(data){
    document.getElementById("message").innerHTML = data;
  });

  AblyConnector.talk("feat0", ["this is an array",
    "this can be also an object", 42]
  );
}
