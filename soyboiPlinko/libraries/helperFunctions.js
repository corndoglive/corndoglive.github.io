Array.prototype.removeItem = function(value) {
  var index = this.indexOf(value)
  if (index > -1) {
    this.splice(index, 1)
  }
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}