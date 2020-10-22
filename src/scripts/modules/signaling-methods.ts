import { updateState } from "./state-management/immer-state"

export const getPlayers = async function getPlayers (name:string, id:string, deleteListing:boolean) {
    // if you provide no querys you get back a list of current players
    if (typeof name === "object") name = undefined;
    let query = (name || id) ? "?" : "";
    if (name) query = query+'name='+name;
    if (id) query = query+'&id='+id
    if (deleteListing) query = query+'&delete='+deleteListing
    console.log(query)
    const originUrl = location.origin;
    const response = await fetch(originUrl+"/connect"+query)
    const json = await response.json();
    console.log(json)
    updateState((state:any)=>{
        state.uiData.listings = json;
    });

}