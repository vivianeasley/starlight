import { html } from 'lighterhtml';
import { selectCards, placeCard } from "../../data-methods/card-methods/track-methods"

export const trackCard = function trackCard (cardData:any, index:number, state:any, selectedZone:string) {
    // placing vs selecting
    const {
        selectableZones,
        placingCards,
        waiting,
        userID
    } = state.uiData;

    function selectableCard () {
        return html`
        <div class="${cardData.isSelected ? "card-wrapper selected" : "card-wrapper"}" onclick=${()=>{selectCards(index, state, selectedZone)}}>
            <img class="card-image" src="${"./images/cards/"+cardData.image}" alt="${"Card name "+ cardData.name}">
        </div>
        `
    }

    function placableCard () {
        return html`
        <div class="${ cardData.owner ===  userID ? "card-wrapper" : "card-wrapper flipped"}" onclick=${(e:any)=>{placeCard(index, state, selectedZone, e)}}>
            ${
                cardData.underDamage && cardData.underDamage.length > 0 ?
                html`
                    <img class="card-image" src="${"./images/cards/"+cardData.image}" alt="${"Card name "+ cardData.name}">
                    <div class="card-image-top-wrapper">
                        <img class="card-image" src="${"./images/cards/"+cardData.underDamage[0].image}" alt="${"Card name "+ cardData.underDamage[0].name}">
                    </div>
                `:
                html`<img class="card-image" src="${"./images/cards/"+cardData.image}" alt="${"Card name "+ cardData.name}">`
            }

        </div>
        `
    }

    return html`
        ${
            (placingCards === false || waiting === true || selectableZones.length > 0) ?
            selectableCard():
            placableCard()
        }
    `;
}