<template>
  <div v-html="result" class="chat-box"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs, ref, defineEmits, Ref } from "vue";
import { marked } from 'marked'
import hljs from "highlight.js";
import { useMessagesStore } from "../../messagesStore"
import { useUserStore } from "../../../user/userStore";
import { storeToRefs } from "pinia";
import { getRoleElementsByKeyword } from './chatApi'
import { roleMap } from "../role/roles";

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

// 当前用户
const userStore = useUserStore();
const { loginUser } = storeToRefs(userStore);

const output = ref("正在加载内容中...")

const result = computed(() => {
  console.log("output -", output.value)
  console.log("marked output -", marked(output.value))
  return marked(output.value)
})

const emit = defineEmits(['start', 'finish']);

const flag = ref(false)

const getGptOutput = async (flag: Ref<Boolean>, messageParams: any, loadingInterval: any, roleKeyword: string) => {
  const response = await fetch('http://127.0.0.1:7345/api/gpt/get', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // feed 历史消息
    body: JSON.stringify({
      message: messageParams ? [...messageParams, {
        role: 'user',
        content: message.value
      }] : [{
        role: 'user',
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
    // 读取输出消息
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
    role: "user",
    content: message.value
  }, roleKeyword)
  messagesStore.addMessage({
    role: "assistant",
    content: output.value
  }, roleKeyword)

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

  let messageElements: any = []
  messages.value.forEach(m => {
    if (m.roleKeyword == role.value) {
      messageElements = m.messageElements
      return
    }
  })

  let messageParams: any = []
  // 系统默认角色 直接发送请求
  if (roleMap.has(role.value)) {
    // 角色对应的历史聊天记录
    messageParams = messageElements
    console.log("历史聊天记录", ...messageParams)
    await getGptOutput(flag, messageParams, loadingInterval, role.value)
  } else if (loginUser.value.username == 'local') {
    output.value = "当前用户未登录，只能使用默认角色～"
    flag.value = true
    clearInterval(loadingInterval)
    emit('finish')
  } else {
    const res: any = await getRoleElementsByKeyword(role.value)
    if (res?.code !== 0) {
      output.value = "该角色不存在～"
      flag.value = true
      clearInterval(loadingInterval)
      emit('finish')
    } else {
      // 角色对应的角色信息以及历史聊天记录
      messageParams = [...res.data, ...messageElements]
      await getGptOutput(flag, messageParams, loadingInterval, role.value)
    }
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
