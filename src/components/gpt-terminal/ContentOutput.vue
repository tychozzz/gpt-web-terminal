<template>
  <div class="content-output">
    <template v-if="output.type === 'text'">
      <a-tag v-if="outputTagColor" :color="outputTagColor"
        >{{ output.status }}
      </a-tag>
      <span v-if="output.type === 'text'" v-html="smartText(output.text)" />
    </template>
    <component
      @start="handleStart"
      @finish="handleFinish"
      @failed="handleFailed"
      :is="output.component"
      v-if="output.type === 'component'"
      v-bind="output.props ?? {}"
    />
  </div>
</template>

<script setup lang="ts">
import smartText from "../../utils/smartText";
import OutputType = GptTerminal.OutputType;
import { computed, toRefs, defineEmits } from "vue";

interface OutputProps {
  output: OutputType;
}

const props = defineProps<OutputProps>();
const { output } = toRefs(props);
const outputTagColor = computed((): string => {
  if (!output.value.status) {
    return "";
  }
  switch (output.value.status) {
    case "info":
      return "dodgerblue";
    case "success":
      return "limegreen";
    case "warning":
      return "darkorange";
    case "error":
      return "#c0300f";
    case "system":
      return "#bfc4c9";
    case "loading":
      return "#ead029"
    default:
      return "";
  }
});

const emit = defineEmits(['start', 'finish', 'failed'])

// gpt 输出开始时的回调
const handleStart = () => {
  emit('start')
}

// gpt 输出结束后的回调
const handleFinish = () => {
  emit('finish')
}

const handleFailed = () => {
  emit('failed')
}
</script>

<style scoped>
.content-output :deep(.ant-tag) {
  border-radius: 0;
  font-size: 16px;
  border: none;
}
</style>
