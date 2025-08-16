class BucketHandler {
  constructor() {
    this.buckets = []
    
    for (let x = 0; x < 7; x++) {
      const mult = Math.abs(Math.abs(x - 3) - 4) / 2
      this.buckets.push(new Bucket(x * 82 + 20, mult))
    }
  }
  
  show() {
    this.buckets.forEach(bucket => {
      bucket.show()
    })
  }
}

class Bucket {
  constructor(x, mult) {
    this.x = x
    this.y = window_height - 20
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
    this.alpha = 150

    switch (this.mult) {
      case 1.5:
        this.color = {r: 250, g: 250, b: 130}
        break
      case 1:
        this.color = {r: 250, g: 200, b: 130}
        break
      case 0.5:
        this.color = {r: 250, g: 150, b: 100}
        break
      default:
        this.color = {r: 100, g: 250, b: 100}
    }

    this.floor = Bodies.rectangle(this.x, this.y, this.width, this.wall, {isStatic: true})
    World.add(world, this.floor)
    this.left = Bodies.rectangle(this.x, this.y - 50, this.wall, 100, {isStatic: true})
    World.add(world, this.left)
    this.right = Bodies.rectangle(this.x + this.width - this.wall, this.y - 50, this.wall, 100, {isStatic: true})
    World.add(world, this.right)
  }
  
  show() {
    this.collision()
    
    if (this.alpha > 150) {
      this.alpha -= (this.alpha / 50)
    }

    push()
    translate(this.x, this.y)
    
    const gradient = drawingContext.createLinearGradient(
      0, -this.alpha + 50, 0, -50
    )
    gradient.addColorStop(0, color(255, 255, 255, 0))
    gradient.addColorStop(1, color(this.color.r, this.color.g, this.color.b, this.alpha))
    drawingContext.fillStyle = gradient
    strokeWeight(0)
    rect(0, -200, this.width, 200)
    
    strokeWeight(1)

    fill(0, 0, 0)
    beginShape()
    this.vertexes.forEach(vert => {
      vertex(vert.x + 3, vert.y + 2)
    })
    endShape(CLOSE)

    fill(this.color.r, this.color.g, this.color.b)
    beginShape()
    this.vertexes.forEach(vert => {
      vertex(vert.x, vert.y)
    })
    endShape(CLOSE)


    pop()

    drawText("x" + this.mult, {x: this.x + this.width / 2, y: this.y - 10}, 30, 4, CENTER)
  }

  collision() {
    soyboiHandler.soybois.forEach(soyboi => {
      if (!soyboi.shown || soyboi.hitBottom) return
      if (soyboi.body.position.y > this.y - 100
        && soyboi.body.position.x > this.x
        && soyboi.body.position.x < this.x + this.width) {
        soyboi.hitBottom = true
        score = Math.ceil(score * this.mult)
        this.alpha = 255
      }
    })
  }
}