import { defineStore } from 'pinia';
export const useLoginStore = defineStore(
  'login-info',
  () => {
    const userName = ref<string | null>();
    const tenantId = ref<string | null>();
    const needRememberMe = ref<boolean | undefined>();
    const accessToken = shallowRef();
    const refreshToken = shallowRef();
    const userId = shallowRef();
    return {
      userName,
      tenantId,
      needRememberMe,
      accessToken,
      refreshToken,
      userId,
    };
  },
  {
    persist: true,
  },
);
