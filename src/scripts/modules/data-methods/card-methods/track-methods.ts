import { updateState, updateStateSend } from "../../state-management/immer-state"
import { countSelected } from "./general"

export const selectTmpZoneCards = function selectTmpZoneCards (index:number, state:any) {
    const { maxCardsSelectable } = state.uiData;
    const numSelectedCards = countSelected(state.data.zones.tmpZone);

    if (state.data.zones.tmpZone[index].isSelected === false && numSelectedCards === maxCardsSelectable) {
        console.log("You can't selected anymore cards");
        return;
    }

    updateState((state:any)=>{
        state.data.zones.tmpZone[index].isSelected = !state.data.zones.tmpZone[index].isSelected;
    });
}

export const placeCard = function placeCard (index:number, state:any, cardInZone:string, event:any, isNotClickable:boolean) {

    if (isNotClickable) return;
    const { activePlayer } = state.uiData;
    if (!activePlayer) return;

    const { zones } = state.data;
    const { placingTrack } = zones;


    if (placingTrack.length > 1) {
        updateState((state:any)=>{
            state.uiData.phaseDesc = { text: "You may only place 1 card from your hand and 1 damage card on top of it", color: "#d06100" };
        });
        return;
    }

    if (placingTrack.length === 1 && state.data.zones.placingTrack[0].type !== "damage" && state.data.zones[cardInZone][index].type !== "damage") {
        updateState((state:any)=>{
            state.uiData.phaseDesc = { text: "Only 1 damage card and one card from your hand allowed.", color: "#d06100" };
        });
        return;
    }

    if (placingTrack.length === 1 && state.data.zones.placingTrack[0].type  === "damage" && state.data.zones[cardInZone][index].type === "damage") {
        updateState((state:any)=>{
            state.uiData.phaseDesc = { text: "Only 1 damage card and one card from your hand allowed.", color: "#d06100" };
        });
        return;
    }

    updateState((state:any)=>{
        state.data.zones.placingTrack.push(state.data.zones[cardInZone][index]);
        state.data.zones[cardInZone].splice(index, 1);

    });
}

export const unplaceCard = function unplaceCard (index:number) {

    updateState((state:any)=>{
        if (state.data.zones.placingTrack[index].type === "damage") {
            state.data.zones.damage.push(state.data.zones.placingTrack[index]);
            state.data.zones.placingTrack.splice(index, 1);
            state.uiData.selectedZone = "damage";
        } else {
            state.data.zones.hand.push(state.data.zones.placingTrack[index]);
            state.data.zones.placingTrack.splice(index, 1);
            state.uiData.selectedZone = "hand";
        }


    });
}

export const submitCards = function submitCards () {
    console.log("submitCards requireDataFromOpponent")
    updateStateSend((state:any)=>{
        state.uiData.requireDataFromOpponent = true;
        if (state.data.zones.placingTrack.length > 1) {
            let damageIndex = state.data.zones.placingTrack[0].type === "damage" ? 0 : 1;
            let cardIndex = state.data.zones.placingTrack[1].type === "damage" ? 0 : 1;

            state.data.zones.placingTrack[cardIndex].underDamage.push(state.data.zones.placingTrack[damageIndex]);
            state.data.zones.placingTrack.splice(damageIndex, 1);

            state.data.zones.track.push(state.data.zones.placingTrack[cardIndex]);
            state.data.zones.placingTrack.splice(cardIndex, 1);
            state.uiData.activePlayer = !state.uiData.activePlayer;
            return;
        }
        state.uiData.phaseDesc = { text: "", color: "#d06100" };
        state.uiData.youPassed = false;
        state.data.zones.track.push(state.data.zones.placingTrack[0]);
        state.data.zones.placingTrack.splice(0, 1);
        state.uiData.activePlayer = !state.uiData.activePlayer;

    });
}