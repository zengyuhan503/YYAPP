
import { useRouter } from 'vue-router';
export function logout() {
  localStorage.removeItem('yuyan-user')
}

export function loginCms(res) {
  let tokens = res.token
  localStorage.setItem('yuyan.token', tokens.token)
}