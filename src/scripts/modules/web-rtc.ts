import { updateState } from "./state-management/immer-state"

const host = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(host+"/connect")
let SIGNAL_ID = makeid(8);
let USER_ID = makeid(8);
let configuration = {
  iceServers: [
    {
      urls:'stun:stun.l.google.com:19302'
    }
  ]
};


// {
//   'iceServers': [{
//       'urls': 'stun:stun.l.google.com:19302'
//   }]
// };
// let isNegotiating = false;
let rtcPeerConn;
let dataChannelOptions = {
  maxRetransmitTime: 1000, //milliseconds
};
let dataChannel;

ws.onmessage = (msg) => {
  const response = JSON.parse(msg.data);

  if (response && response.type) {
    if (response.type === "MATCH") initMatch(response);
    if (response.type === "SDP") setUpConn(response);
    if (response.type === "ICE") setUpConn(response);

    return;
  }
  updateGamesList(response);


} // if you get "INIT" call setUpConn({type: "BUILD"}) else setUpConn(msg.data)


export const initiateGame = function initiateGame () {
  const initialRequestStr = JSON.stringify({"type":"LIST", "gameID":SIGNAL_ID, "userID":USER_ID, "userName":"anonymous"})
  ws.send(initialRequestStr);
  updateState((state:any)=>{
    state.uiData.gameID = SIGNAL_ID;
  });
}

export const joinGame = function joinGame (gameID:string) {
  SIGNAL_ID = gameID;
  const initialRequestStr = JSON.stringify({"type":"JOIN", "gameID":gameID, "userID":USER_ID, "userName":"anonymous"})
  ws.send(initialRequestStr);
  updateState((state:any)=>{
    state.uiData.gameID = gameID;
  });
}

export const getGamesList = function getGamesList () {
  const initialRequestStr = JSON.stringify({"type":"GAMES"})
  ws.send(initialRequestStr);
}

function updateGamesList (data:any) {
  updateState((state:any)=>{
    state.uiData.listings = data;
  });
}

function initMatch (data:any) {
  updateState((state:any)=>{
    state.uiData.opponentInfo = data;
  });

  if (!rtcPeerConn) startSignaling();
}

//Page controls
// var chatArea = document.querySelector("#chatArea");
// var signalingArea = document.querySelector("#signalingArea");

//Signaling Code Setup

// io = io.connect();
// ws.send({"signal_ID": SIGNAL_ID});

//Send a first signaling message to anyone listening
//In other apps this would be on a button click, we are just doing it on page load

// ws.onmessage = (data) => {setUpConn(data)}



// negotiate ice


// localConnection.createOffer()
// .then(offer => localConnection.setLocalDescription(offer))
// .then(() => remoteConnection.setRemoteDescription(localConnection.localDescription))
// .then(() => remoteConnection.createAnswer())
// .then(answer => remoteConnection.setLocalDescription(answer))
// .then(() => localConnection.setRemoteDescription(remoteConnection.localDescription))
// .catch(handleCreateDescriptionError);



export const setUpConn = function setUpConn (data:any) {

    if (data.type !== "MATCH") {
        if (data.message.sdp) {
          rtcPeerConn.setRemoteDescription(new RTCSessionDescription(data.message.sdp)).then(function() {
              // Only create answers in response to offers
              if(data.message.sdp.type === 'offer') {
                  console.log("Sending answer");
                  rtcPeerConn.createAnswer().then(sendLocalDesc).catch(logError);
              }
          }).catch(logError);
        }
        else {
          const messageCan = JSON.parse(data.message);
          if (!messageCan.candidate) return;
          rtcPeerConn.addIceCandidate(new RTCIceCandidate(messageCan.candidate)).catch(logError);
        }
    }

}

function startSignaling() {
    displaySignalMessage("starting signaling...");
    rtcPeerConn = new RTCPeerConnection(configuration);
    dataChannel = rtcPeerConn.createDataChannel('textMessages', dataChannelOptions);

    dataChannel.onopen = dataChannelStateChanged;
    rtcPeerConn.ondatachannel = receiveDataChannel;
    let iceSignal;
    // send any ice candidates to the other peer

    rtcPeerConn.onicecandidate = function (evt) {
        if (evt.candidate) {
          // console.log("------", evt)
          iceSignal = JSON.stringify({"type":"ICE", "message": JSON.stringify({ 'candidate': evt.candidate }), "gameID":SIGNAL_ID, "userID":USER_ID})
          ws.send(iceSignal);
        }

        displaySignalMessage("completed that ice candidate...");
    };

    rtcPeerConn.onnegotiationneeded = function () {
        displaySignalMessage("on negotiation called");
        rtcPeerConn.createOffer().then(sendLocalDesc).catch(logError);

    }
}

function sendLocalDesc(description) {
  console.log('Got description', description);
  let sdpSignal;
  rtcPeerConn.setLocalDescription(description).then(function() {
    let desc = { 'sdp': description };
    sdpSignal = JSON.stringify({"type":"SDP", "message": desc, "gameID":SIGNAL_ID, "userID":USER_ID});
    ws.send(sdpSignal);
  }).catch(logError);
}

// function sendLocalDesc(desc) {
//     let sdpSignal;
//     rtcPeerConn.setLocalDescription(desc, function () {
//         displaySignalMessage("sending local description");
//         sdpSignal = JSON.stringify({"type":"SDP", "message": JSON.stringify({ 'sdp': rtcPeerConn.localDescription }), "gameID":SIGNAL_ID, "userID":USER_ID});
//         ws.send(sdpSignal);
//     }, logError);
// }

//Data Channel Specific methods
function dataChannelStateChanged(event) {
  console.log("dataChannelStateChanged", event)
    if (dataChannel.readyState === 'open') {
        displaySignalMessage("Data Channel open");
        dataChannel.onmessage = receiveDataChannelMessage;
    }
}

function receiveDataChannel(event) {
    console.log("receiveDataChannel", event)
    displaySignalMessage("Receiving a data channel");
    dataChannel = event.channel;
    dataChannel.onmessage = receiveDataChannelMessage;
}

function receiveDataChannelMessage(event) {
    displayMessage("From DataChannel: " + event.data);
}

//Logging/Display Methods
function logError(error) {
    displaySignalMessage(error);
}

function displayMessage(message) {
    console.log(message)
}

function displaySignalMessage(message) {
    console.log(message)
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}