<script setup lang="ts">
import { ref } from 'vue'
import RouletteWheel from './components/RouletteWheel.vue'
import { useGifts, type Gift } from './composables/useGifts'
import './styles/App.css'

const { giftNames, allGifts, letter, getGiftByIndex } = useGifts()
const items = giftNames

const wheelRef = ref<InstanceType<typeof RouletteWheel> | null>(null)
const isSpinning = ref(false)
const winnerIndex = ref<number | null>(null)
const wonGifts = ref<Gift[]>([])
const showFinalCelebration = ref(false)
const currentWonGift = ref<Gift | null>(null)
const showGiftPresentation = ref(false)
const showAllGiftsPreview = ref(false)
const startAllGiftsPreview = ref(false)
const showFirstWinAnimation = ref(false)
const MAX_GIFTS = 4

function spin() {
  if (!items.value.length || isSpinning.value || wonGifts.value.length >= MAX_GIFTS) return
  winnerIndex.value = null
  isSpinning.value = true
  wheelRef.value?.spin()
}

function onFinished(idx: number) {
  winnerIndex.value = idx
  isSpinning.value = false
  // Show the won gift in the center
  const gift = getGiftByIndex(idx)
  if (gift) {
    // For the first gift (index 4), wait 4 seconds to let confetti/fireworks show
    // For other gifts, show immediately
    const isFirstWin = wonGifts.value.length === 0
    const presentationDelay = isFirstWin ? 4000 : 0
    
    // Enable first win animation flag if it's the first win
    if (isFirstWin) {
      showFirstWinAnimation.value = true
    }
    
    setTimeout(() => {
      currentWonGift.value = gift
      showGiftPresentation.value = true
      
      // Disable first win animation flag when presentation starts
      if (isFirstWin) {
        showFirstWinAnimation.value = false
      }
      
      // After 3 seconds, hide presentation and add to sidebar
      setTimeout(() => {
        showGiftPresentation.value = false
        wonGifts.value.push(gift)
        currentWonGift.value = null
        
        // Check if we've reached the limit
        if (wonGifts.value.length >= MAX_GIFTS) {
          setTimeout(() => {
            showFinalCelebration.value = true
          }, 1000)
        }
      }, 3000)
    }, presentationDelay)
  }
}

function getFinalConfettiStyle(index: number) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#00b894', '#e17055', '#74b9ff']
  const angle = Math.random() * 360
  const velocity = 300 + Math.random() * 500
  const x = Math.cos((angle * Math.PI) / 180) * velocity
  const y = Math.sin((angle * Math.PI) / 180) * velocity
  const rotation = Math.random() * 1080
  const delay = Math.random() * 0.3
  const duration = 3 + Math.random() * 2
  
  return {
    '--x': `${x}px`,
    '--y': `${y}px`,
    '--rotation': `${rotation}deg`,
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
    backgroundColor: colors[index % colors.length]
  }
}

function getPreviewConfettiStyle(index: number) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#00b894', '#e17055', '#74b9ff']
  const angle = Math.random() * 360
  const velocity = 250 + Math.random() * 600
  const x = Math.cos((angle * Math.PI) / 180) * velocity
  const y = Math.sin((angle * Math.PI) / 180) * velocity
  const rotation = Math.random() * 1440
  const delay = Math.random() * 0.5
  const duration = 4 + Math.random() * 3
  
  return {
    '--x': `${x}px`,
    '--y': `${y}px`,
    '--rotation': `${rotation}deg`,
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
    backgroundColor: colors[index % colors.length]
  }
}

function showSavePreview() {
  startAllGiftsPreview.value = true
  setTimeout(() => {
    showAllGiftsPreview.value = true
  }, 3000)
}

function saveAllGifts() {
  // Save gifts list
  const giftsToSave = [ ...wonGifts.value, ...allGifts.value]
  const giftsText = (giftsToSave as Gift[])
    .map(g => `${g.name}\n${g.description}\n`)
    .join('\n')
  const blobGifts = new Blob([giftsText], { type: 'text/plain' })
  const urlGifts = URL.createObjectURL(blobGifts)
  const aGifts = document.createElement('a')
  aGifts.href = urlGifts
  aGifts.download = 'all-gifts.txt'
  aGifts.click()
  URL.revokeObjectURL(urlGifts)
  
  // Save love letter surrounded by hearts
  const heartBorder = '💖'.repeat(30)
  const letterContent = `${heartBorder}\n\n💌 Another thought of love about you 💌\n\n${heartBorder}\n\n${letter}\n\n${heartBorder}\n💖 te amo mi gordita linda 💖\n${heartBorder}`
  
  const blobLetter = new Blob([letterContent], { type: 'text/plain; charset=utf-8' })
  const urlLetter = URL.createObjectURL(blobLetter)
  const aLetter = document.createElement('a')
  aLetter.href = urlLetter
  aLetter.download = 'love-letter.txt'
  aLetter.click()
  URL.revokeObjectURL(urlLetter)
  
  // Reset the game after saving
  showAllGiftsPreview.value = false
  startAllGiftsPreview.value = false
  showFinalCelebration.value = false
  showGiftPresentation.value = false
  showFirstWinAnimation.value = false
  wonGifts.value = []
  currentWonGift.value = null
  winnerIndex.value = null
  wheelRef.value?.reset()
}

