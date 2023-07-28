<template>
  <div v-html="result" class="chat-box"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs, ref, defineEmits, Ref } from "vue";
import { marked } from 'marked'
import hljs from "highlight.js";
import { useMessagesStore } from "../../messagesStore"
import { useConfigStore } from "../../configStore"
import { storeToRefs } from "pinia";
import { fetchChatAPIProcess } from './chatApi'

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
  temperature: number;
}

interface MessageElement {
  role: string;
  content: string;
}

interface MessageType {
  roleKeyword: string | "default";
  roleName: string;
  roleDesc: string;
  systemMessage: string;
  parentMessageId: string;
  messageElements: MessageElement[];
}

const props = withDefaults(defineProps<ChatBoxProps>(), {});
const { message, role, temperature } = toRefs(props);

// 历史消息
const messagesStore = useMessagesStore();
const { messages } = storeToRefs(messagesStore);

// GPT 配置
const configStore = useConfigStore();
const { config } = storeToRefs(configStore);

const output = ref("正在加载内容中...")

const result = computed(() => {
  console.log("output -", output.value)
  console.log("marked output -", marked(output.value))
  return marked(output.value)
})

const emit = defineEmits(['start', 'finish']);

const flag = ref(false)

interface ConversationResponse {
  conversationId: string
  detail: {
    choices: { finish_reason: string; index: number; logprobs: any; text: string }[]
    created: number
    id: string
    model: string
    object: string
    usage: { completion_tokens: number; prompt_tokens: number; total_tokens: number }
  }
  id: string
  parentMessageId: string
  role: string
  text: string
}

let controller = new AbortController()

const getGptOutput = async (flag: Ref<Boolean>, messageParams: MessageType, loadingInterval: any) => {
  let options = { parentMessageId: messageParams.parentMessageId }
  let parentMessageId = ''
  await fetchChatAPIProcess<ConversationResponse>({
    prompt: message.value,
    signal: controller.signal,
    options,
    systemMessage: messageParams.systemMessage,
    temperature: temperature.value,
    onDownloadProgress: ({ event }) => {
      clearInterval(loadingInterval)
      const xhr = event.target
      const { responseText } = xhr
      const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
      let chunk = responseText
      if (lastIndex !== -1) {
        chunk = responseText.substring(lastIndex)
      }
      try {
        const data = JSON.parse(chunk)
        output.value = (data.text ?? '')
        parentMessageId = data.parentMessageId
      } catch (error) {
        //
      }
    }
  }).catch((error) => {
    output.value = (error.message)
  })


  messagesStore.addMessage(
    { role: 'user', content: message.value },
    messageParams.roleKeyword,
    parentMessageId
  )
  messagesStore.addMessage(
    { role: 'assistant', content: output.value },
    messageParams.roleKeyword,
    parentMessageId
  )

  // 关闭延时器
  flag.value = true
  emit('finish')
}

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

  // 延时器
  let timeoutTimer = setTimeout(() => {
    clearInterval(loadingInterval)
    clearTimeout(timeoutTimer)
    if (!flag.value) {
      emit('finish')
      output.value = "请求超时，请检查您的网络环境是否配置正确 或 后端是否启动～"
    }
  }, 35000)

  let messageType: MessageType = {
    roleKeyword: '',
    roleName: '',
    roleDesc: '',
    systemMessage: '',
    parentMessageId: '',
    messageElements: [],
  }
  let hasRole = false
  messages.value.forEach(m => {
    if (m.roleKeyword == role.value) {
      messageType = m
      hasRole = true
      return
    }
  })

  // 存在角色 直接发送请求
  if (hasRole) {
    // 角色对应的历史聊天记录
    await getGptOutput(flag, messageType, loadingInterval)
  } else {
    output.value = "该角色不存在～"
    flag.value = true
    clearInterval(loadingInterval)
    emit('finish')
  }
});
</script>

<style scoped>
.chat-box {
  background-color: #292421;
  margin: 10px 0 10px 0;
  padding: 20px 20px 5px 20px;
}
</style>
