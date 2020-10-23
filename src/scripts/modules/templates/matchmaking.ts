import { html } from 'lighterhtml';
import { initiateGame, joinGame, getGamesList } from '../web-rtc'

export const matchmaking =  function matchmaking (state:any) {
    const { uiData } = state;
    const { listings, gameID, userID } = uiData;
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

// // button host game
// // button for each game shown join  game
// // reload list

// // make sure not your name/id so you don't try to  start a game with yourself... unless that's what you want