function playAgain() {
  wonGifts.value = []
  showFinalCelebration.value = false
  showGiftPresentation.value = false
  showAllGiftsPreview.value = false
  startAllGiftsPreview.value = false
  showFirstWinAnimation.value = false
  currentWonGift.value = null
  winnerIndex.value = null
  // Reset the roulette wheel to initial state (including first spin)
  wheelRef.value?.reset()
}
</script>

<template>
  <main class="layout">
    <aside v-if="wonGifts.length > 0" class="won-gifts-sidebar">
      <h3>Won Gifts 🎉</h3>
      <ul class="won-list">
        <li v-for="(gift, i) in wonGifts" :key="i" class="won-gift-item">
          <strong class="gift-name">{{ gift.name }}</strong>
          <div class="gift-description">{{ gift.description }}</div>
        </li>
      </ul>
    </aside>
    
    <section class="center">
      <RouletteWheel ref="wheelRef" :items="items" @finished="onFinished" />
      <div class="controls">
        <button :disabled="isSpinning || !items.length || showFirstWinAnimation || showGiftPresentation || showFinalCelebration || startAllGiftsPreview" @click="spin">
          {{ isSpinning ? 'Spinning...' : 'Spin' }}
        </button>
      </div>
      <p v-if="winnerIndex !== null" class="result">
        Winner: <strong>{{ items[winnerIndex] }}</strong> (index {{ winnerIndex }})
      </p>
    </section>

    <!-- Gift Presentation Overlay -->
    <div v-if="showGiftPresentation && currentWonGift" class="gift-presentation-overlay">
      <div class="gift-presentation-card">
        <div class="presentation-sparkle">✨</div>
        <h2 class="presentation-title">You Won!</h2>
        <div class="presentation-gift-name">{{ currentWonGift.name }}</div>
        <div class="presentation-gift-description">{{ currentWonGift.description }}</div>
        <div class="presentation-sparkle">✨</div>
      </div>
    </div>

    <!-- <section class="right">
      <h2>Gifts</h2>
      <p>One per line:</p>
      <textarea v-model="inputText" rows="12" class="gift-input"></textarea>
      <ul class="gift-list">
        <li v-for="(g, i) in items" :key="i" :class="{ active: i === winnerIndex }">
          {{ i }} — {{ g }}
        </li>
      </ul>
    </section> -->
    
    <!-- Final celebration overlay -->
    <div v-if="showFinalCelebration" class="final-celebration">
      <div class="confetti-background">
        <div v-for="i in 500" :key="i" class="final-confetti" :style="getFinalConfettiStyle(i)"></div>
      </div>
      <div class="celebration-content">
        <h1 class="celebration-title">🎉 Congratulations! 🎉</h1>
        <p class="celebration-subtitle">You've won all {{ MAX_GIFTS }} gifts!</p>
        <ul class="final-gifts-list">
          <li v-for="(gift, i) in wonGifts" :key="i" :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="gift-name">{{ gift.name }}</div>
            <div class="gift-description">{{ gift.description }}</div>
          </li>
        </ul>
        <div class="celebration-buttons">
          <button class="celebration-btn save-btn" @click="showSavePreview">
            💾 Save Gifts
          </button>
          <button class="celebration-btn play-again-btn" @click="playAgain">
            🔄 Play Again
          </button>
        </div>
      </div>
    </div>

    <!-- All Gifts Preview Overlay -->
    <div v-if="startAllGiftsPreview" class="all-gifts-preview-overlay">
      <!-- Confetti background -->
      <div class="preview-confetti-background">
        <div v-for="i in 400" :key="i" class="preview-confetti" :style="getPreviewConfettiStyle(i)"></div>
      </div>
      
      <!-- Fireworks text -->
      <div class="preview-fireworks-text">
        <span v-for="(char, i) in 'CONGRATULATIONS'" :key="i" :style="{ animationDelay: `${i * 0.08}s` }">
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </div>
      
      <div v-if="showAllGiftsPreview" class="all-gifts-preview-content">
        <h1 class="preview-title">📦 All Gifts 📦</h1>
        <p class="preview-subtitle">You have won a plus package with all the gifts !!!!</p>
        <div class="gifts-preview-container">
          <ul class="all-gifts-list">
            <li v-for="(gift, i) in allGifts" :key="i" :style="{ animationDelay: `${i * 0.05}s` }">
              <div class="preview-gift-name">{{ gift.name }}</div>
              <div class="preview-gift-description">{{ gift.description }}</div>
            </li>
          </ul>
        </div>
        <button class="continue-save-btn" @click="saveAllGifts">
          ✅ Continue & Save All Gifts
        </button>
      </div>
    </div>
  </main>
  
</template>
