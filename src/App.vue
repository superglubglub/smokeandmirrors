<template>
  <div class="flex flex-col w-full h-full items-center justify-center">
    <h2 class="text-white text-xl mb-4">
      interactive shadertoy test
    </h2>
    <div class="flex flex-grow-0 flex-row h-1/2 justify-between overflow-hidden">
      <div class="flex w-50vw flex-auto px-2 py-2">
        <Box >
          <ShaderScene :handLandmarks="landmarksArray"/>
        </Box>
      </div>
      <div class="flex flex-col justify-evenly px-2 py-2">
        <div class="flex h-50 flex-auto p-1">
          <Box class="w-full">
            <HandTracker @handLandmarks="onHandLandmarks"/>
          </Box>
        </div>
        <div class="flex flex-row justify-evenly px-2 py-2">
          <div class="flex h-50 flex-auto p-1">
            <Box>
            </Box>
          </div>
          <div class="flex h-50 flex-auto p-1">
            <Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Box from "./components/Box.vue";
import ShaderScene from "./components/ShaderScene.vue";
import HandTracker from "./components/HandTracker.vue";

import {ref, shallowRef, onMounted, triggerRef} from 'vue';

const landmarksArray = shallowRef([])

function onHandLandmarks({ landmarks }) {
  // Save as an array or flat array, depending on your shader needs
  let arr = landmarks ? [...landmarks] : []; // array of 21 {x, y, z}
  //console.log(arr)
  landmarksArray.value = arr
  //console.log(landmarksArray.value)
  triggerRef(landmarksArray)
}

const webcamComponent = ref(null);
const videoElement = ref(null);

onMounted(() => {
  // After mount, access the exposed `video` ref from Webcam
  if (webcamComponent.value) {
    videoElement.value = webcamComponent.value.video
  }

})

</script>
