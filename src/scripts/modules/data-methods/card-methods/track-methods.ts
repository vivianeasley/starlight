import { updateState, updateStateSend } from "../../state-management/immer-state"

export const selectCards = function selectCards (index:number, state:any, cardInZone:string) {
    const {
        numberOfCardsSelectable,
        selectableZones
    } = state.uiData;
    const { zones } = state.data

    if (numberOfCardsSelectable === 0 && zones[cardInZone][index].isSelected === false) return; // tell user they cannot choose more cards
    if (selectableZones.length === 0 || !selectableZones.includes(cardInZone)) return;

    updateState((state:any)=>{
        if (state.data.zones[cardInZone][index].isSelected === true) {
            state.uiData.numberOfCardsSelectable = state.uiData.numberOfCardsSelectable + 1;
            state.data.zones[cardInZone][index].isSelected = false;
        } else {
            state.uiData.numberOfCardsSelectable = state.uiData.numberOfCardsSelectable - 1;
            state.data.zones[cardInZone][index].isSelected = true;
        }

    });
}

export const placeCard = function placeCard (index:number, state:any, cardInZone:string, event:any, isNotClickable:boolean) {
    console.log(isNotClickable)
    if (isNotClickable) return;
    const {
        selectableZones,
        placingCards,
        waiting,
        activePlayer
    } = state.uiData;
    if (!activePlayer) return;

    const { zones } = state.data;
    const { placingTrack } = zones;


    if (placingTrack.length > 1) {
        alert("You may only place 1 card from your hand and 1 damage card on top of it");
        return;
    }

    if (placingTrack.length === 1 && state.data.zones.placingTrack[0].type !== "damage" && state.data.zones[cardInZone][index].type !== "damage") {
        alert("Only 1 damage card and one card from your hand allowed.");
        return;
    }

    if (placingTrack.length === 1 && state.data.zones.placingTrack[0].type  === "damage" && state.data.zones[cardInZone][index].type === "damage") {
        alert("Only 1 damage card and one card from your hand allowed.");
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
    updateStateSend((state:any)=>{
        if (state.data.zones.placingTrack.length > 1) {
            let damageIndex = state.data.zones.placingTrack[0].type === "damage" ? 0 : 1;
            let cardIndex = state.data.zones.placingTrack[1].type === "damage" ? 0 : 1;

            console.log(cardIndex, damageIndex)

            state.data.zones.placingTrack[cardIndex].underDamage.push(state.data.zones.placingTrack[damageIndex]);
            state.data.zones.placingTrack.splice(damageIndex, 1);

            state.data.zones.track.push(state.data.zones.placingTrack[cardIndex]);
            state.data.zones.placingTrack.splice(cardIndex, 1);
            state.uiData.activePlayer = !state.uiData.activePlayer;
            return;
        }
        state.data.zones.track.push(state.data.zones.placingTrack[0]);
        state.data.zones.placingTrack.splice(0, 1);
        state.uiData.activePlayer = !state.uiData.activePlayer;

    });
}