<template>
  <div class="h-full object-fit overflow-hidden">
    <video ref="video" class="hidden" autoplay playsinline muted></video>
    <canvas ref="canvas" class="w-full h-full"/>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, toRaw} from 'vue';
import {Hands} from "@mediapipe/hands";
import {Camera} from "@mediapipe/camera_utils";
const emit = defineEmits(['handLandmarks'])

const video = ref(null);
const canvas = ref(null);

let camera = null;
let hands = null;

onMounted(async () => {
  hands = new Hands({
    locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

  hands.onResults(onResults);

  camera = new Camera(video.value, {
    onFrame: async () => {
      await hands.send({image: video.value});
    },
    width: 640,
    height: 480
  });

  camera.start();
});

onUnmounted(() => {
  if (camera) camera.stop();
});

function onResults(results) {
  const canvasEl = canvas.value;
  const ctx = canvasEl.getContext('2d');
  ctx.save();
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.drawImage(results.image, 0, 0, canvasEl.width, canvasEl.height);

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {

      // define palm and fingertip positions
      const palm = landmarks[0]
      const fingertips = [8, 12, 16, 20]
      const thumbTip = landmarks[4];

      // Draw palm center (always green)
      drawDot(ctx, palm, canvasEl, "limegreen");
      drawLabelAbovePoint(ctx, palm, canvasEl);

      drawDot(ctx, thumbTip, canvasEl, "dodgerblue");
      drawGreenLine(ctx, thumbTip, palm, canvasEl);

      // For each fingertip
      fingertips.forEach(idx => {
        const tip = landmarks[idx];

        // Calculate distance between thumb tip and current fingertip (in normalized space)
        const dist = Math.sqrt(
            Math.pow(tip.x - thumbTip.x, 2) +
            Math.pow(tip.y - thumbTip.y, 2)
        );
        // Threshold: adjust as needed; 0.07 is a good starting point
        const touching = dist < 0.07;

        // Color blue if touching, else green
        const color = touching ? "dodgerblue" : "limegreen";

        // Draw green line from tip to palm center
        drawGreenLine(ctx, tip, palm, canvasEl);

        // Draw green dot at fingertip
        drawDot(ctx, tip, canvasEl, color);

        // Draw the coordinate label above the tip
        drawLabelAbovePoint(ctx, tip, canvasEl);
      });
    }

    //console.log(results.multiHandLandmarks[0])
    emit('handLandmarks', { landmarks: results.multiHandLandmarks[0] } );

  }
  ctx.restore();
}

// dot drawer function
function drawDot(ctx, landmark, canvasEl, color) {
  const x = landmark.x * canvasEl.width;
  const y = landmark.y * canvasEl.height;
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.fill();
  ctx.shadowBlur = 0;
}

// Helper to draw a green line
function drawGreenLine(ctx, a, b, canvasEl) {
  ctx.beginPath();
  ctx.moveTo(a.x * canvasEl.width, a.y * canvasEl.height);
  ctx.lineTo(b.x * canvasEl.width, b.y * canvasEl.height);
  ctx.strokeStyle = 'limegreen';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawLabelAbovePoint(ctx, landmark, canvasEl) {
  const x = landmark.x * canvasEl.width;
  const y = landmark.y * canvasEl.height;
  const label = `[${Math.round(x)},${Math.round(y)}]`;
  ctx.font = "8px monospace";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  // Draw outline for readability
  ctx.fillText(label, x, y - 15);
}

</script>