class RainbowColorObject {
  constructor(offset = 0) {
    this.offset = offset
  }

  setOffset(offset) {
    this.offset = offset
    return this
  }

  getOffset() {
    this.offset++
    if (this.offset >= 360) {
      this.offset = 0
    }
    return this.offset
  }
}

const Colors = {
  WHITE: {r: 255, g: 255, b: 255},
  RAINBOW: new RainbowColorObject()
}

Array.prototype.removeItem = function(value) {
  var index = this.indexOf(value)
  if (index > -1) {
    this.splice(index, 1)
  }
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}

function drawText(str, pos, size, strokeW = 4, align = LEFT, color = Colors.WHITE, shadow = true) {
  push()
  translate(pos.x, pos.y)
  textSize(size)
  textAlign(align)
  stroke(0)
  strokeWeight(strokeW)

  
  if (shadow) {
    fill(0, 0, 0)
    text(str, 3, 2)
  }
  try {
    if (color instanceof RainbowColorObject) {
      colorMode(HSB)
      fill(color.getOffset(), 100, 100)
    } else {
      fill(color.r, color.g, color.b)
    }
  } catch (error) {
    console.log("Unable to get color")
    console.log(color)
    fill(255, 255, 255)
  }
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

function getRandLoc() {
  return (window_width / 2 - 100) + Math.random() * 200
}

