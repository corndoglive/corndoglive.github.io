function Soyboi(x, y, r, name = "", color = {r: 255, g: 255, b: 255}) {
  this.r = r
  this.body = Bodies.circle(x, y, this.r, {mass: 10, restitution: 0.9})
  World.add(world, this.body)
  this.name = name
  this.hitBottom = false
  this.fanale = 0
  this.dead = false

  this.show = function() {
    var pos = this.body.position
    var angle = this.body.angle

    push()
    translate(pos.x, pos.y)
    rotate(angle)
    //circle(0, 0, this.r*2)
    translate(-21, -40)
    scale(this.r / 300 + this.fanale / 1000)
    image(soyboi_image, 0, 0)
    pop()

    if (name != "") {
      push()
      translate(pos.x, pos.y - this.r -5)
      textAlign(CENTER)
      textSize(20)
      fill(255)
      stroke(0)
      strokeWeight(1.5)
      fill(color.r, color.g, color.b)
      text(name, 0, 0)
      pop()
    }

    if (!this.hitBottom) return
    if (this.fanale < 30) {
      this.fanale++
    } else {
      particleEmitters.push(
        new ParticleEmitter(
          'explode', 
          {x: pos.x, y: pos.y}
        )
      )
      this.dead = true
    }
  }
}

function Peg(x, y) {
  this.offset = {x: 0, y: 0}
  this.x = x
  this.y = y

  this.r = 5
  this.body = Bodies.circle(x, y, this.r, {isStatic: true})
  World.add(world, this.body)

  this.show = function() {
    var pos = this.body.position
    this.offset.x = this.offset.x / 2
    this.offset.y = this.offset.y / 2

    push()
    translate(pos.x + this.offset.x, pos.y + this.offset.y)
    circle(0, 0, this.r*2)
    pop()
  }

  this.collision = function(collision) {
    score += 1
    this.offset = {
      x: collision.normal.x * 5, 
      y: collision.normal.y * 5
    }
    particleEmitters.push(
      new ParticleEmitter(
        'impact', 
        {x: this.x - this.offset.x, y: this.y - this.offset.y}, 
        collision
      )
    )
  }
}

function Bucket(x, mult) {
  this.x = x
  this.y = window_height - 5
  this.width = 82
  this.mult = mult
  this.wall = 5
  this.vertexes = [
    {x: 0, y: -100}, 
    {x: 0, y: 0}, 
    {x: 82, y: 0},
    {x: 82, y: -100},
    {x: 82 - this.wall, y: -100},
    {x: 82 - this.wall, y: -this.wall},
    {x: this.wall, y: -this.wall},
    {x: this.wall, y: -100}
  ]

  this.floor = Bodies.rectangle(this.x, this.y, this.width, this.wall, {isStatic: true})
  World.add(world, this.floor)
  this.left = Bodies.rectangle(this.x, this.y - 50, this.wall, 100, {isStatic: true})
  World.add(world, this.left)
  this.right = Bodies.rectangle(this.x + this.width - this.wall, this.y - 50, this.wall, 100, {isStatic: true})
  World.add(world, this.right)

  this.show = function() {
    this.collision()
    push()
    translate(this.x, this.y)
    beginShape()
    this.vertexes.forEach(vert => {
      vertex(vert.x, vert.y)
    })
    endShape(CLOSE)
    pop()

    push()
    translate(this.x + this.width / 2, this.y - 100)
    textAlign(CENTER)
    textSize(20)
    fill(255)
    stroke(0)
    strokeWeight(1.5)
    text("x" + this.mult, 0, 0)
    pop()
  }

  this.collision = function() {
    bois.forEach(soyboi => {
      if (soyboi.hitBottom) return
      if (soyboi.body.position.y > this.y - 100
        && soyboi.body.position.x > this.x
        && soyboi.body.position.x < this.x + this.width) {
        soyboi.hitBottom = true
        score = Math.ceil(score * this.mult)
      }
    })
  }
}