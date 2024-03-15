<template>
  <component
    class="px-6 xl:px-8 2xl:px-10 text-[14px] xl:text-[15px] 2xl:text-base !leading-[120%] flex justify-center items-center max-w-none lg:max-w-fit font-medium border-[1px] transition-all cursor-pointer backdrop-blur-[8px] duration-300 relative"
    :is="buttonType"
    :to="to"
    :class="buttonClass"
    :disabled="disabled"
  >
    <slot />
    <AppLoadingOverlay v-if="loading" />
  </component>
</template>

<script setup lang="ts">
import AppLoadingOverlay from "~/components/ui/AppLoadingOverlay.vue";
const props = withDefaults(
  defineProps<{
    color?: "primary" | "secondary" | "pink";
    dark?: boolean;
    size?: "sm" | "md" | "lg";
    outline?: boolean;
    to?: string | null;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    size: "sm",
    color: "primary",
    dark: false,
    outline: false,
    to: null,
  }
);

const buttonClass = computed(() => ({
  // primary
  "text-white bg-primary border-primary text-white hover:border-primary-hover hover:bg-primary-hover active:opacity-[0.8]":
    props.color === "primary",
  // primary
  "text-white bg-pink border-pink text-white hover:border-pink-hover hover:bg-pink-hover active:opacity-[0.8]":
    props.color === "pink",
  // secondary
  "text-white border-primary bg-secondary bg-opacity-[0.88] hover:border-primary hover:bg-primary active:opacity-[0.8]":
    props.color === "secondary",
  // dark
  "!bg-secondary !border-secondary hover:!bg-secondary-hover active:opacity-[0.8]":
    props.dark,
  // outlined
  "!bg-transparent !border-gray-1 hover:!bg-gray-1 hover:!bg-opacity-[0.08] active:bg-gray-1 active:!bg-opacity-[0.08] active:bg-secondary active:opacity-[0.8]":
    props.outline && !props.dark,
  // outlined dark
  "!text-secondary !bg-transparent !border-secondary hover:!bg-secondary hover:!text-white active:!text-white active:!bg-secondary active:opacity-[0.8]":
    props.outline && props.dark,
  "h-[48px]": props.size === "sm",
  "h-[56px]": props.size === "md",
  "h-[64px]": props.size === "lg",
  "!cursor-not-allowed !brightness-50": props.disabled,
}));

const buttonType = computed(() => {
  if (props.to) {
    return defineNuxtLink({});
  } else return "button";
});
</script>

<style lang="scss" scoped></style>
