import { html } from 'lighterhtml';
import { initiateGame, joinGame, getGamesList, setName } from '../data-methods/web-rtc'

export const matchmakingModal =  function matchmakingModal (state:any) {
    const { uiData } = state;
    const { listings, gameID, modals, userName } = uiData;
    if (listings.description || listings.candidate === null) return ``;

    return html`
        <div class="${modals.matchmaking ? "modal active" : "modal"}" id="modal-id">
        <a href="#close" class="modal-overlay" aria-label="Close"></a>
        <div class="modal-container">
            <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" aria-label="Close"></a>
            </div>
            <div class="modal-body">
                <div class="content">
                    <div>
                        ${
                            userName ?
                            html`Welcome ${userName}!`:
                            html`
                                <div>
                                    Enter a username: <input type="text" value="Anonymous">
                                    <button onclick=${(e)=>{setName(e, state)}}>Submit</button>
                                </div>
                            `
                        }
                    </div>
                    <hr>
                    <div>
                        <div>Listed games:</div>
                        ${
                            listings.map((data:any, i:number) => html`
                                <div>
                                    ${data.userName}&nbsp;-&nbsp;
                                    <button onclick=${()=>{joinGame(data.gameID)}} disabled=${(gameID === data.gameID)}>Join game</button>
                                </div>
                            `)
                        }
                    </div>
                    <hr>
                    <div>
                        <button disabled=${(userName === undefined)} onclick=${getGamesList}>Check listings</button>
                        <button disabled=${(userName === undefined)} onclick=${()=>{initiateGame(userName)}}>List game</button>
                    </div>

                </div>
            </div>
            <div class="modal-footer">

            </div>
        </div>
        </div>
    `;
}