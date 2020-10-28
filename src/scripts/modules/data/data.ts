export const data = {
    opponentVisibleZones: {
        deck: false,
        hand: false
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
        placingTrack: [],
        track: [],
        deck: [],
        hand: [],
        wreckage: [],
        armor: [],
        ship: [{
            id: "1ship-1",
            image: "nautalis",
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