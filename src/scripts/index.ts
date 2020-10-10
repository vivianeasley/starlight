
import { data } from './modules/data/data';
import { uiData } from './modules/data/ui-data';
import { initState } from "./modules/state-management/immer-state";
import Peer from 'peerjs';

let outgoingConnection = false;
let incomingConnection = false;

let peer;
let conn;

const yourIdInput = document.querySelector(".your-id")
const opponentIdInput = document.querySelector(".opponent-id")
const yourIdButton = document.querySelector(".your-id-button")
const opponentIdButton = document.querySelector(".opponent-id-button")

yourIdButton.addEventListener("click", setYourId, false);
opponentIdButton.addEventListener("click", setOpponentsId, false);



function setYourId () {
    const input = yourIdInput.value;
    if (!input) {console.error("user did not provide a string for id");return;}
    console.log("setYourId", input)
    // let peer = new Peer(input);

}

function setOpponentsId () {
    if (!peer) {console.error("no peer id provided");return;}
    const input = opponentIdInput.value;
    if (!input) {console.error("user did not provide opponents string id");return;}
    // conn = peer.connect(input);
    // console.log("setOpponentsId", input, conn)

    // conn.on('open', () => {
    //     conn.send('SYN');
    //   });

    // peer.on('connection', (conn) => {
    //     conn.on('data', (data) => {
    //       if (data === "SYN") {
    //           incomingConnection = true;
    //           console.log("incomingConnection", incomingConnection)
    //         }
    //       if (data === "ACK") {
    //           outgoingConnection = true;
    //           conn.send('SYN');
    //           console.log("outgoingConnection", outgoingConnection)
    //         }
    //     });
    //   });
}

// conn.send({
//     strings: 'hi!',
//     numbers: 150,
//     arrays: [1,2,3],
//     evenBinary: new Blob([1,2,3]),
//     andMore: {bool: true}
//   });


// logic




const state = {
    data: data,
    uiData: uiData
}

initState(state);

// safely handles circular references
function safeStringify (obj, indent = 2) {
    let cache = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
          : value,
      indent
    );
    cache = null;
    return retVal;
  };

//   // Example:
//   console.log('options', JSON.safeStringify(options))






// {"_events":{},"_eventsCount":0,"_id":"robert","_lastServerId":null,"_destroyed":false,"_disconnected":false,"_open":false,"_connections":{},"_lostMessages":{},"_options":{"debug":0,"host":"0.peerjs.com","port":443,"path":"/","key":"peerjs","token":"mxzxcz4ma8l","config":{"iceServers":[{"urls":"stun:stun.l.google.com:19302"},{"urls":"turn:0.peerjs.com:3478","username":"peerjs","credential":"peerjsp"}],"sdpSemantics":"unified-plan"},"secure":true},"_api":{},"_socket":{"_events":{"message":{"once":false},"error":{"once":false},"disconnected":{"once":false},"close":{"once":false}},"_eventsCount":4,"pingInterval":5000,"_disconnected":false,"_messagesQueue":[],"_baseUrl":"wss://0.peerjs.com:443/peerjs?key=peerjs","_id":"robert","_socket":{}}}

// Base 64 encode
// eyJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfaWQiOiJyb2JlcnQiLCJfbGFzdFNlcnZlcklkIjpudWxsLCJfZGVzdHJveWVkIjpmYWxzZSwiX2Rpc2Nvbm5lY3RlZCI6ZmFsc2UsIl9vcGVuIjpmYWxzZSwiX2Nvbm5lY3Rpb25zIjp7fSwiX2xvc3RNZXNzYWdlcyI6e30sIl9vcHRpb25zIjp7ImRlYnVnIjowLCJob3N0IjoiMC5wZWVyanMuY29tIiwicG9ydCI6NDQzLCJwYXRoIjoiLyIsImtleSI6InBlZXJqcyIsInRva2VuIjoibXh6eGN6NG1hOGwiLCJjb25maWciOnsiaWNlU2VydmVycyI6W3sidXJscyI6InN0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDIifSx7InVybHMiOiJ0dXJuOjAucGVlcmpzLmNvbTozNDc4IiwidXNlcm5hbWUiOiJwZWVyanMiLCJjcmVkZW50aWFsIjoicGVlcmpzcCJ9XSwic2RwU2VtYW50aWNzIjoidW5pZmllZC1wbGFuIn0sInNlY3VyZSI6dHJ1ZX0sIl9hcGkiOnt9LCJfc29ja2V0Ijp7Il9ldmVudHMiOnsibWVzc2FnZSI6eyJvbmNlIjpmYWxzZX0sImVycm9yIjp7Im9uY2UiOmZhbHNlfSwiZGlzY29ubmVjdGVkIjp7Im9uY2UiOmZhbHNlfSwiY2xvc2UiOnsib25jZSI6ZmFsc2V9fSwiX2V2ZW50c0NvdW50Ijo0LCJwaW5nSW50ZXJ2YWwiOjUwMDAsIl9kaXNjb25uZWN0ZWQiOmZhbHNlLCJfbWVzc2FnZXNRdWV1ZSI6W10sIl9iYXNlVXJsIjoid3NzOi8vMC5wZWVyanMuY29tOjQ0My9wZWVyanM/a2V5PXBlZXJqcyIsIl9pZCI6InJvYmVydCIsIl9zb2NrZXQiOnt9fX0=