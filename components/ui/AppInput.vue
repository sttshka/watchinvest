<template>
  <div>
    <div
      class="h-16 w-full border-[1px] border-gray-2 px-[20px] py-4 relative transition-colors"
      :class="{
        'border-primary': isFocused,
        'border-red': errorMessage,
        'h-full w-full': type === InputType.textArea,
      }"
    >
      <div
        class="absolute bg-white w-fit px-1 -ml-1 -top-3 transition-colors"
        :class="{
          'text-primary': isFocused,
          'text-red': errorMessage,
        }"
      >
        {{ title ?? "Input" }}
      </div>

      <textarea
        v-if="type === InputType.textArea"
        :value="modelValue || value"
        class="outline-none w-full h-full selection:bg-primary selection:text-white max-h-[200px]"
        rows="4"
        @input="handleInputChange"
      ></textarea>
      <div class="w-full h-full flex gap-2 items-center" v-else>
        <input
          ref="input"
          class="outline-none w-full h-full selection:bg-primary selection:text-white"
          :value="modelValue || value"
          :type="inputType"
          :placeholder="placeholder ?? 'Enter your value'"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @input="handleInputChange"
        />
        <div v-if="type === InputType.password">
          <ToggleEye
            v-model="isPasswordVisible"
            class="h-6 w-6 text-secondary hover:text-primary transition-all cursor-pointer"
            @click="isPasswordVisible = !isPasswordVisible"
          />
        </div>
      </div>
    </div>
    <div
      class="bg-red text-white px-[20px] py-1 text-[14px]"
      v-if="errorMessage"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleEye from "~/components/icons/ToggleEye.vue";

enum InputType {
  text = "text",
  email = "email",
  password = "password",
  number = "number",
  textArea = "textArea",
}

const props = defineProps<{
  modelValue?: string;
  value?: string;
  type?: InputType;
  title?: string;
  placeholder?: string;
  errorMessage?: string | null;
}>();

const emit = defineEmits(["update:modelValue", 'blur']);

const isPasswordVisible = ref(false);

const inputType = computed(() => {
  switch (props.type) {
    case InputType.textArea:
      return "textArea";
    case InputType.text:
      return "text";
    case InputType.email:
      return "email";
    case InputType.password:
      return isPasswordVisible.value ? "text" : "password";
    case InputType.number:
      return "number";
  }
});

function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

const isFocused = ref(false);

function handleInputFocus() {
  isFocused.value = true;
}

function handleInputBlur(e) {
  isFocused.value = false;
  emit('blur', e.target.value)
}
</script>

<style scoped></style>
