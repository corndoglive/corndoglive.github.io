Array.prototype.removeItem = function(value) {
  var index = this.indexOf(value)
  if (index > -1) {
    this.splice(index, 1)
  }
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}

function drawText(str, pos, size, strokeW = 4, align = LEFT, color = {r: 255, g: 255, b: 255}) {
  push()
  translate(pos.x, pos.y)
  textSize(size)
  textAlign(align)
  fill(color.r, color.g, color.b)
  stroke(0)
  strokeWeight(strokeW)
  text(str, 0, 0)
  pop()
}