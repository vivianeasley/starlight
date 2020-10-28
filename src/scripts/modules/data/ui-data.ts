export const uiData = {
    gameStarted: false,
    round: 0,
    playerId: 2,
    selectedZone: "hand",
    numberOfCardsSelectable: 0,
    activePlayer: true,
    // 3 player states
    selectableZones: [],
    placingCards: true,
    waiting: false,
    oppPassed: false,

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