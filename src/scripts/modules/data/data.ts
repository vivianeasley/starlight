export const data = {
    opponentVisibleZones: {
        deck: false,
        hand: false,
        wreckage: false,
    },
    opponentZones: {
        placingTrack: [],
        track: [],
        deck: [],
        hand: [],
        wreckage: [],
        armor: [],
        ship: [],
        damage: []
    },
    zones: {
        tmpZone: [],
        placingTrack: [],
        track: [],
        deck: [],
        hand: [],
        wreckage: [],
        armor: [],
        ship: [{
            id: "1ship-1",
            image: "ship-1.jpg",
            borderImage: "ship",
            name: "The Nautalis",
            draw: 4,
            damage: 2,
            armor: 10,
            rules: undefined,
            rulesFuncts: []
        }],
        damage: []
    }
};