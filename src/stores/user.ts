import { defineStore } from 'pinia';
export const useUserStore = defineStore(
  'user',
  () => {
    const name = ref<string | null>();
    const age = ref<string | null>();
    return {
      name,
      age,
    };
  },
  {
    persist: {
      paths: ['age'],
    },
  },
);
