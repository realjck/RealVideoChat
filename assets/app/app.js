import { loadSettings } from "./util/load-settings.js";
import { AblyConnector } from './util/ably-connector.js';
import { JQueryForm } from "./util/jquery-form.js";
import { View } from "./view.js";

/**
 * MAIN APP
 * --------
 * 'Feats*:' (*names of listeners for featured actions)
 * ----------------------------------------------------
 * EVENT NAME(:TYPE) -> ACTION WHEN RECIEVED
 * - hello(:user) -> Register user, say welcome
 * - welcome(:user) -> Register user
 */

// RealVideoChat
const RVC = {
  // CONFIG:
  // ------
  userColors : ['#EE5A24','#009432','#0652DD','#9980FA','#833471'],
  // APP DATA:
  // --------
  // Current channel chosen by user (alias 'Room name'):
  currentChannel : '',
  // App user:
  user : {
    id : "",// = Ably.realtime.connection.id (when connected)
    name : "", // Name chosen by user
    color : 0 // Color index of userColors chosen by user
  },
  // Distant users:
  users : []
};

loadSettings(() => {
  console.log('** REAL VIDEO CHAT v'+window.VERSION+' **');
  console.log(!window.DEV ? 'Online mode'
    : 'Offline for development');
  // for dev:
  if (window.DEV){
    View.toast('** DEV MODE **', 'darkgreen');
  } else {
    askRoom();
  }
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
      AblyConnector
        .connect(window.API_KEY, RVC.currentChannel)
        .then((id) => {
          RVC.user.id = id
          askUserName();
        })
        .catch((e) => {
          View.toast("** CONNEXION ERROR **", "red");
          console.error("IOERROR CAN'T CONNECT", e);
        });
    }
  });
}

function askUserName() {

  // toast
  View.toast(window.DEV ? 'OFFLINE' : 'CONNECTED TO '+RVC.currentChannel.toUpperCase());
  
  // USER NAME
  // ---------
  $("#modal-username-dialog").show();
  // color buttons
  RVC.user.color = Math.floor(Math.random()*RVC.userColors.length);
  activeBtColor();
  for (let i=0; i<RVC.userColors.length; i++){
    const bt = $("#modal-username-dialog li").eq(i);
    bt[0].n = i;
    bt.css("background-color", RVC.userColors[i]);
    bt.on("click", (e) => {
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
    // go back to room selection
    askRoom();
  });
  // form
  JQueryForm.init('username-card', [['username', /^\w+$/]], (data) => {
    RVC.user.name = data.username;
    $("#modal-username-dialog").hide();
    makePresentation();
  });
}

function makePresentation(){
  // user say hello
  AblyConnector.say('hello', RVC.user);

  // he registers the users saying welcome in return
  AblyConnector.addListener('welcome', (user) => {
    if (!RVC.users.find(u => u.id === user.id)){
      addOtherUser(user);
    }
  });

  // then he registers new users, and greets them with a welcome
  AblyConnector.addListener('hello', (user) => {

    addOtherUser(user);

    AblyConnector.say('welcome', RVC.user);

    // fun message
    const fun_msg = [
'pop into the chat',
'swoop into the conversation',
'breeze into the room',
'dive into the chat',
'glide into the conversation',
'materialize in the chatroom',
'saunter into the discussion',
'step into the banter',
'waltz into the chat',
'slide into the dialogue',
'amble into the room',
'appear in the conversation'
    ];
    View.toast(
      user.name + ' ' + fun_msg[Math.floor(fun_msg.length*Math.random())],
      RVC.userColors[user.color]
    );
  });
  function addOtherUser(user){
    RVC.users.push(user);
  }
}