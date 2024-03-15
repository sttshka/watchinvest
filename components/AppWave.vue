<template>
  <div
    class="app-wave absolute flex justify-center items-center left-0 right-0 top-0 bottom-0 opacity-20"
  >
    <div
      v-for="wave in waves"
      :key="wave.id"
      class="wave absolute h-[100px] w-[100px] rounded-full"
      :class="wave.style"
    />
  </div>
</template>

<script lang="ts" setup>
const waves = [
  {
    id: 1,
    style: "delay1",
  },
  {
    id: 2,
    style: "delay2",
  },
  {
    id: 3,
    style: "delay3",
  },
  {
    id: 4,
    style: "delay4",
  },
  {
    id: 5,
    style: "delay5",
  },
  {
    id: 6,
    style: "delay6",
  },
];
</script>

<style scoped>
.app-wave {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-font-smoothing: antialiased;
}
.wave {
  will-change: padding;
  border: 0.3vh solid #c9c9c950;
  /* border: 0.3vh solid red; */

  animation: padding-pulse 10s ease-in-out infinite;
  -webkit-filter: blur(0px);
}

.wave:nth-child(2) {
  animation-delay: -2000ms;
}
.wave:nth-child(3) {
  animation-delay: -4000ms;
}
.wave:nth-child(4) {
  animation-delay: -6000ms;
}
.wave:nth-child(5) {
  animation-delay: -8000ms;
}
.wave:nth-child(6) {
  animation-delay: -10000ms;
}

@keyframes padding-pulse {
  0% {
    opacity: 0;
    padding: 10vh;
  }

  10% {
    opacity: 1;
    padding: 20vh;
  }

  20% {
    padding: 20vh;
  }

  30% {
    padding: 40vh;
  }
  40% {
    padding: 40vh;
  }

  50% {
    padding: 60vh;
  }
  60% {
    padding: 60vh;
  }

  70% {
    padding: 80vh;
  }
  80% {
    padding: 80vh;
    opacity: 1;
  }

  90% {
    padding: 100vh;
    opacity: 0;
  }
  100% {
    opacity: 0;
    padding: 100vh;
  }
}
</style>
