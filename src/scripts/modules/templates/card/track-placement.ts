import { html } from 'lighterhtml';
import { unplaceCard } from "../../data-methods/card-methods/track-methods"

export const trackPlacementCard = function trackPlacementCard (cardData:any, index:number, state:any, selectedZone:string) {

    return html`
        <div class="card-wrapper" onclick=${()=>{unplaceCard(index)}}>
            <img class="card-image" src="${"./images/cards/"+cardData.image}" alt="${"Card name "+ cardData.name}">
        </div>
    `;
}