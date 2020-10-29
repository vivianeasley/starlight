import { html } from 'lighterhtml';
import { unplaceCard } from "../../data-methods/card-methods/track-methods"
import { crewCard } from "./crew"

export const trackPlacementCard = function trackPlacementCard (cardData:any, index:number, state:any, selectedZone:string) {

    return html`
        <div class="card-wrapper" onclick=${()=>{unplaceCard(index)}}>
            ${crewCard(cardData, false, true)}
        </div>
    `;
}