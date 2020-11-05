import { updateStatePromise } from "../state-management/immer-state"
import * as CF from "./card-methods/card-functs"

export const beginResolution = async function beginResolution (state:any) {

    if (state.data.zones.track.length === 0) { console.log("Resolution finished"); return;}
    const lastCardObj = state.data.zones.track[state.data.zones.track.length - 1];

    let description = "";
    let targetIndices = [];
    let amount = [1];

    // Manage damage cards that are covering cards on the track.
    if (lastCardObj.underDamage.length > 0) {
        // loop through resolving damage and sending damage card back to damage zone
        for (let j = 0; j < lastCardObj.underDamage.length; j++) {
            for (let k = 0; k < lastCardObj.underDamage[j].functs.length; k++) {
                description += await CF[lastCardObj.underDamage[j].functs[k]](targetIndices, amount, state);
            }
            state.data.zones.damage.push(lastCardObj.underDamage[j]);
        }
        lastCardObj.underDamage = [];
    }

    targetIndices = [];
    amount = [1];
    await wait(1000);
    await updateStatePromise((state:any)=>{
        state.uiData.phaseDesc = { text: "Resolving ", color: "#2000a0" };
      });
    await wait(1000);
    for (let i = 0; i < lastCardObj.functs.length; i++) {
        // CF is an object with all functions. Access using string name of function
        description += await CF[lastCardObj.functs[i]](targetIndices, amount, state);
    }
    await wait(1000);
    await updateStatePromise((state:any)=>{
        state.uiData.phaseDesc = { text: description, color: "#2000a0" };

      });
    await wait(1000);

}

function wait (time:number) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve();
            }, time);
        } catch (err) {
            reject(err);
        }
    })
}