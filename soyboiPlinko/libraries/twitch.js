channel = params.get("channel") || 'soymilk'

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: [channel]
})

client.connect()

client.on('message', (channel, tags, message, self) => {
    user = tags['display-name']
    col = tags['color']
    if (!soyboiHandler.hasSoyboi(user)) {
        soyboiHandler.addSoyboi(new Soyboi((window_width / 2 - 100) + Math.random() * 200, 0, 18, user, hexToRgb(col)))
    }
})