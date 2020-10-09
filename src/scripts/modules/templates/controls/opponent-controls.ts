import { html } from 'lighterhtml';

export const opponentControls =  function opponentControls (state:any) {

    return html`
        <div class="control-area-wrapper disabled">
            <div class="control-area-title">Opponents Cards:</div>
            <div class="control-area">Hand 6</div>
            <div class="control-area">Damage 3</div>
            <!-- <div class="control-area">Shields 2</div> -->
            <div class="control-area">Wreckage 5</div>
            <div class="control-area">Armor 6</div>
            <div class="control-area">Deck 26</div>
        </div>
    `;
}