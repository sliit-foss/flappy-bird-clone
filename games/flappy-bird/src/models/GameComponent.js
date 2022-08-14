const GameComponent = class GameComponent {
  constructor(width, height, color, x, y, type, gameArea) {
    this.type = type
    this.score = 0
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.gravity = 0
    this.gravitySpeed = 0
    this.color = color
    this.gameArea = gameArea
  }
  update() {
    const ctx = this.gameArea.context
    if (this.type == 'text') {
      ctx.font = this.width + ' ' + this.height
      ctx.fillStyle = this.color
      ctx.fillText(this.text, this.x, this.y)
    } else {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  newPos() {
    this.gravitySpeed += this.gravity
    this.x += this.speedX
    this.y += this.speedY + this.gravitySpeed
    this.hitBottom()
  }
  hitBottom() {
    const rockbottom = this.gameArea.canvas.height - this.height
    if (this.y > rockbottom) {
      this.y = rockbottom
      this.gravitySpeed = 0
    }
  }
  crashWith(otherobj) {
    const myleft = this.x
    const myright = this.x + this.width
    const mytop = this.y
    const mybottom = this.y + this.height
    const otherleft = otherobj.x
    const otherright = otherobj.x + otherobj.width
    const othertop = otherobj.y
    const otherbottom = otherobj.y + otherobj.height
    let crash = true
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
      crash = false
    }
    return crash
  }
}

export default GameComponent
