import { loadEnv } from "./util/load-env.js";
import { AblyConnector } from './util/ably-connector.js'

/**
 * MAIN APP
 */

const RVC = {
  userName : '',
  userColor : '',
  currentChannel : ''
};

loadEnv(() => {
  AblyConnector.connect(window.API_KEY, "RVC", launchApp);
});

function launchApp() {
  AblyConnector.addListener("feat0", function(data){
    document.getElementById("message").innerHTML = data;
  });
  AblyConnector.talk("feat0", ["this is an array",
    "this can be also an object", 42]
  );
}
