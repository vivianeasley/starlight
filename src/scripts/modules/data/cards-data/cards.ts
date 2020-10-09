export const testCard = {
    id: 1,
    image: "robert",
    name: "Robert Page Easley",
    rank: 2, // (1) Cadet - (2) lieutenant - (3) officer - (4) captain
    rules: "For each shield card you own on the track salvage 1",
    rulesFuncts: ["countOwnerActiveShields", "salvageBasedOnNumber"],
    reminderText: "Salvage: Move a card from your wreckage pile to the bottom of your deck",
    type: "crew",
    typeAffiliation: "fed",
    typeJob: "engineer",
    placementMin: 3,
};