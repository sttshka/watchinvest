<template>
  <form
    @submit.prevent="handleConfirm"
    class="flex flex-col gap-10 h-full w-full"
  >
    <div class="text-[28px] !leading-[120%]">Code confirm</div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.email"
        placeholder="Enter your email"
        type="email"
        title="Email"
      />
      <AppInput
        v-model.number="form.code"
        placeholder="Enter code from email"
        type="text"
        title="Code"
      />
    </div>

    <div class="w-full flex flex-col gap-6">
      <AppButton size="lg" class="w-full !max-w-full" @click="emit('apply')"
        >Sign In</AppButton
      >
      <div
        class="flex items-center gap-1 justify-center text-gray-text text-base !leading-[150%]"
      >
        <div>Remember your password now?</div>
        <div @click="emit('login')" class="text-primary cursor-pointer">
          Log in
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import AppInput from "./ui/AppInput.vue";

const form = ref<{
  email: string;
  code: string | null;
}>({
  email: "",
  code: null,
});
const emit = defineEmits<{
  login: [];
  close: [];
}>();

const auth = useAuthStore();
form.value.email = auth.confirmEmail ?? "";

async function handleConfirm() {
  const { data, error } = await auth.confirm(form.value);
  if (error?.value?.statusCode === 400) {
    error.value?.data.validation_error.forEach(({ field, message }) => {
      errors.value[field] = message;
    });
  }

  if (data.value.success === true) {
    emit("close");
  }
}
</script>

<style scoped></style>
