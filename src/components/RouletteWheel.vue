<script setup lang="ts">
import { computed, ref } from 'vue'
import '../styles/RouletteWheel.css'

type Props = {
  items: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'finished', index: number): void
}>()

// Constants
const FULL_CIRCLE = 360
const SEGMENT_CENTER_OFFSET = 0.5
const SPIN_ROTATIONS = 5
const GRADIENT_START_ANGLE = -90
const FIRST_WIN_INDEX = 4

// Confetti constants
const CONFETTI_COUNT = 300
const CONFETTI_FROM_CENTER_COUNT = 150
const CONFETTI_MIN_VELOCITY = 200
const CONFETTI_MAX_VELOCITY = 500
const CONFETTI_MAX_ROTATION = 720
const CONFETTI_MAX_DELAY = 0.15
const CONFETTI_ANGLE_RANDOMNESS = 20
const CANNON_SPREAD_ANGLE = 90

// Text animation constants
const TEXT_CHAR_DELAY = 0.05
const GREETING_TEXT = 'Felicidades Gordita linda'

const spinning = ref(false)
const rotation = ref(0)
const selectedIndex = ref<number | null>(null)
const isFirstSpin = ref(true)
const showConfetti = ref(false)


const gradient = computed(() => {
  const n = props.items.length || 1
  const step = FULL_CIRCLE / n
  const parts: string[] = []
  for (let i = 0; i < n; i++) {
    const color = `hsl(${(i * FULL_CIRCLE) / n}, 70%, 55%)`
    const start = i * step
    const end = (i + 1) * step
    parts.push(`${color} ${start}deg ${end}deg`)
  }
  return `conic-gradient(from ${GRADIENT_START_ANGLE}deg, ${parts.join(', ')})`
})

function spin() {
  if (spinning.value || props.items.length === 0) return
  spinning.value = true
  showConfetti.value = false
  const n = props.items.length
  
  // First spin always wins index 4, then random
  const target = isFirstSpin.value 
    ? Math.min(FIRST_WIN_INDEX, n - 1) 
    : Math.floor(Math.random() * n)
  
  selectedIndex.value = target
  const targetAngle = (target + SEGMENT_CENTER_OFFSET) * (FULL_CIRCLE / n)
  const currentInCycle = ((rotation.value % FULL_CIRCLE) + FULL_CIRCLE) % FULL_CIRCLE
  const delta = (targetAngle - currentInCycle + FULL_CIRCLE) % FULL_CIRCLE
  const final = rotation.value + FULL_CIRCLE * SPIN_ROTATIONS + delta
  rotation.value = final
}

function onTransitionEnd(e: TransitionEvent) {
  if (e.propertyName !== 'transform') return
  if (selectedIndex.value != null) {
    emit('finished', selectedIndex.value)
    // Show confetti on first spin
    if (isFirstSpin.value) {
      showConfetti.value = true
      isFirstSpin.value = false
    }
  }
  spinning.value = false
}

function reset() {
  spinning.value = false
  rotation.value = 0
  selectedIndex.value = null
  isFirstSpin.value = true
  showConfetti.value = false
}

defineExpose({
  spin,
  reset
})

function getConfettiStyle(index: number) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#00b894', '#e17055', '#74b9ff']
  
  // Half confetti from center, half from cannons around the wheel
  const isFromCenter = index < CONFETTI_FROM_CENTER_COUNT
  
  let startX: number, startY: number, angle: number
  
  if (isFromCenter) {
    // Center explosion - shoots in all directions
    startX = 0
    startY = 0
    angle = (index / CONFETTI_FROM_CENTER_COUNT) * FULL_CIRCLE + (Math.random() - 0.5) * CONFETTI_ANGLE_RANDOMNESS
  } else {
    // Cannon positions around the wheel
    const cannonPositions = [
      { x: 0, y: -210 },      // top
      { x: 0, y: 210 },       // bottom
      { x: -210, y: 0 },      // left
      { x: 210, y: 0 },       // right
      { x: -150, y: -150 },   // top-left
      { x: 150, y: -150 },    // top-right
      { x: -150, y: 150 },    // bottom-left
      { x: 150, y: 150 }      // bottom-right
    ]
    
    const cannonIndex = (index - CONFETTI_FROM_CENTER_COUNT) % cannonPositions.length
    const cannon = cannonPositions[cannonIndex]!
    startX = cannon.x
    startY = cannon.y
    
    // Shoot outward from cannon position
    const spreadAngle = (Math.random() - 0.5) * CANNON_SPREAD_ANGLE
    const baseAngle = Math.atan2(cannon.y, cannon.x) * (180 / Math.PI)
    angle = baseAngle + spreadAngle
  }
  
  const velocity = CONFETTI_MIN_VELOCITY + Math.random() * (CONFETTI_MAX_VELOCITY - CONFETTI_MIN_VELOCITY)
  const x = startX + Math.cos((angle * Math.PI) / 180) * velocity
  const y = startY + Math.sin((angle * Math.PI) / 180) * velocity
  const rotation = Math.random() * CONFETTI_MAX_ROTATION
  const delay = Math.random() * CONFETTI_MAX_DELAY
  
  return {
    '--start-x': `${startX}px`,
    '--start-y': `${startY}px`,
    '--x': `${x}px`,
    '--y': `${y}px`,
    '--rotation': `${rotation}deg`,
    '--delay': `${delay}s`,
    backgroundColor: colors[index % colors.length]
  }
}
</script>

<template>
  <div class="roulette">
    <div class="wheel" :style="{ background: gradient }"></div>
    <div
      class="needle-rotator"
      :style="{
        transform: `rotate(${rotation}deg)`,
        transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.32, 1.34)' : 'none'
      }"
      @transitionend="onTransitionEnd"
    >
      <div class="needle">
        <span class="hub"></span>
      </div>
    </div>
    <div class="center-dot"></div>
    
    <!-- Confetti cannons -->
    <div v-if="showConfetti" class="confetti-container">
      <div v-for="i in CONFETTI_COUNT" :key="i" class="confetti" :style="getConfettiStyle(i)"></div>
    </div>
    
    <!-- Fireworks text -->
    <div v-if="showConfetti" class="fireworks-text">
      <span v-for="(char, i) in GREETING_TEXT" :key="i" :style="{ animationDelay: `${i * TEXT_CHAR_DELAY}s` }">
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
    </div>
  </div>
</template>
