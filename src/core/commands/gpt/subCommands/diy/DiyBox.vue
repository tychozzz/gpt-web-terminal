<template>
  <div @keydown="handleKeyDown">
    <div v-for="(output, index) in displayList" :key="index">
      <span :style="{ color: index % 2 !== 0 ? '' : '#ec61ad' }">{{ output }}</span>
    </div>
    <div class="terminal-row">
      <a-input ref="inputRef" v-if="!finished" v-model:value="input" autofocus @press-enter="doSubmit"
        class="command-input white-background-text" :bordered="false">
      </a-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, defineEmits, toRefs } from "vue";
import { useMessagesStore } from "../../messagesStore"

const messagesStore = useMessagesStore();
const { messages } = storeToRefs(messagesStore);

// 展示列表
const displayList = ref<any[]>([])
// 输入框 input
const input = ref("")

interface DiyBoxProps {
  keyword: string,
  name: string,
  description: string,
}

const props = withDefaults(defineProps<DiyBoxProps>(), {});
const { keyword, name, description } = toRefs(props);

interface RoleElement {
  name: string;
  content: string;
}

const roleElementList = ref<RoleElement[]>([])

const finished = ref(false)

const emit = defineEmits(['start', 'finish', 'failed']);

const inputRef = ref()

const handleKeyDown = (e: any) => {
  let key = e.key;
  // 自动聚焦输入框
  if (key >= "a" && key <= "z" && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
    inputRef.value.focus();
    return;
  }
  let code = e.code;
  if (code === 'KeyC') {
    displayList.value.push(input.value)
    input.value = ''
    finished.value = true
    emit('finish')
  }
}


const doSubmit = async () => {
  if (!input.value) {
    displayList.value.push("❗️角色定义不可以为空！")
    return
  }
  messagesStore.addRole(keyword.value, name.value, description.value, input.value)
  displayList.value.push(input.value)
  displayList.value.push('🎉 角色已创建成功，请尽情享用吧～')
  input.value = ''
  finished.value = true
  emit('finish')
}

onMounted(async () => {
  let flag = false
  messages.value.forEach((m) => {
    if (m.roleKeyword == keyword.value) {
      flag = true
    }
  })
  if (flag) {
    displayList.value.push("❗️当前角色已存在")
    finished.value = true
  } else {
    window.addEventListener('keydown', handleKeyDown)
    emit('start')
    displayList.value.push("💌 请开始定制您的专属角色吧～")
    displayList.value.push("✍️ 请定义当前角色，建议以 ‘从现在开始，你是 xxx‘ 的格式开头")
  }
});
</script>

<style scoped>
.command-input {
  caret-color: white !important;
  color: white !important;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 16px;
  padding: 0 10px;
}

.terminal-row {
  color: white !important;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
}
</style>
