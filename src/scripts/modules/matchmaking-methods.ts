import { updateState } from "./state-management/immer-state"

export const connectPeer = function connectPeer (peerObj, opponentsId) {
    const conn = peerObj.connect(opponentsId);
    conn.on('open', () => {
      conn.send('hi!'); // add conn to uiData
    });
    updateState((state:any)=>{
        state.uiData.connection = conn;
    });
}

export const connectRecieve = function connectRecieve (peerObj) {
    peerObj.on('connection', (conn) => {
        conn.on('data', (data) => {
          // Will print 'hi!'
          console.log(data);
        });
        conn.on('open', () => {
          conn.send('hello!');
        });
      });
}
