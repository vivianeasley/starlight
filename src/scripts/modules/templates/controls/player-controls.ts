import { html } from 'lighterhtml';
import { selectZoneView } from '../../data-methods/player-controls'

export const playerControls =  function playerControls (state:any) {
    const { selectedZone } = state.uiData;
    const { zones } = state.data;
    const { hand, damage, shields, wreckage, armor, deck } = zones;

    return html`
        <div class="control-area-wrapper">
            <div class="control-area-title">Your Cards:</div>
            <div
                class="${selectedZone === "hand" ? "control-area selected" : "control-area"}"
                onclick=${()=>{selectZoneView(state, "hand")}}
                tabindex="0"
                role="button"
                aria-pressed="false">Hand ${hand.length}</div>
            <div
                class="${selectedZone === "damage" ? "control-area selected" : "control-area"}"
                onclick=${()=>{selectZoneView(state, "damage")}}
                tabindex="1"
                role="button"
                aria-pressed="false">Damage ${damage.length}</div>
            <div
                class="${selectedZone === "wreckage" ? "control-area selected" : "control-area"}"
                onclick=${()=>{selectZoneView(state, "wreckage")}}
                tabindex="3"
                role="button"
                aria-pressed="false">Wreckage ${wreckage.length}</div>
            <div
                class="${selectedZone === "armor" ? "control-area selected" : "control-area"}"
                onclick=${()=>{selectZoneView(state, "armor")}}
                tabindex="4"
                role="button"
                aria-pressed="false">Armor ${armor.length}</div>
            <div
                class="${selectedZone === "deck" ? "control-area selected" : "control-area"}"
                onclick=${()=>{selectZoneView(state, "deck")}}
                tabindex="5"
                role="button"
                aria-pressed="false">Deck ${deck.length}</div>
        </div>
    `;
}


// <div
// class="${selectedZone === "shields" ? "control-area selected" : "control-area"}"
// onclick=${()=>{selectZoneView(state, "shields")}}
// tabindex="2"
// role="button"
// aria-pressed="false">Shields ${shields.length}</div>