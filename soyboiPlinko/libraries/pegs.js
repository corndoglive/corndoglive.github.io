class PegHandler {
  constructor() {
    this.pegs = []
    let i = 0
    for (let x = 1; x < 9; x++) {
        i++
        for (let y = 1; y < 9; y++) {
            this.pegs.push(new Peg(x * 65 + (y % 2 * 30), y * 60 + 60, i % 2))
        }
    }
  }

  collide(event) {
    const collided = event.pairs[0].bodyA //peg is always body A (created first)
    const collision = event.pairs[0].collision
    this.pegs.forEach(peg => {
      if (peg.body === collided) {
        peg.collision(collision)
      }
    })
  }

  show() {
    this.pegs.forEach(peg => {
      peg.show()
    })
  }
}

class Peg {
  constructor(x, y, style) {
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
  }
  
  show() {
    const pos = this.body.position
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

  collision(collision) {
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