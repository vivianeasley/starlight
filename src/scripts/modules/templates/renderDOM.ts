import { render, html } from 'lighterhtml';
import { zoneCardArea } from "./layout"

const main = document.querySelector("main");

export function renderDOM (state) {

        render(main, html`
            <div>${zoneCardArea(state)}</div>
        `);

}