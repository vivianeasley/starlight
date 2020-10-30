import { html } from 'lighterhtml';
import { trackCard } from "../card/track";
import { trackPlacementCard } from "../card/track-placement";
import { submitCards } from "../../data-methods/card-methods/track-methods";
import { pass } from "../../data-methods/card-methods/general";
import { shipCard } from "../card/ship"

export const zoneTrackArea =  function zoneTrackArea (state:any) {
    const { data, uiData } = state;
    const { activePlayer } = uiData;
    const { zones, opponentZones } = data;
    const { track, placingTrack, wreckage } = zones;

    const totalWReckageLength = state.data.zones.wreckage.length + state.data.opponentZones.wreckage.length;

    return html`
        <div class="track-area-wrapper">
            ${shipCard(state)}
            <div class="wreckage-wrapper">
                <div class="track-card-wrapper">
                    <div class="sc-wrapper-border">
                        <div class="sc-wrapper">
                            ${cardWreckageImage(wreckage.length)}
                        </div>
                    </div>
                    <div class="armor-value">You wrecked: ${wreckage.length}</div>
                </div>

                <div class="track-card-wrapper opponents">
                    <div class="sc-wrapper-border">
                        <div class="sc-wrapper">
                            ${cardWreckageImage(opponentZones.wreckage.length)}
                        </div>
                    </div>
                    <div class="armor-value opponents">Opponent wrecked: ${opponentZones.wreckage.length}</div>
                </div>

            </div>
            ${
                track.map((data:any, i:number) => html`
                    <div class="track-card-wrapper">
                        <div class="space-num">${totalWReckageLength+i+1}</div>
                        ${trackCard(data, i, state, "track")}
                    </div>
                `)
            }
            ${
                activePlayer?
                html`
                    <div class="track-card-wrapper">
                        <div class="track-card-placement-zone">
                        <div class="space-num">${totalWReckageLength + track.length + 1}</div>
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

    function cardWreckageImage (cardsInWreckage:number) {
        if (cardsInWreckage === 0) return ``;
        return html`<img class="sc-image" src="./images/cards/card-backs.jpg" alt="">`;
    }
}

//                    Place card here ${state.data.zones.track.length}