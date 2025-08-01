function PegHandler() {
    this.pegs = []
    i = 0
    for (x = 1; x < 9; x++) {
        i++
        for (y = 1; y < 9; y++) {
            this.pegs.push(new Peg(x * 65 + (y % 2 * 30) - 20, y * 60 + 60, i % 2))
        }
    }

    this.collide = function(event) {
      collided = event.pairs[0].bodyA //peg is always body A (created first)
      collision = event.pairs[0].collision
      this.pegs.forEach(peg => {
        if (peg.body === collided) {
          peg.collision(collision)
        }
      })
    }

    this.show = function() {
        this.pegs.forEach(peg => {
            peg.show()
        })
    }
}

function Peg(x, y, style) {
  this.offset = {x: 0, y: 0}
  this.x = x
  this.y = y
  this.color = {r: 255, g: 255, b: 255}
  if (style == 0) {
    this.color = {r: 0, g: 170, b: 255}
  } else if (style == 1) {
    this.color = {r: 190, g: 120, b: 255}
  }

  this.r = 10
  this.body = Bodies.circle(x, y, this.r, {isStatic: true})
  World.add(world, this.body)

  this.show = function() {
    var pos = this.body.position
    this.offset.x = this.offset.x / 1.5
    this.offset.y = this.offset.y / 1.5

    push()
    translate(pos.x + this.offset.x / 2, pos.y + this.offset.y / 2)
    fill(0, 0, 0)
    circle(3, 2, this.r*2)
    pop()

    push()
    translate(pos.x + this.offset.x, pos.y + this.offset.y)
    fill(this.color.r, this.color.g, this.color.b)
    circle(0, 0, this.r*2)
    pop()
  }

  this.collision = function(collision) {
    score += 1
    this.offset = {
      x: collision.normal.x * 5, 
      y: collision.normal.y * 5
    }
    particleHandler.addEmitter(
      new ParticleEmitter(
        'impact', 
        {x: this.x - this.offset.x, y: this.y - this.offset.y}, 
        collision
      )
    )
  }
}