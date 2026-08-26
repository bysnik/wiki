<template>
  <div class="image-zoom-wrapper">
    <img
      :src="resolvedSrc"
      :alt="alt"
      class="thumbnail"
      @click="openModal"
    />

    <Teleport to="body">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">✕</button>

          <div
            ref="imageContainerRef"
            class="image-container"
            @wheel.prevent="onWheel"
          >
            <img
              ref="imageRef"
              :src="resolvedSrc"
              :alt="alt"
              class="modal-image"
              :style="{
                transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }"
              @mousedown="onMouseDown"
              @dragstart.prevent
              @load="onImageLoad"
            />
          </div>

          <div class="zoom-controls">
            <button @click="zoomOut" :disabled="scale <= MIN_SCALE">−</button>

            <!-- Отображение масштаба с возможностью редактирования -->
            <span v-if="!isEditing" class="zoom-display" @click="startEditing">
              {{ Math.round(scale * 100) }}%
            </span>
            <input
              v-else
              ref="zoomInputRef"
              v-model.number="editValue"
              type="number"
              min="10"
              max="500"
              step="1"
              class="zoom-input"
              @blur="applyEdit"
              @keyup.enter="applyEdit"
              @keyup.escape="cancelEdit"
              @focus="$event.target.select()"
            />

            <button @click="zoomIn" :disabled="scale >= MAX_SCALE">+</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Image' },
})

const resolvedSrc = computed(() => withBase(props.src))

const isOpen = ref(false)
const scale = ref(1)
const panX = ref(0)
const panY = ref(0)

const imageRef = ref(null)
const imageContainerRef = ref(null)

const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const startPanX = ref(0)
const startPanY = ref(0)

// Новые пределы: 10% – 500%
const MIN_SCALE = 0.1
const MAX_SCALE = 5

// Редактирование масштаба
const isEditing = ref(false)
const editValue = ref(100)
const zoomInputRef = ref(null)

const fitToScreen = () => {
  if (!imageRef.value || !imageContainerRef.value) return
  const img = imageRef.value
  const container = imageContainerRef.value

  const naturalW = img.naturalWidth
  const naturalH = img.naturalHeight
  if (!naturalW || !naturalH) return

  const containerW = container.clientWidth
  const containerH = container.clientHeight

  const paddingX = 40
  const paddingY = 80

  const availW = containerW - paddingX * 2
  const availH = containerH - paddingY * 2

  let newScale = Math.min(availW / naturalW, availH / naturalH)
  newScale = Math.min(newScale, 1)
  newScale = Math.max(newScale, MIN_SCALE)

  scale.value = newScale
  panX.value = 0
  panY.value = 0
}

const onImageLoad = () => {
  if (isOpen.value) {
    fitToScreen()
  }
}

const openModal = () => {
  isOpen.value = true
  scale.value = 1
  panX.value = 0
  panY.value = 0
  document.body.style.overflow = 'hidden'

  nextTick(() => {
    setTimeout(() => {
      if (imageRef.value && imageRef.value.complete) {
        fitToScreen()
      }
    }, 100)
  })
}

const closeModal = () => {
  isOpen.value = false
  document.body.style.overflow = ''
  if (isEditing.value) cancelEdit()
}

// Редактирование
const startEditing = () => {
  isEditing.value = true
  editValue.value = Math.round(scale.value * 100)
  nextTick(() => {
    if (zoomInputRef.value) zoomInputRef.value.focus()
  })
}

const applyEdit = () => {
  if (!isEditing.value) return
  let val = Number(editValue.value)
  if (isNaN(val)) {
    cancelEdit()
    return
  }
  // Ограничиваем в процентах от 10 до 500
  val = Math.min(500, Math.max(10, val))
  const newScale = val / 100
  if (newScale !== scale.value) {
    scale.value = newScale
    panX.value = 0
    panY.value = 0
    nextTick(() => constrainPan())
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}

// Кнопки с шагом 10%
const zoomIn = () => {
  if (scale.value < MAX_SCALE) {
    scale.value = Math.min(scale.value + 0.1, MAX_SCALE)
    panX.value = 0
    panY.value = 0
    nextTick(() => constrainPan())
  }
}

const zoomOut = () => {
  if (scale.value > MIN_SCALE) {
    scale.value = Math.max(scale.value - 0.1, MIN_SCALE)
    panX.value = 0
    panY.value = 0
    nextTick(() => constrainPan())
  }
}

const onWheel = (e) => {
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  const oldScale = scale.value
  const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, oldScale + delta))
  if (newScale !== oldScale) {
    const ratio = newScale / oldScale
    panX.value = panX.value * ratio
    panY.value = panY.value * ratio
    scale.value = newScale
    nextTick(() => constrainPan())
  }
}

const constrainPan = () => {
  if (!imageRef.value || !imageContainerRef.value) return
  const container = imageContainerRef.value
  const img = imageRef.value
  const cw = container.clientWidth
  const ch = container.clientHeight
  const iw = img.naturalWidth * scale.value
  const ih = img.naturalHeight * scale.value

  const maxX = Math.max(0, (iw - cw) / 2)
  const maxY = Math.max(0, (ih - ch) / 2)
  panX.value = Math.min(maxX, Math.max(-maxX, panX.value))
  panY.value = Math.min(maxY, Math.max(-maxY, panY.value))
}

const onMouseDown = (e) => {
  if (e.button !== 0) return
  isDragging.value = true
  startX.value = e.clientX
  startY.value = e.clientY
  startPanX.value = panX.value
  startPanY.value = panY.value
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (e) => {
  if (!isDragging.value) return
  const dx = e.clientX - startX.value
  const dy = e.clientY - startY.value
  panX.value = startPanX.value + dx
  panY.value = startPanY.value + dy
  constrainPan()
}

const onMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) closeModal()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.thumbnail {
  cursor: pointer;
  max-width: 100%;
  display: block;
  border-radius: 8px;
  transition: opacity 0.2s;
}
.thumbnail:hover {
  opacity: 0.85;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  pointer-events: none;
}

.modal-image {
  max-width: none;
  max-height: none;
  width: auto;
  height: auto;
  object-fit: contain;
  user-select: none;
  border-radius: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: none;
  pointer-events: auto;
}

.close-btn,
.zoom-controls {
  pointer-events: auto;
}

.close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s;
}
.close-btn:hover {
  background: rgba(255, 0, 0, 0.8);
}

.zoom-controls {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border-radius: 40px;
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 16px;
  z-index: 10;
}

.zoom-controls button {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zoom-controls button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}
.zoom-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.zoom-display {
  min-width: 60px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
  user-select: none;
}
.zoom-display:hover {
  background: rgba(255, 255, 255, 0.1);
}

.zoom-input {
  width: 60px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 4px;
  color: #000;
  font-size: 16px;
  padding: 4px 6px;
  text-align: center;
  outline: none;
  font-variant-numeric: tabular-nums;
}
.zoom-input:focus {
  background: #fff;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}
</style>