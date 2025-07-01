var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  World = Matter.World,
  Events = Matter.Events

let engine = Engine.create()
let world = engine.world
Composite.add(world, [])
let runner = Runner.create()
Runner.run(runner, engine)

var pegs = []
var buckets = []
var bois = []
var particleEmitters = []
let window_width = 574
let window_height = 700
var score = 1
var drawnScore = 1
let params = new URL(window.location.href).searchParams

for (x = 1; x < 11; x++) {
  for (y = 1; y < 11; y++) {
    pegs.push(new Peg(x * 50 + (y % 2 * 25), y * 50 + 50))
  }
}
for (x = 0; x < 7; x++) {
  mult = Math.abs(Math.abs(x - 3) - 4)
  buckets.push(new Bucket(x * 82, mult/2))
}
bois.push(new Soyboi(200 + Math.random() * 100, 0, 18, "BFG_kerbybit", {r: 255, g: 105, b: 231}))


function preload() {
  soyboi_image = loadImage('./images/soyboi_front.png')
}

function setup() {
  createCanvas(window_width, window_height)
  frameRate(60)
}

function draw() {
  clear()
  if (params.get("back") == 1) {
    background(200, 200, 200)
  }

  pegs.forEach(peg => {
    peg.show()
  })

  buckets.forEach(bucket => {
    bucket.show()
  })

  dead = []
  particleEmitters.forEach(emitter => {
    emitter.show()
    if (emitter.dead) {
      dead.push(emitter)
    }
  })
  dead.forEach(emitter => {
    particleEmitters.removeItem(emitter)
  })


  dead = []
  bois.forEach(boi => {
    boi.show()
    if (boi.body.position.y > window_height || boi.dead) {
      dead.push(boi)
      World.remove(world, boi.body)
    }
  })

  dead.forEach(boi => {
    bois.removeItem(boi)
  })

  push()
  translate(mouseX-5, 0)
  triangle(0, 0, 10, 0, 5, 10)
  pop()

  push()
  translate(10, 20)
  textSize(20)
  fill(255)
  stroke(0)
  strokeWeight(4)
  text("score", 0, 0)
  pop()
  if (abs(drawnScore - score) > 5) {
    if (score - drawnScore > 300) drawnScore = score - 300
    if (score - drawnScore < -300) drawnScore = score + 300
    drawnScore += Math.floor((score - drawnScore) / 5)
  } else {
    drawnScore = score
  }
  push()
  translate(10, 65 + (score - drawnScore) / 20)
  textSize(50 + (score - drawnScore) / 20)
  fill(255)
  stroke(0)
  strokeWeight(4)
  text(drawnScore, 0, 0)
  pop()
}

Array.prototype.removeItem = function(value) {
  var index = this.indexOf(value)
  if (index > -1) {
    this.splice(index, 1)
  }
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}

function mousePressed() {
  bois.push(new Soyboi(mouseX, 0, 18))
}

Events.on(engine, 'collisionStart', event => {
  bodyA = event.pairs[0].bodyA //peg is always body A (created first)
  bodyB = event.pairs[0].bodyB
  collision = event.pairs[0].collision
  pegs.forEach(peg => {
    if (peg.body === bodyA) {
      peg.collision(collision)
    }
  })
})