<template>
  <div
      class="
      group
      relative
      aspect-square
      rounded-[20px]
      bg-transparent
      transition-transform duration-100 ease-in-out
      hover:scale-95
      overflow-hidden"
  >
    <div class="h-full group-hover:scale-[1.0526] transition-transform duration-100 ease-in-out">
      <slot />
    </div>
  </div>
</template>

<script setup>
// purely presentational
</script>
