class SoyboiHandler {
  constructor() {
    this.soybois = []
    this.delayed_soybois = []
    
    this.hasSoyboi = function(name) {
      let matches = false
      this.soybois.forEach(soyboi => {
        if (soyboi.name == name) {
          matches = true
        }
      })
      return matches
    }

    this.addSoyboi = function(soyboi, delay = 0) {
      if (delay == 0) {
        this.soybois.push(soyboi)
      }
      else {
        this.delayed_soybois.push({soyboi: soyboi, delay: delay})
      }
    }
  }

  show() {
    let dead = []
    this.soybois.forEach(soyboi => {
      soyboi.show()
      if (soyboi.dead) {
        dead.push(soyboi)
      }
    })

    dead.forEach(soyboi => {
      this.soybois.removeItem(soyboi)
    })

    dead == []
    this.delayed_soybois.forEach(delayed_soyboi => {
      delayed_soyboi.delay--
      if (delayed_soyboi.delay <= 0) {
        this.soybois.push(delayed_soyboi.soyboi)
        dead.push(delayed_soyboi)
      }
    })

    dead.forEach(soyboi => {
      this.delayed_soybois.removeItem(soyboi)
    })
  }
}

class Soyboi {
  constructor(x, name = "", color = Colors.WHITE) {
    this.name = name
    this.color = color

    this.r = 18
    this.body = Bodies.circle(x, 0, this.r, {mass: 10, restitution: 0.9})
    
    this.shown = false
    this.hitBottom = false
    this.fanale = 0
    this.dead = false
    this.life = 900

    this.image = soyboi_images[0].image
    soyboi_images.forEach(image => {
      if (image.name == this.name) {
        this.image = image.image
      }
    })
  }
  

  show() {
    if (!this.shown) {
      this.shown = true
      World.add(world, this.body)
    }

    var pos = this.body.position
    var angle = this.body.angle

    push()
    translate(pos.x, pos.y)
    rotate(angle)
    //circle(0, 0, this.r*2)
    translate(-21, -40)
    scale(this.r / 300 + this.fanale / 1000)
    image(this.image, 0, 0)
    pop()

    if (this.name != "") {
      drawText(this.name, {x: pos.x, y: pos.y - this.r - 5}, 20, 1.5, CENTER, this.color, false)
    }
    
    if (pos.y > window_height) {
      this.dead = true
    }

    this.life--
    if (this.life <= 0) {
      this.hitBottom = true
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

    if (this.dead) {
      World.remove(world, this.body)
    }
  }
}