import {create} from 'zustand'
import AxiosInstance from '../lib/axios'

export const useAuthStore = create((set) => ({

    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const response = await AxiosInstance.get('/auth/check')
            set({authUser: response.data})
        } catch (error) {
            console.error(error)
        }finally {
            set({isCheckingAuth: false})
        }
    },


}))