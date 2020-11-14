import { updateStatePromise } from "../../state-management/immer-state"

export async function targetThisCard (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    targetIndices.push(state.data.zones.track.length - 1);
    return "last card on track targeted. ";
}

export async function trackToHand (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    let text = "";
    // default to previous card on track
    if (targetIndices.length === 0) {
        text += "Targeted previous card on track. "
        targetIndices.push(state.data.zones.track.length - 2);
    }

    text += "Moved card(s) from the track to its owner's hand. "

    await updateStatePromise((state:any)=>{
        moveCardsFunct("track", "hand", targetIndices, false, state);
    });
    return text;
}

export async function wreckageToHand (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    if (state.data.zones.wreckage.length === 0) return "No targets in wreckage pile. "

    let text = "";
    // default to top card of wreckage pile
    if (targetIndices.length === 0) {
        text += "Targeted previous card on track. "
        targetIndices.push(state.data.zones.wreckage.length - 1);
    }

    text += "Moved card(s) from the track to its owner's hand. "
    await updateStatePromise((state:any)=>{
        moveCardsFunct("wreckage", "hand", targetIndices, false, state);
    });
    return text;
}

export async function deckToHand (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    if (state.data.zones.deck.length === 0) return "No targets in deck pile. " // TODO: initiate game loss

    let text = "";
    if (targetIndices.length === 0) {
        text += "Amount set to one. "
        targetIndices.push(state.data.zones.deck.length - 1);
    }

    text += "Moved card(s) from the deck to its owner's hand. "
    await updateStatePromise((state:any)=>{
        moveCardsFunct("deck", "hand", targetIndices, false, state);
    });
    return text;
}

export async function amountTwo (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    amount.push(2)
    return "Amount set to two. ";
}

export async function removeSelf (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    await updateStatePromise((state:any)=>{
        moveCardsFunct("track", "deck", [state.data.zones.track.length - 1], true, state);
    });
    return "";
}

export async function wreckageToBottomDeck (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    if (state.data.zones.wreckage.length === 0) return "No cards in wreckage to target. "

    await updateStatePromise((state:any)=>{
        moveCardsFunct("wreckage", "deck", [state.data.zones.wreckage.length - 1], true, state);
    });
    return "Moved top of wreckage pile to bottom of deck. ";
}

export async function damage (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    if (amount.length === 0) amount.push(1);

    await updateStatePromise((state:any)=>{
        if (isOwner) {
            state.uiData.opponentPhaseDamage += amount[0];
        } else {
            state.uiData.phaseDamage += amount[0];
        }

    });

    return "Damage added!";
}

export async function doubleOpponentDamage (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {
    let target;
    if (isOwner) {
        target = "opponentPhaseDamage";
    } else {
        target = "phaseDamage";
    }

    if (state.uiData[target] === 0) return;

    await updateStatePromise((state:any)=>{
        state.uiData[target] = state.uiData[target] * 2;
    });

    return "Current ship damage doubled!";
}

export async function dealAllTrackDamageAsOne (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {

    for (let i = 0; i < state.data.zones.track.length; i++) {
        if (state.data.zones.track[i].underDamage.length > 0) {
            if (state.data.zones.track[i].underDamage[0].ownerID === state.uiData.userID) {
                damage([], [1], true, state)

            } else {
                damage([], [1], false, state)
            }
        }
    }

    return "All track damage dealt to ships. ";
}

export async function removeAllTrackDamage (targetIndices:number[], amount:number[], isOwner:boolean, state:any) {

    await updateStatePromise((state:any)=>{
        for (let i = 0; i < state.data.zones.track.length; i++) {
            state.data.zones.track[i].underDamage = [];
        }
    });

    return "All track damage removed!";
}

export function moveCardsFunct (fromArrName:string, toArrName:string, indices:number[], prepend:boolean, state:any) {
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
                return;
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

export function getDrawTopIndices (drawNum:number, state:any) {
    const tmpArr =  [];
    const deck = state.data.zones.deck;
    const deckLength = deck.length;
    for (let i = 0; i < drawNum; i++) {
        if (deck[deckLength - (i + 1)]) {
            tmpArr.push(deckLength - (i + 1))
        }
    }

    return tmpArr;
}