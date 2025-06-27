var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  World = Matter.World

let engine = Engine.create()
let world = engine.world
var objects = []
var pegs = []
var bois = []
var window_width = 600
var window_height = 600

bois.push(new Soyboi(200 + Math.random() * 100, 0, 18))
for (x = 1; x < 11; x++) {
  for (y = 1; y < 11; y++) {
    pegs.push(new Peg(x * 50 + (y % 2 * 25), y * 50 + 50))
  }
}

Composite.add(world, [])

var runner = Runner.create()
Runner.run(runner, engine)

function preload() {
  soyboi_image = loadImage('./images/soyboi_front.png')
}

function setup() {
  createCanvas(window_width, window_height)
}
function draw() {
  background(200)
  pegs.forEach(peg => {
    peg.show()
  })
  dead = []
  bois.forEach(boi => {
    boi.show()
    if (boi.body.position.y > window_height) {
      dead.push(boi)
      World.remove(world, boi.body)
    }
  })

  dead.forEach(boi => {
    removeItem(bois, boi)
  })

function removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
  
  push()
  translate(mouseX-5, 0)
  triangle(0, 0, 10, 0, 5, 10)
  pop()
}

function mousePressed() {
  bois.push(new Soyboi(mouseX, 0, 18))
}

function Peg(x, y) {
  this.r = 5
  this.body = Bodies.circle(x, y, this.r, {isStatic: true})
  World.add(world, this.body)

  this.show = function() {
    var pos = this.body.position

    push()
    translate(pos.x, pos.y)
    circle(0, 0, this.r*2)
    pop()
  }
}

function Soyboi(x, y, r) {
  this.r = r
  this.body = Bodies.circle(x, y, r, {mass: 10, restitution: 0.9})
  World.add(world, this.body)

  this.show = function() {
    var pos = this.body.position
    var angle = this.body.angle

    push()
    translate(pos.x, pos.y)
    rotate(angle)
    //circle(0, 0, this.r*2)
    translate(-21, -40)
    scale(this.r / 300)
    image(soyboi_image, 0, 0)
    pop()
  }
}