import { updateState } from "./state-management/immer-state"
import { shuffle } from 'lodash-es';

export const generateDeck = function generateDeck (event:any) {
    const baseCard = getGeneralCardData();
    updateState((state:any)=>{
        let i = 0;
        while (i < 6) {
            let card = getTwoCards();
            const random = Math.floor(Math.random() * card.length);
            let fullCard = {...baseCard, ...card[random]};
            fullCard.ownerID= state.uiData.userID;
            state.data.zones.deck.push(fullCard);
            i++;
          }

        let k = 0;
        while (k < 34) {
            let card = getOneCards();
            const random = Math.floor(Math.random() * card.length);
            let fullCard = {...baseCard, ...card[random]};
            fullCard.ownerID= state.uiData.userID;
            state.data.zones.deck.push(fullCard);
            k++;
        }

        state.data.zones.deck = shuffle(state.data.zones.deck);
    });

}

function getRandomArbitrary(min:number, max:number) {
    const randNum = Math.floor(Math.random() * ((max+1) - min) + min);
    return randNum;
}

function getOneCards () {
    return [
        {
            id: "1-1",
            name: "B. E. Thorton",
            image: "card-1.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "science",
            place: 1,
            rank: 4,
            wrecked: false,
            locked: false,
            underDamage: [],
            rules: "Return this card to it's owner's hand.",
            functs: ["targetThisCard", "trackToHand"]
        },
        {
            id: "1-2",
            name: "M. A. Gideon",
            image: "card-2.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "medical",
            place: 2,
            rank: 4,
            wrecked: false,
            locked: false,
            underDamage: [],
            rules: "Return the previous card on the track to its owner's hand.",
            functs: ["trackToHand"]
        },
        {
            id: "1-3",
            name: "D. J. Carson",
            image: "card-3.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "medical",
            place: 3,
            rank: 4,
            wrecked: false,
            locked: false,
            underDamage: [],
            rules: "Return the top card of your wreckage pile to your hand.",
            functs: ["wreckageToHand"]
        },
    ]
}

function getTwoCards () {
    return [
        {
            id: "1-4",
            name: "J. I. Xemeno",
            image: "card-4.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "tactical",
            place: 5,
            rank: 3,
            locked: false,
            underDamage: [],
            rules: "Send the previous card on the track to its owner's wreckage pile.",
            functs: ["trackToWreckage"]
        },
        {
            id: "1-4",
            name: "V. A. Ilic",
            image: "card-4.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "tactical",
            place: 8,
            rank: 3,
            locked: false,
            underDamage: [],
            rules: "Deal 2 damage to your opponents ship.",
            functs: ["amountTwo", "damage"]
        },
        {
            id: "1-4",
            name: "M. E. Kuqi",
            image: "card-5.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "engineer",
            place: 9,
            rank: 3,
            locked: false,
            underDamage: [],
            rules: "Put the top card of your deck on top of your armor pile.",
            functs: ["deckToHand"]
        },
    ]
}

function getThreeCards () {
    return []
}

function getFourCards () {
    return []
}

function getGeneralCardData () {
    return {
        locked: false,
        underDamage: [],
        ownerID: undefined
    }
}