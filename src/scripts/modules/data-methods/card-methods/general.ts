import { updateState, updateStateSend, updateStateSendPass } from "../../state-management/immer-state"

export const moveCardsZones = function moveCardsZones (fromZone:string, toZone:string, amount:number, fromTop:boolean) {

    updateState((state:any)=>{
        const tmpCardsArr = [];
        let amountToMove = state.data.zones[fromZone].length > amount ? amount : state.data.zones[fromZone].length;
        for (let index = 0; index < amountToMove; index++) {
            if (!state.data.zones[fromZone][index]) break;
            tmpCardsArr.push(state.data.zones[fromZone][index]);
        }
        if (fromTop) {
            state.data.zones[toZone] = [...state.data.zones[toZone], ...tmpCardsArr];
        } else {
            state.data.zones[toZone] = [...tmpCardsArr, ...state.data.zones[toZone]];
        }
        state.data.zones[fromZone].splice(0, amountToMove);

    });

}

export const gameSetUp = function gameSetUp () {
    updateStateSend((state:any)=>{
        // moveCards(state.data.zones.deck, state.data.zones.wreckage, state.data.zones.ship[0].armor, true);
        for (let index = 0; index < state.data.zones.ship[0].damage; index++) {
            const damageCard = getDamageCardData();
            damageCard.owner = state.uiData.userID;
            state.data.zones.damage.push(damageCard);
        }
        state.uiData.gameStarted = true;
        state.uiData.modals.matchmaking = false;
        state.data.zones.track = state.data.opponentZones.track;
        state.uiData.activePlayer = !state.uiData.activePlayer;
        moveCards(state.data.zones.deck, state.data.zones.hand, state.data.zones.ship[0].draw, true);
      });
}

export const updateOpponentsData = function updateOpponentsData (opponentsData:any) {
    updateState((state:any)=>{
        state.uiData.oppPassed = false;
        state.data.opponentZones = opponentsData;
        state.data.zones.track = state.data.opponentZones.track;
        state.uiData.activePlayer = !state.uiData.activePlayer;
      });
}

export const pass = function pass (state) {
    if (state.uiData.oppPassed === true) {
        alert("The round has ended. Resolution phase begins");
        // updateStateSendPass((state:any)=>{
        //     state.uiData.resolutionPhase = true;
        //   });
        return;
    }

    updateStateSendPass((state:any)=>{
        state.uiData.activePlayer = !state.uiData.activePlayer;
      });
}

export const opponentPassed = function opponentPassed () {
    updateState((state:any)=>{
        state.uiData.oppPassed = true;
        state.uiData.activePlayer = !state.uiData.activePlayer;
      });
}

function moveCards (fromArr:[], toArr:any, amount:number, fromTop:boolean) {
    let amountToMove = fromArr.length > amount ? amount : fromArr.length;
    for (let index = 0; index < amountToMove; index++) {
        if (!fromArr[index]) break;
        if (fromTop) {
            toArr.push(fromArr[index]);
        } else {
            toArr.unshift(fromArr[index])
        }

    }
    fromArr.splice(0, amountToMove);
}

function getDamageCardData () {
    return {
        id: "0-0",
        name: "Damage",
        image: "damage.jpg",
        type: "damage",
        typeAlign: undefined,
        typeJob: undefined,
        place: 0,
        rank: 4,
        rules: "Deal 1 damage to an opponents ship.",
        functs: ["damage"],
        locked: false,
        underDamage: false,
        owner: undefined,
    }
}