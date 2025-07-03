var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  World = Matter.World,
  Events = Matter.Events


let window_width = 574
let window_height = 700

let engine = Engine.create()
let world = engine.world
Composite.add(world, [])
let runner = Runner.create()
Runner.run(runner, engine)

let soyboiHandler = new SoyboiHandler()
let pegHandler = new PegHandler()
let bucketHandler = new BucketHandler()
let particleHandler = new ParticleHandler()
var score = 1
var drawnScore = 1
let params = new URL(window.location.href).searchParams

soyboiHandler.addSoyboi(new Soyboi(200 + Math.random() * 100, 0, 18, "BFG_kerbybit", {r: 255, g: 105, b: 231}))

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

  pegHandler.show()
  bucketHandler.show()
  particleHandler.show()
  soyboiHandler.show()

  if (params.get("mouse") == 1) {
    push()
    translate(mouseX-5, 0)
    triangle(0, 0, 10, 0, 5, 10)
    pop()
  }
  
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

function mousePressed() {
  soyboiHandler.addSoyboi(new Soyboi(mouseX, 0, 18))
}

Events.on(engine, 'collisionStart', event => {
  pegHandler.collide(event)
})