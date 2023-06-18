import { defineStore } from "pinia";

interface MessageElement {
  role: string;
  content: string;
}

interface MessageType {
  roleKeyword: string | "default";
  messageElements: MessageElement[];
}

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [] as MessageType[],
  }),
  getters: {},
  persist: {
    key: "gpt-messages",
    storage: window.localStorage,
  },
  actions: {
    addMessage(msg: MessageElement, roleKeyword: string | "default") {
      const { messages } = this.$state;
      let flag = false;
      messages.forEach((m) => {
        if (m.roleKeyword == roleKeyword) {
          // 表示已找到
          flag = true;
          if (m.messageElements.length >= 20) {
            m.messageElements.shift();
          }
          m.messageElements.push(msg);
        }
      });
      // 表示未找到，则需要新建
      if (!flag) {
        console.log("未找到，需要新建");
        console.log(msg);
        console.log(roleKeyword);
        messages.push({
          roleKeyword: roleKeyword,
          messageElements: [msg],
        });
      }
    },
    clearMessages() {
      this.$state.messages = [];
    },
  },
});
