import { defineStore } from 'pinia'
interface info {
  "name":string,
  "account": string,
  "token": {
    "token":string,
    "token_exp": number,
    "refresh_token": string,
    "refresh_token_exp": number
  }
}
const userStore = defineStore({
  id: 'user',
  state: () => ({
    info: {}
  }),
  getters: {
    getInfo(): info {
      try {
        this.info = JSON.parse(localStorage.getItem('yuyue-user'))
      } catch (e) { }
      return this.info
    },

  },
  actions: {
    setInfo(info: info) {
      localStorage.setItem("yuyue-user", JSON.stringify(info))
      this.info = info
    }
  }
})
export default userStore
