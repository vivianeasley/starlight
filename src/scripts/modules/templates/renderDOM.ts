import { render, html } from 'lighterhtml';
import { zoneCardArea } from "./layout"

const main = document.querySelector("main");
let trackElement;

export function renderDOM (state) {

        render(main, html`
            <div>${zoneCardArea(state)}</div>
        `);

        if (!trackElement) {
            trackElement = document.querySelector(".track-area-wrapper")
        }

        if (trackElement &&
            trackElement.scrollWidth &&
            trackElement.scrollWidth > trackElement.offsetWidth) {
                trackElement.scrollTo( trackElement.scrollWidth, 0);
            }
}