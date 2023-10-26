import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => {
    return {
    data: null,
    initiall: true,
    dataPage: false,
    translator: false
    }
  },
})