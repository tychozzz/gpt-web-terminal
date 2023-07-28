<template>
  <div class="yu-terminal-wrapper" :style="wrapperStyle" @click="handleClickWrapper">
    <div ref="terminalRef" class="yu-terminal" :style="mainStyle">
      <a-collapse v-model:activeKey="activeKeys" :bordered="false" expand-icon-position="right">
        <template v-for="(output, index) in outputList" :key="index">
          <!-- 折叠 -->
          <a-collapse-panel v-if="output.collapsible" :key="index" class="terminal-row">
            <template #header>
              <span style="user-select: none; margin-right: 10px">
                {{ prompt }}
              </span>
              <span>{{ output.text }}</span>
            </template>
            <div v-for="(result, idx) in output.resultList" :key="idx" class="terminal-row">
              <content-output :output="result" />
            </div>
          </a-collapse-panel>
          <!-- 不折叠 -->
          <template v-else>
            <!-- 输出命令及结果-->
            <template v-if="output.type === 'command'">
              <div class="terminal-row">
                <span style="user-select: none; margin-right: 10px">{{
                  prompt
                }}</span>
                <span>{{ output.text }}</span>
              </div>
              <div v-for="(result, idx) in output?.resultList" :key="idx" class="terminal-row">
                <content-output @start="handleStart" @finish="handleFinish" @failed="handleFailed" :output="result" />
              </div>
            </template>
            <!-- 打印信息 -->
            <template v-else>
              <div class="terminal-row">
                <content-output :output="output" />
              </div>
            </template>
          </template>
        </template>
      </a-collapse>
      <div class="terminal-row">
        <a-input ref="commandInputRef" v-model:value="inputCommand.text" :disabled="isRunning" class="command-input"
          :placeholder="inputCommand.placeholder" :bordered="false" autofocus @press-enter="doSubmitCommand">
          <template #addonBefore>
            <span class="command-input-prompt">{{ prompt }}</span>
          </template>
        </a-input>
      </div>
      <!-- 输入提示-->
      <div v-if="hint && !isRunning" class="terminal-row" style="color: #bbb">
        hint：{{ hint }}
      </div>
      <div style="margin-bottom: 16px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  Ref,
  ref,
  StyleValue,
  toRefs,
  watchEffect,
} from "vue";
import CommandOutputType = GptTerminal.CommandOutputType;
import OutputType = GptTerminal.OutputType;
import CommandInputType = GptTerminal.CommandInputType;
import { registerShortcuts } from "./shortcuts";
import TerminalType = GptTerminal.TerminalType;
import TextOutputType = GptTerminal.TextOutputType;
import useHistory from "./history";
import ContentOutput from "./ContentOutput.vue";
import OutputStatusType = GptTerminal.OutputStatusType;
import useHint from "./hint";
import { defineStore } from "pinia";
import { useMessagesStore } from "../../core/commands/gpt/messagesStore";

const messagesStore = useMessagesStore();
const messages = messagesStore.$state.messages;

interface GptTerminalProps {
  height?: string | number;
  fullScreen?: boolean;
  // eslint-disable-next-line vue/require-default-prop
  onSubmitCommand?: (inputText: string) => void;
}

const props = withDefaults(defineProps<GptTerminalProps>(), {
  height: "400px",
  fullScreen: false,
});

const terminalRef = ref();
const activeKeys = ref<number[]>([]);
// 输出列表
const outputList = ref<OutputType[]>([]);
// 命令列表
const commandList = ref<CommandOutputType[]>([]);
const commandInputRef = ref();

// 命令是否运行
const isRunning = ref(false);

/**
 * 初始命令
 */
const initCommand: CommandInputType = {
  text: "",
  placeholder: "",
};

/**
 * 待输入的命令
 */
const inputCommand = ref<CommandInputType>({
  ...initCommand,
});

/**
 * 全局记录当前命令，便于写入结果
 */
let currentNewCommand: CommandOutputType;

const {
  commandHistoryPos,
  showPrevCommand,
  showNextCommand,
  listCommandHistory,
} = useHistory(commandList.value, inputCommand);

const { hint, setHint, debounceSetHint } = useHint();

/**
 * 提交命令（回车）
 */
