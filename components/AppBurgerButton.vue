<template>
  <div
    class="app-burger-button cursor-pointer w-[28px] h-[28px] relative"
    :class="{ open: modelValue }"
    @click="emit('toggle')"
  >
    <div
      class="w-full h-full flex flex-col gap-[5px] justify-center items-center px-[3px]"
    >
      <div
        class="bar w-full bg-white h-[2px] rounded-full transition-all"
        :class="{
          'rotate-[45deg] translate-y-[340%]': modelValue,
        }"
      ></div>
      <div
        class="bar w-full bg-white h-[2px] rounded-full transition-all"
        :class="{ 'translate-x-[-100%] opacity-0': modelValue }"
      ></div>
      <div
        class="bar w-full bg-white h-[2px] rounded-full transition-all"
        :class="{
          'rotate-[-45deg] translate-y-[-340%]': modelValue,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["toggle"]);
defineProps<{
  modelValue: boolean;
}>();
</script>

<style scoped>
.app-burger-button.open .bar:nth-child(1) {
  /* background: #000; */
}
</style>
