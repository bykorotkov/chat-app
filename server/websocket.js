const ws = require('ws');

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000 port`))

wss.on('connection', function connection(ws) {
    // ws.id = Date.now()
    ws.on('message', function (message) {
        message = JSON.parse(message)

        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastConnection(message)
                break;
        }
    })
})


// const messagesData = []
function broadcastMessage(message, id) {
    // const messagesArr = messagesData.map(item => item.message)
    // console.log(messagesData)

    // messagesData.push(message)
    wss.clients.forEach(client => {
        // const messagesList = messagesData.map(item => item.message)
        // client.send(JSON.stringify(messagesList))
        client.send(JSON.stringify(message))
    })
}

const data = []
function broadcastConnection(message, id) {
    const usernames = data.map(item => item.username);

    if (!usernames.includes(message.username)) {
        data.push(message);
        wss.clients.forEach(client => {
            const usersList = data.map(item => item.username);
            client.send(JSON.stringify(usersList));
            client.send(JSON.stringify(message));
        });
    }
}