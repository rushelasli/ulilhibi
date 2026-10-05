<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const MAX_STARS = 60
const SPAWN_INTERVAL_MS = 200

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let stars: Star[] = []
let spawnInterval: number | null = null

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

class Star {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  trailLength: number
  history: { x: number; y: number }[]
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = random(0, canvas.width)
    this.y = random(0, 50)
    this.size = random(1, 3)
    this.speedY = random(1, 4)
    this.speedX = -this.speedY * random(0.3, 1)
    this.trailLength = Math.floor(5 + ((this.speedY - 1) / 3) * 25)
    this.history = []
  }

  update(): boolean {
    this.x += this.speedX
    this.y += this.speedY
    this.history.push({ x: this.x, y: this.y })
    if (this.history.length > this.trailLength) this.history.shift()
    if (this.y > this.canvas.height || this.x < -50) return false
    return true
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Theme-aware: white streaks on dark, graphite streaks on light
    const light = !document.documentElement.classList.contains('dark')
    const [r, g, b] = light ? [82, 82, 91] : [255, 255, 255]
    for (let i = 0; i < this.history.length; i++) {
      const alpha = ((i + 1) / this.history.length) * 0.5
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
      ctx.beginPath()
      ctx.arc(this.history[i].x, this.history[i].y, this.size * 0.6, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = light ? '#3f3f46' : 'white'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const parent = canvas.parentElement
  if (!parent) return
  canvas.width = parent.offsetWidth
  canvas.height = parent.offsetHeight
}

function spawnStar() {
  if (document.hidden) return
  const canvas = canvasRef.value
  if (!canvas) return
  if (stars.length >= MAX_STARS) stars.shift()
  stars.push(new Star(canvas))
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  stars = stars.filter((s) => s.update())
  stars.forEach((s) => s.draw(ctx))
  animationId = requestAnimationFrame(animate)
}

function start() {
  stop()
  if (!document.hidden) {
    spawnInterval = window.setInterval(spawnStar, SPAWN_INTERVAL_MS)
    animate()
  }
}

function stop() {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  if (spawnInterval) {
    clearInterval(spawnInterval)
    spawnInterval = null
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    stop()
  } else {
    if (stars.length > MAX_STARS) stars = stars.slice(-Math.floor(MAX_STARS / 2))
    start()
  }
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  start()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  stop()
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 h-full w-full" />
</template>
