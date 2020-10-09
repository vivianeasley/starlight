import { getTestCard } from "../modules/decks/cards";
import { updateState } from "./state-management/immer-state"
import { shuffle } from 'lodash-es';

export const generateDeck = function generateDeck (event:any) {
    updateState((state:any)=>{
        let i = 0;
        while (i < 6) {
            const token = getTestCard();
            token.image = "card-" + getRandomArbitrary(1, 20) + ".jpg";
            state.data.zones.hand.push(token);
            i++;
          }

        let k = 0;
        while (k < 30) {
            const token = getTestCard();
            token.image = "card-" + getRandomArbitrary(1, 20) + ".jpg";
            state.data.zones.deck.push(token);
            k++;
        }

        // let j = 0;
        // while (j < 4) {
        //     const token = getTestCard();
        //     token.image = "card-" + getRandomArbitrary(1, 20) + ".jpg";
        //     state.data.zones.track.push(token);
        //     j++;
        // }

        state.data.zones.deck = shuffle(state.data.zones.deck);
    });

}

function getRandomArbitrary(min:number, max:number) {
    const randNum = Math.floor(Math.random() * ((max+1) - min) + min);
    return randNum;
}