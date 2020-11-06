export const uiData = {
    gameStarted: false,
    round: 0,
    playerId: 2,
    selectedZone: "hand",
    numberOfCardsSelectable: 0,
    activePlayer: true,
    phaseDamage: 0,
    opponentPhaseDamage: 0,
    phaseDesc: { text: "", color: "transparent" },
    // 3 player states
    eventsDisabledZones: ["wreckage", "deck", "ship", "armor", "track"],
    faceDownZones: ["deck", "armor"],
    placingCards: true,
    waiting: false,
    oppPassed: false,
    youPassed: false,

    trackResolving: false,
    startingPlayer: true,
    eventsDisabled: false,

    // matchmaking
    gameID: undefined,
    userID: undefined,
    userName: undefined,
    listings: [],
    peerObj: undefined,
    connection: undefined,
    opponentInfo: undefined,

    // modals
    modals: {
        matchmaking: true
    }
};