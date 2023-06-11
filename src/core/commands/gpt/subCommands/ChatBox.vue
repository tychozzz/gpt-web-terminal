<template>
  <div v-html="result" class="chat-box"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs } from "vue";
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
}

const props = withDefaults(defineProps<ChatBoxProps>(), {});
const { message } = toRefs(props);

const result = computed(() => {
  console.log("message是：", message.value)
  console.log("marked message是：", marked(message.value))
  return marked(message.value)
})

onMounted(() => { });
</script>

<style scoped>
.chat-box {
  background-color: #292421;
  margin: 10px 0 10px 0; 
  padding: 20px 20px 5px 20px;
}
</style>
