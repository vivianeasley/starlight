import { updateState } from "../state-management/immer-state"

export const selectZoneView = function selectZoneView (index:number, zone:string) {
    if (!zone) return;
    updateState((state:any)=>{
        state.uiData.selectedZone = zone;
    });
}