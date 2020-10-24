import { html } from 'lighterhtml';
import { trackCard } from "../card/track";
import { trackPlacementCard } from "../card/track-placement"
import { submitCards } from "../../data-methods/card-methods/track-methods"

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
                        ${trackCard(data, i, state, "track")}
                        <div class="track-position-count">${i}</div>
                    </div>
                `)
            }
            ${
                activePlayer?
                html`
                    <div class="track-card-wrapper">
                        <div class="track-card-placement-zone">
                            ${
                                placingTrack.map((data:any, i:number) => html`
                                    <div class="track-card-placement-wrapper">
                                        ${trackPlacementCard(data, i, state, "track")}
                                    </div>
                                `)
                            }
                        </div>
                        <button onclick=${submitCards}>${placingTrack.length === 0 ? "Pass" : "Submit"}</button>
                    </div>
                `:
                ``
            }

        </div>
    `;
}

//                    Place card here ${state.data.zones.track.length}