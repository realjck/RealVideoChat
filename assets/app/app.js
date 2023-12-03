import { loadEnv } from "./util/load-env.js";
import { AblyConnector } from './util/ably-connector.js';
import { View } from "./view.js";

/**
 * MAIN APP
 */

// RealVideoChat
const RVC = {
  userName : '',
  userColor : '',
  currentChannel : ''
};

loadEnv(() => {
  console.log('*** REAL VIDEO CHAT v'+window.VERSION+' ***');
  console.log(!window.DEV ? 'Online and connected to the Internet'
    : 'Offline for developement');
  if (window.DEV){
    launchApp();
  } else {
    AblyConnector.connect(window.API_KEY, "RVC", launchApp);
  }
});

function launchApp() {

  View.toast(window.DEV ? 'OFFLINE MODE' : 'CONNECTED');

  AblyConnector.addListener("feat0", function(data){
    document.getElementById("message").innerHTML = data;
  });

  AblyConnector.talk("feat0", ["this is an array",
    "this can be also an object", 42]
  );
}
