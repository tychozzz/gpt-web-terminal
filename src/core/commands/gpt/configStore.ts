import { defineStore } from "pinia";

interface ConfigType {
  model: string;
}

export const useConfigStore = defineStore("config", {
  state: () => ({
    config: {} as ConfigType,
  }),
  getters: {},
  persist: {
    key: "gpt-config",
    storage: window.localStorage,
  },
  actions: {
    changeModel(model: string) {
      this.config.model = model;
    },
  },
});
