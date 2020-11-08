import { html } from 'lighterhtml';
import { zoneTrackArea } from "./card-area/track"
import { zoneViewArea } from "./card-area/cards-zone-view"
import { playerControls } from "./controls/player-controls"
import { opponentControls } from "./controls/opponent-controls"
import { matchmakingModal } from "../templates/matchmaking-modal"
import { selectionModal } from "../templates/modals/selection-modal"
import { phaseDesc } from "../templates/card-area/phase-desc"

export const zoneCardArea = function zoneCardArea (state:any) {

    return html`
        <div>${phaseDesc(state)}</div>
        <div>${zoneTrackArea(state)}</div>
        <div>${zoneViewArea(state)}</div>
        <div>${playerControls(state)}</div>
        <div>${opponentControls(state)}</div>
        ${matchmakingModal(state)}
        ${selectionModal(state)}

    `;
}
