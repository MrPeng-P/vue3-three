import { defineStore } from 'pinia'

interface User {
    userInfo: userInfo
}
interface userInfo {
    name: string,
    image?: string
}
export const userStore = defineStore('user', () => {
    const userInfo: userInfo = reactive({
        name: 'ppc'
    })

    return { userInfo }
})