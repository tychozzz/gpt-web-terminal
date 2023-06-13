<template>
  <div v-html="result" class="chat-box"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs, ref, defineEmits } from "vue";
import { marked } from 'marked'
import hljs from "highlight.js";

marked.setOptions({
  // 使用默认的渲染类
  renderer: new marked.Renderer,
  // GitHub Flavored Markdown, 生成 GitHub 格式。
  gfm: true,
  // 异步解析
  async: false,
  // 高亮函数，使用 highlight.js。本来还有第三个参数作为发生错误时的回调。
  highlight(code: string, language: string): string {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value
  },
})

interface ChatBoxProps {
  message: string;
  role: string;
}

const props = withDefaults(defineProps<ChatBoxProps>(), {});
const { message, role } = toRefs(props);

const output = ref("")

const result = computed(() => {
  console.log("output -", output.value)
  console.log("marked output -", marked(output.value))
  return marked(output.value)
})

const emit = defineEmits(['start', 'finish']);

onMounted(async () => {
  console.log("message -", message)
  console.log("role -", role)

  emit('start')
  const response = await fetch('http://127.0.0.1:7345/api/gpt/get', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message.value,
      role: role.value,
    }),
  });

  if (!response.body) return;
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  while (true) {
    var { value, done } = await reader.read();
    if (done) break;
    value = value?.replace('undefined', '')
    console.log("received data -", value)
    output.value += value?.replace('undefined', '')
  }
  emit('finish')
});
</script>

<style scoped>
.chat-box {
  background-color: #292421;
  margin: 10px 0 10px 0;
  padding: 20px 20px 5px 20px;
}
</style>
