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
  try {
    fill(color.r, color.g, color.b)
  } catch (error) {
    console.log("Unable to get color")
    console.log(color)
    fill(255, 255, 255)
  }
  stroke(0)
  strokeWeight(strokeW)
  text(str, 0, 0)
  pop()
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}