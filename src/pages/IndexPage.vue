<template>
  <gpt-terminal ref="terminalRef" full-screen :on-submit-command="onSubmitCommand" />
</template>

<script setup lang="ts">
import { doCommandExecute } from "../core/commandExecutor";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useConfigStore } from "../core/commands/gpt/configStore";

const terminalRef = ref();

const onSubmitCommand = async (inputText: string) => {
  if (!inputText) {
    return;
  }
  const terminal = terminalRef.value.terminal;
  await doCommandExecute(inputText, terminal);
};



const configStore = useConfigStore();
const { config } = storeToRefs(configStore);

onMounted(() => {
  if (!config.value.model) {
    configStore.changeModel("gpt-3.5-turbo");
  }
});
</script>

<style></style>
