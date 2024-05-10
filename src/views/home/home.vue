<template>
  <view class="aa"> 这是首页 </view>
  <nut-button @click="router.push('/tt')">跳转到tt</nut-button>
  <nut-button @click="router.push('/sub')">跳转到分包页面</nut-button>
  <view>
    <view>
      <view> 请仔细阅读readme文件 </view>
    </view>
  </view>
  <svg-icon name="close" color="#ef2" :size="40"></svg-icon>
  <svg-icon name="esc" color="green" :size="40"></svg-icon>
</template>

<script setup lang="ts">
import router from '../../router';

const loginStore = useLoginStore();
loginStore.accessToken = '111';
loginStore.tenantId = '2222';
console.log(loginStore.accessToken);
const userStore = useUserStore();
userStore.name = '213123';
userStore.age = '222';
</script>

<style lang="less" scoped>
.aa {
  width: 200px;
  background-color: yellow;
  .bb {
    background-color: red;
  }
}
</style>