const doSubmitCommand = async () => {
  isRunning.value = true;
  terminal.isRunning = true;
  setHint("");
  let inputText = inputCommand.value.text;
  // 执行某条历史命令
  if (inputText.startsWith("!")) {
    const commandIndex = Number(inputText.substring(1));
    const command = commandList.value[commandIndex - 1];
    if (command) {
      inputText = command.text;
    }
  }
  // 执行命令
  const newCommand: CommandOutputType = {
    text: inputText,
    type: "command",
    resultList: [],
  };
  // 记录当前命令，便于写入结果
  currentNewCommand = newCommand;
  // 执行命令
  await props.onSubmitCommand?.(inputText);
  // 添加输出（为空也要输出换行）
  outputList.value.push(newCommand);
  // 不为空字符串才算是有效命令
  if (inputText) {
    commandList.value.push(newCommand);
    // 重置当前要查看的命令位置
    commandHistoryPos.value = commandList.value.length;
  }
  inputCommand.value = { ...initCommand };
  // 默认展开折叠面板
  activeKeys.value.push(outputList.value.length - 1);
  // 自动滚到底部
  setTimeout(() => {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }, 50);
  isRunning.value = false;
  terminal.isRunning = false;
};

// 处理 GPT 请求开始时的操作
const handleStart = () => {
  console.log("开始")
  isRunning.value = true
  terminal.isRunning = true
}

// 处理 GPT 请求结束后的操作
const handleFinish = () => {
  console.log("结束")
  isRunning.value = false
  terminal.isRunning = false
}

const handleFailed = () => {
  console.log("失败")
}

// 输入框内容改变时，触发输入提示
watchEffect(() => {
  debounceSetHint(inputCommand.value.text);
});

/**
 * 输入提示符
 */
const prompt = computed(() => {
  return '[local]$';
});

/**
 * 命令样式
 */
const commandInputClass = () => {
  const classNames = ['command-input'];
  if (inputCommand.value.text.includes(' ')) {
    classNames.push('white-background-text');
  }
  return classNames.join(' ');
}

/**
 * 终端主样式
 */
const mainStyle = computed(() => {
  const fullScreenStyle: StyleValue = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  return props.fullScreen
    ? fullScreenStyle
    : {
      height: props.height,
    };
});

/**
 * 终端包装类主样式
 */
const wrapperStyle = computed(() => {
  const style = {
    ...mainStyle.value,
  };
  return style;
});

/**
 * 清空所有输出
 */
const clear = () => {
  outputList.value = [];
};

/**
 * 写命令文本结果
 * @param text
 * @param status
 */
const writeTextResult = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: "text",
    status,
  };
  currentNewCommand.resultList.push(newOutput);
};

/**
 * 写文本错误状态结果
 * @param text
 */
const writeTextErrorResult = (text: string) => {
  writeTextResult(text, "error");
};

/**
 * 写文本等待状态
 * @param text
 */
const writeTextLoadingResult = (text: string) => {
  writeTextResult(text, "loading");
}

/**
 * 写文本成功状态结果
 * @param text
 */
const writeTextSuccessResult = (text: string) => {
  writeTextResult(text, "success");
};

/**
 * 写结果
 * @param output
 */
const writeResult = (output: OutputType) => {
  currentNewCommand.resultList.push(output);
};

/**
 * 立即输出文本
 * @param text
 * @param status
 */
const writeTextOutput = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: "text",
    status,
  };
  outputList.value.push(newOutput);
};

/**
 * 移除 outputList 最后一个元素
 */
const removeLastOutput = () => {
  console.log("移除前 - outputList", currentNewCommand.resultList)
  currentNewCommand.resultList.pop();
  console.log("移除后 - outputList", currentNewCommand.resultList)
}

/**
 * 设置命令是否可折叠
 * @param collapsible
 */
const setCommandCollapsible = (collapsible: boolean) => {
  currentNewCommand.collapsible = collapsible;
};

/**
 * 立即输出
 * @param newOutput
 */
const writeOutput = (newOutput: OutputType) => {
  outputList.value.push(newOutput);
};

/**
 * 输入框聚焦
 */
const focusInput = () => {
  commandInputRef.value.focus();
};
/**
 * 获取输入框是否聚焦
 */
const isInputFocused = () => {
  return (
    (commandInputRef.value.input as HTMLInputElement) == document.activeElement
  );
};
/**
 * 设置输入框的值
 */
const setTabCompletion = () => {
  if (hint.value) {
    inputCommand.value.text = `${hint.value.split(" ")[0]}${hint.value.split(" ").length > 1 ? " " : ""
      }`;
  }
};

/**
 * 折叠 / 展开所有块
 */
const toggleAllCollapse = () => {
  // 展开
  if (activeKeys.value.length === 0) {
    activeKeys.value = outputList.value.map((_, index) => {
      return index;
    });
  } else {
    // 折叠
    activeKeys.value = [];
  }
};

/**
 * GPT 历史对话记录
 */
const listGptHistory = () => {
  return messages
}

/**
 * 终止命令运行
 */
