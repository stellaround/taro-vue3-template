import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createPersistedStateWeapp } from '@stellaround/pinia-plugin-persistedstate-mini-program';

export const store = createPinia();
store
  .use(
    createPersistedState({
      key: (id: string) => `__zxicet__${id}`,
      storage: localStorage,
    }),
  )
  .use(
    createPersistedStateWeapp({
      key: (id: string) => `__zxicet__${id}`,
      auto: true,
    }),
  );

export const setupStore = (app: App) => {
  app.use(store);
};
