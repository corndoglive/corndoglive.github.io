ParticleEmitter = function(type, pos, collision) {
    this.pos = pos
    this.particles = []
    this.dead = false
    switch(type) {
        case 'impact':
            for (let i = 0; i < 10; i++) {
                vel = {
                    x: collision.tangent.x * getRandomFloat(-4, 4), 
                    y: collision.tangent.y * getRandomFloat(-4, 4)
                }
                life = Math.random() * 20
                col = {
                    r: getRandomFloat(220, 255),
                    g: getRandomFloat(220, 255),
                    b: 0
                }
                this.particles.push(new Particle(this.pos, {w:4, h:2}, vel, life, col))
            }
            break
        case 'explode':
            for (let i = 0; i < 20; i++) {
                vel = {
                    x: getRandomFloat(-10, 10),
                    y: getRandomFloat(-10, -15)
                }
                size = {
                    w: getRandomFloat(10, 20),
                    h: getRandomFloat(10, 20)
                }
                life = Math.random() * 50
                col = {
                    r: getRandomFloat(188, 251),
                    g: getRandomFloat(243, 253),
                    b: getRandomFloat(160, 166)
                }
                this.particles.push(new Particle(this.pos, size, vel, life, col, true))
            }
            break
        default:
            //none
    }

    this.show = function() {
        dead = []
        this.particles.forEach(particle => {
            particle.show()
            if (particle.dead) {
                dead.push(particle)
            }
        })
        dead.forEach(particle => {
            this.particles.removeItem(particle)
        })
        if (this.particles.length == 0) {
            this.dead = true
        }
    }
}

Particle = function(pos, size, vel, life, color, gravity  = false) {
    this.pos = pos
    this.size = size
    if (this.size.w < this.size.h) {
        this.size = {w: this.size.h, h: this.size.w}
    }
    this.vel = vel
    this.life = life
    this.gravity = gravity
    this.dead = false
    this.color = color
    this.rot = 0

    this.show = function() {
        this.life--
        if (this.life <= 0) {
            this.dead = true
            return
        }

        this.pos = {
            x: this.pos.x + this.vel.x,
            y: this.pos.y + this.vel.y
        }

        if (this.gravity) {
            this.vel = {
                x: this.vel.x,
                y: ((this.vel.y >= 10) ? 10 : this.vel.y + 0.75)
            }
        } else {
            this.vel = {
                x: this.vel.x * 0.9,
                y: this.vel.y * 0.9
            }
        }
        
        this.rot = Math.atan2(this.vel.y, this.vel.x)

        push()
        strokeWeight(0.5)
        stroke(0, 0, 0, this.life * 50)
        fill(this.color.r, this.color.g, this.color.b, this.life * 50)
        translate(this.pos.x, this.pos.y)
        rotate(this.rot)
        if (gravity) {
            ellipse(-this.size.w/2, -this.size.h/2, this.size.w, this.size.h)
        } else {
            rect(-this.size.w/2, -this.size.h/2, this.size.w, this.size.h)
        }
        pop()
    }
}