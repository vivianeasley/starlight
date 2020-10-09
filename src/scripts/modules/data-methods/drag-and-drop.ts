// import { updateState } from "../state-management/immer-state"

export const dragStart = function dragStart(event) {
    // console.log(event.target)
    event.dataTransfer.setData("text/plain", event.target.dataset.id);
    event.dataTransfer.dropEffect = "move";
    // console.log("started")
}

export const dragEnd = function dragEnd(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text/plain");
    if (!cardId) return;
    const cardIdArr = cardId.split("--");
    const pileId = event.target.dataset.name;
    console.log(pileId, cardIdArr)
    // updateState((state:any)=>{
    //     if (pileId === "battlefield") {
    //         state.data.zones[cardIdArr[0]][cardIdArr[1]].isTapped = true;
    //     } else {
    //         state.data.zones[cardIdArr[0]][cardIdArr[1]].isTapped = false;
    //     }
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].isAttacking = false;
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].isBlocked = false;
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].isPermanent = true;
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].counters = 0;
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].buffs = 0;
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].buffsPerm = 0;
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].markers = [];
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].cantAttack = false;
    //     state.data.zones[cardIdArr[0]][cardIdArr[1]].cantUntap = false;

    //     state.data.zones[pileId].push(state.data.zones[cardIdArr[0]][cardIdArr[1]]);
    //     state.data.zones[cardIdArr[0]].splice(cardIdArr[1], 1);
    // });

}