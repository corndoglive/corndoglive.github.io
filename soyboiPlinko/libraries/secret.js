let secret_message = ""

const secret_client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: ['BFG_kerbybit']
})

secret_client.connect()

secret_client.on('message', (channel, tags, message, self) => {
    user = tags['display-name']
    if (user == 'BFG_kerbybit') {
        if (message == "clear") {
            secret_message = ""
        } else {
            secret_message = message
        }
    }
})

function draw_secret() {
    if (secret_message == "") return
    drawText(secret_message, {x: window_width - 50, y: 50}, 50, 4, RIGHT)
}

