import { html } from 'lighterhtml';

export const phaseDesc =  function phaseDesc (state:any) {
    const { uiData } = state;
    const { phaseDesc } = uiData;

    if (phaseDesc && phaseDesc.text && phaseDesc.text.length === 0) return ``;
    return html`
        <div class="desc-text-wrapper" style="${"background-color:" + phaseDesc.color}">
            ${phaseDesc.text}
        </div>
    `;
}