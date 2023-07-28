import { defineStore } from "pinia";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [
      {
        roleKeyword: "default",
        roleName: "ChatGPT",
        roleDesc: "默认角色",
        systemMessage: "",
        parentMessageId: "",
        messageElements: [],
      },
    ] as Gpt.MessageType[],
  }),
  getters: {},
  persist: {
    key: "gpt-messages",
    storage: window.localStorage,
  },
  actions: {
    addRole(
      roleKeyword: string,
      roleName: string,
      roleDesc: string,
      systemMessage: string
    ) {
      const { messages } = this.$state;
      messages.push({
        roleKeyword,
        roleName,
        roleDesc,
        systemMessage,
        parentMessageId: "",
        messageElements: [],
      });
    },
    addMessage(
      msg: Gpt.MessageElement,
      roleKeyword: string | "default",
      parentMessageId: string
    ) {
      const { messages } = this.$state;
      messages.forEach((m) => {
        if (m.roleKeyword == roleKeyword) {
          // 表示已找到
          m.parentMessageId = parentMessageId;
          if (m.messageElements.length >= 20) {
            m.messageElements.shift();
          }
          m.messageElements.push(msg);
        }
      });
    },
    clearMessages() {
      this.$state.messages = [];
    },
  },
});
