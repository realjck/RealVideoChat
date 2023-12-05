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
    color : 0
  },
  users : [],
  usercolors : ['#EE5A24','#009432','#0652DD','#9980FA','#833471'],
};

loadEnv(() => {
  console.log('*** REAL VIDEO CHAT v'+window.VERSION+' ***');
  console.log(!window.DEV ? 'Online mode'
    : 'Offline for developement');
  askRoom();
});
  
function askRoom() {
  // ROOM NAME
  $("#modal-roomname-dialog").show();
  JQueryForm.init('roomname-card', [['roomname', /^\w+$/]], (data) => {
    RVC.currentChannel = data.roomname.toLowerCase();
    $("#modal-roomname-dialog").hide();
    if (window.DEV){
      askUserName();
    } else {
      AblyConnector.connect(window.API_KEY, RVC.currentChannel, launchApp);
    }
  });
}
  
function askUserName() {
  
  // toast
  View.toast(window.DEV ? 'OFFLINE MODE' : 'CONNECTED TO '+RVC.currentChannel.toUpperCase());
  
  // USER NAME
  // ---------
  $("#modal-username-dialog").show();
  // color buttons
  RVC.user.color = Math.floor(Math.random()*RVC.usercolors.length);
  activeBtColor();
  for (let i=0; i<RVC.usercolors.length; i++){
    const bt = $("#modal-username-dialog li").eq(i);
    bt[0].n = i;
    bt.css("background-color", RVC.usercolors[i]);
    bt.on("click", (e) => {
      console.log($(e.currentTarget).index);
      RVC.user.color = $(e.currentTarget)[0].n;
      activeBtColor();
    });
  }
  function activeBtColor(){
    $("#modal-username-dialog li").removeClass('active');
    $("#modal-username-dialog li").eq(RVC.user.color).addClass('active');
  }
  // bt close
  $("#modal-username-dialog .modal-close").on("click", () => {
    $("#modal-username-dialog").hide();
    askRoom();
  });
  // form
  JQueryForm.init('username-card', [['username', /^\w+$/]], (data) => {
    RVC.user.name = data.username;
    $("#modal-username-dialog").hide();
  });
}
