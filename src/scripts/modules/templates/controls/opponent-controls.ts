import { html } from 'lighterhtml';

export const opponentControls =  function opponentControls (state:any) {
    const { selectedZone } = state.uiData;
    const { opponentZones } = state.data;
    const { hand, damage, wreckage, armor, deck } = opponentZones;

    return html`
        <div class="control-area-wrapper disabled">
            <div class="control-area-title">Opponents Cards:</div>
            <div class="control-area">Hand ${hand.length}</div>
            <div class="control-area">Damage ${damage.length}</div>
            <div class="control-area">Wreckage ${wreckage.length}</div>
            <div class="control-area">Armor ${armor.length}</div>
            <div class="control-area">Deck ${deck.length}</div>
        </div>
    `;
}