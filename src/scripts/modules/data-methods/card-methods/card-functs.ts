import { updateStatePromise } from "../../state-management/immer-state"

export async function targetThisCard (targetIndices:number[], amount:number[], state:any) {
    targetIndices.push(state.data.zones.track.length - 1);
    return "last card on track targeted. ";
}

export async function trackToHand (targetIndices:number[], amount:number[], state:any) {
    let text = "";
    // default to previous card on track
    if (targetIndices.length === 0) {
        text += "Targeted previous card on track. "
        targetIndices.push(state.data.zones.track.length - 2);
    }

    text += "Moved card(s) from the track to its owner's hand."
    await updateStatePromise((state:any)=>{
        moveCardsFunct("track", "hand", targetIndices, state);
    });
    return text;
}

export async function wreckageToHand (targetIndices:number[], amount:number[], state:any) {
    if (state.data.zones.wreckage.length === 0) return "No targets in wreckage pile."

    let text = "";
    // default to top card of wreckage pile
    if (targetIndices.length === 0) {
        text += "Targeted previous card on track. "
        targetIndices.push(state.data.zones.wreckage.length - 1);
    }

    text += "Moved card(s) from the track to its owner's hand."
    await updateStatePromise((state:any)=>{
        moveCardsFunct("wreckage", "hand", targetIndices, state);
    });
    return text;
}

export async function deckToHand (targetIndices:number[], amount:number[], state:any) {
    if (state.data.zones.deck.length === 0) return "No targets in deck pile." // TODO: initiate game loss

    let text = "";
    if (targetIndices.length === 0) {
        text += "Amount set to one. "
        targetIndices.push(state.data.zones.deck.length - 1);
    }

    text += "Moved card(s) from the deck to its owner's hand."
    await updateStatePromise((state:any)=>{
        moveCardsFunct("deck", "hand", targetIndices, state);
    });
    return text;
}

export async function amountTwo (targetIndices:number[], amount:number[], state:any) {
    amount.push(2)
    return "Amount set to two.";
}

export async function damage (targetIndices:number[], amount:number[], state:any) {
    // if card owned by opponent damage you
    // if card owned by you damage opponent

    if (amount.length === 0) amount.push(1);

    await updateStatePromise((state:any)=>{
        state.uiData.phaseDamage += amount[0];
    });

    return "Damage added!";
}


function moveCardsFunct (fromArrName:string, toArrName:string, indices:number[], state:any) {
    console.log("moveCardsFunct", fromArrName, toArrName, indices, state)
    const indexSkipArr = [];
    const tmpArr = [];

    // if card is owned by opponent it goes to opponents zone

    for (let i = 0; i < indices.length; i++) {
        if (state.data.zones[fromArrName][indices[i]]) {
            const underDamageLength = state.data.zones[fromArrName][indices[i]].underDamage.length;
            if (fromArrName === "track" && underDamageLength > 0) {
                indexSkipArr.push(indices[i]);
                state.data.zones.damage.push(state.data.zones[fromArrName][indices[i]].underDamage[underDamageLength - 1])
            } else {
                tmpArr.push(state.data.zones[fromArrName][indices[i]]);
            }

        }
    }
    state.data.zones[toArrName] = [...state.data.zones[toArrName], ...tmpArr];

    let numberSkipped = 0;
    indices.sort(function(a, b){
        return a - b;
    });
    for(var i = 0; i < indices.length; i++){
        if (indexSkipArr.length > 0 && !indexSkipArr.includes(indices[i])) {
            let index = indices[i] - numberSkipped;
            console.log(state.data.zones[fromArrName])
            console.log("indices", indices)
            console.log("index", index)
            console.log("numberSkipped", numberSkipped)
            state.data.zones[fromArrName].splice(index, 1);
            numberSkipped++
        } else {
            state.data.zones[fromArrName].splice(indices[i], 1);
        }
    }

}



// deckToHand

// function getTwoCards () {
//     return [
//         {
//             rules: "Send the previous card on the track to its owner's wreckage pile.",
//             functs: ["trackToWreckage"]
//         },
//         {
//             rules: "Deal 2 damage to your opponents ship.",
//             functs: ["amountTwo", "damage"]
//         },
//         {
//             rules: "Draw a card.",
//             functs: ["deckToHand"]
//         },
//     ]
// }

// function getOneCards () {
//     return [
//         {
//             rules: "Return this card to it's owner's hand.",
//             functs: ["targetThisCard", "trackToHand"]
//         },
//         {
//             rules: "Return the previous card on the track to its owner's hand.",
//             functs: ["trackToHand"]
//         },
//         {
//             rules: "Return the top card of your wreckage pile to your hand.",
//             functs: ["wreckageToHand"]
//         },
//     ]
// }