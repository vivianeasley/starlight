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

        // let l = 0;
        // while (l < 6) {
        //     let card = getOneCards();
        //     const random = Math.floor(Math.random() * card.length);
        //     let fullCard = {...baseCard, ...card[random]};
        //     fullCard.ownerID= state.uiData.userID;
        //     state.data.tmpZone.push(fullCard);
        //     l++;
        // }

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
            typeJob: "operations",
            place: 1,
            rank: 4,
            wrecked: false,
            rules: "Return this card to it's owner's hand.",
            functs: ["targetThisCard", "trackToHand"]
        },
        {
            id: "1-2",
            name: "M. A. Gideon",
            image: "card-2.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "engineer",
            place: 2,
            rank: 4,
            wrecked: false,
            rules: "Return the previous card on the track to its owner's hand.",
            functs: ["trackToHand", "removeSelf"]
        },
        {
            id: "1-3",
            name: "D. J. Carson",
            image: "card-3.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "medical",
            place: 5,
            rank: 4,
            wrecked: false,
            rules: "Return the top card of your wreckage pile to the bottom of your deck.",
            functs: ["wreckageToBottomDeck"]
        },
        {
            id: "1-3",
            name: "C. H. Jovanovic",
            image: "card-7.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "tactical",
            place: 1,
            rank: 4,
            wrecked: false,
            rules: "Deal 1 damage to your opponents ship.",
            functs: ["damage"]
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
            place: 11,
            rank: 3,
            rules: "Send the previous card on the track to its owner's wreckage pile.",
            functs: ["trackToWreckage", "removeSelf"]
        },
        {
            id: "1-4",
            name: "V. A. Ilic",
            image: "card-5.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "tactical",
            place: 8,
            rank: 3,
            rules: "Deal 2 damage to your opponents ship.",
            functs: ["amountTwo", "damage"]
        },
        {
            id: "1-3",
            name: "M. M. Huber",
            image: "card-10.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "medical",
            place: 10,
            rank: 3,
            wrecked: false,
            rules: "Return the top card of your wreckage pile to your hand.",
            functs: ["wreckageToHand"]
        },
        {
            id: "1-4",
            name: "M. E. Kuqi",
            image: "card-6.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "operations",
            place: 9,
            rank: 3,
            rules: "Draw a card.",
            functs: ["deckToHand"]
        },
        {
            id: "1-4",
            name: "N. S. Lukic",
            image: "card-8.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "engineer",
            place: 12,
            rank: 3,
            rules: "Double the amount of damage on your opponents ship.",
            functs: ["doubleOpponentDamage"]
        },
        {
            id: "1-4",
            name: "B. I. Kayser",
            image: "card-9.jpg",
            type: "crew",
            typeAlign: "fed",
            typeJob: "science",
            place: 14,
            rank: 3,
            rules: "Resolve all remaing track damage then remove all track damage.",
            functs: ["dealAllTrackDamageAsOne", "removeAllTrackDamage"]
        },
    ]
}

function getThreeCards () {
    return [];
}

function getFourCards () {
    return [];
}

function getGeneralCardData () {
    return {
        locked: false,
        underDamage: [],
        ownerID: undefined,
        isSelected: false
    }
}