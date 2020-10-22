// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const path = require('path');

const listingsStore = [{"type":"LIST", "gameID":"hgafjyfjfd", "userID":"jgasdafsga", "userName":"test"}];
const matchStore = {};

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'dist')
})

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

  function handle (conn) {
    conn.socket.on('message', data => {
        const response = JSON.parse(data);

        // console.log(response)
        // if (response === "[object Object]") console.log("---response")
        // if (response.message && response.message === "[object Object]") console.log("---response message")
        // if (response.message) {
        //   console.log("-----returned----", typeof response.message)
        //   let test = JSON.parse(response.message);
        //   if (test.candidate === "") {
        //     return;
        //   }
        // }

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
                if (prop === response.userID) opponentID = prop;
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

// Declare a route
// fastify.get('/connect', async function (request, reply) {

//     if (request.query) {
//         if (request.query.delete) {
//             if (request.query.delete === "true" && request.query.name) {
//                 for (let i = 0; i < listingsStore.length; i++) {
//                     if (listingsStore[i].name === request.query.name) {
//                         listingsStore.splice(i, 1);
//                         break;
//                     }
//                 }
//             }
//         }

//         if (!request.query.delete && request.query.id && request.query.name) {
//             let alreadyExists = false;
//             for (let j = 0; j < listingsStore.length; j++) {
//                 if (listingsStore[j].name ===request.query.name) {
//                     alreadyExists = true;
//                 }

//             }

//             if (alreadyExists === false) {
//                 listingsStore.push({
//                     id: request.query.id,
//                     name: request.query.name
//                 })
//             }

//         }
//     }
//     console.log(listingsStore)
//     return listingsStore
//   })

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()