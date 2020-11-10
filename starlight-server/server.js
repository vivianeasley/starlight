let listingsStore = [];
let matchStore = {};

const fastify = require('fastify')({logger: true})

  fastify.register(require('fastify-cors'), {
    origin: false
  })
  fastify.register(require('fastify-no-icon'))

  fastify.register(require('fastify-websocket'), {
    handle,
    options: {
      maxPayload: 1048576, // we set the maximum allowed messages size to 1 MiB (1024 bytes * 1024 bytes)
      path: '/connect', // we accept only connections matching this path e.g.: ws://localhost:3000/fastify
      verifyClient: function (info, next) {
        // if (info.req.headers['x-fastify-header'] !== 'fastify is awesome !') {
        //   return next(false) // the connection is not allowed
        // }
        next(true) // the connection is allowed
      }
    }
  })

  fastify.get('/', async (request, reply) => {
    return "Try /connect. There is nothing on root";
  })

  function handle (conn) {
    conn.socket.on('message', data => {
        const response = JSON.parse(data);

        if (response.type === "GAMES") {
            let listingsStr = JSON.stringify(listingsStore);
            conn.socket.send(listingsStr)
            return;
        }

        if (response.type === "LIST") {
            const gameObj = {};
            gameObj[response.userID] = {
                conn: conn
            };
            matchStore[response.gameID] = gameObj;
            listingsStore.push(response);
            let listingsStr = JSON.stringify(listingsStore);
            conn.socket.send(listingsStr);
            return;
        }

        if (response.type === "JOIN") {
            let playerOneID;
            let playerTwoID = response.userID;
            const gameObj = {
                type: "MATCH",
                gameID: response.gameID
            };
            for (let i = 0; i < listingsStore.length; i++) {
               if (listingsStore[i].gameID === response.gameID) {
                    playerOneID = listingsStore[i].userID;
                    gameObj[listingsStore[i].userID] = listingsStore[i];
                    gameObj[playerTwoID] = response;
                    listingsStore.splice(i, 1);
                    break;
               }
            }

            matchStore[response.gameID][playerTwoID] = {};
            matchStore[response.gameID][playerTwoID].conn = conn;

            let objectStr = JSON.stringify(gameObj);
            conn.socket.send(objectStr);
            matchStore[response.gameID][playerOneID].conn.socket.send(objectStr);

            return;
        }

        // This manages SDP and ICE

        if (response.gameID && response.userID) {
            let opponentID;
            for (let prop in matchStore[response.gameID]) {
                if (prop !== response.userID) opponentID = prop;
            }

            matchStore[response.gameID][opponentID].conn.socket.send(data);

        }


        // if type "setup" add "id":{"name": , "message": , "visible": true} --- return all memory store
            // connectionStore "id"{"name": conn, "name": conn}
            // client side populate

        // player clicks on listing
        // if type "ice candidate" or "SDP" us id and connectionStore to send to other player


        // console.log(conn.socket)

      })
  }

  const start = async () => {
    try {
      await fastify.listen(3000, '0.0.0.0')
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()