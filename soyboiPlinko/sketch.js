var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  World = Matter.World,
  Events = Matter.Events


let window_width = 614
let window_height = 715

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

//soyboiHandler.addSoyboi(new Soyboi(200 + Math.random() * 100, 0, 18, "BFG_kerbybit", {r: 255, g: 105, b: 231}))

function preload() {
  soyboi_images = [
    {name: "default", image: loadImage("./images/soyboi_front.png")},
    {name: "Tinfox2", image: loadImage("./images/soyboi_evil.png")},
    {name: "Nightbot", image: loadImage("./images/soyboi_bot.png")},
    {name: "StreamElements", image: loadImage("./images/soyboi_bot.png")}
  ]
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

  if (params.get("mask") == 1) {
    push()
    strokeWeight(0)
    fill(255, 255, 255, 255)
    rect(0, 0, window_width, window_height, 40)
    pop()
    return
  }

  push()
  strokeWeight(0)
  fill(200, 200, 200, 100)
  rect(0, 0, window_width, window_height, 40)
  pop()

  pegHandler.show()
  bucketHandler.show()
  particleHandler.show()
  soyboiHandler.show()
  draw_secret()

  if (params.get("mouse") == 1) {
    push()
    translate(mouseX-5, 0)
    triangle(0, 0, 10, 0, 5, 10)
    pop()
  }
  
  drawText("score", {x: 20, y: 30}, 30)
  if (abs(drawnScore - score) > 5) {
    if (score - drawnScore > 300) drawnScore = score - 300
    if (score - drawnScore < -300) drawnScore = score + 300
    drawnScore += Math.floor((score - drawnScore) / 5)
  } else {
    drawnScore = score
  }
  shownScore = drawnScore
  if (shownScore > 1000000) {
    shownScore = shownScore.toExponential(2)
  }
  drawText(shownScore, {x: 20, y: 80 + (score - drawnScore) / 20}, 50 + (score - drawnScore) / 20)
}

function mousePressed(event) {
  //used mostly for debugging
  if (event.button == 2) {
    //test subscription event
    subscribe("test")
  } else {
    soyboiHandler.addSoyboi(new Soyboi(mouseX))
  }
}

Events.on(engine, 'collisionStart', event => {
  pegHandler.collide(event)
})