import { html } from 'lighterhtml';
import { placeCard } from "../../data-methods/card-methods/track-methods"
import { crewCard } from "./crew"

export const trackCard = function trackCard (cardData:any, index:number, state:any, selectedZone:string) {
    // placing vs selecting
    const {
        selectableZones,
        placingCards,
        waiting,
        userID
    } = state.uiData;

    return html`
    <div class="${ cardData.owner ===  userID ? "card-wrapper" : "card-wrapper flipped"}" onclick=${(e:any)=>{placeCard(index, state, selectedZone, e)}}>
        ${
            cardData.underDamage && cardData.underDamage.length > 0 ?
            html`
                ${crewCard(cardData)}
                <div class="card-image-top-wrapper">
                    <img class="card-image" src="${"./images/cards/"+cardData.underDamage[0].image}" alt="${"Card name "+ cardData.underDamage[0].name}">
                </div>
            `:
            html`${crewCard(cardData)}`
        }

    </div>
    `
}