export const data = {
    zones: {
        placingTrack: [],
        track: [],
        deck: [],
        hand: [],
        wreckage: [],
        armor: [],
        ship: [{
            id: 1,
            image: "roberts-ship",
            borderImage: "ship",
            name: "Robert Page Easley",
            shields: 2,
            damage: 3,
            armor: 10,
            rules: "For each shield card you own on the track salvage 1",
            rulesFuncts: ["countOwnerActiveShields", "salvageBasedOnNumber"],
            reminderText: "Salvage: Move a card from your wreckage pile to the bottom of your deck",
            //
            controlledByPlayer: 1,
        }],
        damage: [{
            name: "1 damage",
            image: "card-backs.jpg",
            amount: 1,
            type: "damage",
            used: false
        },
        {
            name: "1 damage",
            image: "card-backs.jpg",
            amount: 1,
            type: "damage",
            used: false
        }]
    }
};