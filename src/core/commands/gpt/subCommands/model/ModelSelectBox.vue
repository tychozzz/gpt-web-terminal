<template>
  <div v-if="!isSet" @keydown="handleKeyDown" class="select-box">
    <div>Current Model: <span style="color: #dae52e">{{ config.model }}</span></div>
    <div v-for="(item, index) in models" :key="index">
      <span v-if="current == index" style="color: dodgerblue;">> </span>
      <span v-else>&nbsp;&nbsp;</span>
      <span :style="current == index ? { color: 'dodgerblue' } : {}">{{ item.name }}</span>
    </div>
  </div>
  <div v-else>✅ Set GPT Model successfully!</div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { modelList, Model } from './models'
import { useConfigStore } from "../../configStore"
import { storeToRefs } from "pinia";

const emit = defineEmits(['start', 'finish']);

const isSet = ref<boolean>(false)

const models = ref<Model[]>(modelList)

const current = ref<number>(0)

const configStore = useConfigStore();
const { config } = storeToRefs(configStore);

const handleKeyDown = (e: any) => {
  if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
    handleCurrent(e.key)
  } else if (e.key == 'Enter') {
    handleSubmit()
  }
}

const handleSubmit = () => {
  console.log('current', current.value)
  configStore.changeModel(models.value[current.value].name)
  isSet.value = true
  emit('finish')
  window.removeEventListener('keydown', handleKeyDown)
}

const handleCurrent = (key: string) => {
  if (key == 'ArrowUp') {
    if (current.value == 0) {
      current.value = models.value.length - 1
    } else {
      current.value -= 1
    }
  } else if (key == 'ArrowDown') {
    if (current.value == models.value.length - 1) {
      current.value = 0
    } else {
      current.value += 1
    }
  }
}

onMounted(() => {
  emit('start')
  window.addEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.select-box {
  display: flex;
  flex-direction: column;
}
</style>