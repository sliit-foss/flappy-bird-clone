<template>
  <div id="game_area"></div>
</template>

<script>
import GameComponent from '../models/GameComponent.js'

export default {
  data() {
    const inMemCanvas = document.createElement('canvas')
    const inMemCtx = inMemCanvas.getContext('2d')
    return {
      gameArea: {
        canvas: document.createElement('canvas'),
        start: () => {
          this.gameArea.canvas.width = window.innerWidth
          this.gameArea.canvas.height = window.innerHeight
          this.gameArea.context = this.gameArea.canvas.getContext('2d')
          document.getElementById('game_area').appendChild(this.gameArea.canvas)
          this.gameArea.frameNo = 0
          this.gameArea.interval = setInterval(this.updateGameArea, 5)
        },
        clear: () => {
          this.gameArea.context.clearRect(0, 0, this.gameArea.canvas.width, this.gameArea.canvas.height)
        },
        frameNo: 0,
        interval: null,
        context: null,
      },
      inMemCanvas,
      inMemCtx,
      bird: null,
      obstacles: [],
      score: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.bird = new GameComponent(30, 30, 'red', 10, 120, 'bird', this.gameArea)
      this.bird.gravity = 0.05
      this.score = new GameComponent('30px', 'Consolas', 'black', 280, 40, 'text', this.gameArea)
      this.gameArea.start()
      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
          this.accelerate(0.05)
        } else if (event.key === 'ArrowDown') {
          this.accelerate(-0.2)
        }
      })
    },
    updateGameArea() {
      var x, height, gap, minHeight, maxHeight, minGap, maxGap
      for (let i = 0; i < this.obstacles.length; i += 1) {
        if (this.bird.crashWith(this.obstacles[i])) {
          return
        }
      }
      this.gameArea.clear()
      this.gameArea.frameNo += 1
      if (this.gameArea.frameNo == 1 || this.everyinterval(150)) {
        x = this.gameArea.canvas.width
        minHeight = 20
        maxHeight = 200
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
        minGap = 50
        maxGap = 200
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
        this.obstacles.push(new GameComponent(50, height, 'black', x, 0, 'obstacle', this.gameArea))
        this.obstacles.push(new GameComponent(50, x - height - gap, 'black', x, height + gap, 'obstacle', this.gameArea))
      }
      for (let i = 0; i < this.obstacles.length; i += 1) {
        this.obstacles[i].x += -1
        this.obstacles[i].update()
      }
      this.score.text = 'SCORE: ' + this.gameArea.frameNo
      this.score.update()
      this.bird.newPos()
      this.bird.update()
    },
    everyinterval(n) {
      if ((this.gameArea.frameNo / n) % 1 == 0) {
        return true
      }
      return false
    },
    accelerate(n) {
      this.bird.gravity = n
    },
    resizeCanvas() {
      this.inMemCanvas.width = this.gameArea.canvas.width
      this.inMemCanvas.height = this.gameArea.canvas.height
      this.inMemCtx.drawImage(this.gameArea, 0, 0)
      this.gameArea.canvas.width = window.innerWidth
      this.gameArea.canvas.height = window.innerHeight
      this.gameArea.canvas.getContext('2d').drawImage(this.inMemCanvas, 0, 0)
    },
    handleZoom() {
      document.addEventListener('mousewheel', (e) => {
        if (e.ctrlKey) {
          const browserZoomLevel = Math.round(window.devicePixelRatio * 100) / 100
          this.gameArea.context.translate(window.innerWidth / 2, window.innerHeight / 2)
          this.gameArea.context.scale(browserZoomLevel, browserZoomLevel)
        }
      })
    },
  },
}
</script>

<style scoped></style>
