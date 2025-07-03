function PegHandler() {
    this.pegs = []
    for (x = 1; x < 11; x++) {
        for (y = 1; y < 11; y++) {
            this.pegs.push(new Peg(x * 50 + (y % 2 * 25), y * 50 + 50))
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
    particleHandler.addEmitter(
      new ParticleEmitter(
        'impact', 
        {x: this.x - this.offset.x, y: this.y - this.offset.y}, 
        collision
      )
    )
  }
}