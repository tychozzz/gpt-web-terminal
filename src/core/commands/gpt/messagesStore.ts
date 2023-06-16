import { defineStore } from "pinia";

interface Message {
  role: string;
  content: string;
}

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [] as Message[]
  }),
  getters: {},
  actions: {
    addMessage(msg: Message) {
      const {messages} = this.$state
      if (messages.length >= 10) {
        messages.shift()
      }
      messages.push(msg)
    },
    clearMessages() {
      this.$state.messages = []
    }
  }
})