import { loadSettings } from "./util/load-settings.js";
import { ServerConnector } from './util/server-connector.js';
import { JQueryForm } from "./util/jquery-form.js";
import { View } from "./view/view.js";

/**
 * MAIN APP
 * --------
 * 'Feats*:' (*names of listeners for featured actions)
 * ----------------------------------------------------
 * EVENT NAME(:TYPE) -> ACTION WHEN RECIEVED
 * - hello(:user) -> Register user, say welcome
 * - welcome(:user) -> Register user
 */
// MediaRoom
const MR = {
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

/**
 * LOAD SETTINGS
 */
loadSettings('./config/settings',() => {
  console.log('** MEDIA ROOM v'+window.VERSION+' **');
  console.log(!window.DEV ? 'Online mode'
    : 'Offline for development');
  $("h1").html("MediaRoom v"+window.VERSION);
  // for dev:
  if (window.DEV){
    View.toast('** DEV MODE **', 'darkgreen');
    makePresentation();
  } else {
    askRoom();
  }
});

/**
 * ASK ROOM TO CONNECT
 */
function askRoom() {
  // ROOM NAME
  $("#modal-roomname-dialog").show();
  JQueryForm.init('roomname-card', [['roomname', /^\w+$/]], (data) => {
    MR.currentChannel = data.roomname.toLowerCase();
    $("#modal-roomname-dialog").hide();
    askUserName();
  });
}

/**
 * ASK USER NAME
 */
function askUserName() {

  // toast
  View.toast(window.DEV ? 'OFFLINE' : 'CONNECTED TO '+MR.currentChannel.toUpperCase());

  // USER NAME
  // ---------
  $("#modal-username-dialog").show();
  // color buttons:
  MR.user.color = Math.floor(Math.random()*MR.userColors.length);
  activeBtColor();
  for (let i=0; i<MR.userColors.length; i++){
    const bt = $("#modal-username-dialog li").eq(i);
    bt[0].n = i;
    bt.css("background-color", MR.userColors[i]);
    bt.on("click", (e) => {
      MR.user.color = $(e.currentTarget)[0].n;
      activeBtColor();
    });
  }
  function activeBtColor(){
    $("#modal-username-dialog li").removeClass('active')
        .eq(MR.user.color).addClass('active');
  }
  // bt close:
  $("#modal-username-dialog .modal-close").on("click", () => {
    $("#modal-username-dialog").hide();
    // go back to room selection:
    askRoom();
  });
  // form
  JQueryForm.init('username-card', [['username', /^\w+$/]], (data) => {
    MR.user.name = data.username;
    $("#modal-username-dialog").hide();
    makePresentation();
  });
}

/**
 * SEND AND ACTIVE GREETINGS
 */
function makePresentation(){
  // user say hello:
  ServerConnector.say('hello', MR.user);
  showPresentationToast(MR.user);

  // he registers the users saying welcome in return:
  ServerConnector.addListener('welcome', (user) => {
    if (!MR.users.find(u => u.id === user.id)){
      addOtherUser(user);
    }
  });

  // then he registers new users, and greets them with a welcome:
  ServerConnector.addListener('hello', (user) => {
    addOtherUser(user);
    ServerConnector.say('welcome', MR.user);
    showPresentationToast(user);
  })
  function showPresentationToast(user){
    // fun message:
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
        MR.userColors[user.color]
    );
  }
  function addOtherUser(user){
    MR.users.push(user);
  }

  // show container:
  $(".container").show();

  // next:
  initMedia();
}

/**
 * INITIALIZE VIDEO SYSTEM
 */
function initMedia(){
  // End of media:
  $("video").on("ended", () => {
    // put poster back:
    $("video")[0].load();
    // fun message:
    const fun_msg = [
      'The media is over, but the fun is just beginning.',
      'The media is finished, but the story is still being written.',
      'The media is finished, but the imagination is still running wild.',
      'The media is finished, but the memories will last a lifetime.',
      'The media is finished, but the journey is only just beginning.'
    ];
    View.toast(fun_msg[Math.floor(fun_msg.length*Math.random())]);
  });
}
