<template>
  <svg v-if="!isWeapp" class="svg-icon-scoped" aria-hidden="true" :style="customStyle">
    <use :href="iconName" />
  </svg>
  <Suspense v-else>
    <template #default>
      <weapp-load-svg :color="props.color" :name="props.name" :size="props.size"></weapp-load-svg>
    </template>
    <template #fallback> <view></view> </template>
  </Suspense>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import WeappLoadSvg from './weapp-load-svg.vue';

const props = withDefaults(defineProps<Props>(), {
  color: '',
  size: 20,
});

interface Props {
  name: string;
  color?: string;
  size?: number;
}

const iconName = ref(`#icon-${props.name}`);
const customStyle = reactive({
  color: props.color,
  width: Taro.pxTransform(props.size),
  height: Taro.pxTransform(props.size),
});

const isWeapp = process.env.TARO_ENV === 'weapp';
if (!isWeapp) {
  import(`@/assets/icons/${props.name}.svg`);
}
</script>

<style lang="less">
.svg-icon-scoped {
  flex-shrink: 0;
  position: relative;
  vertical-align: -2px;
}
</style>
