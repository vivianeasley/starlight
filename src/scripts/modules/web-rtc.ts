import { updateState } from "./state-management/immer-state"

///// BEGIN WEBRTC & SOCKET CONFIG /////

let ignoreOffer = false;
let makingOffer = false;
let polite = true;

const host = location.origin.replace(/^http/, 'ws')
const hostPort = host.replace("8080", '3000')
const ws = new WebSocket(hostPort+"/connect")
let SIGNAL_ID = makeid(8);
let USER_ID = makeid(8);
let configuration = {
  iceServers: [
    {
      urls:'stun:stun.l.google.com:19302'
    }
  ]
};

let rtcPeerConn;
let dataChannelOptions = {
  maxRetransmitTime: 1000, //milliseconds
};
let dataChannel;

///// END WEBRTC & SOCKET CONFIG /////

ws.onmessage = (msg) => {
  const response = JSON.parse(msg.data);

  if (response && response.type) {
    if (response.type === "MATCH") initMatch(response);
    return;
  }

  if (response && response.description) {
    setUpConn(response.description, undefined);
    return;
  }

  if (response && response.candidate) {
    setUpConn(undefined, response.candidate);
    return;
  }
  updateGamesList(response);

}

///////// END MATCH MAKING METHODS //////////

export const initiateGame = function initiateGame () {
  const initialRequestStr = JSON.stringify({"type":"LIST", "gameID":SIGNAL_ID, "userID":USER_ID, "userName":"anonymous"})
  ws.send(initialRequestStr);
  updateState((state:any)=>{
    state.uiData.gameID = SIGNAL_ID;
  });
}

export const joinGame = function joinGame (gameID:string) {
  polite = false;
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

///////// END MATCH MAKING METHODS //////////

///////// BEGIN WEBRTC CONNECTION //////////

function initMatch (data:any) {
  updateState((state:any)=>{
    state.uiData.opponentInfo = data;
  });

  if (!rtcPeerConn) startSignaling();
}



export const setUpConn = async (description, candidate) => {

  try {
    if (description) {
      const offerCollision = (description.type === "offer") &&
                             (makingOffer || rtcPeerConn.signalingState !== "stable");

      ignoreOffer = !polite && offerCollision;
      if (ignoreOffer) {
        return;
      }

      await rtcPeerConn.setRemoteDescription(description);

      if (description.type === "offer") {
        await rtcPeerConn.setLocalDescription();
        let iceSignal = JSON.stringify({ description: rtcPeerConn.localDescription, "gameID":SIGNAL_ID, "userID":USER_ID });
        ws.send(iceSignal);
      }
    } else if (candidate) {
      try {
        await rtcPeerConn.addIceCandidate(candidate);
      } catch(err) {
        if (!ignoreOffer) {
          throw err;
        }
      }
    }
  } catch(err) {
    console.error(err);
  }
}

async function startSignaling() {
    rtcPeerConn = new RTCPeerConnection(configuration);
    dataChannel = rtcPeerConn.createDataChannel('textMessages', dataChannelOptions);

    dataChannel.onopen = dataChannelStateChanged;
    rtcPeerConn.ondatachannel = receiveDataChannel;

    rtcPeerConn.onicecandidate = ({candidate}) => {
      let canSignal = JSON.stringify({ candidate: candidate, "gameID":SIGNAL_ID, "userID":USER_ID });
      ws.send(canSignal);
    };

    rtcPeerConn.onnegotiationneeded = async () => {
      try {
        makingOffer = true;
        await rtcPeerConn.setLocalDescription();
      let sdpSignal = JSON.stringify({ description: rtcPeerConn.localDescription, "gameID":SIGNAL_ID, "userID":USER_ID });
      ws.send(sdpSignal);
      } catch(err) {
        console.error(err);
      } finally {
        makingOffer = false;
      }
    };

    rtcPeerConn.oniceconnectionstatechange = () => {
      if (rtcPeerConn.iceConnectionState === "failed") {
        console.log("failed")
        rtcPeerConn.restartIce();
      }
    };

}

//Data Channel Specific methods
function dataChannelStateChanged(event) {
  console.log("dataChannelStateChanged", event)
    if (dataChannel.readyState === 'open') {
        ws.close(); // might need to keep this open in case we lose webRTC connection
        console.log("Data Channel open");
        // close setup modal
        // send your state
        dataChannel.onmessage = receiveDataChannelMessage;
    }
}

function receiveDataChannel(event) {
    console.log("receiveDataChannel", event)
    console.log("Receiving a data channel");
    dataChannel = event.channel;
    dataChannel.onmessage = receiveDataChannelMessage;
    // on first recieve of state render
    // start game (init)

    // receiveChannel = event.channel;
    // receiveChannel.onmessage = handleReceiveMessage;
    // receiveChannel.onopen = handleReceiveChannelStatusChange;
    // receiveChannel.onclose = handleReceiveChannelStatusChange;
}

function receiveDataChannelMessage(event) {
    // update current state with opponent data and switch active player
    console.log("From DataChannel: " + event.data);
}

export const sendStateData = function sendStateData(state) {
  console.log("test")
  // dataChannel.send()
}

///////// END WEBRTC CONNECTION //////////

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}