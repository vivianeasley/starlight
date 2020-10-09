import { html } from 'lighterhtml';
import { trackCard } from "../card/track"

export const zoneViewArea =  function zoneViewArea (state:any) {
    const { uiData } = state;
    const { selectedZone } = uiData;

    return html`
        <div class="view-area-wrapper">
            ${
                state.data.zones[selectedZone].map((data:any, i:number) => html`
                    <div class="track-card-wrapper">
                        ${trackCard(data, i, state, selectedZone)}
                    </div>
                `)
            }
        </div>
    `;
}