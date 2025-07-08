<script setup>
import * as THREE from 'three'
import {ref, onMounted, onBeforeUnmount, watch, shallowRef} from 'vue'
import fragmentShader from '../shaders/4d.frag?raw'
import vertexShader from '../shaders/4d.vert?raw'

const container = ref(null)
const canvas = ref(null)
const landmarksArray = shallowRef([])

let renderer, camera, scene, material, mesh, clock, observer, animationFrameId


const props = defineProps({
  modifier: {
    type: Number,
    default: 1
  },
  handLandmarks: {
    type: Array,
    default: () => []
  }
})

watch(
    () => props.handLandmarks, val => {
      landmarksArray.value = val;
      //console.log("watch fired; props.handLandmarks =>", val);
    },
    { immediate: true, deep: true } // 'immediate' ensures it fires on mount
);

onMounted(() => {

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(
      container.value.clientWidth / -2,
      container.value.clientWidth / 2,
      container.value.clientHeight / 2,
      container.value.clientHeight / -2,
      0.1,
      1000
  )
  camera.position.z = 1;

  clock = new THREE.Clock()

  const geometry = new THREE.PlaneGeometry(2, 2)

  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      //where each landmark is an x,y,z
      handBase: { value: new THREE.Vector3(0, 0, 0) },
    },
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect
      renderer.setSize(width, height)
      material.uniforms.iResolution.value.set(width, height)
    }
  })

  observer.observe(container.value)

  //defunct, used when obtaining more landmarks
  function flattenLandmarks(landmarks) {
    if (!landmarks || !Array.isArray(landmarks)) return new Array(21 * 3).fill(0)
    return landmarks.flatMap(lm => [lm.x, lm.y, lm.z])
  }

  const animate = () => {
    material.uniforms.iTime.value = clock.getElapsedTime()

    //sync landmarks to prop uniform
    if (landmarksArray.value && landmarksArray.value.length > 0) {
      const base = landmarksArray.value[0];
      material.uniforms.handBase.value.set(base.x, base.y, base.z);
      //console.log(landmarksArray.value)
      //console.log(material.uniforms.handBase.value)
    } else {
      material.uniforms.handBase.value.set(0, 0, 0);
    }

    // console.log(landmarksArray.value)
    //console.log(props.handLandmarks)

    renderer.render(scene, camera)
    animationFrameId = requestAnimationFrame(animate)

  }
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  if (observer) observer.disconnect()
  if (renderer) renderer.dispose()
})

</script>

<template>
  <div ref="container" class="w-full h-full relative">
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full" />
  </div>
</template>


