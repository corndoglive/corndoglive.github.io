function SoyboiHandler() {
    this.soybois = []
    
    this.addSoyboi = function(soyboi) {
        this.soybois.push(soyboi)
    }

    this.show = function() {
        dead = []
        this.soybois.forEach(soyboi => {
            soyboi.show()
            if (soyboi.dead) {
                dead.push(soyboi)
            }
        })

        dead.forEach(soyboi => {
            this.soybois.removeItem(soyboi)
        })
    }
}

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
      particleHandler.addEmitter(
        new ParticleEmitter(
          'explode', 
          {x: pos.x, y: pos.y}
        )
      )
      this.dead = true
    }

    if (pos.y > window_height) {
        this.dead = true
    }
  }
}