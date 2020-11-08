import { updateStatePromise } from "../state-management/immer-state"
import { getSelectedIndices } from "./card-methods/general"
import { wait } from "./resolution-phase"
import {
    getDrawTopIndices,
    deckToHand,
    moveCardsFunct
} from "./card-methods/card-functs"

export async function damageDrawPhase (state:any) {
    const totalDraw = state.data.zones.ship.draw + state.uiData.phaseDamage;
    const drawIndices = getDrawTopIndices(totalDraw, state);
    console.log("drawIndices", drawIndices) // <-------------- not drawing cards for some reason to tmpZone
    if (state.uiData.phaseDamage === 0) {
        await deckToHand(drawIndices, [], state);
        endDamageDrawPhase();
    } else {
        await updateStatePromise((state:any)=>{
            state.uiData.maxCardsSelectable = state.uiData.phaseDamage;
            state.uiData.minCardsSelectable = state.uiData.phaseDamage;
            state.uiData.modals.selection = true;
            moveCardsFunct("deck", "tmpZone", drawIndices, false, state);
        });
    }
}

export async function manageSelectedCards (state:any) {
    if (state.uiData.phase !== 3) {
        await updateStatePromise((state:any)=>{
            state.uiData.modals.selection = false;
            state.uiData.phase = 3;
        });
    }

    if (state.uiData.requireDataFromOpponent) {
        setTimeout(() => {
            manageSelectedCards(state);
        }, 4000);
        return;
    }

    await wait(1000)
    const indices = getSelectedIndices(state.data.tmpZone);

    await updateStatePromise((state:any)=>{
        moveCardsFunct("tmpZone", "hand", indices.unselected, false, state);
        moveCardsFunct("tmpZone", "wreckage", indices.selected, false, state);
    });

    await wait(1000)

    endDamageDrawPhase();
}

function endDamageDrawPhase () {
    console.log("damage phase has ended")
}
