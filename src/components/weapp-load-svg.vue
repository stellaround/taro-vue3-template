<template>
  <image class="weapp-svg-load-scoped" :src="base64Svg" :style="customStyle" />
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';

const props = withDefaults(defineProps<Props>(), {
  color: '',
  size: 20,
});

interface Props {
  name: string;
  color?: string;
  size?: number;
}

const iconSize = ref(props.size);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const svgModule = require(`../assets/icons/${props.name}.svg`);
const base64Svg = ref();

const convertSvg = computed(() => {
  return svgModule.replace(/fill="#*[a-zA-Z0-9]+"/g, `fill="${props.color}"`);
});

base64Svg.value = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(convertSvg.value)}`;

const customStyle = reactive({
  width: Taro.pxTransform(props.size),
  height: Taro.pxTransform(props.size),
});
</script>

<style lang="less">
.weapp-svg-load-scoped {
  flex-shrink: 0;
  position: relative;
  vertical-align: -2px;
}
</style>
