import { cardBase } from "../data/card-data-base"
import {
    testCard
} from "../data/cards-data/cards"

export const getTestCard = function getTestCard () {
    const card = {...cardBase, ...testCard}
    return card;
}