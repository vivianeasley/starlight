import { html } from 'lighterhtml';
import { trackCard } from "../card/track";
import { trackPlacementCard } from "../card/track-placement";
import { submitCards } from "../../data-methods/card-methods/track-methods";
import { pass } from "../../data-methods/card-methods/general";

export const zoneTrackArea =  function zoneTrackArea (state:any) {
    const { data, uiData } = state;
    const { playerId, activePlayer } = uiData;
    const { zones } = data;
    const { track, placingTrack } = zones;

    return html`
        <div class="track-area-wrapper">
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