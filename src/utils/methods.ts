// 清空用户信息
export const clearUserInfo = () => {
  const loginStore = useLoginStore();
  loginStore.accessToken = '';
  loginStore.refreshToken = '';
  loginStore.tenantId = '';
};
