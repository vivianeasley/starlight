import { updateStatePromise, getCurrentState } from "../state-management/immer-state"
import * as CF from "./card-methods/card-functs"
import { damageDrawPhase } from "./damage-draw-phase"

export const beginResolution = async function beginResolution (state:any) {
    const trackLength = state.data.zones.track.length;
    const totalTrackLength = state.data.zones.wreckage.length + state.data.opponentZones.wreckage.length + trackLength;
    if (trackLength === 0) {
        damageDrawPhase(state);
        return;
    }
    const lastCardObj = state.data.zones.track[trackLength - 1];

    let description = "";
    let targetIndices = [];
    let amount = [1];

    // Manage damage cards that are covering cards on the track.
    let tmpDamageArr = [];
    let playerZone;

    if (lastCardObj.underDamage.length > 0) {
        const underDamageLength = lastCardObj.underDamage.length;
        const damageCard = lastCardObj.underDamage[underDamageLength - 1];
        playerZone = (state.uiData.userID === damageCard.ownerID) ? "zones" : "opponentZones";
        // loop through resolving damage and sending damage card back to damage zone

        let index = lastCardObj.underDamage.length - 1;
        for (let k = 0; k < lastCardObj.underDamage[index].functs.length; k++) {
            description += await CF[lastCardObj.underDamage[index].functs[k]](targetIndices, amount, state);
        }
        tmpDamageArr.push(lastCardObj.underDamage[index]);
        await wait(1000);

        await updateStatePromise((state:any)=>{
            state.data[playerZone].damage = [...state.data[playerZone].damage , ...tmpDamageArr];
            state.data.zones.track[trackLength - 1].underDamage = [];
        });
    }

    targetIndices = [];
    amount = [1];
    await wait(1000);

    if (lastCardObj.place <= totalTrackLength) {
        await updateStatePromise((state:any)=>{
            state.uiData.phaseDesc = { text: "Resolving ", color: "#2000a0" };
          });
        await wait(1000);
        for (let i = 0; i < lastCardObj.functs.length; i++) {
            // CF is an object with all functions. Access using string name of function
            description += await CF[lastCardObj.functs[i]](targetIndices, amount, state);
        }
    } else {
        await updateStatePromise((state:any)=>{
            state.uiData.phaseDesc = { text: "Card discarded due to being in invalid position. ", color: "#2000a0" };
        });
        await wait(2000);
    }


    await wait(1000);

    await updateStatePromise((state:any)=>{
        if (trackLength === state.data.zones.track.length) {
            state.data.zones.deck.unshift(state.data.zones.track[state.data.zones.track.length - 1]);
            state.data.zones.track.pop();
        }
        state.uiData.phaseDesc = { text: description, color: "#2000a0" };
    });

    await wait(1000);
    const currentState = getCurrentState();
    beginResolution(currentState)
}

export function wait (time:number) {
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