import { updateState, updateStatePromise, updateStateSend, getCurrentState } from "../state-management/immer-state"
import { wait } from "./resolution-phase"
import {
    getDrawTopIndices,
    deckToHand,
    moveCardsFunct
} from "./card-methods/card-functs"

export async function damageDrawPhase (state:any) {
    const totalDraw = state.data.zones.ship[0].draw + state.uiData.phaseDamage;
    const drawIndices = getDrawTopIndices(totalDraw, state);
    if (state.uiData.phaseDamage === 0) {
        await deckToHand(drawIndices, [], state);
        await wait(1000);
        manageSelectedCards();
    } else {
        await updateStatePromise((state:any)=>{
            state.uiData.maxCardsSelectable = state.uiData.phaseDamage;
            state.uiData.minCardsSelectable = state.uiData.phaseDamage;
            state.uiData.modals.selection = true;
            moveCardsFunct("deck", "tmpZone", drawIndices, false, state);
        });
    }
}

export async function manageSelectedCards () {
    const currentState = getCurrentState();
    if (currentState.data.zones.tmpZone.length > 0) {
        await updateStatePromise((state:any)=>{
            for (let i = 0; i < state.data.zones.tmpZone.length; i++) {
                if (state.data.zones.tmpZone[i].isSelected === true) {
                    state.data.zones.tmpZone[i].isSelected = false;
                    state.data.zones.wreckage.push(state.data.zones.tmpZone[i]);
                } else {
                    state.data.zones.hand.push(state.data.zones.tmpZone[i]);
                }
            }
            state.data.zones.tmpZone = [];
            state.uiData.modals.selection = false;
        });
        await wait(1000)
    }


    if (currentState.uiData.phase !== 3) {
        updateStateSend((state:any)=>{
            // need to set spinner here
            state.uiData.phase = 3;
        });
        await wait(1000)
    }

    if (currentState.uiData.requireDataFromOpponent) {
        setTimeout(() => {
            manageSelectedCards();
        }, 2000);
        return;
    }
    await wait(1000)

    endDamageDrawPhase();
}

function endDamageDrawPhase () {
    updateState((state:any)=>{
        // need to remove spinner here
        state.uiData.selectedZone = "hand";
        state.uiData.round++;
        state.uiData.phaseDamage = 0;
        state.uiData.opponentPhaseDamage = 0;
        state.uiData.phaseDesc = { text: "Starting round "+state.uiData.round, color: "#3481c3" };
        state.uiData.oppPassed = false;
        state.uiData.youPassed = false;
        state.uiData.phase = 1;
        state.uiData.trackResolving = false;
        if ((state.uiData.round % 2) === 0) {
            if (state.uiData.startingPlayer) {
                state.uiData.activePlayer = true;
            } else {
                state.uiData.activePlayer = false;
            }
        } else {
            if (state.uiData.startingPlayer) {
                state.uiData.activePlayer = false;
            } else {
                state.uiData.activePlayer = true;
            }
        }
      });
}

// gameStarted: false,
// round: 0,
// playerId: 2,
// selectedZone: "hand",
// activePlayer: true,
// phaseDamage: 0,
// opponentPhaseDamage: 0,
// phaseDesc: { text: "", color: "transparent" },
// // 3 player states
// eventsDisabledZones: ["wreckage", "deck", "ship", "armor", "track"],
// faceDownZones: ["deck", "armor"],
// placingCards: true,
// waiting: false,
// oppPassed: false,
// youPassed: false,

// phase: 1,
// requireDataFromOpponent: true,

// minCardsSelectable: 4,
// maxCardsSelectable: 4,

// trackResolving: false,
// startingPlayer: true,
// eventsDisabled: false,

// // matchmaking
// gameID: undefined,
// userID: undefined,
// userName: undefined,
// listings: [],
// peerObj: undefined,
// connection: undefined,
// opponentInfo: undefined,