<template>
  <div v-html="result" class="chat-box"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs, ref, defineEmits } from "vue";
import { marked } from 'marked'
import hljs from "highlight.js";
import {useMessagesStore} from "../../messagesStore"
import { storeToRefs } from "pinia";

marked.setOptions({
  renderer: new marked.Renderer,
  gfm: true,
  async: false,
  highlight(code: string): string {
    return hljs.highlightAuto(code).value
  },
})

interface ChatBoxProps {
  message: string;
  role: string;
}

const props = withDefaults(defineProps<ChatBoxProps>(), {});
const { message, role } = toRefs(props);

// 历史消息
const messagesStore = useMessagesStore();
const { messages } = storeToRefs(messagesStore);

const output = ref("正在加载内容中...")

const result = computed(() => {
  console.log("output -", output.value)
  console.log("marked output -", marked(output.value))
  return marked(output.value)
})

const emit = defineEmits(['start', 'finish']);

onMounted(async () => {
  console.log("message -", message)
  console.log("role -", role)

  // 定时器 loading 效果
  let count = 0;
  let loadingInterval = setInterval(() => {
    count++;
    if (count > 3) {
      count = 0;
    }
    switch (count) {
      case 0:
        output.value = "正在加载内容中";
        break;
      case 1:
        output.value = "正在加载内容中.";
        break;
      case 2:
        output.value = "正在加载内容中..";
        break;
      case 3:
        output.value = "正在加载内容中...";
        break;
    }
  }, 500)


  emit('start')

  let flag = false;

  // 延时器
  let timeoutTimer = setTimeout(() => {
    clearInterval(loadingInterval)
    clearTimeout(timeoutTimer)
    if (!flag) {
      emit('finish')
      output.value = "请求超时，请检查您的网络环境是否配置正确 或 后端是否启动～"
    }
  }, 35000)

  const response = await fetch('http://127.0.0.1:7345/api/gpt/get', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // 投喂历史消息
    body: JSON.stringify({
      message: [...(messages.value.map(({ role, content }) => ({ role, content }))), {
        role: "user",
        content: message.value
      }],
      role: role.value,
    }),
  });

  console.log("gpt 响应 -", response)

  if (response.status == 401) {
    clearInterval(loadingInterval)
    output.value = "API Key 设置有误，请重新设置后再访问～"
  } else if (!response.body) {
    clearInterval(loadingInterval)
    output.value = "服务器异常，请稍后重试～"
  } else {
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    clearInterval(loadingInterval)
    output.value = ""
    while (true) {
      var { value, done } = await reader.read();
      if (done) break;
      value = value?.replace('undefined', '')
      console.log("received data -", value)
      output.value += value?.replace('undefined', '')
    }
  }

  // 记录历史消息
  messagesStore.addMessage({
    name: role.value,
    role: "user",
    content: message.value
  })
  messagesStore.addMessage({
    name: role.value,
    role: "assistant",
    content: output.value
  })

  // 关闭延时器
  flag = true
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
