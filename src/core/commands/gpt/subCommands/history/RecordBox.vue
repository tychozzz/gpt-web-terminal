<template>
  <div>🙋 {{ gptCommand }}</div>
  <div v-html="result" class="chat-box"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs } from "vue";
import { marked } from 'marked'
import hljs from "highlight.js";

marked.setOptions({
  renderer: new marked.Renderer,
  gfm: true,
  async: false,
  highlight(code: string): string {
    return hljs.highlightAuto(code).value
  },
})

interface RecordProps {
  gptCommand: string;
  gptOutput: string;
}

const props = withDefaults(defineProps<RecordProps>(), {});
const { gptCommand, gptOutput } = toRefs(props);


const result = computed(() => {
  console.log("gptCommand -", gptOutput)
  console.log("gptOutput -", marked(gptOutput.value))
  return marked(gptOutput.value)
})

onMounted(async () => {
  
});
</script>

<style scoped>
.chat-box {
  background-color: #292421;
  margin: 10px 0 10px 0;
  padding: 20px 20px 5px 20px;
}
</style>
