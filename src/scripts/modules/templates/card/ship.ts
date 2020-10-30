import { html } from 'lighterhtml';

export const shipCard = function shipCard (state:any) {
    const { ship } = state.data.zones;

    return html`
        <div class="ship-card-wrapper">
            <div class="ship-card">
                <img class="ship-image" src="${"./images/ships/"+ship[0].image}" alt="">
                <img class="ship-border" src="./images/card-assets/ship-border.png" alt="">
                <div class="ship-name">${ship[0].name}</div>
                <div class="ship-rules">
                    <div class="ship-rule-draw">
                        <span class="ship-draw-num">${ship[0].draw}</span>: Draw ${ship[0].draw} cards at the beginning of each round.
                    </div>
                    <div class="ship-rule-armor">
                        <span class="ship-armor-num">${ship[0].armor}</span> crew cards in your wreckage = lose.
                    </div>
                    <div class="ship-rule-damage">
                        <span class="ship-damage-num">${ship[0].damage}</span>  Start the game with ${ship[0].damage} damage cards.
                    </div>
                </div>
                ${
                    state.uiData.phaseDamage > 0 ?
                    html`
                        <div class="ship-damage">
                            ${state.uiData.phaseDamage}
                        </div>
                    `:
                    ``
                }
            </div>
        </div>
`

}