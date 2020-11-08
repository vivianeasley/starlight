import { html } from 'lighterhtml';

export const phaseDesc =  function phaseDesc (state:any) {
    const { uiData } = state;
    const {
        phaseDesc,
        requireDataFromOpponent,
        phase
    } = uiData;

    if (phaseDesc && phaseDesc.text && phaseDesc.text.length === 0) return ``;
    if (requireDataFromOpponent && phase !== 2) {
        return html`
        <div class="desc-text-wrapper" style="background-color:yellow;color:black;">
            Waiting on opponent...
        </div>
    `;
    }

    return html`
        <div class="desc-text-wrapper" style="${"background-color:" + phaseDesc.color}">
            ${phaseDesc.text}
        </div>
    `;
}