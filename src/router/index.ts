import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import staticRoutes from './static-routes';

const router = createRouter({
  routes: [...staticRoutes],
  history: createWebHistory(),
});

export const setupRouter = (app: App) => {
  app.use(router);
};

export default router;
