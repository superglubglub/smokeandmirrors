<script setup>
import {ref, watch} from 'vue'

// Example: This is your input between 0 and 1
const value = ref(0.5) // try changing this value to see the bar resize

const props = defineProps({
  title: {
    type: String,
    default: "Object Description"
  },
  value: {
    type: Number,
    default: 0.5,
  }
})

watch(
    () => props.value, val => {

      value.value = val;
      //console.log("watch fired; props.handLandmarks =>", val);
    },
    { immediate: true, deep: true } // 'immediate' ensures it fires on mount
);

</script>

<template>
  <div :class="$style.alignleft">
    <div :class="$style.numberAndSlider">
      <div :class="$style.w95LabeledInput">
        <div :class="$style.input">
          <div :class="$style.div">{{`${value * 100}%`}}</div>
        </div>
      </div>
      <div :class="$style.w95Slider">
        <div :class="$style.sliderbarInner">
          <div :class="$style.gradientbar" :style="{width: `${value * 100}%` }">
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.statusbar">
      <div :class="$style.objects">{{title}}</div>
      <img :class="$style.dragSizeIcon" alt="" src="/Icon/Button/Drag Size icon.svg" />
    </div>
  </div>
</template>

<style  module>.div {
  width: 46px;
  position: relative;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 29px;
  flex-shrink: 0;
}
.input {
  align-self: stretch;
  box-shadow: -1px -1px 0px #000 inset, 1px 1px 0px #fff inset, -2px -2px 0px #7f7f7f inset, 2px 2px 0px #dfdfdf inset;
  background-color: #fff;
  height: 33px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 2px 2px 2px 6px;
  box-sizing: border-box;
  font-size: 8px;
}
.w95LabeledInput {
  align-self: stretch;
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.sliderbarInner {
  align-self: stretch;
  flex: 1;
  box-shadow: -1px -1px 0px #fff inset, 1px 1px 0px #808080 inset;
  background-color: #c0c0c0;
  z-index: 0;
}
.rightButtonIcon {
  width: 25px;
  position: absolute;
  margin: 0 !important;
  top: calc(50% - 12.5px);
  right: 4px;
  height: 25px;
  object-fit: contain;
  z-index: 1;
}
.leftButtonIcon {
  width: 25px;
  position: absolute;
  margin: 0 !important;
  top: 4px;
  left: 4px;
  height: 25px;
  object-fit: contain;
  z-index: 2;
}
.chevron {
  position: relative;
  line-height: 22px;
}
.indicatorBlock {
  width: 24px;
  margin: 0 !important;
  position: absolute;
  top: calc(50% - 12.5px);
  left: calc(50% - 11.5px);
  box-shadow: -1px -1px 0px #000 inset, 1px 1px 0px #fff inset, -2px -2px 0px #7f7f7f inset, 2px 2px 0px #dfdfdf inset;
  background-color: #c0c0c0;
  height: 25px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.w95Slider {
  flex: 1;
  box-shadow: -1px -1px 0px #000 inset, 1px 1px 0px #fff inset, -2px -2px 0px #7f7f7f inset, 2px 2px 0px #dfdfdf inset;
  background-color: #c0c0c0;
  height: 33px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 4px;
  box-sizing: border-box;
  position: relative;
}
.numberAndSlider {
  align-self: stretch;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
}
.objects {
  position: absolute;
  width: calc(100% - 20px);
  top: calc(50% - 4.5px);
  left: 4px;
  line-height: 10px;
  display: inline-block;
}
.dragSizeIcon {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 13px;
  height: 13px;
}
.statusbar {
  width: 127px;
  flex: 1;
  position: relative;
  box-shadow: -1px -1px 0px #fff inset, 1px 1px 0px #808080 inset;
  background-color: #c0c0c0;
  text-align: left;
  font-size: 11px;
}
.alignleft {
  width: 100%;
  position: relative;
  height: 62px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2px;
  box-sizing: border-box;
  gap: 2px;
  text-align: center;
  font-size: 20px;
  color: #000;
  font-family: W95FA;
}
.text {
  position: relative;
  letter-spacing: 0.02em;
  line-height: 13px;
}
.gradientbar {
  height: 100%;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  transition: width 0.3s ease; /* smooth resizing */
}
</style>