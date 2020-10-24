
import { data } from './modules/data/data';
import { uiData } from './modules/data/ui-data';
import { initState } from "./modules/state-management/immer-state";
// import { initWebRTC } from "./modules/web-rtc"

// window.onload = () => {
//     initWebRTC()
// }
uiData.gameID = makeid(8);
uiData.userID = makeid(8);

const state = {
    data: data,
    uiData: uiData
}

initState(state);



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }