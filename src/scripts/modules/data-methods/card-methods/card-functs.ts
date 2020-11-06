import { updateStatePromise } from "../../state-management/immer-state"

export async function targetThisCard (targetIndices:number[], amount:number[], cardData:any, state:any) {
    targetIndices.push(state.data.zones.track.length - 1);
    return "last card on track targeted. ";
}

export async function trackToHand (targetIndices:number[], amount:number[], cardData:any, state:any) {
    let text = "";
    // default to previous card on track
    if (targetIndices.length === 0) {
        text += "Targeted previous card on track. "
        targetIndices.push(state.data.zones.track.length - 2);
    }

    text += "Moved card(s) from the track to its owner's hand."

    await updateStatePromise((state:any)=>{
        moveCardsFunct("track", "hand", targetIndices, false, state);
    });
    return text;
}

export async function wreckageToHand (targetIndices:number[], amount:number[], cardData:any, state:any) {
    if (state.data.zones.wreckage.length === 0) return "No targets in wreckage pile."

    let text = "";
    // default to top card of wreckage pile
    if (targetIndices.length === 0) {
        text += "Targeted previous card on track. "
        targetIndices.push(state.data.zones.wreckage.length - 1);
    }

    text += "Moved card(s) from the track to its owner's hand."
    await updateStatePromise((state:any)=>{
        moveCardsFunct("wreckage", "hand", targetIndices, false, state);
    });
    return text;
}

export async function deckToHand (targetIndices:number[], amount:number[], cardData:any, state:any) {
    if (state.data.zones.deck.length === 0) return "No targets in deck pile." // TODO: initiate game loss

    let text = "";
    if (targetIndices.length === 0) {
        text += "Amount set to one. "
        targetIndices.push(state.data.zones.deck.length - 1);
    }

    text += "Moved card(s) from the deck to its owner's hand."
    await updateStatePromise((state:any)=>{
        moveCardsFunct("deck", "hand", targetIndices, false, state);
    });
    return text;
}

export async function amountTwo (targetIndices:number[], amount:number[], cardData:any, state:any) {
    amount.push(2)
    return "Amount set to two.";
}

export async function damage (targetIndices:number[], amount:number[], cardData:any, state:any) {

    if (amount.length === 0) amount.push(1);

    await updateStatePromise((state:any)=>{
        if (state.data.zones.track[state.data.zones.track.length - 1].ownerID === state.uiData.userID) {
            state.uiData.opponentPhaseDamage += amount[0];
        } else {
            state.uiData.phaseDamage += amount[0];
        }

    });

    return "Damage added!";
}


function moveCardsFunct (fromArrName:string, toArrName:string, indices:number[], prepend:boolean, state:any) {
    indices.sort(function(a, b){
        return a - b;
    });

    const indexSkipArr = [];

    for (let i = 0; i < indices.length; i++) {
        const cardArrInFromArr = state.data.zones[fromArrName][indices[i]];
        if (cardArrInFromArr) {
            const underDamageLength = cardArrInFromArr.underDamage.length;
            let playerZone;

            if (fromArrName === "track" && underDamageLength > 0) {
                const damageCard = cardArrInFromArr.underDamage[underDamageLength - 1];
                playerZone = (state.uiData.userID === damageCard.ownerID) ? "zones" : "opponentZones";
                indexSkipArr.push(indices[i]);
                state.data[playerZone].damage.push(damageCard)
                cardArrInFromArr.underDamage = [];
            } else {
                // TODO: manage push to bottom
                playerZone = (state.uiData.userID === cardArrInFromArr.ownerID) ? "zones" : "opponentZones";
                if (prepend) {
                    state.data[playerZone][toArrName].unshift(cardArrInFromArr);
                } else {
                    state.data[playerZone][toArrName].push(cardArrInFromArr);
                }
            }

        }

    }

    let numberSkipped = 0;

    for(var i = 0; i < indices.length; i++){
        if (indexSkipArr.length > 0 && !indexSkipArr.includes(indices[i])) {
            let index = indices[i] - numberSkipped;
            state.data.zones[fromArrName].splice(index, 1);
            numberSkipped++
        } else {
            state.data.zones[fromArrName].splice(indices[i], 1);
        }
    }
}