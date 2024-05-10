<template>
  <view> 这是tt页面 </view>
  <nut-button @click="router.push('/')">跳转到home</nut-button>
</template>

<script setup>
import router from '../../router';
</script>

<style scoped lang="less">
.aa {
  background-color: black;
}
</style>
