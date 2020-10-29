import { html } from 'lighterhtml';
import { trackCard } from "../card/track";
import { trackPlacementCard } from "../card/track-placement";
import { submitCards } from "../../data-methods/card-methods/track-methods";
import { pass } from "../../data-methods/card-methods/general";
import { shipCard } from "../card/ship"

export const zoneTrackArea =  function zoneTrackArea (state:any) {
    const { data, uiData } = state;
    const { activePlayer } = uiData;
    const { zones } = data;
    const { track, placingTrack } = zones;

    return html`
        <div class="track-area-wrapper">
            ${shipCard(state)}
            ${
                state.data.zones.armor.length > 0 ?
                html`
                    <div class="track-card-wrapper">
                    <div class="space-num">0</div>
                        <div class="sc-wrapper-border">
                            <div class="sc-wrapper">
                                <img class="sc-image" src="./images/cards/card-backs.jpg" alt="">
                            </div>
                        </div>
                        <div class="armor-value">Armor Pile: ${state.data.zones.armor.length} cards</div>
                    </div>
                `:
                ``
            }
            ${
                track.map((data:any, i:number) => html`
                    <div class="track-card-wrapper">
                        <div class="space-num">${i+1}</div>
                        ${trackCard(data, i, state, "track")}
                    </div>
                `)
            }
            ${
                activePlayer?
                html`
                    <div class="track-card-wrapper">
                        <div class="track-card-placement-zone">
                        <div class="space-num">${track.length + 1}</div>
                            ${
                                placingTrack.map((data:any, i:number) => html`
                                    <div class="track-card-placement-wrapper">
                                        ${trackPlacementCard(data, i, state, "track")}
                                    </div>
                                `)
                            }
                        </div>
                        ${submitPassButton()}
                    </div>
                `:
                ``
            }

        </div>
    `;

    function submitPassButton () {
        if (placingTrack.length === 0) return html`<button class="track-card-placement-button" onclick=${()=>{pass(state)}}>Pass</button>`
        return html`<button class="track-card-placement-button" onclick=${submitCards}>Submit</button>`

    }
}

//                    Place card here ${state.data.zones.track.length}