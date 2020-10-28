import { html } from 'lighterhtml';
import { selectZoneView } from '../../data-methods/player-controls'

export const opponentControls =  function opponentControls (state:any) {
    const { selectedZone } = state.uiData;
    const { opponentZones } = state.data;
    const { hand, damage, wreckage, armor, deck } = opponentZones;

    return html`
        <div class="opp-control-area-wrapper">
            <div class="opp-control-area-title">Opponents Cards:</div>
            <div
                class="${selectedZone === "opp-hand" ? "opp-control-area disabled selected" : "opp-control-area disabled"}"
                onclick=${()=>{selectZoneView(state, "opp-hand")}}
                tabindex="0"
                role="button"
                aria-pressed="false">Hand ${hand.length}</div>
            <div
                class="${selectedZone === "opp-damage" ? "opp-control-area selected" : "opp-control-area"}"
                onclick=${()=>{selectZoneView(state, "opp-damage")}}
                tabindex="1"
                role="button"
                aria-pressed="false">Damage ${damage.length}</div>
            <div
                class="${selectedZone === "opp-wreckage" ? "opp-control-area selected" : "opp-control-area"}"
                onclick=${()=>{selectZoneView(state, "opp-wreckage")}}
                tabindex="3"
                role="button"
                aria-pressed="false">Wreckage ${wreckage.length}</div>
            <div
                class="${selectedZone === "opp-deck" ? "opp-control-area disabled selected" : "opp-control-area disabled"}"
                onclick=${()=>{selectZoneView(state, "opp-deck")}}
                tabindex="5"
                role="button"
                aria-pressed="false">Deck ${deck.length}</div>
        </div>
    `;
}

// <div
// class="${selectedZone === "opp-armor" ? "opp-control-area disabled selected" : "opp-control-area disabled"}"
// onclick=${()=>{selectZoneView(state, "opp-armor")}}
// tabindex="4"
// role="button"
// aria-pressed="false">Armor ${armor.length}</div>

// <div class="opp-control-area-title">Opponents Cards:</div>
// <div class="opp-control-area disabled">Hand ${hand.length}</div>
// <div class="opp-control-area">Damage ${damage.length}</div>
// <div class="opp-control-area">Wreckage ${wreckage.length}</div>
// <div class="opp-control-area disabled">Armor ${armor.length}</div>
// <div class="opp-control-area disabled">Deck ${deck.length}</div>