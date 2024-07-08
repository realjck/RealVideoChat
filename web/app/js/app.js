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
  console.log(!window.DEV ? 'Production mode'
    : 'Quick login johndoe:dev');
  $("h1").html("MediaRoom v"+window.VERSION);
  // for dev:
  if (window.DEV){
    MR.user.name='johndoe';
    MR.user.color=2;
    MR.currentChannel='dev';
    ServerConnector.login(MR.user.name, MR.currentChannel, makePresentation);
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
    ServerConnector.login(MR.user.name, MR.currentChannel, makePresentation);
  });
}

/**
 * SEND AND ACTIVE GREETINGS
 */
function makePresentation(){

  // Register users saying welcome in return:
  ServerConnector.addListener('welcome', (user) => {
    addOtherUser(user);
  });

  // Register and answer to users saying hello:
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
    if (!MR.users.find(u => u.name === user.name)) {
      MR.users.push(user);
    }
  }

  // user say hello:
  ServerConnector.say('hello', MR.user);

  // init Talk
  initTalk();

  // init Color change
  initColorChange();

  // show room name
  $("#room-name").html(MR.currentChannel);

  // next:
  initMedia();

  // show container:
  $(".container").show();
  $("#message").focus();
}

function initTalk() {

  // Listen to talk events
  ServerConnector.addListener('talk', (data) => {
    const isOther = data.user.name !== MR.user.name || data.user.color !== MR.user.color;
    View.speechBubble(data.user.name, MR.userColors[data.user.color], data.message, isOther);
  });

  // talk with talk-area form
  JQueryForm.init('talk-area', [['message', /^[^<>]+$/]], (data) => {
    const obj = {};
    obj.message = data.message;
    obj.user = MR.user;
    ServerConnector.say('talk', obj);
  })
}

function initColorChange() {
  activeBtColor();
  for (let i=0; i<MR.userColors.length; i++){
    const bt = $(".btColorList li").eq(i);
    bt[0].n = i;
    bt.css("background-color", MR.userColors[i]);
    bt.on("click", (e) => {
      MR.user.color = $(e.currentTarget)[0].n;
      ServerConnector.say('color', MR.user); // Send update to other clients
      activeBtColor();
    });
  }
  function activeBtColor(){
    $(".btColorList li").removeClass('active')
        .eq(MR.user.color).addClass('active');
  }

  // Listener and color update
  ServerConnector.addListener('color', data => {
    const userToUpdate = MR.users.findLast(user => user.name === data.name);
    if (userToUpdate) {
      userToUpdate.color = data.color;
    }
    View.updateSpeechBubbleColor(data.name, MR.userColors[data.color]);
    // fun message:
    const fun_msg = [
      'is glowing up with their new color!',
      'traded in their old avatar for a new hue!',
      'is embracing the rainbow with their new avatar!',
      'has a chameleon-like avatar that keeps changing colors!',
      'is painting the town with their new avatar!'
    ];
    View.toast(data.name + ' ' + fun_msg[Math.floor(fun_msg.length*Math.random())],
        MR.userColors[data.color]);
  });
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