const terminateCurrentCommand = () => {
  // GPT 输出过程中不允许执行终止命令
  if (isRunning.value == true) {
    return
  }
  console.log("终止！!")
  isRunning.value = true;
  terminal.isRunning = true;
  setHint("");
  let inputText = inputCommand.value.text;
  const newCommand: CommandOutputType = {
    text: inputText,
    type: "command",
    resultList: [],
  };
  outputList.value.push(newCommand);
  inputCommand.value = { ...initCommand };
  // 默认展开折叠面板
  activeKeys.value.push(outputList.value.length - 1);
  // 自动滚到底部
  setTimeout(() => {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }, 50);
  isRunning.value = false;
  terminal.isRunning = false;
}

/**
 * 操作终端的对象
 */
const terminal: TerminalType = {
  isRunning: false,
  writeTextResult,
  writeTextErrorResult,
  writeTextLoadingResult,
  writeTextSuccessResult,
  writeResult,
  writeTextOutput,
  writeOutput,
  removeLastOutput,
  clear,
  focusInput,
  isInputFocused,
  setTabCompletion,
  doSubmitCommand,
  showNextCommand,
  showPrevCommand,
  listCommandHistory,
  toggleAllCollapse,
  setCommandCollapsible,
  listGptHistory,
  terminateCurrentCommand,
  // @ts-ignore
};

/**
 * 只执行一次
 */
onMounted(() => {
  registerShortcuts(terminal);
  terminal.writeTextOutput("   _____ _____ _______   _______                  _             _ ".replace(/ /g, "&nbsp;"))
  terminal.writeTextOutput("  / ____|  __ \\__   __| |__   __|                (_)           | |".replace(/ /g, "&nbsp;"))
  terminal.writeTextOutput(" | |  __| |__) | | |       | | ___ _ __ _ __ ___  _ _ __   __ _| |".replace(/ /g, "&nbsp;"))
  terminal.writeTextOutput(" | | |_ |  ___/  | |       | |/ _ \\ '__| '_ ` _ \\| | '_ \\ / _` | |".replace(/ /g, "&nbsp;"))
  terminal.writeTextOutput(" | |__| | |      | |       | |  __/ |  | | | | | | | | | | (_| | |".replace(/ /g, "&nbsp;"))
  terminal.writeTextOutput("  \\_____|_|      |_|       |_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|".replace(/ /g, "&nbsp;"))
  terminal.writeTextOutput("<br/>");
  terminal.writeTextOutput("Welcome to GPT Terminal!");
  terminal.writeTextOutput("You can enjoy your exclusive GPT service!");
  terminal.writeTextOutput("Enter the <span style='color: #ec61ad;'>help</span> command to unlock all GPT services!");
  terminal.writeTextOutput(`GPT Terminal Reformer - <a href="//github.com/ltyzzzxxx/gpt-web-terminal" target="_blank">ltyzzz</a>`)
  terminal.writeTextOutput(
    `Thanks so much to the YuIndex author - <a href="//docs.qq.com/doc/DUFFRVWladXVjeUxW" target="_blank">coder_yupi</a>`
  );
  terminal.writeTextOutput("<br/>")
  terminal.writeTextOutput("<span style='color: red'>Notice: </span>")
  terminal.writeTextOutput("<span style='color: red'>&nbsp;&nbsp; - You can only use GPT-3.5 Model if you are not a OpenAI-paying user.</span>")
  terminal.writeTextOutput("<span style='color: red'>&nbsp;&nbsp; - You can only request Open AI 3 times per minute if you are not a OpenAI-paying user.</span>")
  terminal.writeTextOutput("<br/>")
  terminal.writeTextOutput(`Link: <a href="//platform.openai.com/docs/guides/rate-limits/overview" target="_blank">Open AI</a>`)
  terminal.writeTextOutput("<br/>");
});

/**
 * 当点击空白聚焦输入框
 */
function handleClickWrapper(event: Event): void {
  //@ts-ignore
  if (event.target.className === "yu-terminal") {
    focusInput();
  }
}

defineExpose({
  terminal,
});
</script>

<style scoped>
.yu-terminal-wrapper {
  background: black;
}

.yu-terminal {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  overflow: scroll;
}

.yu-terminal::-webkit-scrollbar {
  display: none;
}

.yu-terminal span {
  font-size: 16px;
}

.yu-terminal :deep(.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header) {
  color: white;
  padding: 0;
}

.yu-terminal :deep(.ant-collapse) {
  background: none;
}

.yu-terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}

.yu-terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0;
}

.command-input {
  caret-color: white;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 16px;
  padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
}

.command-input-prompt {
  color: white;
  background: transparent;
}

.terminal-row {
  color: white;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
}
</style>
