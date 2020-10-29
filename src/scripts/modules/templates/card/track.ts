import { html } from 'lighterhtml';
import { placeCard } from "../../data-methods/card-methods/track-methods"
import { crewCard } from "./crew"

export const trackCard = function trackCard (cardData:any, index:number, state:any, selectedZone:string) {
    // placing vs selecting
    const {
        eventsDisabledZones,
        faceDownZones,
        userID
    } = state.uiData;

    const isFaceDown = faceDownZones.includes(selectedZone);
    const isNotClickable = eventsDisabledZones.includes(selectedZone);
    const ownedByPlayer = cardData.owner ===  userID;

    return html`
    <div class="${getCardWrapperClass()}" onclick=${(e:any)=>{placeCard(index, state, selectedZone, e, isNotClickable)}}>
        ${
            cardData.underDamage && cardData.underDamage.length > 0 ?
            html`
                ${crewCard(cardData, isFaceDown, ownedByPlayer)}
                <div class="${ownedByPlayer ? "card-image-top-wrapper transparent": "card-image-top-wrapper"}">
                    <img class="card-image" src="${"./images/cards/"+cardData.underDamage[0].image}" alt="${"Card name "+ cardData.underDamage[0].name}">
                </div>
            `:
            html`${crewCard(cardData, isFaceDown, ownedByPlayer)}`
        }

    </div>
    `

    function getCardWrapperClass () {
        if (selectedZone === "armor") return "card-wrapper-armor";
        let classes = "card-wrapper";
        if (!ownedByPlayer) classes += " flipped";
        return classes;

    }
}