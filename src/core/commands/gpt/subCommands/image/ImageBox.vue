<template>
  <div class="image-box">
    <span v-if="flag">{{ loading }}</span>
    <div v-else>
      <a-row :gutter="[0, 40]">
        <a-col :span="4" v-for="(item, index) in imageUrlList" :key="index">
          <a-image :src="item.url" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs, ref, defineEmits, Ref } from "vue";
import { getImage } from "./imageApi";

interface ImageBoxProps {
  prompt: string;
  number: number;
  size: string
}

const props = withDefaults(defineProps<ImageBoxProps>(), {});
const { prompt, number, size } = toRefs(props);

const flag = ref(true)
const emit = defineEmits(['start', 'finish']);
const loading = ref("图片内容较大，正在加载中...")

const imageUrlList = ref<any>([])

onMounted(async () => {
  // 定时器 loading 效果
  let count = 0
  let loadingInterval = setInterval(() => {
    if (count > 3) {
      count = 0;
    }
    switch (count) {
      case 0:
        loading.value = "图片内容较大，正在加载中";
        break;
      case 1:
        loading.value = "图片内容较大，正在加载中.";
        break;
      case 2:
        loading.value = "图片内容较大，正在加载中..";
        break;
      case 3:
        loading.value = "图片内容较大，正在加载中...";
        break;
    }
    count++;
  }, 500)
  emit('start')
  const res: any = await getImage(prompt.value, number.value, size.value)
  if (res?.code !== 0) {
    loading.value = res?.msg ? res.msg : "服务端请求异常"
    emit('finish')
    clearInterval(loadingInterval)
    return;
  }
  flag.value = false
  clearInterval(loadingInterval)
  loading.value = ''
  imageUrlList.value = res.data
  emit('finish')
})
</script>

<style scoped>
.image-box {
  background-color: #292421;
  margin: 10px 0 10px 0;
  padding: 20px 20px 20px 20px;
}
</style>