import { html } from 'lighterhtml';
import { initiateGame, joinGame, getGamesList } from '../data-methods/web-rtc'

// move into modal

export const matchmaking =  function matchmaking (state:any) {
    const { uiData } = state;
    const { listings, gameID } = uiData;
    if (listings.description || listings.candidate === null) return ``;
    return html`
        ${
            listings.map((data:any, i:number) => html`
                <div>
                    ${data.userName}
                    <button onclick=${()=>{joinGame(data.gameID)}} disabled=${(gameID === data.gameID)}>Join game</button>
                </div>
            `)
        }
        <button onclick=${getGamesList}>Check listings</button>
        <button onclick=${initiateGame}>List game</button>

    `;
}