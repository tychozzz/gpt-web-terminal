import { context } from "ant-design-vue/lib/vc-image/src/PreviewGroup";
import { defineStore } from "pinia";

interface Message {
  name: string;
  role: string;
  content: string;
}

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [] as Message[]
  }),
  getters: {},
  persist: {
    key: "gpt-messages",
    storage: window.localStorage,
  },
  actions: {
    addMessage(msg: Message) {
      const {messages} = this.$state
      if (messages.length >= 20) {
        messages.shift()
      }
      messages.push(msg)
    },
    clearMessages() {
      this.$state.messages = []
    }
  }
})