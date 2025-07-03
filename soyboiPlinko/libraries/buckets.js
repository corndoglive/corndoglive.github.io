function BucketHandler() {
    this.buckets = []
    for (x = 0; x < 7; x++) {
        mult = Math.abs(Math.abs(x - 3) - 4)/2
        this.buckets.push(new Bucket(x * 82, mult))
    }

    this.show = function() {
        this.buckets.forEach(bucket => {
            bucket.show()
        })
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

    drawText("x" + this.mult, {x: this.x + this.width / 2, y: this.y - 100}, 20, 1.5, CENTER)
  }

  this.collision = function() {
    soyboiHandler.soybois.forEach(soyboi => {
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