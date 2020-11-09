import { html } from 'lighterhtml';
import { crewCard } from "../card/crew"
import { selectTmpZoneCards } from "../../data-methods/card-methods/track-methods"
import { countSelected } from "../../data-methods/card-methods/general"
import { manageSelectedCards } from "../../data-methods/damage-draw-phase"

export const selectionModal =  function selectionModal (state:any) {
    const { uiData, data } = state;
    const { modals, maxCardsSelectable, minCardsSelectable } = uiData;
    const { tmpZone } = data.zones;
    const numSelected = countSelected(state.data.zones.tmpZone);

    function amountCardsSelectString () {
        if (maxCardsSelectable === minCardsSelectable) {
            return `${maxCardsSelectable} card${maxCardsSelectable > 1 ? "s" : ""}`
        } else {
            return `between ${minCardsSelectable} and ${maxCardsSelectable} cards`
        }
    }

    return html`
        <div class="${modals.selection ? "modal active" : "modal"}" id="modal-id">
        <a href="#close" class="modal-overlay" aria-label="Close"></a>
        <div class="modal-container">
            <div class="modal-header">
                <h2>Select ${amountCardsSelectString()} to discard for damage:</h2>
            </div>
            <div class="modal-body">
                <div class="content">
                    <div>
                        ${
                            tmpZone.map((data:any, i:number) => html`
                                <div class="${data.isSelected ? "modal-card-wrapper selected" : "modal-card-wrapper"}" onclick=${()=>{selectTmpZoneCards(i, state)}}>
                                    ${crewCard(data, false, true)}
                                </div>
                            `)
                        }
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <div>
                    <button disabled=${ (numSelected < minCardsSelectable) } onclick=${()=>{manageSelectedCards()}}>Submit</button>
                </div>
            </div>
        </div>
        </div>
    `;
}