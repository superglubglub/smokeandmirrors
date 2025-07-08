<template>
  <video
    ref="video"
    autoplay
    playsinline
    muted
    class="h-full object-cover overflow-hidden"
  />
</template>

<script setup>

import { onMounted, onBeforeUnmount, ref } from 'vue';

const video = ref(null);
let stream = null;

onMounted(async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video :true });
    if (video.value) {
      video.value.srcObject = stream;
    }
  } catch (err) {
    console.error('Error accessing webcam:', err);
  }
});

onBeforeUnmount(() => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
});

defineExpose ({
  video
})
</script>