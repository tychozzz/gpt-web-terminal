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
import { onMounted, ref, defineEmits, toRefs } from "vue";
import { createRole } from './diyApi'

// 展示列表
const displayList = ref<any[]>([])
// 下标
const index = ref(0)
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

// 判断用户是否已定义角色
const flag = ref(false)

const doSubmit = async () => {
  let idx = index.value % 3
  let term = Math.floor(index.value / 3)
  if (idx == 0) {
    if (flag.value) {
      roleElementList.value.push({
        name: "user",
        content: input.value
      })
      displayList.value.push(input.value)
      displayList.value.push(`💯 请输入示例 Answer ${term + 1}`)
      input.value = ''
      index.value += 1
    } else {
      roleElementList.value.push({
        name: "system",
        content: input.value
      })
      displayList.value.push(input.value)
      displayList.value.push("🙋 请输入示例 Prompt 1")
      input.value = ''
      flag.value = true
    }
  } else if (idx == 1) {
    roleElementList.value.push({
      name: "assistant",
      content: input.value
    })
    displayList.value.push(input.value)
    displayList.value.push(`❓ 是否结束 - 输入 y/n`)
    input.value = ''
    index.value += 1
  } else if (idx == 2) {
    if (input.value != 'y' &&
      input.value != 'yes' &&
      input.value != 'Y' &&
      input.value != 'n' &&
      input.value != 'no' &&
      input.value != 'N') {
      displayList.value.push(input.value)
      displayList.value.push(`❓ 是否结束 - 输入 y/n`)
      input.value = ''
      return
    }
    if (input.value == 'y' ||
      input.value == 'yes' ||
      input.value == 'Y' ||
      term + 1 == 5) {
      displayList.value.push(input.value)
      const res: any = await createRole(keyword.value, name.value, description.value, roleElementList.value)
      if (res?.code !== 0) {
        emit('finish')
        input.value = ''
        index.value = 0
        finished.value = true
        displayList.value.push("❌ " + (res.message ? res.message : '请求失败，请稍后重试～'))
        window.removeEventListener('keydown', handleKeyDown)
        return
      }
      if (term + 1 == 5) {
        displayList.value.push('⚠️ 已达到最大输入次数，已自动为您创建角色～')
      } else {
        displayList.value.push('🎉 角色已创建成功，请尽情享用吧～')
      }
      // TODO:发送结束事件
      emit('finish')
      input.value = ''
      index.value = 0
      finished.value = true
      window.removeEventListener('keydown', handleKeyDown)
      console.log("roleElmentList", roleElementList)
    } else {
      displayList.value.push(input.value)
      displayList.value.push(`🙋 请输入示例 Prompt ${term + 2}`)
      input.value = ''
      index.value += 1
    }
  }

}

onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown)
  emit('start')
  displayList.value.push("✍️ 请定义当前角色，建议以 ‘从现在开始，你是 xxx‘ 的格式开头")
  // 
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
