channel = params.get("channel") || 'soymilk'

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: [channel]
})

client.connect()

client.on('message', (channel, tags) => {
  user = tags['display-name']
  col = tags['color']
  if (!soyboiHandler.hasSoyboi(user)) {
    soyboiHandler.addSoyboi(new Soyboi(getRandLoc(), user, hexToRgb(col)))
  }
})

client.on('subscription', (channel, username) => {
  subscribe(username)
})
client.on("resub", (channel, username) => {
  subscribe(username)
})
client.on("subgift", (channel, username) => {
  subscribe(username)
})
client.on("submysterygift", (channel, username) => {
  subscribe(username)
})
client.on("raided", (channel, username) => {
  subscribe(username)
})

function subscribe(username) {
  for (i = 0; i < 5; i++) {
    soyboiHandler.addSoyboi(
      new Soyboi(getRandLoc(), username, new RainbowColorObject(i*50)), 
      i * 10
    )
  }
}