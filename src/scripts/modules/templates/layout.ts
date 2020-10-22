import { html } from 'lighterhtml';
import { zoneTrackArea } from "./card-area/track"
import { zoneViewArea } from "./card-area/cards-zone-view"
import { playerControls } from "./controls/player-controls"
import { opponentControls } from "./controls/opponent-controls"
import { matchmaking } from "../templates/matchmaking"

export const zoneCardArea = function zoneCardArea (state:any) {

    return html`
        <div>${zoneTrackArea(state)}</div>
        <div>${zoneViewArea(state)}</div>
        <div>${playerControls(state)}</div>
        <div>${opponentControls(state)}</div>
        <div>${matchmaking(state)}</div>

    `;
}
