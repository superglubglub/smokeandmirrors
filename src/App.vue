<template>
  <div class="flex flex-col w-full h-full items-center justify-center align-center">
    <h2 class="text-white text-xl mb-4">
      interactive shadertoy test
    </h2>
    <div class="flex flex-grow-0 flex-row w-2/3 justify-between overflow-hidden gap-4">
      <Box :title="'Shader'" :status="'Rendering at 60fps'">
        <ShaderScene :handLandmarks="landmarksArray"/>
      </Box>
      <Box :title="'Camera'" :status="cameraStatus">
        <HandTracker @handLandmarks="onHandLandmarks"/>
      </Box>

    </div>
    <div class="flex flex-grow-0 w-2/3 flex-row gap-4">
        <LabeledSlider
            :title="'Hue (palm X axis)'"
            :value="landmarksArray[0] ? Math.round((1 - landmarksArray[0].x) * 10000) / 10000 : 0.5"
        />
      <LabeledSlider
          :title="'Time (palm Y axis)'"
          :value="landmarksArray[0] ? Math.round((1 - landmarksArray[0].y) * 10000) / 10000 : 0.5"
      />
    </div>
  </div>
</template>

<script setup>
import Box from "./components/Box.vue";
import ShaderScene from "./components/ShaderScene.vue";
import HandTracker from "./components/HandTracker.vue";

import {ref, shallowRef, onMounted, triggerRef} from 'vue';
import LabeledSlider from "./components/LabeledSlider.vue";

const isCameraHandVisible = ref('False')
const cameraStatus = ref("Can't see hand!");
const landmarksArray = shallowRef([])

function onHandLandmarks({ landmarks }) {
  // Save as an array or flat array, depending on your shader needs
  let arr = landmarks ? [...landmarks] : []; // array of 21 {x, y, z}
  //console.log(arr)
  landmarksArray.value = arr
  console.log(landmarksArray.value)
  triggerRef(landmarksArray)

  if ( arr.length === 0 ) isCameraHandVisible.value = 'False';
  else isCameraHandVisible.value = 'True';

  if (isCameraHandVisible.value === 'False') {
    cameraStatus.value = "ERROR: Can't see hand(s)!"
  } else {
    cameraStatus.value = "Detected 1 hand(s)";
  }

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
