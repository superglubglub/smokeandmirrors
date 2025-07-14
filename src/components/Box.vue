<script setup>
  const props = defineProps({
    title: String,
    status: String,
  })
</script>

<template>
  <div :class="$style.shaderDisplayFrame">
    <div :class="$style.content">
      <div :class="$style.d" />
    </div>
    <div :class="$style.titlebar">
      <div :class="$style.label">
        <img :class="$style.iconsmallrunProgram" alt="" src="/Icon/Small/Run Program.png" />
        <div :class="$style.text">{{title}}</div>
      </div>
      <div :class="$style.windowButtons">
        <div :class="$style.buttonwindowButton">
          <div :class="$style.utillityIcons">
            <div :class="$style.minimize" />
          </div>
        </div>
        <div :class="$style.buttonwindowButton">
          <div :class="$style.utillityIcons">
            <img :class="$style.maximizeIcon" alt="" src="/Icon/Button/maximise.svg" />
          </div>
        </div>
        <div :class="$style.buttonwindowButton">
          <div :class="$style.utillityIcons">
            <img :class="$style.maximizeIcon" alt="" src="/Icon/Button/close.svg" />
          </div>
        </div>
      </div>
    </div>
    <slot />
    <div :class="$style.statusbar">
      <div :class="$style.statusbar1">
        <div :class="$style.objects">{{status}}</div>
        <img :class="$style.dragSizeIcon" alt="" src="/Icon/Button/Drag Size icon.svg" />
      </div>
    </div>
  </div>
</template>

<style  module>.d {
  align-self: stretch;
  flex: 1;
  position: relative;
  box-shadow: 1px 2px 8px 1px rgba(255, 255, 255, 0.25) inset;
  overflow: hidden;
}
.content {
  align-self: stretch;
  flex: 1;
  background-color: rgba(255, 255, 255, 0);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 4px;
  z-index: 0;
}
.objects {
  position: absolute;
  width: calc(100% - 20px);
  top: calc(50% - 5px);
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
.statusbar1 {
  align-self: stretch;
  position: relative;
  box-shadow: -1px -1px 0px #fff inset, 1px 1px 0px #808080 inset;
  background-color: #c0c0c0;
  height: 18px;
  opacity: 0.4;
}
.statusbar {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
}
.iconsmallrunProgram {
  width: 16px;
  position: relative;
  height: 16px;
  object-fit: cover;
}
.text {
  position: relative;
  letter-spacing: 0.02em;
  line-height: 13px;
}
.label {
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
}
.minimize {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  background-color: #000;
}
.utillityIcons {
  flex: 1;
  position: relative;
  height: 2px;
}
.buttonwindowButton {
  width: 16px;
  box-shadow: -1px -1px 0px #000 inset, 1px 1px 0px #fff inset, -2px -2px 0px #7f7f7f inset, 2px 2px 0px #dfdfdf inset;
  background-color: #c0c0c0;
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding: 4px;
  box-sizing: border-box;
}
.maximizeIcon {
  position: absolute;
  bottom: 0px;
  left: calc(50% - 4px);
  width: 8px;
  height: 8px;
}
.windowButtons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.titlebar {
  width: calc(100% - 8px);
  margin: 0 !important;
  position: absolute;
  top: 3px;
  right: 4px;
  left: 4px;
  background-color: #000080;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2px 2px 2px 4px;
  box-sizing: border-box;
  gap: 0px;
  z-index: 2;
  font-size: 12px;
  color: #fff;
}
.shaderDisplayFrame {
  width: 100%;
  position: relative;
  box-shadow: -1px -1px 0px #000 inset, 1px 1px 0px #fff inset, -2px -2px 0px #7f7f7f inset, 2px 2px 0px #dfdfdf inset;
  background-color: #c0c0c0;
  height: 478px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 4px;
  box-sizing: border-box;
  gap: 2px;
  text-align: left;
  font-size: 11px;
  color: #000;
  font-family: W95FA;
}

</style>