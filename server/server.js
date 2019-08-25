const jsonServer = require('json-server')
const WebSocket = require('ws')
const http = require('http')
const uuidv4 = require('uuid/v4')
const DB_PATH = process.env.DB_PATH || 'db.json'
const PORT = process.env.PORT || 3000

const app = jsonServer.create()
const router = jsonServer.router(DB_PATH)
const middlewares = jsonServer.defaults()

function encodeMessage(message) {
    return JSON.stringify(message)
}

function decodeMessage(message) {
    try {
        return JSON.parse(message)
    } catch (e) {
        return null
    }
}

function msg(type, payload) {
    return {
        id: uuidv4(),
        ts: Date.now(),
        type,
        payload,
    }
}

function getResourceIdentityFromUrl(url) {
    const m = /^\/([\w]+)\/([\w]+)/.exec(url)

    if (!m) {
        return [null, null]
    }

    return [m[1], m[2]]
}

function createIsOtherClient(clientId) {
    return (client) => {
        return client.cliendId !== clientId
    }
}

function broadcastMessage(filterClient, message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            const status = filterClient(client)

            if (status) {
                client.send(message)
            }
        }
    })
}

function broadcastInfoOnlineUsers() {
    broadcastMessage(() => true, encodeMessage(msg('info/online_users', {
        onlineUsers: wss.clients.size,
    })))
}

app.use(middlewares)
app.use(jsonServer.bodyParser)
app.use((req, res, next) => {
    const publisherId = req.headers['x-client-id']
    const [collection, id] = getResourceIdentityFromUrl(req.url)

    if (collection && id && publisherId) {
        broadcastMessage(createIsOtherClient(publisherId), encodeMessage(msg('app/resource_update', {
            collection,
            resourceId: id,
            resource: req.body,
            action: req.method.toLowerCase(),
        })))
    }

    next()
})
// server.use((req, res, next) => {
//  if (isAuthorized(req)) { // add your authorization logic here
//    next() // continue to JSON Server router
//  } else {
//    res.sendStatus(401)
//  }
// })
app.use(router)

const server = http.createServer(app)
const wss = new WebSocket.Server({
    server
})
wss.on('connection', function connection(ws) {
    const cliendId = uuidv4()
    ws.cliendId = cliendId

    // ws.on('message', function incoming(data) {
    //     try {
    //         const message = JSON.parse(data)

    //         if (message.type === 'initClient') {
    //             if (message.cliendId) {
    //                 clientsMap.set(message.cliendId, ws)
    //             }
    //         }
    //     } catch (e) {

    //     }
    // })

    ws.on('close', () => {
        broadcastInfoOnlineUsers()
    })

    ws.send(encodeMessage(msg('system/init', {
        serverVersion: '0',
        clientId: cliendId,
    })))

    broadcastInfoOnlineUsers()
})

server.listen(PORT, () => {
    console.log('JSON Server is running')
})
