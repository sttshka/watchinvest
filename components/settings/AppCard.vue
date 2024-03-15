<template>
  <div class="flex flex-col bg-white relative">
    <div class="p-6" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="h-[1px] bg-gray-1" v-if="$slots.header"></div>
    <div v-if="$slots.content">
      <slot name="content" />
    </div>
    <div class="h-[1px] bg-gray-1" v-if="$slots.footer"></div>
    <div class="p-6" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
